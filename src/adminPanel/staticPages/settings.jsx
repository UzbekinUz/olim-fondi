import { useState } from "react";
import Profile from "./profile";
import Adminaria from "./adminaria";

function Settings({ adminInfo, setAdmin, handleRef }) {
  const [activeTab, setActiveTab] = useState("profile");

  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3500);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-4 sm:p-8 relative overflow-x-hidden font-sans">
      <style>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
        }
        .toast-glass {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
      `}</style>
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Sahifa sarlavhasi */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Tizim Sozlamalari
          </h1>
          <p className="text-sm text-slate-500 mt-1">Profil ma'lumotlarini boshqarish va xavfsizlik sozlamalari</p>
        </div>

        {/* Tab Menyu (Navigatsiya) */}
        <div className="flex space-x-2 border-b border-slate-200 mb-8 pb-px">
          <button
            onClick={() => setActiveTab("profile")}
            className={`py-2 px-4 text-sm font-semibold transition-all duration-200 border-b-2 focus:outline-none ${
              activeTab === "profile"
                ? "border-teal-500 text-teal-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Mening Profilim
          </button>

          {adminInfo?.role === "Editor" && (
            <button
              onClick={() => setActiveTab("admins")}
              className={`py-2 px-4 text-sm font-semibold transition-all duration-200 border-b-2 focus:outline-none ${
                activeTab === "admins"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              Adminlar Ro'yxati
            </button>
          )}
        </div>

        {/* --- 1-BO'LIM: PROFIL TAHRIRLASH --- */}
        {activeTab === "profile" && (
          <Profile adminInfo={adminInfo} setAdmin={setAdmin} handleRef={handleRef} addToast={addToast} />
        )}

        {/* --- 2-BO'LIM: ADMINLAR RO'YXATI (FAQAT EDITOR UCHUN) --- */}
        {activeTab === "admins" && adminInfo?.role === "Editor" && (
          <Adminaria adminInfo={adminInfo} addToast={addToast} activeTab={activeTab} />
        )}
      </div>

      {/* DYNAMIC TOASTS */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full px-4 sm:px-0">
        {toasts.map((toast) => {
          const isSuccess = toast.type === "success";
          return (
            <div
              key={toast.id}
              className={`flex items-center p-4 rounded-2xl shadow-xl border text-sm transition-all duration-300 toast-glass ${
                isSuccess ? "border-emerald-200 text-emerald-800" : "border-red-200 text-red-800"
              }`}
            >
              <div className="flex items-center w-full">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 shrink-0 ${isSuccess ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-600"}`}>
                  {isSuccess ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  )}
                </div>
                <div className="font-semibold">{toast.message}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Settings;