import {
  FaCheckCircle,
  FaExclamationCircle,
  FaCalendarAlt,
  FaClock,
  FaAward,
  FaFileAlt,
  FaFilePdf,
  FaExternalLinkAlt,
  FaInfoCircle,
  FaCommentDots,
  FaStar,
} from "react-icons/fa";
import { SITE_LINK } from "../cfg";

function SubmittedApplicationView({ applicationData, apiLink = "" }) {
  if (!applicationData) return null;

  const periodInfo = applicationData.periodId || {};
  const filesList = applicationData.files || [];

  // Status badge'ini generatsiya qilish
  const renderStatusBadge = (status) => {
    switch (status) {
      case "submitted":
        return (
          <span className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1.5 rounded-full border border-blue-200/80 flex items-center gap-1.5 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            Tekshiruvda (Yuborilgan)
          </span>
        );
      case "reviewed":
      case "approved":
        return (
          <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-full border border-emerald-200/80 flex items-center gap-1.5 shadow-2xs">
            <FaCheckCircle className="text-emerald-500" />
            Tasdiqlangan
          </span>
        );
      case "rejected":
        return (
          <span className="bg-rose-50 text-rose-700 text-xs font-bold px-3 py-1.5 rounded-full border border-rose-200/80 flex items-center gap-1.5 shadow-2xs">
            <FaExclamationCircle className="text-rose-500" />
            Radd etilgan
          </span>
        );
      default:
        return (
          <span className="bg-slate-100 text-slate-700 text-xs font-bold px-3 py-1.5 rounded-full border border-slate-200">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-8 p-4 md:p-8 bg-white rounded-3xl shadow-xs border border-slate-200/80 space-y-8 font-sans">
      {/* 1. Sarlavha Paneli */}
      <div className="bg-gradient-to-r from-slate-50 to-blue-50/30 border border-slate-200/80 p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <FaCheckCircle className="text-emerald-500 text-xl" />
            <h2 className="text-xl font-black text-slate-800 tracking-tight">
              Arizangiz qabul qilingan!
            </h2>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            Siz ushbu faol davr uchun hujjatlaringizni to'liq topshirgansiz.
          </p>
        </div>
        <div className="shrink-0">
          {renderStatusBadge(applicationData.status)}
        </div>
      </div>

      {/* 2. Metadata (Davr, Sana, Ball) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Davr nomi */}
        <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100/80 text-blue-600 flex items-center justify-center shrink-0">
            <FaCalendarAlt className="text-lg" />
          </div>
          <div className="overflow-hidden">
            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">
              Davr nomi
            </p>
            <h4
              className="text-xs font-extrabold text-slate-800 truncate"
              title={periodInfo.title}
            >
              {periodInfo.title || "—"}
            </h4>
          </div>
        </div>

        {/* Topshirilgan sana */}
        <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-100/80 text-indigo-600 flex items-center justify-center shrink-0">
            <FaClock className="text-lg" />
          </div>
          <div>
            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">
              Topshirilgan sana
            </p>
            <h4 className="text-xs font-extrabold text-slate-800">
              {applicationData.createdAt
                ? new Date(applicationData.createdAt).toLocaleDateString(
                    "uz-UZ",
                    {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    },
                  )
                : "—"}
            </h4>
          </div>
        </div>

        {/* To'plangan ball */}
        <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100/80 text-amber-600 flex items-center justify-center shrink-0">
            <FaAward className="text-lg" />
          </div>
          <div>
            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">
              To'plangan ball
            </p>
            <h4 className="text-xs font-extrabold text-slate-800">
              {applicationData.totalScore ?? 0} ball
            </h4>
          </div>
        </div>
      </div>

      {/* 3. Yuklangan fayllar va Mezonlar ro'yxati */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between border-b pb-3 border-slate-100">
          <h3 className="text-sm font-black text-slate-800 flex items-center gap-2">
            <FaFileAlt className="text-blue-600" /> Biriktirilgan mezonlar va
            PDF hujjatlar
          </h3>
          <span className="text-xs font-bold text-slate-400">
            Jami: {filesList.length} ta hujjat
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {filesList.length === 0 ? (
            <div className="text-center py-8 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <FaFilePdf className="text-3xl text-slate-300 mx-auto mb-2" />
              <p className="text-xs text-slate-400 italic">
                Biror bir fayl topilmadi.
              </p>
            </div>
          ) : (
            filesList.map((item, idx) => {
              const markingObj = item.markingId || {};
              // Mezon title va paragraph ni aniqlash
              const markingTitle =
                markingObj.title || markingObj.name || `Mezon #${idx + 1}`;
              const markingParagraph =
                markingObj.paragraph ||
                markingObj.desc ||
                "Ushbu mezon bo'yicha yuklangan hujjat.";

              const filePath = item.file[0] || "";
              const fullUrl = filePath.startsWith("http")
                ? filePath
                : `${SITE_LINK || apiLink}${filePath.startsWith("/") ? "" : "/"}${filePath}`;

              return (
                <div
                  key={item._id || idx}
                  className="p-5 rounded-2xl border border-slate-200/80 bg-white hover:border-blue-300/80 hover:shadow-xs transition-all duration-200 space-y-3"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    {/* Mezon nomi va tavsifi */}
                    <div className="flex items-start gap-3.5 flex-1">
                      <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center shrink-0 font-bold text-sm mt-0.5 border border-rose-100">
                        <FaFilePdf />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] font-black uppercase text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                            Mezon #{idx + 1}
                          </span>
                          <h4 className="text-sm font-extrabold text-slate-800 leading-snug">
                            {markingTitle}
                          </h4>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed max-w-2xl">
                          {markingParagraph}
                        </p>
                      </div>
                    </div>

                    {/* Hujjatni ko'rish tugmasi */}
                    {filePath && (
                      <a
                        href={fullUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto text-center inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 text-xs font-bold rounded-xl transition-all duration-200 shrink-0"
                      >
                        <span>Hujjatni ko'rish</span>
                        <FaExternalLinkAlt className="text-[10px]" />
                      </a>
                    )}
                  </div>

                  {/* Admin tomonidan baholangan bo'lsa (Ball va Izoh) */}
                  {((item.score && item.score.length > 0) ||
                    item.score.adminComment) &&
                    (() => {
                      // 1. O'rtacha ballni hisoblash
                      const totalMark =
                        item.score?.reduce(
                          (sum, s) => sum + (Number(s.mark) || 0),
                          0,
                        ) || 0;
                      const averageMark = item.score?.length
                        ? (totalMark / item.score.length).toFixed(1)
                        : 0;

                      // 2. Izohlarni birlashtirish (agar score ichida comment bo'lsa yoki item.adminComment bo'lsa)
                      // Agar izohlar score obyektlarining ichida bo'lsa:
                      const comments = item.score
                        ?.map((s) => s.comment || s.adminComment)
                        .filter(Boolean)
                        .join(", ");

                      // Yoki shunchaki item.adminComment ning o'zi bo'lsa:
                      const finalComment = comments ;

                      return (
                        <div className="mt-3 pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-50/80 p-3 rounded-xl text-xs">
                          {item.score && item.score.length > 0 && (
                            <div className="flex items-center gap-1.5 text-amber-700 font-bold">
                              <FaStar className="text-amber-500" />
                              <span>Ball: {averageMark} ball</span>
                            </div>
                          )}

                          {finalComment && (
                            <div className="flex items-center gap-1.5 text-slate-600 italic">
                              <FaCommentDots className="text-blue-500 shrink-0" />
                              <span>Izoh: "{finalComment}"</span>
                            </div>
                          )}
                        </div>
                      );
                    })()}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* 4. Eslatma */}
      <div className="p-4 bg-amber-50/80 rounded-2xl border border-amber-200/80 text-amber-900 text-xs flex items-start gap-3">
        <FaInfoCircle className="text-base shrink-0 mt-0.5 text-amber-600" />
        <p className="leading-relaxed">
          <strong className="font-bold">Eslatma:</strong> Arizangiz bir marta
          topshirilgandan so'ng uni qayta tahrirlash imkoniyati yo'q.
          Hujjatlaringiz Moderator va Komissiya a'zolari tomonidan ko'rib
          chiqiladi va baholanadi.
        </p>
      </div>
    </div>
  );
}

export default SubmittedApplicationView;
