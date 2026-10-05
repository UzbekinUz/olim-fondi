import { useMemo, useState } from "react";
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaPaperclip,
  FaEye,
  FaTrash,
  FaPen,
  FaStar,
  FaCommentDots,
  FaChevronDown,
  FaChevronUp,
  FaUserCheck,
} from "react-icons/fa";
import { SITE_LINK } from "../../cfg";

function ApplicationList({
  loading,
  filteredApps = [],
  userRole,
  currentUserId,
  handleOpenGradeModal,
  handleDeleteApp,
}) {
  const [openApps, setOpenApps] = useState({});
  const visibleFiles = useMemo(() => {
    if (!filteredApps?.files) return [];
    if (userRole === "Editor") {
      return filteredApps.files; // Editorga hammasi ko'rinadi
    }
    return filteredApps.files.filter((file) => file.markingId?.accept === true);
  }, [filteredApps, userRole]);
  const toggleAppFiles = (appId) => {
    setOpenApps((prev) => ({
      ...prev,
      [appId]: !prev[appId],
    }));
  };

  // Yordamchi funksiya: fayl ichidagi scores/score ni massiv shaklida xavfsiz olish
  const getScoresArray = (fileObj) => {
    if (Array.isArray(fileObj.scores)) return fileObj.scores;
    if (Array.isArray(fileObj.score)) return fileObj.score;
    if (fileObj.score && typeof fileObj.score === "object")
      return [fileObj.score];
    return [];
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center text-slate-500 border border-slate-200/80 shadow-sm font-medium">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent mb-3" />
        <p className="text-sm">Ma'lumotlar yuklanmoqda...</p>
      </div>
    );
  }

  if (!filteredApps || filteredApps.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center text-slate-400 border border-slate-200/80 shadow-sm">
        <p className="text-sm font-medium">
          Ushbu filtr bo'yicha hech qanday ariza topilmadi.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredApps.map((app) => {
        const files = app.files || [];
        const filesCount = files.length;

        // 1. Joriy ekspert tomonidan baholangan fayllar sonini hisoblash
        const gradedByMeCount = files.filter((f) => {
          const scoresArr = getScoresArray(f);
          return scoresArr.some((s) => {
            const scorerId = s.whomark?._id || s.whomark;
            const mark = s.mark ?? s.score;
            return (
              String(scorerId) === String(currentUserId) &&
              mark !== null &&
              mark !== undefined
            );
          });
        }).length;

        // Joriy foydalanuvchi barcha fayllarni baholaganmi?
        const isGradedByMe = filesCount > 0 && gradedByMeCount === filesCount;
        const isOpen = !!openApps[app._id];

        return (
          <div
            key={app._id}
            className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
          >
            {/* Card Header */}
            <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 bg-slate-50/30">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-slate-100 text-blue-600 flex items-center justify-center font-bold border border-slate-200 shrink-0 shadow-xs overflow-hidden">
                  {app.studentDetails?.photo3x4 ? (
                    <img
                      src={`${SITE_LINK}${app.studentDetails.photo3x4}`}
                      alt="avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-lg uppercase">
                      {app.studentDetails?.fullName?.charAt(0) || "U"}
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-base leading-tight">
                    {app.studentDetails?.fullName || "Ism ko'rsatilmadi"}
                  </h3>
                  <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-1">
                    <FaCalendarAlt className="text-slate-400" /> Yuklangan
                    vaqti:{" "}
                    {app.createdAt
                      ? new Date(app.createdAt).toLocaleString("uz-UZ")
                      : "Sana yo'q"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {/* Ekspertning shaxsiy baholash statusi */}
                {isGradedByMe ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                    <FaCheckCircle className="text-emerald-500" /> Siz
                    baholadingiz
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200/80">
                    <FaClock className="text-amber-500" /> Baholashingiz
                    kutilmoqda ({gradedByMeCount}/{filesCount})
                  </span>
                )}

                {/* Ariza bo'yicha umumiy ball */}
                {app.totalScore !== undefined && (
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200/80">
                    <FaStar className="text-amber-400" /> {Number(app?.totalScore || 0).toFixed(2)} ball
                  </span>
                )}

                {/* Baholash Tugmasi */}
                <button
                  type="button"
                  onClick={() => handleOpenGradeModal(app)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-200/80 rounded-xl transition-all cursor-pointer"
                >
                  <FaPen className="text-[10px]" />
                  {isGradedByMe ? "Qayta baholash" : "Baholash"}
                </button>

              </div>
            </div>

            {/* Accordion Toggle */}
            <button
              type="button"
              onClick={() => toggleAppFiles(app._id)}
              className="w-full px-5 py-3 bg-slate-50/50 hover:bg-slate-100/80 transition-colors border-b border-slate-100 flex justify-between items-center text-left cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <h4 className="text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Mezonlar va biriktirilgan fayllar
                </h4>
                <span className="text-[11px] bg-slate-200/70 text-slate-700 px-2 py-0.5 rounded-full font-semibold">
                  {filesCount} ta
                </span>
              </div>

              <div className="flex items-center gap-1 text-xs text-blue-600 font-semibold">
                <span>{isOpen ? "Yopish" : "Ko'rish"}</span>
                {isOpen ? <FaChevronUp /> : <FaChevronDown />}
              </div>
            </button>

            {/* Mezonlar va Fayllar Grid Paneli */}
            {isOpen && (
              <div className="p-4 sm:p-5 bg-slate-50/20 border-t border-slate-100">
                {files.length === 0 ? (
                  <p className="text-xs text-slate-400 italic text-center py-2">
                    Ushbu arizaga biriktirilgan fayllar topilmadi.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {files.map((f) => {
                      const scoresList = getScoresArray(f);

                      // 2. .filter() o'rniga .find() ishlatiladi (yagona ob'ekt qaytaradi)
                      const myScoreObj = scoresList.find((s) => {
                        const scorerId = s.whomark?._id || s.whomark;
                        return String(scorerId) === String(currentUserId);
                      });

                      const currentMark = myScoreObj?.mark ?? myScoreObj?.score;

                      const hasMyScore =
                        !!myScoreObj &&
                        currentMark !== null &&
                        currentMark !== undefined;

                      const fileList = Array.isArray(f.file)
                        ? f.file
                        : f.file
                          ? [f.file]
                          : [];

                      return (
                        <div
                          key={f._id || f.id}
                          className={`p-3.5 rounded-xl border transition-all duration-200 flex flex-col justify-between gap-3 ${
                            hasMyScore
                              ? "bg-emerald-50/20 border-emerald-200/60 hover:border-emerald-300"
                              : "bg-amber-50/30 border-amber-200/60 hover:border-amber-300"
                          }`}
                        >
                          {/* Fayl Sarlavhasi va Link */}
                          <div
                            className={`flex items-start justify-between gap-2`}
                          >
                            <div className="flex items-start gap-2 overflow-hidden">
                              <FaPaperclip className="text-slate-400 shrink-0 mt-0.5 text-xs" />
                              <div className="truncate">
                                <p
                                  className="text-xs font-bold text-slate-800 truncate"
                                  title={f.markingId?.title}
                                >
                                  {f.markingId?.title || "Sarlavhasiz mezon"}
                                </p>
                                <p
                                  className="text-[11px] text-slate-500 truncate mt-0.5"
                                  title={f.markingId?.paragraph}
                                >
                                  {f.markingId?.paragraph ||
                                    "Tavsif berilmagan"}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-1">
                              {fileList.map((fileUrl, index) => (
                                <a
                                  key={index}
                                  href={`${SITE_LINK}${fileUrl}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="p-1.5 text-slate-500 hover:text-blue-600 bg-white hover:bg-blue-50 border border-slate-200 rounded-lg transition-all shrink-0"
                                  title="Faylni ko'rish"
                                >
                                  <FaEye className="w-3.5 h-3.5" />
                                </a>
                              ))}
                            </div>
                          </div>

                          {/* Qo'yilgan Ball va Izoh Qismi */}
                          <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                            {hasMyScore ? (
                              <div className="w-full flex items-center justify-between gap-2">
                                <span className="font-extrabold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-md text-[11px] flex items-center gap-1">
                                  <FaUserCheck className="text-emerald-600 text-[10px]" />
                                  Siz: {currentMark} / {f.markingId?.mark ?? 0}
                                </span>

                                {myScoreObj.comment ||
                                myScoreObj.adminComment ? (
                                  <span
                                    className="text-[11px] text-slate-600 flex items-center gap-1 bg-white border border-slate-200 px-2 py-0.5 rounded-md truncate max-w-32.5"
                                    title={`Izohingiz: ${myScoreObj.comment || myScoreObj.adminComment}`}
                                  >
                                    <FaCommentDots className="text-slate-400 shrink-0" />
                                    <span className="truncate">
                                      {myScoreObj.comment ||
                                        myScoreObj.adminComment}
                                    </span>
                                  </span>
                                ) : (
                                  <span className="text-[10px] text-slate-400 italic">
                                    Izohsiz
                                  </span>
                                )}
                              </div>
                            ) : (
                              <div className="w-full flex items-center justify-between">
                                <span className="text-[11px] font-medium text-amber-600 italic">
                                  Siz baholamadingiz
                                </span>
                                {scoresList.length > 0 && (
                                  <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                                    Boshqalar: {scoresList.length} ta baho
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default ApplicationList;
