import {
  FileText,
  User,
  BookOpen,
  Phone,
  Mail,
  Calendar,
  Pen,
  Download,
  RefreshCw,
} from "lucide-react";
import { SITE_LINK } from "../cfg";

const ApplicationCard = ({ application, setBor }) => {
  // Kontrakt miqdorini formatlash uchun
  const formatContractAmount = (amount) => {
    if (!amount) return "-";

    // Matn ko'rinishida kelgan raqamlar ichidan faqat raqamlarni ajratib olamiz
    const numericAmount = Number(amount.toString().replace(/\D/g, ""));

    if (isNaN(numericAmount) || numericAmount === 0) return amount; // Agar raqam bo'lmasa asl holini qaytaradi

    // 12500000 -> 12 500 000 ko'rinishiga keltiradi
    const formatted = new Intl.NumberFormat("fr-FR").format(numericAmount);

    return `${formatted} so'm`;
  };
  // 1. Skeleton yuklanish holati
  if (!application) {
    return (
      <div
        data-aos="fade-up"
        data-aos-duration="400"
        className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-100 p-8 text-center text-slate-400 my-6"
      >
        <div className="animate-pulse flex flex-col items-center space-y-4">
          <div className="h-3 bg-slate-200 rounded-full w-24"></div>
          <div className="h-6 bg-slate-200 rounded-lg w-48"></div>
          <div className="h-4 bg-slate-200 rounded w-full max-w-md"></div>
        </div>
        <p className="mt-4 text-sm font-medium text-slate-500 animate-pulse">
          Ariza ma'lumotlari yuklanmoqda...
        </p>
      </div>
    );
  }

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
    comment,
  } = application;

  const statusConfig = {
    pending: {
      text: "Ko'rib chiqilmoqda",
      bg: "bg-amber-50 text-amber-700 border-amber-200/60",
      dot: "bg-amber-500",
    },
    approved: {
      text: "Tasdiqlangan",
      bg: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
      dot: "bg-emerald-500",
    },
    rejected: {
      text: "Rad etilgan",
      bg: "bg-rose-50 text-rose-700 border-rose-200/60",
      dot: "bg-rose-500",
    },
  };

  const currentStatus = statusConfig[status] || statusConfig.pending;
  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("uz-UZ", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Sana ko'rsatilmagan";

  return (
    <div
      data-aos="fade-up"
      data-aos-duration="500"
      className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md shadow-slate-100/55 border border-slate-100 overflow-hidden my-6 transition-all duration-300 hover:shadow-lg hover:shadow-slate-200/50"
    >
      {/* 1. Yuqori status qismi */}
      <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-slate-50/80 to-slate-50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Ariza Holati
          </span>
          <div className="flex items-center gap-2 mt-1.5">
            <span
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold border ${currentStatus.bg} shadow-sm`}
            >
              <span
                className={`h-2 w-2 rounded-full animate-pulse ${currentStatus.dot}`}
              />
              {currentStatus.text}
            </span>
          </div>
        </div>
        <div className="sm:text-right">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Yuborilgan sana
          </span>
          <p className="text-sm font-semibold text-slate-600 mt-1.5 flex items-center sm:justify-end gap-1.5">
            <Calendar className="w-4 h-4 text-slate-400" />
            {formattedDate}
          </p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* 2. Talaba asosiy ma'lumotlari */}
        <div className="flex flex-col sm:flex-row items-start gap-4 p-2">
          <div className="p-3.5 bg-blue-50/70 rounded-2xl text-blue-600 shrink-0 border border-blue-100/50 shadow-sm shadow-blue-100">
            <User className="w-6 h-6" />
          </div>
          <div className="space-y-1.5 w-full">
            <h3 className="text-xl font-bold text-slate-800 tracking-tight">
              {studentFullName || "Ism kiritilmagan"}
            </h3>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500 font-medium">
              {phoneNumber && (
                <span className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100">
                  <Phone className="w-3.5 h-3.5 text-slate-400" /> {phoneNumber}
                </span>
              )}
              {emailAddress && (
                <span className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100">
                  <Mail className="w-3.5 h-3.5 text-slate-400" /> {emailAddress}
                </span>
              )}
            </div>
          </div>
        </div>

        <hr className="border-slate-100" />

        {/* 3. O'qish joyi va Kontrakt ma'lumotlari */}
        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3.5 flex items-center gap-2 px-1">
            <BookOpen className="w-4 h-4 text-slate-400" /> O'qish joyi va
            Shartnoma
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50/60 p-5 rounded-2xl border border-slate-100">
            <div className="space-y-0.5">
              <span className="text-[11px] font-medium text-slate-400 uppercase">
                Universitet
              </span>
              <p className="text-sm font-bold text-slate-700">
                {universityName || "-"}
              </p>
            </div>
            <div className="space-y-0.5">
              <span className="text-[11px] font-medium text-slate-400 uppercase">
                Yo'nalish
              </span>
              <p className="text-sm font-bold text-slate-700">
                {studyField || "-"}
              </p>
            </div>
            <div className="space-y-0.5">
              <span className="text-[11px] font-medium text-slate-400 uppercase">
                Bosqich va Ta'lim shakli
              </span>
              <p className="text-sm font-bold text-slate-700">
                {currentCourse}-kurs{" "}
                <span className="text-xs font-normal text-slate-500 bg-slate-200/60 px-2 py-0.5 rounded ml-1">
                  {studyForm}
                </span>
              </p>
            </div>
            <div className="space-y-0.5">
              <span className="text-[11px] font-medium text-slate-400 uppercase">
                Kontrakt miqdori
              </span>
              <p className="text-base font-extrabold text-indigo-600">
                {formatContractAmount(contractAmount)}
              </p>
            </div>
          </div>
        </div>

        {/* 4. Akademik Hujjatlar (Yuklab olish qismi) */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-500 mb-3.5 flex items-center gap-2 px-1">
            <Download className="w-4 h-4" /> Biriktirilgan akademik hujjatlar
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {[
              {
                label: "CV (Tarjimai hol)",
                file: application.cvFile,
                color: "text-rose-500 bg-rose-50 border-rose-100",
                name: "cv.pdf",
              },
              {
                label: "GPA Transkript",
                file: application.gpaFile,
                color: "text-emerald-500 bg-emerald-50 border-emerald-100",
                name: "gpa.pdf",
              },
              {
                label: "OTM Ma'lumotnoma",
                file: application.universityCertificate,
                color: "text-blue-500 bg-blue-50 border-blue-100",
                name: "otm_info.pdf",
              },
              {
                label: "Passport nusxasi",
                file: application.passportFile,
                color: "text-slate-600 bg-slate-100 border-slate-200",
                name: "passport.pdf",
              },
            ].map((doc, idx) => (
              <div
                key={idx}
                className="bg-white p-4 rounded-xl border border-slate-200/70 shadow-sm flex items-center justify-between transition-all hover:border-slate-300"
              >
                <div className="flex items-center space-x-3 overflow-hidden">
                  <div
                    className={`p-2 rounded-lg ${doc.color.split(" ")[1]} ${doc.color.split(" ")[0]} shrink-0`}
                  >
                    <FileText className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold text-slate-600 truncate">
                    {doc.label}
                  </span>
                </div>
                <a
                  href={`${SITE_LINK}${doc.file}`}
                  download={`${application.usernameId}_${doc.name}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all shrink-0"
                >
                  <Download className="w-4 h-4" />
                </a>
              </div>
            ))}

            {/* Imtiyoz hujjati uchun alohida chiroyli holat */}
            <div className="bg-white p-4 rounded-xl border border-slate-200/70 shadow-sm flex items-center justify-between transition-all hover:border-slate-300">
              <div className="flex items-center space-x-3 overflow-hidden">
                <div className="p-2 rounded-lg bg-amber-50 text-amber-500 shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-slate-600 truncate">
                  Imtiyoz hujjatlari
                </span>
              </div>
              {!application.imtiyoz || application.imtiyoz.length === 0 ? (
                <span className="text-[10px] font-medium text-amber-600/80 bg-amber-50/50 px-2 py-1 rounded border border-amber-100/50 italic shrink-0">
                  Mavjud emas
                </span>
              ) : (
                <a
                  href={`${SITE_LINK}${application.imtiyoz}`}
                  download={`${application.usernameId}_privilege.pdf`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all shrink-0"
                >
                  <Download className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* 5. Izoh Bloki */}
        {comment && (
          <div className="pt-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-2 px-1">
              <Pen className="w-3.5 h-3.5 text-slate-400" /> Izoh
            </h4>
            <div className="bg-slate-50 border-l-4 border-slate-300 p-4 rounded-r-xl text-sm text-slate-600 leading-relaxed font-medium italic">
              "{comment}"
            </div>
          </div>
        )}

        {/* 6. Rad etilgan arizani qayta yuborish tugmasi */}
        {status === "rejected" && (
          <div className="pt-4 flex justify-center">
            <button
              onClick={() => setBor("resend")}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-md shadow-indigo-200 hover:shadow-lg hover:from-indigo-700 hover:to-indigo-800 transition-all duration-200 active:scale-[0.98]"
            >
              <RefreshCw className="w-4 h-4 animate-spin-slow" />
              Arizani yangilash va qayta yuborish
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationCard;
