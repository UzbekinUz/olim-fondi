import { useState, useEffect } from "react";
import axios from "axios";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaCalendarAlt,
  FaCheckCircle,
  FaArchive,
  FaTimes,
  FaSave,
  FaLayerGroup,
  FaExclamationTriangle
} from "react-icons/fa";
import { API_LINK } from "../../cfg";

const API_BASE = `${API_LINK}/period`;

export default function AdminPeriods({periods,setPeriods}) {
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPeriod, setEditingPeriod] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    startDate: "",
    endDate: "",
    status: "draft"
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    fetchPeriods();
  }, []);

  // Sanani formadagi input (YYYY-MM-DD) uchun to'g'rilash
  const formatDateForInput = (dateStr) => {
    if (!dateStr) return "";
    return dateStr.includes("T") ? dateStr.split("T")[0] : dateStr;
  };

  // 1. Barcha davrlarni yuklab olish
  const fetchPeriods = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await axios.get(`${API_BASE}/getpr`);
      if (res.data.ok) {
        setPeriods(res.data.data || []);
      } else {
        setErrorMsg(res.data.msg || "Davrlarni yuklashda xatolik yuz berdi");
      }
    } catch (err) {
      console.error("Tarmoq so'rovida xatolik:", err);
      setErrorMsg("Server bilan bog'lanib bo'lmadi");
    } finally {
      setLoading(false);
    }
  };

  // Yaratish yoki tahrirlash modalini ochish
  const openModal = (period = null) => {
    setErrorMsg("");
    if (period) {
      setEditingPeriod(period);
      setFormData({
        title: period.title || "",
        startDate: formatDateForInput(period.startDate),
        endDate: formatDateForInput(period.endDate),
        status: period.status || "draft"
      });
    } else {
      setEditingPeriod(null);
      setFormData({
        title: "",
        startDate: "",
        endDate: "",
        status: "draft"
      });
    }
    setIsModalOpen(true);
  };

  // 2. Formani yuborish (qo'shish yoki tahrirlash)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!formData.title || !formData.startDate || !formData.endDate) {
      setErrorMsg("Iltimos, barcha majburiy maydonlarni to'ldiring!");
      return;
    }

    try {
      let res;
      const headers = {
        'x-admin-token': localStorage.getItem("access_admin_token")
      };

      if (editingPeriod) {
        res = await axios.put(`${API_BASE}/editpr/${editingPeriod._id}`, formData, { headers });
      } else {
        res = await axios.post(`${API_BASE}/addpr`, formData, { headers });
      }

      if (res.data.ok) {
        setIsModalOpen(false);
        fetchPeriods();
      } else {
        setErrorMsg(res.data.msg || "Saqlashda xatolik yuz berdi");
      }
    } catch (err) {
        console.error(err);
        
      setErrorMsg(err.response?.data?.msg || "So'rovni qayta ishlashda xatolik yuz berdi!");
    }
  };

  // 3. Davrni o'chirish
  const handleDelete = async (id) => {
    if (!window.confirm("Haqiqatan ham ushbu davrni o'chirib tashlamoqchimisiz?")) return;

    try {
      const res = await axios.delete(`${API_BASE}/delpr/${id}`, {
        headers: {
          'x-admin-token': localStorage.getItem("access_admin_token")
        }
      });
      if (res.data.ok) {
        fetchPeriods();
      } else {
        alert(res.data.msg);
      }
    } catch (err) {
      alert("O'chirishda xatolik yuz berdi!",err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-4 sm:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Yuqori panel */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <FaLayerGroup className="text-blue-600" />
              Davrlarni Boshqarish (Admin)
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Stipendiya topshirish davrlarini yarating, tahrirlang va holatini boshqaring.
            </p>
          </div>

          <button
            onClick={() => openModal()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs px-5 py-3 rounded-2xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <FaPlus /> Yangi Davr Qo'shish
          </button>
        </div>

        {/* Davrlar ro'yxati */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-2 border-blue-600 border-t-transparent"></div>
          </div>
        ) : periods.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center text-slate-400 border border-slate-200">
            Hali hech qanday davr yaratilmagan.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {periods.map((period) => (
              <div
                key={period._id}
                className={`bg-white rounded-3xl border p-6 flex flex-col justify-between transition-all ${
                  period.status === "active"
                    ? "border-emerald-500 ring-2 ring-emerald-500/20 shadow-md"
                    : "border-slate-200 shadow-sm"
                }`}
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    {/* Holat nishoni */}
                    <span
                      className={`text-[10px] font-black uppercase px-3 py-1 rounded-full flex items-center gap-1.5 ${
                        period.status === "active"
                          ? "bg-emerald-100 text-emerald-700"
                          : period.status === "archived"
                          ? "bg-slate-100 text-slate-600"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {period.status === "active" && <FaCheckCircle />}
                      {period.status === "archived" && <FaArchive />}
                      {period.status === "active"
                        ? "Faol"
                        : period.status === "archived"
                        ? "Arxivlangan"
                        : "Qoralama"}
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openModal(period)}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all cursor-pointer"
                        title="Tahrirlash"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(period._id)}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
                        title="O'chirish"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 mb-3">
                    {period.title}
                  </h3>

                  {/* Sanalar */}
                  <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <FaCalendarAlt className="text-blue-500 shrink-0" />
                    <span>
                      {new Date(period.startDate).toLocaleDateString()} —{" "}
                      {new Date(period.endDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 text-[10px] text-slate-400 flex justify-between items-center">
                  <span>Yaratilgan sana: {new Date(period.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Yaratish / Tahrirlash modali */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
            <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-100 p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
              
              <div className="flex justify-between items-center border-b pb-4">
                <h2 className="text-lg font-black text-slate-900">
                  {editingPeriod ? "Davrni Tahrirlash" : "Yangi Davr Yaratish"}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600 p-2 rounded-xl"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Xatolik xabari */}
              {errorMsg && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3.5 rounded-2xl flex items-center gap-2">
                  <FaExclamationTriangle className="shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Sarlavha */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Davr Sarlavhasi *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Masalan: 2026 Kuzgi Semestr"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                {/* Sanalar */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Boshlanish Sanasi *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.startDate}
                      onChange={(e) =>
                        setFormData({ ...formData, startDate: e.target.value })
                      }
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Tugash Sanasi *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.endDate}
                      onChange={(e) =>
                        setFormData({ ...formData, endDate: e.target.value })
                      }
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>

                {/* Holat */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Holat
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="draft">Qoralama (Draft)</option>
                    <option value="active">Faol (Arizalar qabul qilinadi)</option>
                    <option value="archived">Arxivlangan (Archived)</option>
                  </select>
                </div>

                {/* Tugmalar */}
                <div className="flex justify-end gap-3 pt-4 border-t">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
                  >
                    Bekor qilish
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold shadow-sm flex items-center gap-2 cursor-pointer"
                  >
                    <FaSave />
                    Saqlash
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