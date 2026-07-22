import axios from "axios";
import { Check, Eye, Mail, Phone, X, Search } from "lucide-react"; // Search ikonkasi qo'shildi
import { useState } from "react";
import { API_LINK } from "../cfg";

function Application({
  setSelectedApp,
  apps = [], // Bo'sh massiv default qiymat sifatida
  setRefresh,
  refresh,
  adminInfo,
}) {
  const [stat, setStat] = useState("pending");
  const [searchTerm, setSearchTerm] = useState(""); // Qidiruv so'zi uchun state
  const [loadingId, setLoadingId] = useState(null); // API so'rov bajarilayotganda bloklash uchun


  function ChangeStatus(id, newStat) {
    // Tizim holatiga qarab prompt sarlavhasini moslashtiramiz
    let actionText = "kutilayotgan holatga qaytarish";
    if (newStat === "approved") actionText = "qabul qilish";
    if (newStat === "rejected") actionText = "rad etish";

    // Foydalanuvchidan izoh so'raymiz
    const userComment = prompt(
      `Ariza holatini "${actionText.toUpperCase()}" o'zgartirmoqchisiz.\nUshbu qaror uchun izoh yoki sababni kiriting:`,
    );

    // Agar foydalanuvchi "Отмена" (Cancel) tugmasini bossa, funksiya to'xtaydi
    if (userComment === null) return;

    setLoadingId(id); // Yuklanishni boshlash

    axios
      .put(`${API_LINK}/apply/updatestatus`, {
        usernameId: id,
        status: newStat,
        comment: userComment,
        action: `Status changed to ${newStat} by ${adminInfo.username}`, // Izoh status bilan birga yuborilmoqda
      })
      .then(() => {
        setRefresh(!refresh);
      })
      .catch((err) => {
        console.error("Statusni yangilashda xatolik:", err);
      })
      .finally(() => {
        setLoadingId(null); // Yuklanishni tugatish
      });
  }

  // Massivni oldindan filtrlash (Status va Qidiruv so'zi bo'yicha)
  const filteredApps = apps.filter((app) => {
    const matchesStatus = stat === "all" || app.status === stat;

    const searchString =
      `${app.studentFullName || ""} ${app.universityName || ""} ${app.phoneNumber || ""} ${app.emailAddress || ""}`.toLowerCase();
    const matchesSearch = searchString.includes(searchTerm.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Filter paneli */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-3 lg:space-y-0 gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              Arizalar reyestri
            </h2>
            <p className="text-xs text-slate-500">
              Kelib tushgan barcha hujjatlarni saralashingiz, status bo'yicha
              tekshirishingiz mumkin.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center overflow-hidden overflow-x-auto">
            {/* Qidiruv inputi */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Qidirish (ism, oliygoh, tel...)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-indigo-500 focus:bg-white transition-all text-slate-700"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Filter tabs */}
            <div className="w-full max-w-xs self-start lg:self-auto relative group">
              <select
                value={stat}
                onChange={(e) => setStat(e.target.value)}
                /* appearance-none: brauzerning standart xunuk strelkasini o'chiradi 
      pr-10: o'ng tomondan matn biz qo'shadigan SVG ikonka ustiga chiqib ketmasligi uchun joy tashlaydi
    */
                className="w-full appearance-none p-3 pr-10 bg-white rounded-xl text-xs font-bold text-slate-700 border border-slate-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:border-slate-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none cursor-pointer transition-all duration-200"
              >
                {[
                  { id: "all", label: "Barchasi" },
                  { id: "pending", label: "Kutilmoqda" },
                  { id: "approved", label: "Qabul qilindi" },
                  { id: "rejected", label: "Rad etildi" },
                  { id: "resended", label: "Qayta yuborilgan" },
                ].map((tab) => (
                  <option
                    key={tab.id}
                    value={tab.id}
                    className="bg-white text-slate-700 py-2 font-medium"
                  >
                    {tab.label}
                  </option>
                ))}
              </select>

              {/* O'ng tomondagi maxsus chiroyli strelka (Ikonka) */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400 group-hover:text-slate-600 transition-colors">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Arizalar jadvali */}
      <div className="bg-none rounded-2xl  border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <div className="w-full text-left flex flex-col border-collapse min-w-80">
            <div className="text-sm divide-y divide-slate-100">
              {filteredApps.length === 0 ? (
                <div>
                  <div colSpan="6" className="py-8 text-center text-slate-400">
                    Ma'lumotlar topilmadi
                  </div>
                </div>
              ) : (
                filteredApps.map((app) => (
                  <div
                    key={app.usernameId}
                    className="hover:bg-slate-50/70 min-w-120 relative pt-2 transition-colors shadow-sm border-none my-6 rounded-2xl bg-white"
                  >
                    <div className="flex  items-center justify-between gap-4">
                      <div className="py-4 px-6">
                        <div className="font-semibold text-slate-800">
                          {app.studentFullName}
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5">
                          {app.nationality} | {app.birthDate}
                        </div>
                      </div>
                      <div className="py-4 px-6">
                        <div className="text-slate-700 font-medium">
                          {app.universityName}
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5">
                          {app.studyForm} • {app.studyField} •{" "}
                          <span className="text-slate-600 font-bold">
                            {app.currentCourse}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex  items-center justify-between gap-4">
                      <div className="py-4 px-6 text-left flex flex-col items-start">
                        <div className="text-[12px] mb-1">
                          {app.action || "T"}
                        </div>
                        <div className="inline-flex rounded-lg shadow-sm border border-slate-200 overflow-hidden bg-white">
                          <button
                            onClick={() => setSelectedApp(app)}
                            disabled={loadingId === app.usernameId}
                            className="px-3 py-2 bg-slate-50 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 border-r border-slate-200 text-xs font-bold transition-colors flex items-center gap-1 disabled:opacity-50"
                          >
                            <Eye className="w-3.5 h-3.5" /> Batafsil
                          </button>
                          {app.status === "pending"|| app.status === "resended" ? (
                            <>
                              <button
                                onClick={() =>
                                  ChangeStatus(app.usernameId, "approved")
                                }
                                disabled={loadingId === app.usernameId}
                                className="px-2 py-2 bg-emerald-50/50 hover:bg-emerald-500 text-emerald-600 hover:text-white border-r border-slate-200 transition-colors disabled:opacity-50"
                                title="Tasdiqlash"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() =>
                                  ChangeStatus(app.usernameId, "rejected")
                                }
                                disabled={loadingId === app.usernameId}
                                className="px-2 py-2 bg-rose-50/50 hover:bg-rose-500 text-rose-600 hover:text-white transition-colors disabled:opacity-50"
                                title="Rad etish"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() =>
                                ChangeStatus(app.usernameId, "pending")
                              }
                              disabled={loadingId === app.usernameId}
                              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold transition-colors disabled:opacity-50"
                            >
                              Qaytarish
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="py-4 px-6">
                        <div className="text-slate-700 text-xs font-semibold flex items-center gap-1">
                          <Phone className="w-3.5 h-3.5 text-slate-400" />{" "}
                          {app.phoneNumber}
                        </div>
                        <div className="text-xs text-indigo-600 font-mono mt-0.5 flex items-center gap-1">
                          <Mail className="w-3.5 h-3.5 text-slate-400" />{" "}
                          {app.emailAddress}
                        </div>
                      </div>
                      <div className="py-4 px-6 absolute -top-7 ">
                        <span className="inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-semibold bg-white text-slate-700  border-none">
                          <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-1.5"></span>
                          {app.createdAt
                            ? new Date(app.createdAt)
                                .toLocaleString("uz-UZ", {
                                  day: "2-digit",
                                  month: "2-digit",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: false,
                                })
                                .replace(/\//g, ".")
                            : "N/A"}
                        </span>
                      </div>
                      <div className="py-4 px-6 absolute -top-7 left-45">
                        {app.status === "pending" && (
                          <span className="inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-semibold bg-white text-amber-700 border-none">
                            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-1.5"></span>
                            Kutilmoqda
                          </span>
                        )}
                        {app.status === "approved" && (
                          <span className="inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-semibold bg-white text-emerald-700 ">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5"></span>
                            Qabul qilindi
                          </span>
                        )}
                        {app.status === "rejected" && (
                          <span className="inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-semibold bg-white text-rose-700 ">
                            <span className="w-1.5 h-1.5 bg-rose-500 rounded-full mr-1.5"></span>
                            Rad etildi
                          </span>
                        )}
                        {app.status === "resended" && (
                          <span className="inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-semibold bg-white text-slate-700 ">
                            <span className="w-1.5 h-1.5 bg-slate-500 rounded-full mr-1.5"></span>
                            Qayta yuborilgan
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Application;
