import { 
  FileText, 
  User, 
  BookOpen, 
  FileCheck, 
  Phone, 
  Mail, 
  Calendar 
} from 'lucide-react';

// application propiga default o'laroq null beramiz: { application = null }
const ApplicationCard = ({ application }) => {
  
  // 1. Agarda ma'lumot hali yuklanmagan bo'lsa (undefined yoki null bo'lsa), skrinshotdagi xatolikni bermasligi uchun tekshiruv:
  if (!application) {
    
    return (
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-100 p-6 text-center text-slate-500">
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
    studyForm ,
    studyField ,
    universityName ,
    currentCourse ,
    contractAmount ,
    phoneNumber ,
    emailAddress ,
    cvFile,
    gpaFile,
    universityCertificate,
    passportFile
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
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden my-6">
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

        {/* Hujjatlar */}
        <div>
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <FileCheck className="w-4 h-4" /> Yuklangan hujjatlar
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { name: 'CV', file: cvFile },
              { name: 'GPA', file: gpaFile },
              { name: 'Ma\'lumotnoma', file: universityCertificate },
              { name: 'Pasport nusxasi', file: passportFile },
            ].map((doc, idx) => (
              doc.file ? (
                <a
                  key={idx}
                  href={doc.file}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-blue-300 transition text-center group"
                >
                  <FileText className="w-5 h-5 text-slate-400 group-hover:text-blue-500 mb-1" />
                  <span className="text-xs font-medium text-slate-600 group-hover:text-slate-900 truncate w-full px-1">
                    {doc.name}
                  </span>
                </a>
              ) : (
                <div key={idx} className="p-3 border border-dashed border-slate-200 rounded-xl text-center text-xs text-slate-400">
                  {doc.name} yo'q
                </div>
              )
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationCard;