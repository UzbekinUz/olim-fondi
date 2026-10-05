import { useEffect, useState } from "react";
import {
  Edit,
  X,
} from "lucide-react";
import axios from "axios";
import { API_LINK } from "../cfg";
import TopTabBar from "./stpDetails/topTabBar";
import Scholar from "./stpDetails/scholar";
import Expert from "./stpDetails/epert";
import AddS from "./stpDetails/addStp";
import AddExpert from "./stpDetails/addExpert";

export default function ScholarPage({ addToast,userRole }) {
  const [activeTab, setActiveTab] = useState("scholars"); // 'scholars' | 'experts'
  const [expandedScholarId, setExpandedScholarId] = useState(null);

  // Modallar
  const [isAddScholarModal, setIsAddScholarModal] = useState(false);
  const [isAddExpertModal, setIsAddExpertModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

  // Qidiruv va Yuklanish
  const [searchTerm, setSearchTerm] = useState("");
  const [load, setLoad] = useState(false);
  const [loadingAction, setLoadingAction] = useState(false);

  // Statelar
  const [scholars, setScholars] = useState([]);
  const [experts, setExperts] = useState([]);

  // Form statelari
  const [scholarForm, setScholarForm] = useState({ login: "", password: "" });
  const [expertForm, setExpertForm] = useState({
    username: "",
    password: "",
    role: "Ekspert",
  });

  // Toast xabar chiqarish yordamchisi (prop kelmagan bo'lsa alert beradi)
  const notify = (msg, type = "info") => {
    if (typeof addToast === "function") {
      addToast(msg, type);
    } else {
      alert(msg);
    }
  };

  // MongoDB ID ni String formatga o'tkazuvchi yordamchi funksiya
  const getId = (item) =>
    typeof item._id === "object" ? item._id.$oid : item._id;

  useEffect(() => {
    fetchData();
    fetchExperts();
  }, []);

  // Stipendiatlarni olish
  function fetchData() {
    setLoad(true);
    axios
      .get(`${API_LINK}/stipendiat/getall`, {
        headers: {
          "x-admin-token": localStorage.getItem("access_admin_token"),
        },
      })
      .then((res) => {
        if (res.data.ok) {
          setScholars(res.data.data);
        }
      })
      .catch((err) => {
        console.error("Stipendiatlarni olishda xatolik:", err);
      })
      .finally(() => setLoad(false));
  }

  // Ekspertlarni backenddan olish
  function fetchExperts() {
    axios
      .get(`${API_LINK}/admin/getall`, {
        headers: {
          "x-admin-token": localStorage.getItem("access_admin_token"),
        },
      })
      .then((res) => {
        if (res.data.ok) {
          // Agar admin/getall bo'lsa faqat Ekspertlarni filtrlash (yoki barcha ekspertlarni)
          const expertList = res.data.data.filter(
            (item) => item.role === "Ekspert" || item.role === "Checker",
          );
          setExperts(expertList.length > 0 ? expertList : res.data.data);
        }
      })
      .catch((err) => {
        console.error("Ekspertlarni olishda xatolik:", err);
      });
  }

  // Accordion toggle
  const toggleExpand = (id) => {
    setExpandedScholarId(expandedScholarId === id ? null : id);
  };

  // Yangi Stipendiat qo'shish
  const handleAddScholar = async (e) => {
    e.preventDefault();

    if (!scholarForm.login.trim() || !scholarForm.password.trim()) {
      notify("Iltimos, login va parolni to'liq kiriting!", "error");
      return;
    }

    setLoadingAction(true);
    try {
      const response = await axios.post(
        `${API_LINK}/stipendiat/add`,
        scholarForm,
        {
          headers: {
            "x-admin-token": localStorage.getItem("access_admin_token"),
          },
        },
      );

      if (response.data.ok || response.data.status === "success") {
        notify("Stipendiat muvaffaqiyatli qo'shildi!", "success");
        setScholarForm({ login: "", password: "" });
        setIsAddScholarModal(false);
        fetchData();
      } else {
        notify(
          response.data.msg || "Stipendiatni qo'shishda xatolik yuz berdi!",
          "error",
        );
      }
    } catch (error) {
      console.error("Add Scholar Error:", error);
      notify(
        error.response?.data?.msg ||
          "Server bilan bog'lanishda xatolik yuz berdi!",
        "error",
      );
    } finally {
      setLoadingAction(false);
    }
  };

  // Yangi Ekspert qo'shish (API orqali Profile dagi kabi)
  const handleAddExpert = async (e) => {
    e.preventDefault();
    if (!expertForm.username.trim() || !expertForm.password.trim()) {
      notify("Foydalanuvchi nomi va parolni kiriting!", "error");
      return;
    }

    setLoadingAction(true);
    try {
      const response = await axios.post(
        `${API_LINK}/admin/add`,
        {
          username: expertForm.username,
          password: expertForm.password,
          role: expertForm.role || "Ekspert",
        },
        {
          headers: {
            "x-admin-token": localStorage.getItem("access_admin_token"),
          },
        },
      );

      if (response.data.ok) {
        notify("Yangi ekspert muvaffaqiyatli qo'shildi!", "success");
        setExpertForm({ username: "", password: "", role: "Ekspert" });
        setIsAddExpertModal(false);
        fetchExperts();
      } else {
        notify(
          response.data.msg || "Ekspert qo'shishda xatolik yuz berdi",
          "error",
        );
      }
    } catch (err) {
      console.error("Add Expert Error:", err);
      notify(err.response?.data?.msg || "Server bilan aloqa uzildi!", "error");
    } finally {
      setLoadingAction(false);
    }
  };

  // Stipendiatni o'chirish
  const handleDeleteScholar = async (id) => {
    if (!window.confirm("Rostdan ham ushbu stipendiatni o'chirmoqchimisiz?"))
      return;

    try {
      const response = await axios.delete(
        `${API_LINK}/stipendiat/delete/${id}`,
        {
          headers: {
            "x-admin-token": localStorage.getItem("access_admin_token"),
          },
        },
      );

      if (response.data.ok) {
        notify("Stipendiat o'chirildi!", "success");
        setScholars(scholars.filter((s) => getId(s) !== id));
      } else {
        notify(response.data.msg || "O'chirishda xatolik yuz berdi", "error");
      }
    } catch (err) {
      console.error("Delete Scholar Error:", err);
      notify("O'chirishda xatolik yuz berdi", "error");
    }
  };

  // Ekspertni o'chirish
  const handleDeleteExpert = async (id) => {
    if (!window.confirm("Rostdan ham ushbu ekspertni o'chirmoqchimisiz?"))
      return;

    try {
      const response = await axios.delete(`${API_LINK}/admin/delete/${id}`, {
        headers: {
          "x-admin-token": localStorage.getItem("access_admin_token"),
        },
      });

      if (response.data.ok) {
        notify("Ekspert muvaffaqiyatli o'chirildi!", "success");
        setExperts(experts.filter((e) => getId(e) !== id));
      } else {
        notify(response.data.msg || "O'chirishda xatolik yuz berdi", "error");
      }
    } catch (err) {
      console.error("Delete Expert Error:", err);
      notify("O'chirishda xatolik yuz berdi", "error");
    }
  };

  // Tahrirlashni saqlash (API orqali)
  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editItem) return;
    // console.log(editItem);
    
    setLoadingAction(true);
    try {
      if (editItem.type === "scholar") {
        const response = await axios.put(
          `${API_LINK}/stipendiat/editpass`,
          editItem.data,
          {
            headers: {
              "x-admin-token": localStorage.getItem("access_admin_token"),
            },
          },
        );

        if (response.data.ok) {
          notify("Stipendiat ma'lumotlari yangilandi!", "success");
          fetchData();
          setEditItem(null);
        } else {
          notify(response.data.msg || "Yangilashda xatolik yuz berdi", "error");
        }
      } else {
        // Profile funksiyasidagi kabi axios.put /admin/edit API so'rovi
        const response = await axios.put(
          `${API_LINK}/admin/edit`,
          {
            id: getId(editItem.data),
            username: editItem.data.username,
            password: editItem.data.password || undefined,
            role: editItem.data.role || "Ekspert",
          },
          {
            headers: {
              "x-admin-token": localStorage.getItem("access_admin_token"),
            },
          },
        );

        if (response.data.ok) {
          notify("Ekspert ma'lumotlari yangilandi!", "success");
          fetchExperts();
          setEditItem(null);
        } else {
          notify(response.data.msg || "Yangilashda xatolik yuz berdi", "error");
        }
      }
    } catch (err) {
      console.error("Edit Save Error:", err);
      notify("Server bilan bog'lanishda xatolik!", "error");
    } finally {
      setLoadingAction(false);
    }
  };

  // Generatsiya
  const generateScholarCreds = () => {
    const rnd = Math.floor(1000 + Math.random() * 9000);
    setScholarForm({
      login: `stipendiat_${rnd}`,
      password: Math.random().toString(36).slice(-8),
    });
  };

  const generateExpertCreds = () => {
    const rnd = Math.floor(100 + Math.random() * 900);
    setExpertForm((prev) => ({
      ...prev,
      username: `expert_${rnd}`,
      password: Math.random().toString(36).slice(-8),
    }));
  };

  const docLabels = [
    { key: "residenceCertificate", label: "Yashash joyidan ma'lumotnoma" },
    { key: "studyCertificate", label: "O'qish joyidan ma'lumotnoma" },
    { key: "familyCertificate", label: "Oila a'zolari haqida ma'lumotnoma" },
    { key: "passportCopy", label: "Pasport nusxa" },
    { key: "motivationLetter", label: "Motivatsion xat" },
    { key: "objectiveSheet", label: "Namunaviy obyektivka (CV)" },
    { key: "schoolDiploma", label: "Shahodatnoma / Diplom" },
    { key: "transcript", label: "Transkript" },
    { key: "dtmResult", label: "DTM Natijasi" },
    { key: "ieltsCertificate", label: "IELTS Sertifikat" },
    { key: "cefrCertificate", label: "CEFR Sertifikat" },
    { key: "achievementsProof", label: "Yutuqlar isboti" },
    { key: "motivationProof", label: "Motivatsion xat isboti" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* TOP TAB BAR */}
        <TopTabBar
          setActiveTab={setActiveTab}
          activeTab={activeTab}
          setIsAddExpertModal={setIsAddExpertModal}
          setIsAddScholarModal={setIsAddScholarModal}
          userRole={userRole}
        />

        {/* 1. STIPENDIATLAR BO'LIMI */}
        {activeTab === "scholars" && (
          <Scholar
          userRole={userRole}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            scholars={scholars}
            getId={getId}
            docLabels={docLabels}
            handleDeleteScholar={handleDeleteScholar}
            setEditItem={setEditItem}
            fetchData={fetchData}
            expandedScholarId={expandedScholarId}
            toggleExpand={toggleExpand}
          />
        )}

        {/* 2. EKSPERTLAR BO'LIMI */}
        {activeTab === "experts" && (
          <Expert
            experts={experts}
            getId={getId}
            setEditItem={setEditItem}
            handleDeleteExpert={handleDeleteExpert}
          />
        )}

        {/* MODAL: ADD STIPENDIAT */}
        {isAddScholarModal && (
          <AddS
            loadingAction={loadingAction}
            setScholarForm={setScholarForm}
            generateScholarCreds={generateScholarCreds}
            scholarForm={scholarForm}
            setIsAddScholarModal={setIsAddScholarModal}
            handleAddScholar={handleAddScholar}
          />
        )}

        {/* MODAL: ADD EXPERT */}
        {isAddExpertModal && (
          <AddExpert
            loadingAction={loadingAction}
            setExpertForm={setExpertForm}
            setIsAddExpertModal={setIsAddExpertModal}
            handleAddExpert={handleAddExpert}
            expertForm={expertForm}
            generateExpertCreds={generateExpertCreds}
          />
        )}

        {/* MODAL: EDIT */}
        {editItem && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md border border-slate-100 overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <h3 className="font-bold text-slate-800">
            {editItem.type === "scholar"
              ? "Stipendiatni Tahrirlash"
              : "Ekspertni Tahrirlash"}
          </h3>
          <button
            onClick={() => setEditItem(null)}
            className="text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSaveEdit} className="p-5 space-y-4">
          {editItem.type === "scholar" ? (
            <>
              
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Login
                </label>
                <input
                  type="text"
                  value={editItem.data.login || ""}
                  onChange={(e) =>
                    setEditItem({
                      ...editItem,
                      data: { ...editItem.data, login: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                 Yangi parol
                </label>
                <input
                  type="text"
                  onChange={(e) =>
                    setEditItem({
                      ...editItem,
                      data: {
                        ...editItem.data,
                        password: e.target.value,
                      },
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Foydalanuvchi nomi (Username)
                </label>
                <input
                  type="text"
                  required
                  value={editItem.data.username || ""}
                  onChange={(e) =>
                    setEditItem({
                      ...editItem,
                      data: {
                        ...editItem.data,
                        username: e.target.value,
                      },
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Yangi Parol (O'zgartirmaslik uchun bo'sh qoldiring)
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={editItem.data.password || ""}
                  onChange={(e) =>
                    setEditItem({
                      ...editItem,
                      data: {
                        ...editItem.data,
                        password: e.target.value,
                      },
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                />
              </div>
            </>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setEditItem(null)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition cursor-pointer"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              disabled={loadingAction}
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition cursor-pointer disabled:opacity-50"
            >
              {loadingAction ? "Saqlanmoqda..." : "Saqlash"}
            </button>
          </div>
        </form>
      </div>
    </div>
        )}
      </div>
    </div>
  );
}