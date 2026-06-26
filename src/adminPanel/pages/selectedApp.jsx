import { useState } from "react"; // Loading holati uchun yuklandi
import {
  Briefcase,
  Download,
  FileText,
  FlaskConical,
  GraduationCap,
  Home,
  User,
  Users,
  X,
} from "lucide-react";
import { API_LINK, SITE_LINK } from "../cfg";
import axios from "axios";

function SelectedApp({
  setSelectedApp,
  selectedApp,
  triggerToast,
  refresh,
  setRefresh,
}) {
  // So'rov ketayotganda tugmalarni bloklash va loading ko'rsatish uchun state
  const [loading, setLoading] = useState(false);

  function handleStatusChange(id, stat) {
    if (loading) return; // Agar so'rov ketayotgan bo'lsa, qayta bosishni oldini oladi
    setLoading(true);

    axios
      .put(`${API_LINK}/apply/updatestatus`, { usernameId: id, status: stat })
      .then(() => {
        setRefresh(!refresh);
        setSelectedApp(null); // Muvaffaqiyatli yakunlangach modalni yopish
      })
      .catch((err) => {
        console.error("Xatolik yuz berdi:", err);
        // Bu yerda xohlasangiz triggerToast orqali xatolikni chiqarishingiz mumkin
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-3xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full border border-slate-100">
          {/* Header */}
          <div className="bg-linear-to-r from-slate-900 to-indigo-950 px-6 py-5 text-white flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold">Ariza tafsilotlari</h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Yuborilgan barcha shaxsiy va akademik hujjatlar ro'yxati
              </p>
            </div>
            <button
              onClick={() => setSelectedApp(null)}
              disabled={loading}
              className="text-slate-400 hover:text-white transition-colors disabled:opacity-50"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Body */}
          <div className="max-h-[65vh] overflow-y-auto p-6 space-y-8 bg-slate-50">
            {/* Status Indicator Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center space-x-3">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Ariza holati:
                </span>
                {selectedApp.status === "pending" && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                    Tekshirilmoqda
                  </span>
                )}
                {selectedApp.status === "approved" && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                    Qabul qilingan
                  </span>
                )}
                {selectedApp.status === "rejected" && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800">
                    Rad etilgan
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2">
                {selectedApp.status === "pending" ? (
                  <>
                    <button
                      onClick={() =>
                        handleStatusChange(selectedApp.usernameId, "rejected")
                      }
                      disabled={loading}
                      className="bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-semibold px-3 py-1.5 rounded-lg border border-rose-200 transition-colors disabled:opacity-50"
                    >
                      {loading ? "Kutilmoqda..." : "Rad etish"}
                    </button>
                    <button
                      onClick={() =>
                        handleStatusChange(selectedApp.usernameId, "approved")
                      }
                      disabled={loading}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow transition-colors disabled:opacity-50"
                    >
                      {loading ? "Kutilmoqda..." : "Qabul qilish"}
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() =>
                      handleStatusChange(selectedApp.usernameId, "pending")
                    }
                    disabled={loading}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 transition-colors disabled:opacity-50"
                  >
                    {loading ? "Kutilmoqda..." : "Kutilayotgan holatga qaytarish"}
                  </button>
                )}
              </div>
            </div>

            {/* Section 1: Shaxsiy Ma'lumotlar */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 flex items-center gap-1.5">
                <User className="w-4 h-4" /> Shaxsiy ma'lumotlar
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div>
                  <label className="text-xs font-medium text-slate-400">
                    To'liq ismi-sharifi (F.I.SH):
                  </label>
                  <p className="text-sm font-semibold text-slate-800 mt-0.5">
                    {selectedApp.studentFullName}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-400">
                    Tug'ilgan sanasi:
                  </label>
                  <p className="text-sm font-semibold text-slate-800 mt-0.5">
                    {selectedApp.birthDate}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-400">
                    Fuqaroligi:
                  </label>
                  <p className="text-sm font-semibold text-slate-800 mt-0.5">
                    {selectedApp.nationality}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-400">
                    Doimiy yashash manzili:
                  </label>
                  <p className="text-sm font-semibold text-slate-800 mt-0.5">
                    {selectedApp.permanentAddress}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-400">
                    Telefon raqami:
                  </label>
                  <p className="text-sm font-semibold text-slate-800 mt-0.5">
                    {selectedApp.phoneNumber}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-400">
                    E-pochta manzili:
                  </label>
                  <p className="text-sm font-semibold text-indigo-600 mt-0.5 font-mono">
                    {selectedApp.emailAddress}
                  </p>
                </div>
              </div>
            </div>

            {/* Section 2: O'qish Ma'lumotlari */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4" /> O'qish joyi va Akademik faoliyat
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="md:col-span-2">
                  <label className="text-xs font-medium text-slate-400">
                    Oliy ta'lim muassasasi (Universitet) nomi:
                  </label>
                  <p className="text-sm font-semibold text-slate-800 mt-0.5">
                    {selectedApp.universityName}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-400">
                    O'qish shakli:
                  </label>
                  <p className="text-sm font-semibold text-slate-800 mt-0.5">
                    {selectedApp.studyForm}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-400">
                    Ta'lim yo'nalishi / Mutaxassislik:
                  </label>
                  <p className="text-sm font-semibold text-slate-800 mt-0.5">
                    {selectedApp.studyField}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-400">
                    Hozirgi bosqich (Kurs):
                  </label>
                  <p className="text-sm font-semibold text-slate-800 mt-0.5">
                    {selectedApp.currentCourse}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-400">
                    Yillik shartnoma (Kontrakt) summasi:
                  </label>
                  <p className="text-sm font-semibold text-slate-800 mt-0.5">
                    {selectedApp.contractAmount} UZS
                  </p>
                </div>
              </div>
            </div>

            {/* Section 3: Ilmiy va grant faoliyati */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 flex items-center gap-1.5">
                <FlaskConical className="w-4 h-4" /> Ilmiy salohiyat va grantlar
              </h4>
              <div className="grid grid-cols-1 gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="border-b border-slate-100 pb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-700">
                      Ilmiy tadqiqot olib boryaptimi?
                    </span>
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-bold ${selectedApp.isDoingResearch ? "bg-indigo-100 text-indigo-800" : "bg-slate-100 text-slate-500"}`}
                    >
                      {selectedApp.isDoingResearch ? "Ha" : "Yo'q"}
                    </span>
                  </div>
                  {selectedApp.isDoingResearch && (
                    <div className="mt-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <label className="text-[10px] text-slate-400 font-bold uppercase block">
                        Tadqiqot tafsilotlari:
                      </label>
                      <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                        {selectedApp.researchDetails}
                      </p>
                    </div>
                  )}
                </div>

                <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-700">
                    Konferensiyalarda ishtirok etganmi?
                  </span>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-bold ${selectedApp.hasConferenceParticipation ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-500"}`}
                  >
                    {selectedApp.hasConferenceParticipation ? "Ha" : "Yo'q"}
                  </span>
                </div>

                <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-700">
                    Ilmiy jurnallarda maqolalari chop etilganmi?
                  </span>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-bold ${selectedApp.hasPublications ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-500"}`}
                  >
                    {selectedApp.hasPublications ? "Ha" : "Yo'q"}
                  </span>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-700">
                      Oldin ushbu jamg'arma grantlaridan foydalanganmi?
                    </span>
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-bold ${selectedApp.usedPreviousGrants ? "bg-indigo-100 text-indigo-800" : "bg-slate-100 text-slate-500"}`}
                    >
                      {selectedApp.usedPreviousGrants ? "Ha" : "Yo'q"}
                    </span>
                  </div>
                  {selectedApp.usedPreviousGrants && (
                    <div className="mt-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <label className="text-[10px] text-slate-400 font-bold uppercase block">
                        Avvalgi grant tafsilotlari:
                      </label>
                      <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                        {selectedApp.previousGrantDetails}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Section 4: Oila Ma'lumotlari */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 flex items-center gap-1.5">
                <Users className="w-4 h-4" /> Oila a'zolari to'g'risida ma'lumot
              </h4>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Father Card */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                    <h5 className="font-bold text-sm text-slate-800 border-b border-slate-100 pb-2 flex items-center gap-1.5">
                      <Briefcase className="w-4 h-4 text-slate-400" /> Otasi
                    </h5>
                    <div>
                      <label className="text-[10px] font-medium text-slate-400">
                        F.I.SH:
                      </label>
                      <p className="text-xs font-semibold text-slate-800">
                        {selectedApp.fatherFullName || "Kiritilmagan"}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] font-medium text-slate-400">
                          Tug'ilgan yili:
                        </label>
                        <p className="text-xs font-semibold text-slate-800">
                          {selectedApp.fatherBirthDate || "Kiritilmagan"}
                        </p>
                      </div>
                      <div>
                        <label className="text-[10px] font-medium text-slate-400">
                          Lavozimi:
                        </label>
                        <p className="text-xs font-semibold text-slate-800">
                          {selectedApp.fatherPosition || "Kiritilmagan"}
                        </p>
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-medium text-slate-400">
                        Ish joyi:
                      </label>
                      <p className="text-xs font-semibold text-slate-800">
                        {selectedApp.fatherWorkPlace || "Kiritilmagan"}
                      </p>
                    </div>
                  </div>

                  {/* Mother Card */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                    <h5 className="font-bold text-sm text-slate-800 border-b border-slate-100 pb-2 flex items-center gap-1.5">
                      <Home className="w-4 h-4 text-slate-400" /> Onasi
                    </h5>
                    <div>
                      <label className="text-[10px] font-medium text-slate-400">
                        F.I.SH:
                      </label>
                      <p className="text-xs font-semibold text-slate-800">
                        {selectedApp.motherFullName || "Kiritilmagan"}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] font-medium text-slate-400">
                          Tug'ilgan yili:
                        </label>
                        <p className="text-xs font-semibold text-slate-800">
                          {selectedApp.motherBirthDate || "Kiritilmagan"}
                        </p>
                      </div>
                      <div>
                        <label className="text-[10px] font-medium text-slate-400">
                          Lavozimi:
                        </label>
                        <p className="text-xs font-semibold text-slate-800">
                          {selectedApp.motherPosition || "Kiritilmagan"}
                        </p>
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-medium text-slate-400">
                        Ish joyi:
                      </label>
                      <p className="text-xs font-semibold text-slate-800">
                        {selectedApp.motherWorkPlace || "Kiritilmagan"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Family Overview and Siblings */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="text-sm font-semibold text-slate-700">
                      Oila a'zolari umumiy soni:
                    </span>
                    <span className="bg-indigo-50 text-indigo-700 font-bold px-3 py-1 rounded-lg text-xs">
                      {selectedApp.familyMembersCount} ta
                    </span>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                      Aka-ukalari / Opa-singillari:
                    </label>
                    <div className="mt-2 space-y-2">
                      {selectedApp.siblings &&
                      selectedApp.siblings.length > 0 ? (
                        selectedApp.siblings.map((sib, sIdx) => (
                          <div
                            key={sIdx}
                            className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex justify-between items-center"
                          >
                            <div>
                              <span className="font-semibold text-xs text-slate-700 block">
                                {sib.name}
                              </span>
                              <span className="text-[10px] text-slate-400 block">
                                {sib.role}
                              </span>
                            </div>
                            <span className="text-xs bg-slate-200/60 text-slate-600 px-2.5 py-0.5 rounded font-medium">
                              {sib.birth} yosh
                            </span>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-slate-400 italic">
                          Oka-ukalari yoki opa-singillari kiritilmagan.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 5: Yuklangan Hujjatlar */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 flex items-center gap-1.5">
                <Download className="w-4 h-4" /> Biriktirilgan akademik hujjatlar
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-red-500 text-2xl">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] font-medium text-slate-400 block">
                        CV (Tarjimai hol)
                      </span>
                    </div>
                  </div>
                  <a
                    onClick={() =>
                      triggerToast(
                        "CV yuklab olinmoqda...",
                        <Download className="w-5 h-5" />,
                        "text-sky-400",
                      )
                    }
                    href={`${SITE_LINK}${selectedApp.cvFile}`}
                    download={`${selectedApp.usernameId}cv.pdf`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-400 hover:text-indigo-600 transition-colors"
                  >
                    <Download className="w-5 h-5" />
                  </a>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-emerald-500 text-2xl">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] font-medium text-slate-400 block">
                        GPA Transkript
                      </span>
                    </div>
                  </div>
                  <a
                    onClick={() =>
                      triggerToast(
                        "GPA transkript yuklab olinmoqda...",
                        <Download className="w-5 h-5" />,
                        "text-sky-400",
                      )
                    }
                    href={`${SITE_LINK}${selectedApp.cvFile}`} // Haqiqiy GPA fayl manzilini qo'yish tavsiya etiladi
                    download={`${selectedApp.usernameId}gpa.pdf`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-400 hover:text-indigo-600 transition-colors"
                  >
                    <Download className="w-5 h-5" />
                  </a>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-blue-500 text-2xl">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] font-medium text-slate-400 block">
                        OTM Ma'lumotnoma
                      </span>
                    </div>
                  </div>
                  <a
                    onClick={() =>
                      triggerToast(
                        "OTM ma'lumotnomasi yuklab olinmoqda...",
                        <Download className="w-5 h-5" />,
                        "text-sky-400",
                      )
                    }
                    href={`${SITE_LINK}${selectedApp.cvFile}`} // Haqiqiy ma'lumotnoma fayl manzilini qo'yish tavsiya etiladi
                    download={`${selectedApp.usernameId}otm_info.pdf`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-400 hover:text-indigo-600 transition-colors"
                  >
                    <Download className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-slate-100 px-6 py-4 flex items-center justify-between rounded-b-3xl border-t border-slate-200">
            <button
              onClick={() => setSelectedApp(null)}
              disabled={loading}
              className="bg-white border border-slate-300 text-slate-700 px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-slate-50 transition-colors disabled:opacity-50"
            >
              Yopish
            </button>
            <div className="flex space-x-2">
              {selectedApp.status === "pending" ? (
                <>
                  <button
                    onClick={() =>
                      handleStatusChange(selectedApp.usernameId, "rejected")
                    }
                    disabled={loading}
                    className="bg-rose-500 hover:bg-rose-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors shadow-md shadow-rose-500/10 disabled:opacity-50"
                  >
                    {loading ? "Kutilmoqda..." : "Rad etish"}
                  </button>
                  <button
                    onClick={() =>
                      handleStatusChange(selectedApp.usernameId, "approved")
                    }
                    disabled={loading}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors shadow-md shadow-emerald-600/10 disabled:opacity-50"
                  >
                    {loading ? "Kutilmoqda..." : "Ariza qabul qilinsin"}
                  </button>
                </>
              ) : (
                <button
                  onClick={() =>
                    handleStatusChange(selectedApp.usernameId, "pending")
                  }
                  disabled={loading}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors shadow-md shadow-indigo-600/10 disabled:opacity-50"
                >
                  {loading ? "Kutilmoqda..." : "Kutilayotgan holatga o'tkazish"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectedApp;