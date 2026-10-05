import { useState, useEffect } from "react";
import axios from "axios";
import { API_LINK } from "../cfg";
import { useNavigate } from "react-router-dom";
import StpApplicationForm from "./stpapply";
import UpperPanel from "./upperpanel";
import ProfilForm from "./profilform";

function StipendiatCabinet({ stp, stpinfo, stpCheck }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [ref, setRef] = useState(false);
  const [activePage, setActivePage] = useState("profil");
  const handleRef = () => {
    setRef(!ref);
  };
  const [full, setFull] = useState(false);

  const navigate = useNavigate();
  const [stpdata, setStpdata] = useState({});
  // Profil formasi holati
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    university: "",
    fieldOfStudy: "",
    degree: "",
    password: "",
  });

  // Hujjatlar state-i (File obyekti yoki yuklangan URL string)
  const [files, setFiles] = useState({
    photo3x4: null,
    residenceCertificate: null,
    studyCertificate: null,
    familyCertificate: null,
    passportCopy: null,
    motivationLetter: null,
    objectiveSheet: null,
    schoolDiploma: null,
    transcript: null,
    dtmResult: null,
    ieltsCertificate: null,
    cefrCertificate: null,
    achievementsProof: null,
    motivationProof: null,
  });

  // Yangi yutuq formasi
  const [newAchievement, setNewAchievement] = useState({
    title: "",
    year: new Date().getFullYear(),
    description: "",
    certificateUrl: "",
  });

  const achievementsList = stpdata.achievements || [];
  // controller / route ichida
  const checkIsProfileCompleted = () => {
    // 1. Shaxsiy ma'lumotlar to'liqligi
    const user = stpdata;
    const hasBasicInfo =
      user.fullName &&
      user.email &&
      user.phone &&
      user.university &&
      user.fieldOfStudy &&
      user.degree;

    // 2. Majburiy hujjatlar ro'yxati
    const requiredDocKeys = [
      "residenceCertificate",
      "studyCertificate",
      "familyCertificate",
      "passportCopy",
      "motivationLetter",
      "objectiveSheet",
      "schoolDiploma",
      "transcript",
      "dtmResult",
    ];

    // 3. Barcha majburiy hujjatlar mavjudligini tekshirish
    const hasRequiredDocs = requiredDocKeys.every(
      (key) => user.documents && user.documents[key],
    );

    // 4. 3x4 Rasm bormi?
    const hasPhoto = Boolean(user.photo3x4);
    return Boolean(hasBasicInfo && hasRequiredDocs && hasPhoto);
  };
  // Ma'lumotlarni serverdan yuklash
  useEffect(() => {
    fetchDataa();
  }, [ref]);
  const fetchDataa = () => {
    const token = localStorage.getItem("access_stp_token");
    if (!token) return;

    axios
      .get(`${API_LINK}/stipendiat/getone/${stpinfo.stpId}`, {
        headers: { "x-stp-token": token },
      })
      .then((e) => {
        const { ok, data } = e.data;

        if (ok && data) {
          setStpdata(data);
          setFormData({
            fullName: data.fullName || "",
            email: data.email || "",
            phone: data.phone || "",
            university: data.university || "",
            fieldOfStudy: data.fieldOfStudy || "",
            degree: data.degree || "",
            password: "",
          });

          const docs = data.documents || data;
          // Serverdagi mavjud fayllar yo'lini files state-ga tenglaymiz
          setFiles({
            photo3x4: data.photo3x4 || null,
            residenceCertificate: docs.residenceCertificate || null,
            studyCertificate: docs.studyCertificate || null,
            familyCertificate: docs.familyCertificate || null,
            passportCopy: docs.passportCopy || null,
            motivationLetter: docs.motivationLetter || null,
            objectiveSheet: docs.objectiveSheet || null,
            schoolDiploma: docs.schoolDiploma || null,
            transcript: docs.transcript || null,
            dtmResult: docs.dtmResult || null,
            ieltsCertificate: docs.ieltsCertificate || null,
            cefrCertificate: docs.cefrCertificate || null,
            achievementsProof: docs.achievementsProof || null,
            motivationProof: docs.motivationProof || null,
          });
        }
      })
      .catch((err) => console.error("Ma'lumot olishda xatolik:", err));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Profil va fayllarni saqlash / yangilash
  const handleProfileUpdate = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const token = localStorage.getItem("access_stp_token");
      const stipendiatId = stpinfo?.stpId || stpdata?._id;

      const textField = [
        "fullName",
        "email",
        "phone",
        "university",
        "fieldOfStudy",
        "degree",
      ];

      const DOCUMENT_KEYS = [
        "photo3x4",
        "residenceCertificate",
        "studyCertificate",
        "familyCertificate",
        "passportCopy",
        "motivationLetter",
        "objectiveSheet",
        "schoolDiploma",
        "transcript",
        "dtmResult",
        "ieltsCertificate",
        "cefrCertificate",
        "achievementsProof",
        "motivationProof",
      ];

      const payload = new FormData();
      payload.append("id", stipendiatId);
      payload.append("isProfileCompleted", "true");

      // Oddiy matnli maydonlarni biriktirish
      textField.forEach((field) => {
        if (formData[field] !== undefined && formData[field] !== null) {
          payload.append(field, formData[field]);
        }
      });

      // Hujjat fayllarini biriktirish (Faqat JavaScript File obyekti bo'lsa)
      DOCUMENT_KEYS.forEach((field) => {
        if (files[field] && files[field] instanceof File) {
          payload.append(field, files[field]);
        }
      });

      const res = await axios.put(`${API_LINK}/stipendiat/edit`, payload, {
        headers: {
          "x-stp-token": token,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.ok) {
        setMessage({
          type: "success",
          text: "Ma'lumotlar muvaffaqiyatli saqlandi!",
        });
        handleRef();
        if (typeof stpCheck === "function") stpCheck();
      } else {
        setMessage({
          type: "error",
          text: res.data.msg || "Xatolik yuz berdi",
        });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Server bilan bog'lanishda xatolik!" });
    } finally {
      setLoading(false);
    }
  };

  // Yutuq qo'shish
  const handleAddAchievement = async (e) => {
    e.preventDefault();
    if (!newAchievement.title) return;

    const updatedAchievements = [...achievementsList, newAchievement];
    setLoading(true);

    try {
      const token = localStorage.getItem("access_stp_token");
      const stipendiatId = stpinfo?.stpId || stpdata?._id;

      const res = await axios.put(
        `${API_LINK}/stipendiat/edit`,
        {
          id: stipendiatId,
          achievements: updatedAchievements,
        },
        { headers: { "x-stp-token": token } },
      );

      if (res.data.ok) {
        setNewAchievement({
          title: "",
          year: new Date().getFullYear(),
          description: "",
          certificateUrl: "",
        });
        setMessage({ type: "success", text: "Yangi yutuq qo'shildi!" });
        handleRef();
        if (typeof stpCheck === "function") stpCheck();
      } else {
        setMessage({
          type: "error",
          text: res.data.msg || "Xatolik yuz berdi",
        });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Yutuqni saqlashda xatolik!" });
    } finally {
      setLoading(false);
    }
  };

  // Yutuqni o'chirish
  const handleDeleteAchievement = async (index) => {
    const updatedAchievements = achievementsList.filter((_, i) => i !== index);
    setLoading(true);

    try {
      const token = localStorage.getItem("access_stp_token");
      const stipendiatId = stpinfo?.stpId || stpdata?._id;

      const res = await axios.put(
        `${API_LINK}/stipendiat/edit`,
        {
          id: stipendiatId,
          achievements: updatedAchievements,
        },
        { headers: { "x-stp-token": token } },
      );

      if (res.data.ok) {
        setMessage({ type: "success", text: "Yutuq o'chirildi!" });
        handleRef();
        if (typeof stpCheck === "function") stpCheck();
      } else {
        setMessage({
          type: "error",
          text: res.data.msg || "O'chirishda xatolik",
        });
      }
    } catch (err) {
      setMessage({ type: "error", text: "O'chirishda xatolik yuz berdi!" });
    } finally {
      setLoading(false);
    }
  };

  // Tizimdan chiqish
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("access_stp_token");
      await axios.get(`${API_LINK}/stipendiat/leave`, {
        headers: { "x-stp-token": token },
      });
    } catch (err) {
      console.error(err);
    } finally {
      localStorage.removeItem("access_stp_token");
      if (typeof stpCheck === "function") stpCheck();
      navigate("/main-winner-element/stipendiat-kobinetiga-kirish");
    }
  };
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 my-10 bg-none rounded-2xl ">
      {/* Yuqori Panel */}
      <UpperPanel
        stp={stp}
        stpdata={stpdata}
        handleLogout={handleLogout}
        handleRef={handleRef}
        activePage={activePage}
        setActivePage={setActivePage}
        full={full}
      />

      {/* Xabarnoma bildirishnomasi */}
      {message.text && (
        <div
          className={`p-4 mb-6 rounded-xl text-sm ${
            message.type === "success"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      {activePage === "profil" && (
        <ProfilForm
          full={full}
          setFull={setFull}
          stpdata={stpdata}
          checkIsProfileCompleted={checkIsProfileCompleted}
          handleProfileUpdate={handleProfileUpdate}
          formData={formData}
          handleChange={handleChange}
          loading={loading}
          handleAddAchievement={handleAddAchievement}
          newAchievement={newAchievement}
          setNewAchievement={setNewAchievement}
          achievementsList={achievementsList}
          handleDeleteAchievement={handleDeleteAchievement}
          setActivePage={setActivePage}
          activePage={activePage}
          setFiles={setFiles}
          files={files}
          handleRef={fetchDataa}
        />
      )}
      {activePage === "ariza" && (
        <StpApplicationForm bor1={stp} stpinfo={stpinfo} stpCheck={stpCheck} />
      )}
    </div>
  );
}

export default StipendiatCabinet;
