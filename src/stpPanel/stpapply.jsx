import { useState, useEffect } from "react";
import axios from "axios";
import { API_LINK } from "../cfg";
import { FaExclamationCircle } from "react-icons/fa";
import ApplyForm from "./applyform";
import SubmittedApplicationView from "./sendedstp";

function StpApplicationForm({ bor1, stpinfo, stpCheck }) {
  const [period, setPeriod] = useState(null);
  const [markings, setMarkings] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState({});
  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  // Serverdan kelgan bor1 ma'lumotlari
  const hasSubmitted = bor1?.hasSubmitted || false;
  const applicationData = bor1?.data || null;

  const token = localStorage.getItem("access_stp_token");

  // 1. Mezonlar va faol davr ma'lumotlarini yuklash
  useEffect(() => {
    const fetchMarkingsAndPeriod = async () => {
      setLoading(true);
      try {
        // Mezonlar ro'yxatini olish
        const markingRes = await axios.get(
          `${API_LINK}/sitesettings/getallmark`
        );
        if (markingRes.data.ok) {
          setMarkings(markingRes.data.data);
        }

        // Agar ariza topshirilmagan bo'lsa, faol davrni olamiz
        if (!hasSubmitted) {
          const periodRes = await axios.get(`${API_LINK}/period/getactivepr`);
          if (periodRes.data.ok && periodRes.data.data) {
            // Agar massiv kelsa 0-elementini, aks holda ob'ektning o'zini saqlaymiz
            const activeData = Array.isArray(periodRes.data.data)
              ? periodRes.data.data[0]
              : periodRes.data.data;
            setPeriod(activeData);
          }
        }
      } catch (err) {
        console.error("Ma'lumotlarni yuklashda xatolik:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMarkingsAndPeriod();
  }, [hasSubmitted]);

  // 2. Fayl tanlash va tekshirish
  const handleFileChange = (markingId, e) => {
    const file = e.target.files[0];
    setErrors((prev) => ({ ...prev, [markingId]: null }));

    if (!file) return;

    if (file.type !== "application/pdf") {
      setErrors((prev) => ({
        ...prev,
        [markingId]: "Faqat PDF formatdagi fayllar qabul qilinadi!",
      }));
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        [markingId]: "Fayl hajmi 5MB dan oshmasligi kerak!",
      }));
      return;
    }

    setSelectedFiles((prev) => ({
      ...prev,
      [markingId]: file,
    }));
  };

  const handleRemoveFile = (markingId) => {
    setSelectedFiles((prev) => {
      const updated = { ...prev };
      delete updated[markingId];
      return updated;
    });
  };

  // 3. Yangi ariza yuborish
  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedMarkingIds = Object.keys(selectedFiles);
    if (selectedMarkingIds.length === 0) {
      alert("Kamida bitta mezon bo'yicha PDF fayl biriktirishingiz shart!");
      return;
    }

    setSubmitLoading(true);

    try {
      const formData = new FormData();
      formData.append("periodId", period?._id);
      formData.append("studentId", stpinfo?.stpId);

      selectedMarkingIds.forEach((mId) => {
        formData.append("markingIds", mId);
        formData.append("files", selectedFiles[mId]);
      });

      const res = await axios.post(`${API_LINK}/application/apply`, formData, {
        headers: {
          "x-stp-token": token,
        },
      });
      console.log("Server javobi:", res.data);

      if (res.data.ok) {
        alert(res.data.msg || "Arizangiz muvaffaqiyatli topshirildi!");
        setSelectedFiles({});
        if (stpCheck) stpCheck(); // Statusni yangilash
      } else {
        alert(res.data.msg || "Xatolik yuz berdi!");
      }
    } catch (err) {
      console.error("Arizani yuborishda xatolik:", err);
      alert("Arizani yuborishda server bilan bog'lanishda xatolik yuz berdi!");
    } finally {
      setSubmitLoading(false);
    }
  };

  // HOLAT 1: YUKLANISH JARAYONI
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 min-h-75">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  // HOLAT 2: TALABA ALLAQACHON ARIZA YUBORGAN BO'LSA
  if (hasSubmitted) {
    return (
      <SubmittedApplicationView
        applicationData={applicationData}
        apiLink={API_LINK}
      />
    );
  }

  // HOLAT 3: FAOL DAVR MAVJUD BO'LMASA
  if (!period) {
    return (
      <div className="max-w-xl mx-auto my-12 p-8 bg-amber-50 border border-amber-200 rounded-2xl text-center space-y-3">
        <FaExclamationCircle className="mx-auto text-4xl text-amber-500" />
        <h3 className="text-base font-bold text-amber-900">
          Hozirda faol ariza topshirish davri mavjud emas!
        </h3>
        <p className="text-xs text-amber-700">
          Ariza topshirish bosqichi boshlanganda ushbu sahifa orqali
          hujjatlaringizni yuborishingiz mumkin bo'ladi.
        </p>
      </div>
    );
  }

  // HOLAT 4: YANGI ARIZA TOPSHIRISH FORMASI
  return (
    <ApplyForm
      period={period}
      handleSubmit={handleSubmit}
      markings={markings}
      selectedFiles={selectedFiles}
      handleRemoveFile={handleRemoveFile}
      errors={errors}
      submitLoading={submitLoading}
      handleFileChange={handleFileChange}
    />
  );
}

export default StpApplicationForm;