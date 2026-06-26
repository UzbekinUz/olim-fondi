import axios from "axios";
import {
  Check,
  Eye,
  FlaskConical,
  Mail,
  Phone,
  X,
} from "lucide-react";
import { useState } from "react";
import { API_LINK } from "../cfg";

function Application({
  setSelectedApp,
  apps = [], // Bo'sh massiv default qiymat sifatida
  setRefresh,
  refresh
}) {
  const [stat, setStat] = useState("all");
  const [loadingId, setLoadingId] = useState(null); // API so'rov bajarilayotganda bloklash uchun

  function ChangeStatus(id, newStat) {
    setLoadingId(id); // Yuklanishni boshlash
    axios
      .put(`${API_LINK}/apply/updatestatus`, { usernameId: id, status: newStat })
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

  // Massivni oldindan filtrlash (Samaradorlik va to'g'ri HTML tuzilishi uchun)
  const filteredApps = apps.filter(
    (app) => stat === "all" || app.status === stat
  );

  return (
    <div className="space-y-6">
      {/* Filter paneli */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-3 lg:space-y-0">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              Arizalar reyestri
            </h2>
            <p className="text-xs text-slate-500">
              Kelib tushgan barcha hujjatlarni saralashingiz, status bo'yicha
              tekshirishingiz mumkin.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex p-1 bg-slate-100 rounded-xl space-x-1 text-xs font-semibold text-slate-600 border border-slate-200 max-w-max">
            {[
              { id: "all", label: "Barchasi" },
              { id: "pending", label: "Kutilmoqda" },
              { id: "approved", label: "Qabul qilindi" },
              { id: "rejected", label: "Rad etildi" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setStat(tab.id)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  stat === tab.id
                    ? "bg-white text-indigo-700 shadow-sm"
                    : "hover:text-slate-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Arizalar jadvali */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[950px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                <th className="py-4 px-6">Talaba (F.I.SH)</th>
                <th className="py-4 px-6">Universitet va Kurs</th>
                <th className="py-4 px-6">Bog'lanish</th>
                <th className="py-4 px-6">Tadqiqot</th>
                <th className="py-4 px-6">Holat</th>
                <th className="py-4 px-6 text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-slate-100">
              {filteredApps.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-slate-400">
                    Ma'lumotlar topilmadi
                  </td>
                </tr>
              ) : (
                filteredApps.map((app) => (
                  <tr
                    key={app.usernameId}
                    className="hover:bg-slate-50/70 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="font-semibold text-slate-800">
                        {app.studentFullName}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        {app.nationality} | {app.birthDate}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-slate-700 font-medium">
                        {app.universityName}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        {app.studyForm} • {app.studyField} •{" "}
                        <span className="text-slate-600 font-bold">
                          {app.currentCourse}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-slate-700 text-xs font-semibold flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />{" "}
                        {app.phoneNumber}
                      </div>
                      <div className="text-xs text-indigo-600 font-mono mt-0.5 flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />{" "}
                        {app.emailAddress}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      {app.isDoingResearch ? (
                        <span className="inline-flex items-center gap-0.5 bg-indigo-50 text-indigo-600 font-bold text-[10px] px-2 py-1 rounded border border-indigo-100">
                          <FlaskConical className="w-3.5 h-3.5" /> Tadqiqotchi
                        </span>
                      ) : (
                        <span className="text-slate-400 text-xs">-</span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      {app.status === "pending" && (
                        <span className="inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                          <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-1.5"></span>
                          Kutilmoqda
                        </span>
                      )}
                      {app.status === "approved" && (
                        <span className="inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5"></span>
                          Qabul qilindi
                        </span>
                      )}
                      {app.status === "rejected" && (
                        <span className="inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                          <span className="w-1.5 h-1.5 bg-rose-500 rounded-full mr-1.5"></span>
                          Rad etildi
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="inline-flex rounded-lg shadow-sm border border-slate-200 overflow-hidden bg-white">
                        <button
                          onClick={() => setSelectedApp(app)}
                          disabled={loadingId === app.usernameId}
                          className="px-3 py-2 bg-slate-50 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 border-r border-slate-200 text-xs font-bold transition-colors flex items-center gap-1 disabled:opacity-50"
                        >
                          <Eye className="w-3.5 h-3.5" /> Batafsil
                        </button>
                        {app.status === "pending" ? (
                          <>
                            <button
                              onClick={() => ChangeStatus(app.usernameId, "approved")}
                              disabled={loadingId === app.usernameId}
                              className="px-2 py-2 bg-emerald-50/50 hover:bg-emerald-500 text-emerald-600 hover:text-white border-r border-slate-200 transition-colors disabled:opacity-50"
                              title="Tasdiqlash"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => ChangeStatus(app.usernameId, "rejected")}
                              disabled={loadingId === app.usernameId}
                              className="px-2 py-2 bg-rose-50/50 hover:bg-rose-500 text-rose-600 hover:text-white transition-colors disabled:opacity-50"
                              title="Rad etish"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => ChangeStatus(app.usernameId, "pending")}
                            disabled={loadingId === app.usernameId}
                            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold transition-colors disabled:opacity-50"
                          >
                            Qaytarish
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Application;