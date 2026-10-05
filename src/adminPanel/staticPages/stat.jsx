import { useState, useEffect } from "react";
import axios from "axios";
import { API_LINK } from "../cfg";

// Lucide-React ikonkalarini import qilish
import { Plus, Edit3, Trash2, X, Save, PieChart, Trophy } from "lucide-react";
import StatCharts from "../components/statCharts";

function Stat() {
  const [activeTab, setActiveTab] = useState("growth"); // 'growth' | 'parts' | 'achivment'
  const [loading, setLoading] = useState(false);

  // Data states
  const [growthData, setGrowthData] = useState([]);
  const [partsData, setPartsData] = useState([]);
  const [achivmentData, setAchivmentData] = useState([]);

  // Modal / Form states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Form input states
  const [formGrowth, setFormGrowth] = useState({ year: "", amount: "" });
  const [formParts, setFormParts] = useState({
    year: "",
    first: "",
    second: "",
    third: "",
    amount: "",
  });
  const [formAchivment, setFormAchivment] = useState({ name: "", amount: "" });

  // Admin token
  const getAuthHeaders = () => ({
    headers: { "x-admin-token": localStorage.getItem("access_admin_token") },
  });

  // --- API FETCHERS ---
  const fetchGrowth = async () => {
    try {
      const res = await axios.get(`${API_LINK}/sitesettings/getallstat1`);
      if (res.data.ok) setGrowthData(res.data.data || []);
    } catch (err) {
      console.error("Growth yuklashda xatolik:", err);
    }
  };

  const fetchParts = async () => {
    try {
      const res = await axios.get(`${API_LINK}/sitesettings/getallstat2`);
      if (res.data.ok) setPartsData(res.data.data || []);
    } catch (err) {
      console.error("Parts yuklashda xatolik:", err);
    }
  };

  const fetchAchivments = async () => {
    try {
      const res = await axios.get(`${API_LINK}/sitesettings/getallstat3`);
      if (res.data.ok) setAchivmentData(res.data.data || []);
      console.log(res.data);
    } catch (err) {
      console.error("Achivments yuklashda xatolik:", err);
    }
  };

  useEffect(() => {
    fetchGrowth();
    fetchParts();
    fetchAchivments();
  }, []);

  // --- FORM HANDLERS ---
  const resetForms = () => {
    setFormGrowth({ year: "", amount: "" });
    setFormParts({ year: "", first: "", second: "", third: "", amount: "" });
    setFormAchivment({ name: "", amount: "" });
    setEditingId(null);
    setIsModalOpen(false);
  };

  const handleOpenAddModal = () => {
    resetForms();
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item) => {
    setEditingId(item._id);
    if (activeTab === "growth") {
      setFormGrowth({ year: item.year, amount: item.amount });
    } else if (activeTab === "parts") {
      setFormParts({
        year: item.year,
        first: item.first || "",
        second: item.second || "",
        third: item.third || "",
        amount: item.amount || "",
      });
    } else if (activeTab === "achivment") {
      setFormAchivment({ name: item.name, amount: item.amount });
    }
    setIsModalOpen(true);
  };

  // --- SUBMIT (ADD / EDIT) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let url = "";
    let payload = {};
    let num = "";

    if (activeTab === "growth") {
      url = `${API_LINK}/sitesettings`;
      payload = formGrowth;
      num = "1";
    } else if (activeTab === "parts") {
      url = `${API_LINK}/sitesettings`;
      payload = formParts;
      num = "2";
    } else if (activeTab === "achivment") {
      url = `${API_LINK}/sitesettings`;
      payload = formAchivment;
      num = "3";
    }

    try {
      let res;
      if (editingId) {
        // Edit request
        res = await axios.put(
          `${url}/editstat${num}/${editingId}`,
          payload,
          getAuthHeaders(),
        );
      } else {
        // Add request
        res = await axios.post(
          `${url}/addstat${num}`,
          payload,
          getAuthHeaders(),
        );
      }

      if (res.data.ok) {
        alert(res.data.msg || "Muvaffaqiyatli bajarildi!");
        resetForms();
        if (activeTab === "growth") fetchGrowth();
        if (activeTab === "parts") fetchParts();
        if (activeTab === "achivment") fetchAchivments();
      } else {
        alert(res.data.msg || "Xatolik yuz berdi!");
      }
    } catch (err) {
      console.error("Saqlashda xatolik:", err);
      alert("Server bilan bog'lanishda xatolik!");
    } finally {
      setLoading(false);
    }
  };

  // --- DELETE HANDLER ---
  const handleDelete = async (id) => {
    if (!window.confirm("Haqiqatdan ham ushbu ma'lumotni o'chirmoqchimisiz?"))
      return;

    let url = "";
    if (activeTab === "growth") url = "1";
    if (activeTab === "parts") url = "2";
    if (activeTab === "achivment") url = "3";

    try {
      const res = await axios.delete(
        `${API_LINK}/sitesettings/deletestat${url}/${id}`,
        getAuthHeaders(),
      );
      if (res.data.ok) {
        alert(res.data.msg || "O'chirildi!");
        if (activeTab === "growth") fetchGrowth();
        if (activeTab === "parts") fetchParts();
        if (activeTab === "achivment") fetchAchivments();
      } else {
        alert(res.data.msg || "O'chirishda xatolik!");
      }
    } catch (err) {
      console.error("O'chirishda xatolik:", err);
      alert("Serverda xatolik yuz berdi!");
    }
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Sarlavha va Tablar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-2xl font-black text-slate-800">
              Statistika Boshqaruvi
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Yillar bo'yicha o'sish, ulushlar va erishilgan yutuqlar
            </p>
          </div>

          <button
            onClick={handleOpenAddModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-md hover:shadow-blue-200"
          >
            <Plus className="w-5 h-5" />
            <span>Yangi qo'shish</span>
          </button>
        </div>

        {/* Tab Tugmalari */}
        <div className="flex border-b border-slate-200 bg-white px-4 pt-3 rounded-xl border">
          <button
            onClick={() => setActiveTab("parts")}
            className={`flex items-center gap-2 px-6 py-3 font-bold text-sm border-b-2 transition-colors ${
              activeTab === "parts"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <PieChart className="w-4 h-4" />
            StatParts (Qismlar)
          </button>

          <button
            onClick={() => setActiveTab("achivment")}
            className={`flex items-center gap-2 px-6 py-3 font-bold text-sm border-b-2 transition-colors ${
              activeTab === "achivment"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Trophy className="w-4 h-4" />
            Achivments (Yutuqlar)
          </button>
        </div>

        {/* JADVALLAR BO'LIMI */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* TAB 2: StatParts */}
          {activeTab === "parts" && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-wider">
                    <th className="p-4">#</th>
                    <th className="p-4">Yil</th>
                    <th className="p-4">1-qism (First)</th>
                    <th className="p-4">2-qism (Second)</th>
                    <th className="p-4">3-qism (Third)</th>
                    <th className="p-4">Jami (Amount)</th>
                    <th className="p-4 text-right">Amallar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                  {partsData.length === 0 ? (
                    <tr>
                      <td
                        colSpan="7"
                        className="text-center p-6 text-slate-400"
                      >
                        Ma'lumot topilmadi
                      </td>
                    </tr>
                  ) : (
                    partsData.map((item, index) => (
                      <tr
                        key={item._id}
                        className="hover:bg-slate-50 transition-colors"
                      >
                        <td className="p-4 font-semibold text-slate-400">
                          {index + 1}
                        </td>
                        <td className="p-4 font-bold text-slate-800">
                          {item.year}
                        </td>
                        <td className="p-4">{item.first}</td>
                        <td className="p-4">{item.second}</td>
                        <td className="p-4">{item.third}</td>
                        <td className="p-4 font-bold text-emerald-600">
                          {item.amount}
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <button
                            onClick={() => handleOpenEditModal(item)}
                            className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors inline-block"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors inline-block"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 3: Achivment */}
          {activeTab === "achivment" && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-wider">
                    <th className="p-4">#</th>
                    <th className="p-4">Yutuq nomi (Name)</th>
                    <th className="p-4">Miqdor (Amount)</th>
                    <th className="p-4 text-right">Amallar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                  {achivmentData.length === 0 ? (
                    <tr>
                      <td
                        colSpan="4"
                        className="text-center p-6 text-slate-400"
                      >
                        Ma'lumot topilmadi
                      </td>
                    </tr>
                  ) : (
                    achivmentData.map((item, index) => (
                      <tr
                        key={item._id}
                        className="hover:bg-slate-50 transition-colors"
                      >
                        <td className="p-4 font-semibold text-slate-400">
                          {index + 1}
                        </td>
                        <td className="p-4 font-bold text-slate-800">
                          {item.name}
                        </td>
                        <td className="p-4 font-extrabold text-amber-500">
                          {item.amount}
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <button
                            onClick={() => handleOpenEditModal(item)}
                            className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors inline-block"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors inline-block"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <StatCharts
          growthData={growthData}
          achivmentData={achivmentData}
          partsData={partsData}
        />
      </div>

      {/* --- ADD / EDIT MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative border border-slate-100">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-5 border-b pb-3">
              <h3 className="text-lg font-bold text-slate-800">
                {editingId
                  ? "Ma'lumotni tahrirlash"
                  : "Yangi ma'lumot qo'shish"}
              </h3>
              <button
                onClick={resetForms}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* StatGrowth Form */}
              {activeTab === "growth" && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">
                      Yil (Year)
                    </label>
                    <input
                      type="number"
                      required
                      value={formGrowth.year}
                      onChange={(e) =>
                        setFormGrowth({ ...formGrowth, year: e.target.value })
                      }
                      placeholder="Masalan: 2024"
                      className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">
                      Miqdor (Amount)
                    </label>
                    <input
                      type="number"
                      required
                      value={formGrowth.amount}
                      onChange={(e) =>
                        setFormGrowth({ ...formGrowth, amount: e.target.value })
                      }
                      placeholder="Masalan: 1500"
                      className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </>
              )}

              {/* StatParts Form */}
              {activeTab === "parts" && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">
                      Yil (Year)
                    </label>
                    <input
                      type="number"
                      required
                      value={formParts.year}
                      onChange={(e) =>
                        setFormParts({ ...formParts, year: e.target.value })
                      }
                      placeholder="Masalan: 2024"
                      className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">
                        1-Qism
                      </label>
                      <input
                        type="number"
                        value={formParts.first}
                        onChange={(e) =>
                          setFormParts({ ...formParts, first: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">
                        2-Qism
                      </label>
                      <input
                        type="number"
                        value={formParts.second}
                        onChange={(e) =>
                          setFormParts({ ...formParts, second: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">
                        3-Qism
                      </label>
                      <input
                        type="number"
                        value={formParts.third}
                        onChange={(e) =>
                          setFormParts({ ...formParts, third: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">
                      Jami Miqdor (Amount)
                    </label>
                    <input
                      type="number"
                      value={formParts.amount}
                      onChange={(e) =>
                        setFormParts({ ...formParts, amount: e.target.value })
                      }
                      placeholder="Masalan: 500"
                      className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </>
              )}

              {/* Achivment Form */}
              {activeTab === "achivment" && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">
                      Yutuq nomi (Name)
                    </label>
                    <input
                      type="text"
                      required
                      value={formAchivment.name}
                      onChange={(e) =>
                        setFormAchivment({
                          ...formAchivment,
                          name: e.target.value,
                        })
                      }
                      placeholder="Masalan: Xalqaro sertifikatlar"
                      className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">
                      Miqdor (Amount)
                    </label>
                    <input
                      type="number"
                      required
                      value={formAchivment.amount}
                      onChange={(e) =>
                        setFormAchivment({
                          ...formAchivment,
                          amount: e.target.value,
                        })
                      }
                      placeholder="Masalan: 50"
                      className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </>
              )}

              {/* Modal Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t mt-6">
                <button
                  type="button"
                  onClick={resetForms}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-semibold text-sm"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-md flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>{loading ? "Saqlanmoqda..." : "Saqlash"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Stat;
