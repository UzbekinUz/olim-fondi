import { useState, useEffect } from "react";
import axios from "axios";
import {
  FaUser,
  FaLock,
  FaEdit,
  FaArchive,
  FaPlus,
  FaChevronLeft,
  FaChevronRight,
  FaList,
  FaCheckCircle,
  FaClock,
  FaTimes,
  FaSave,
} from "react-icons/fa";
import { API_LINK } from "../../cfg";
import GradeModel from "./gradeModel";
import ApplicationList from "./applicationList";

export default function DocumentManagement({ userRole,currentUser }) {
 const [loading, setLoading] = useState(false);

  // Filtrlar
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");

  // Davrlar (Periods) va Arizalar (Applications)
  const [periods, setPeriods] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [selectedPeriodIndex, setSelectedPeriodIndex] = useState(0);
  const [applications, setApplications] = useState([]);

  // Modallar
  const [selectedApp, setSelectedApp] = useState(null);
  const [grades, setGrades] = useState({});

  // Yangi davr yaratish modali uchun state
  const [isAddPeriodOpen, setIsAddPeriodOpen] = useState(false);
  const [newPeriodData, setNewPeriodData] = useState({
    title: "",
    startDate: "",
    endDate: "",
    status: "active",
  });

  // Token va Auth Header
  const token = localStorage.getItem("access_admin_token");
  const headers = { "x-admin-token": token };

  // ----------------------------------------------------
  // 1. DAVRLARNI BAZADAN OLISH
  // ----------------------------------------------------
  useEffect(() => {
    fetchPeriods();
  }, []);

  const fetchPeriods = async () => {
    try {
      const res = await axios.get(`${API_LINK}/period/getpr`, {
        headers,
      });
      if (res.data.ok) {
        const fetchedPeriods = res.data.data || [];
        setPeriods(fetchedPeriods);
        if (fetchedPeriods.length > 0) {
          setSelectedPeriod(fetchedPeriods[0]._id);
          setSelectedPeriodIndex(0);
        }
      }
    } catch (err) {
      console.error("Davrlarni yuklashda xatolik:", err);
    }
  };

  // ----------------------------------------------------
  // 2. ARIZALARNI BAZADAN OLISH
  // ----------------------------------------------------
  useEffect(() => {
    if (selectedPeriod) {
      fetchApplications();
    }
  }, [statusFilter, selectedPeriod]);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const bodyData = {};
      if (selectedPeriod) bodyData.periodId = selectedPeriod;
      if (statusFilter !== "all") bodyData.status = statusFilter;

      const res = await axios.post(
        `${API_LINK}/application/getallapplicationsfordmin`,
        bodyData,
        { headers }
      );

      if (res.data.ok) {
        const rawApps = res.data.data || [];

        const appsWithStudentDetails = await Promise.all(
          rawApps.map(async (app) => {
            const sId = app.studentId;
            if (!sId) return app;

            try {
              const stpRes = await axios.get(
                `${API_LINK}/stipendiat/getone/admin/${sId}`,
                { headers }
              );

              return {
                ...app,
                studentDetails: stpRes.data.data || stpRes.data,
              };
            } catch (err) {
              console.error(
                `Stipendiat (${sId}) ma'lumotini olishda xatolik:`,
                err
              );
              return app;
            }
          })
        );

        setApplications(appsWithStudentDetails);
      }
    } catch (err) {
      console.error("Arizalarni yuklashda xatolik:", err);
    } fontFinally: {
      setLoading(false);
    }
  };

  // ----------------------------------------------------
  // 3. DAVRLAR BILAN ISHLASH (CRUD)
  // ----------------------------------------------------
  const currentPeriod = periods[selectedPeriodIndex] || null;

  const handlePrevPeriod = () => {
    if (selectedPeriodIndex > 0) {
      const newIndex = selectedPeriodIndex - 1;
      setSelectedPeriodIndex(newIndex);
      setSelectedPeriod(periods[newIndex]._id);
    }
  };

  const handleNextPeriod = () => {
    if (selectedPeriodIndex < periods.length - 1) {
      const newIndex = selectedPeriodIndex + 1;
      setSelectedPeriodIndex(newIndex);
      setSelectedPeriod(periods[newIndex]._id);
    }
  };

  const handleCreatePeriodSubmit = async (e) => {
    e.preventDefault();
    if (userRole !== "Editor") return alert("Sizda ushbu huquq yo'q!");

    if (
      !newPeriodData.title ||
      !newPeriodData.startDate ||
      !newPeriodData.endDate
    ) {
      return alert("Iltimos, barcha maydonlarni to'ldiring!");
    }

    try {
      const res = await axios.post(
        `${API_LINK}/period/addpr`,
        {
          title: newPeriodData.title,
          startDate: newPeriodData.startDate,
          endDate: newPeriodData.endDate,
          status: newPeriodData.status,
        },
        { headers }
      );

      if (res.data.ok) {
        alert("Yangi davr muvaffaqiyatli yaratildi!");
        setIsAddPeriodOpen(false);
        setNewPeriodData({
          title: "",
          startDate: "",
          endDate: "",
          status: "active",
        });
        fetchPeriods();
      }
    } catch (err) {
      alert(err.response?.data?.msg || "Davr yaratishda xatolik!");
    }
  };

  const handleEditPeriod = async () => {
    if (userRole !== "Editor" || !currentPeriod) return;
    const newName = prompt("Davr nomini o'zgartiring:", currentPeriod.title);
    if (!newName) return;

    try {
      const res = await axios.put(
        `${API_LINK}/period/editpr/${currentPeriod._id}`,
        { title: newName },
        { headers }
      );
      if (res.data.ok) {
        alert("Davr nomi yangilandi!");
        fetchPeriods();
      }
    } catch (err) {
      alert(err.response?.data?.msg || "Tahrirlashda xatolik!");
    }
  };

  const handleArchivePeriod = async () => {
    if (userRole !== "Editor" || !currentPeriod) return;

    const isArchived = currentPeriod.status === "archived";
    const newStatus = isArchived ? "active" : "archived";
    const actionText = isArchived
      ? "arxivdan chiqarmoqchimisiz"
      : "arxivlamoqchimisiz";
    const successText = isArchived
      ? "Davr arxivdan chiqarildi!"
      : "Davr arxivlandi!";

    if (confirm(`"${currentPeriod.title}"ni ${actionText}?`)) {
      try {
        const res = await axios.put(
          `${API_LINK}/period/editpr/${currentPeriod._id}`,
          { status: newStatus },
          { headers }
        );

        if (res.data.ok) {
          alert(successText);
          fetchPeriods();
        }
      } catch (err) {
        alert(err.response?.data?.msg || "Amalni bajarishda xatolik!");
      }
    }
  };

  // ----------------------------------------------------
  // 4. ARIZALAR VA BAHOLASH (GRADES) BILAN ISHLASH
  // ----------------------------------------------------
  const handleDeleteApp = async (id) => {
    if (userRole !== "Editor") return;
    if (
      confirm(
        "Ushbu stipendiat fayllarini va arizasini o'chirishni tasdiqlaysizmi?"
      )
    ) {
      try {
        const res = await axios.delete(
          `${API_LINK}/application/deleteapplication/${id}`,
          { headers }
        );
        if (res.data.ok) {
          alert("Ariza o'chirildi!");
          fetchApplications();
        }
      } catch (err) {
        alert(err.response?.data?.msg || "O'chirishda xatolik!");
      }
    }
  };

  // Modal ochilganda ekspertning o'z avvalgi bahosini izlab topish mantiqi
  const handleOpenGradeModal = (app) => {
    setSelectedApp(app);
    const initialGrades = {};
    const expertIdentifier = currentUser || "expert";

    app.files?.forEach((f) => {
      // score massiv ekanligini va unda joriy ekspertning bahosi bor-yo'qligini tekshiramiz
      const myPreviousScoreObj = Array.isArray(f.score)
        ? f.score.find((s) => s.whomark === expertIdentifier)
        : null;

      initialGrades[f._id] = {
        score: myPreviousScoreObj ? myPreviousScoreObj.mark : "",
        adminComment: f.adminComment || "",
      };
    });
    setGrades(initialGrades);
  };

  const filteredApps = applications.filter((app) => {
    const studentName = (
      app.studentDetails?.fullName ||
      `${app.studentId?.name || ""} ${app.studentId?.surname || ""}` ||
      app.studentId?.username ||
      ""
    ).toLowerCase();

    return studentName.includes(search.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Banner */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 rounded-xl shadow-sm border border-slate-200 gap-3">
          <div>
            <h1 className="text-xl font-bold text-slate-800">
              Hujjatlar va Mezonlar Boshqaruvi
            </h1>
            <p className="text-xs text-slate-500">
              Stipendiatlar yuklagan fayllarni ko'rib chiqish va boshqarish
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700">
            <FaUser className="text-blue-600" /> Rolingiz:{" "}
            <span className="uppercase text-blue-700">{userRole}</span>
            {userRole === "Ekspert" && (
              <FaLock
                className="ml-1 text-amber-500"
                title="Cheklangan huquq"
              />
            )}
          </div>
        </div>

        {/* 1. NAVBAR SECTION */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
            {currentPeriod ? (
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  {currentPeriod.title}
                </span>

                {userRole === "Editor" && (
                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
                    <button
                      onClick={handleEditPeriod}
                      title="Davrni o'zgartirish"
                      className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-white rounded-md transition-all"
                    >
                      <FaEdit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleArchivePeriod}
                      title="Davrni arxivlash"
                      className="p-1.5 text-slate-600 hover:text-amber-600 hover:bg-white rounded-md transition-all"
                    >
                      <FaArchive className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <span className="text-sm font-semibold text-slate-400">
                Mavjud davr topilmadi
              </span>
            )}

            {userRole === "Editor" && (
              <button
                onClick={() => setIsAddPeriodOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all text-xs shadow-sm ml-2"
              >
                <FaPlus /> Yangi Davr
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <button
              onClick={handlePrevPeriod}
              disabled={selectedPeriodIndex === 0}
              className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <FaChevronLeft />
            </button>

            <select
              value={selectedPeriodIndex}
              onChange={(e) => {
                const index = Number(e.target.value);
                setSelectedPeriodIndex(index);
                if (periods[index]) setSelectedPeriod(periods[index]._id);
              }}
              className="border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {periods.map((p, idx) => (
                <option key={p._id || idx} value={idx}>
                  {p.title} ({p.status || "no-status"})
                </option>
              ))}
            </select>

            <button
              onClick={handleNextPeriod}
              disabled={selectedPeriodIndex === periods.length - 1}
              className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        {/* 2. FILTR BO'LIMLARI VA QIDIRUV */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
            <button
              onClick={() => setStatusFilter("all")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                statusFilter === "all"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              <FaList /> Hammasi
            </button>

            <button
              onClick={() => setStatusFilter("reviewed")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                statusFilter === "reviewed"
                  ? "bg-emerald-600 text-white shadow-md"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              <FaCheckCircle /> Baholangan
            </button>

            <button
              onClick={() => setStatusFilter("submitted")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                statusFilter === "submitted"
                  ? "bg-amber-500 text-white shadow-md"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              <FaClock /> Baholanmagan
            </button>
          </div>

          <div className="w-full sm:w-64">
            <input
              type="text"
              placeholder="Ism bo'yicha qidiruv..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* 3. ARIZALAR RO'YXATI */}
        <ApplicationList
          loading={loading}
          filteredApps={filteredApps}
          userRole={userRole}
          handleOpenGradeModal={handleOpenGradeModal}
          handleDeleteApp={handleDeleteApp}
          currentUserId={currentUser}
        />
      </div>

      {/* 4. YANGI DAVR YARATISH MODALI */}
      {isAddPeriodOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl border border-slate-100">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-800">
                Yangi Davr Yaratish
              </h3>
              <button
                onClick={() => setIsAddPeriodOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleCreatePeriodSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Davr Sarlavhasi (Title):
                </label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: 2026-I Chorak Stipendiyasi"
                  value={newPeriodData.title}
                  onChange={(e) =>
                    setNewPeriodData({
                      ...newPeriodData,
                      title: e.target.value,
                    })
                  }
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Boshlanish sanasi:
                  </label>
                  <input
                    type="date"
                    required
                    value={newPeriodData.startDate}
                    onChange={(e) =>
                      setNewPeriodData({
                        ...newPeriodData,
                        startDate: e.target.value,
                      })
                    }
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Tugash sanasi:
                  </label>
                  <input
                    type="date"
                    required
                    value={newPeriodData.endDate}
                    onChange={(e) =>
                      setNewPeriodData({
                        ...newPeriodData,
                        endDate: e.target.value,
                      })
                    }
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Holati (Status):
                </label>
                <select
                  value={newPeriodData.status}
                  onChange={(e) =>
                    setNewPeriodData({
                      ...newPeriodData,
                      status: e.target.value,
                    })
                  }
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="active">Active (Faol)</option>
                  <option value="draft">Pending (Kutilmoqda)</option>
                  <option value="archived">Completed (Tugallangan)</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddPeriodOpen(false)}
                  className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-all"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-sm"
                >
                  <FaSave /> Yaratish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. BAHOLASH MODALI */}
      {selectedApp && (
        <GradeModel
          selectedApp={selectedApp}
          grades={grades}
          setGrades={setGrades}
          headers={headers}
          setSelectedApp={setSelectedApp}
          fetchApplications={fetchApplications}
          userRole={userRole}
        />
      )}
    </div>
  );
}
