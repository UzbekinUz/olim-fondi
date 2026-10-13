import React from "react";
import {
  FaUserCog,
  FaFileAlt,
  FaSignOutAlt,
  FaUserCircle,
  FaCheckCircle,
  FaClock,
  FaLock,
  FaExclamationCircle,
} from "react-icons/fa";

function UpperPanel({ stpdata = {}, handleLogout, setActivePage, activePage, full }) {
  // Status ranglari va ikonkalari
  const getStatusBadge = (status) => {
    const st = status?.toLowerCase() || "";
    if (st === "faol" || st === "active" || st === "tasdiqlandi") {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200/80 rounded-full text-xs font-bold uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <FaCheckCircle className="text-emerald-500 text-xs" />
          {status}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200/80 rounded-full text-xs font-bold uppercase tracking-wider">
        <FaClock className="text-amber-500 text-xs" />
        {status || "Kutilmoqda"}
      </span>
    );
  };

  return (
    <div className="bg-white/80 backdrop-blur-md p-4 sm:p-5 rounded-3xl border border-slate-200/80 shadow-xs mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all duration-300">
      
      {/* Chap taraf: Foydalanuvchi va profil haqida qisqacha */}
      <div className="flex items-center gap-3.5">
        <div className="p-3 bg-gradient-to-tr from-blue-600 to-indigo-500 text-white rounded-2xl shadow-md shadow-blue-500/20 shrink-0">
          <FaUserCircle className="text-2xl" />
        </div>
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-lg sm:text-xl font-black text-slate-800 tracking-tight">
              Stipendiat Kabineti
            </h1>
            {getStatusBadge(stpdata.status)}
          </div>
          <p className="text-slate-500 text-xs mt-0.5 flex items-center gap-1">
            Login:{" "}
            <span className="font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
              @{stpdata.login || "stipendiat"}
            </span>
          </p>
        </div>
      </div>

      {/* O'ng taraf: Navigatsiya Tablari va Chiqish tugmasi */}
      <div className="flex flex-col items-end w-full md:w-auto gap-2">
        <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
          
          {/* Segmented Control Switcher */}
          <div className="bg-slate-100/80 p-1 rounded-2xl flex items-center border border-slate-200/60 shadow-inner">
            <button
              type="button"
              disabled={!full}
              onClick={() => setActivePage("ariza")}
              title={
                !full
                  ? "Arizaga o'tish uchun profil ma'lumotlari va hujjatlarni to'liq to'ldiring!"
                  : "Mening a'rizam"
              }
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 relative ${
                !full
                  ? "opacity-60 cursor-not-allowed text-slate-400 bg-slate-200/50"
                  : activePage === "ariza"
                  ? "bg-white text-blue-600 shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {!full ? (
                <FaLock className="text-amber-500 text-xs" />
              ) : (
                <FaFileAlt className="text-xs" />
              )}
              <span>Mening a'rizam</span>
            </button>

            <button
              type="button"
              onClick={() => setActivePage("profil")}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                activePage === "profil"
                  ? "bg-white text-blue-600 shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <FaUserCog className="text-xs" />
              <span>Profil sozlamalari</span>
            </button>
          </div>

          {/* Chiqish Tugmasi */}
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200/80 rounded-2xl text-xs font-bold transition-all duration-200 active:scale-95 shrink-0 cursor-pointer"
            title="Tizimdan chiqish"
          >
            <FaSignOutAlt />
            <span className="hidden sm:inline">Chiqish</span>
          </button>
        </div>

        {/* PROFIL TO'LIQ BO'LMAGANDA CHIQADIGAN WARNING BADGE */}
        {!full && (
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-700 bg-amber-50 border border-amber-200/80 px-3 py-1 rounded-xl animate-fade-in">
            <FaExclamationCircle className="text-amber-500 shrink-0" />
            <span>
              Arizani ko'rish uchun profil va hujjatlarni to'liq to'ldiring!
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default UpperPanel;