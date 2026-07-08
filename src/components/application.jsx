import { 
  FileText, 
  User, 
  BookOpen, 
  FileCheck, 
  Phone, 
  Mail, 
  Calendar, 
  Pen,
  Download
} from 'lucide-react';
import { SITE_LINK } from '../cfg';

// application propiga default o'laroq null beramiz: { application = null }
const ApplicationCard = ({ application }) => {
  
  // 1. Agarda ma'lumot hali yuklanmagan bo'lsa skeleton animatsiyasi
  if (!application) {
    return (
      <div 
        data-aos="fade-up"
        data-aos-duration="400"
        className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-100 p-6 text-center text-slate-500 my-6"
      >
        <div className="animate-pulse flex flex-col items-center space-y-3">
          <div className="h-4 bg-slate-200 rounded w-1/4"></div>
          <div className="h-8 bg-slate-200 rounded w-1/2"></div>
          <div className="h-4 bg-slate-200 rounded w-3/4"></div>
        </div>
        <p className="mt-4 text-sm font-medium">Ariza ma'lumotlari yuklanmoqda...</p>
      </div>
    );
  }

  // 2. Ma'lumot aniq mavjud bo'lgandagina destructuring xavfsiz ishlaydi
  const {
    status,
    createdAt,
    studentFullName,
    studyForm,
    studyField,
    universityName,
    currentCourse,
    contractAmount,
    phoneNumber,
    emailAddress,
    comment
  } = application;
  
  const statusConfig = {
    pending: { text: "Ko'rib chiqilmoqda", bg: "bg-amber-50 text-amber-700 border-amber-200", dot: "bg-amber-500" },
    approved: { text: "Tasdiqlangan", bg: "bg-emerald-50 text-emerald-700 border-emerald-200", dot: "bg-emerald-500" },
    rejected: { text: "Rad etilgan", bg: "bg-rose-50 text-rose-700 border-rose-200", dot: "bg-rose-500" }
  };

  const currentStatus = statusConfig[status] || statusConfig.pending;
  const formattedDate = createdAt ? new Date(createdAt).toLocaleDateString('uz-UZ', {
    year: 'numeric', month: 'long', day: 'numeric'
  }) : "Sana ko'rsatilmagan";

  return (
    <div 
      data-aos="fade-up"
      data-aos-duration="500"
      className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden my-6"
    >
      {/* Status qismi */}
      <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Ariza Holati</span>
          <div className="flex items-center gap-2 mt-1">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border ${currentStatus.bg}`}>
              <span className={`h-2 w-2 rounded-full ${currentStatus.dot}`} />
              {currentStatus.text}
            </span>
          </div>
        </div>
        <div className="sm:text-right">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Yuborilgan sana</span>
          <p className="text-sm font-medium text-slate-600 mt-1 flex items-center sm:justify-end gap-1.5">
            <Calendar className="w-4 h-4 text-slate-400" />
            {formattedDate}
          </p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Talaba ma'lumotlari */}
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-50 rounded-xl text-blue-600 shrink-0">
            <User className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-800">{studentFullName || "Ism kiritilmagan"}</h3>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
              {phoneNumber && <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {phoneNumber}</span>}
              {emailAddress && <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {emailAddress}</span>}
            </div>
          </div>
        </div>

        <hr className="border-slate-100" />

        {/* O'qish ma'lumotlari */}
        <div>
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" /> O'qish joyi va Shartnoma
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl">
            <div>
              <span className="text-xs text-slate-500">Universitet</span>
              <p className="text-sm font-semibold text-slate-700">{universityName || "-"}</p>
            </div>
            <div>
              <span className="text-xs text-slate-500">Yo'nalish</span>
              <p className="text-sm font-semibold text-slate-700">{studyField || "-"}</p>
            </div>
            <div>
              <span className="text-xs text-slate-500">Bosqich va Ta'lim shakli</span>
              <p className="text-sm font-semibold text-slate-700">{currentCourse}-kurs ({studyForm})</p>
            </div>
            <div>
              <span className="text-xs text-slate-500">Kontrakt miqdori</span>
              <p className="text-sm font-bold text-blue-600">{contractAmount || "-"}</p>
            </div>
          </div>
        </div>
        <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 flex items-center gap-1.5">
                <Download className="w-4 h-4" /> Biriktirilgan akademik
                hujjatlar
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
                    href={`${SITE_LINK}${application.cvFile}`}
                    download={`${application.usernameId}cv.pdf`}
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
                    href={`${SITE_LINK}${application.gpaFile}`} // Haqiqiy GPA fayl manzilini qo'yish tavsiya etiladi
                    download={`${application.usernameId}gpa.pdf`}
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
                    href={`${SITE_LINK}${application.universityCertificate}`} // Haqiqiy ma'lumotnoma fayl manzilini qo'yish tavsiya etiladi
                    download={`${application.usernameId}otm_info.pdf`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-400 hover:text-indigo-600 transition-colors"
                  >
                    <Download className="w-5 h-5" />
                  </a>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-slate-500 text-2xl">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] font-medium text-slate-400 block">
                        Passport nusxasi
                      </span>
                    </div>
                  </div>
                  <a
                    href={`${SITE_LINK}${application.passportFile}`} // Haqiqiy ma'lumotnoma fayl manzilini qo'yish tavsiya etiladi
                    download={`${application.usernameId}passport_copy.pdf`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-400 hover:text-indigo-600 transition-colors"
                  >
                    <Download className="w-5 h-5" />
                  </a>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-yellow-500 text-2xl">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] font-medium text-slate-400 block">
                        Imtiyoz hujjatlari
                      </span>
                    </div>
                  </div>
                  {!application.imtiyoz || application.imtiyoz.length === 0 ? (
                    <span className="text-[10px] text-slate-400 italic">
                      Imtiyoz hujjatlari mavjud emas
                    </span>
                  ) : (
                    <a
                      href={`${SITE_LINK}${application.imtiyoz}`}
                      download={`${application.usernameId}privilege_docs.pdf`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-slate-400 hover:text-indigo-600 transition-colors"
                    >
                      <Download className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
        <div>
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Pen className="w-4 h-4" /> Izoh
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl">
            <p>{comment}</p>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default ApplicationCard;