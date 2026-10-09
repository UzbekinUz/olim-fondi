import { useMemo } from "react";
import {
  FaEye,
  FaSave,
  FaTimes,
  FaCheckCircle,
  FaExclamationCircle,
  FaUserCheck,
} from "react-icons/fa";
import { API_LINK, SITE_LINK } from "../../cfg";
import axios from "axios";

function GradeModel({
  selectedApp,
  grades,
  setGrades,
  headers,
  setSelectedApp,
  fetchApplications,
  userRole, // "Editor" yoki "Expert"
  currentUser, // Tizimdagi ekspert nomi yoki ID-si (masalan: req.user.username yoki ID)
}) {
  // Hozirgi ekspert identifikatori
  const expertIdentifier = currentUser || "expert";

  // 1. Mezonlarni roliga ko'ra filtrlash
  const visibleFiles = useMemo(() => {
    if (!selectedApp?.files) return [];
    if (userRole === "Editor") {
      return selectedApp.files; // Editorga hammasi ko'rinadi
    }
    return selectedApp.files.filter((file) => file.markingId?.accept === true);
  }, [selectedApp, userRole]);

  // 2. Formani validatsiya qilish
  const isFormValid = useMemo(() => {
    if (visibleFiles.length === 0) return false;

    return visibleFiles.every((file) => {
      const fileGrade = grades[file._id];
      if (!fileGrade) return false;

      const score = fileGrade.score;
      const maxScore = Number(file.markingId?.mark || 0);

      return (
        score !== "" &&
        score !== null &&
        score !== undefined &&
        !isNaN(score) &&
        Number(score) >= 0 &&
        Number(score) <= maxScore
      );
    });
  }, [visibleFiles, grades]);

  const handleGradeChange = (fileId, field, value) => {
    setGrades((prev) => ({
      ...prev,
      [fileId]: {
        ...prev[fileId],
        [field]: value,
      },
    }));
  };

  // 3. Backend-ga baholarni saqlash
  const handleSaveGrades = async () => {
    if (!selectedApp || !isFormValid) return;

    try {
      const payload = {
        expertId: expertIdentifier, // Kim baholayotgani yuboriladi
        grades: visibleFiles.map((file) => ({
          fileId: file._id,
          score: Number(grades[file._id]?.score || 0),
          adminComment: grades[file._id]?.adminComment?.trim() || "",
        })),
      };

      const res = await axios.put(
        `${API_LINK}/application/gradeapplication/${selectedApp._id}`,
        payload,
        { headers }
      );
      // console.log(res.data);
      

      if (res.data.ok) {
        alert("Ariza muvaffaqiyatli baholandi!");
        setSelectedApp(null);
        fetchApplications();
      } else {
        alert(res.data.msg || "Xatolik yuz berdi!");
      }
    } catch (err) {
      alert(err.response?.data?.msg || "Baholashda xatolik!");
    }
  };

  if (!selectedApp) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity">
      <div className="bg-white rounded-2xl max-w-3xl w-full p-6 space-y-6 shadow-2xl border border-slate-100 max-h-[90vh] flex flex-col justify-between">
        
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-xl font-bold text-slate-800">
              Arizani Baholash
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Stipendiat:{" "}
              <span className="font-semibold text-blue-600">
                {selectedApp.studentDetails?.fullName || "Kiritilmagan"}
              </span>
            </p>
          </div>
          <button
            onClick={() => setSelectedApp(null)}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        {/* Fayllar ro'yxati */}
        <div className="space-y-4 overflow-y-auto pr-1">
          {visibleFiles.length === 0 ? (
            <div className="text-center py-10 bg-slate-50 rounded-xl border border-dashed border-slate-200">
              <FaExclamationCircle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
              <p className="text-sm font-medium text-slate-600">
                Baholash uchun mos keladigan mezonlar topilmadi.
              </p>
            </div>
          ) : (
            visibleFiles.map((file) => {
              const fileGrade = grades[file._id] || {};
              const maxMark = file.markingId?.mark || 0;
              const currentScore = Number(fileGrade.score ?? 0);
              const isScoreExceeded = currentScore > maxMark;

              // Boshqa ekspertlar tomonidan qo'yilgan barcha ballar
              const existingScores = Array.isArray(file.score) ? file.score : [];

              return (
                <div
                  key={file._id}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3 hover:border-slate-300 transition"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-slate-800 flex items-center gap-2">
                      {file.markingId?.title || "Mezon ko'rsatilmadi"}
                      {userRole === "Editor" && !file.markingId?.accept && (
                        <span className="text-[10px] font-semibold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-md">
                          Faqat Editorga ko'rinadi
                        </span>
                      )}
                    </span>
                    <a
                      href={`${SITE_LINK}${file.file}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-blue-600 hover:text-blue-700 font-medium hover:underline flex items-center gap-1.5 bg-blue-50 px-3 py-1.5 rounded-lg transition"
                    >
                      <FaEye className="w-3.5 h-3.5" /> Faylni ko'rish
                    </a>
                  </div>

                  {/* Boshqa ekspertlar qo'ygan ballar indikatori (agarda bo'lsa) */}
                  {existingScores.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="text-[10px] font-medium text-slate-500 self-center">
                        Boshqa baholar:
                      </span>
                      {userRole === "Editor" ? existingScores.map((s, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 text-[10px] font-medium bg-slate-200/80 text-slate-700 px-2 py-0.5 rounded-md"
                        >
                          <FaUserCheck className="w-2.5 h-2.5 text-slate-500" />
                           <strong className="text-blue-600">{s.mark}b</strong>
                        </span>
                      )): null}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                    {/* Ball kiritihs inputi */}
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                          Sizning ballingiz (Max: {maxMark}) <span className="text-red-500">*</span>
                        </label>
                        {isScoreExceeded && (
                          <span className="text-[10px] text-red-500 font-semibold">
                            Maksimal ball: {maxMark}
                          </span>
                        )}
                      </div>
                      <input
                        type="number"
                        min="0"
                        max={maxMark}
                        value={fileGrade.score ?? ""}
                        placeholder="0"
                        onChange={(e) =>
                          handleGradeChange(file._id, "score", e.target.value)
                        }
                        className={`w-full border rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 transition ${
                          isScoreExceeded
                            ? "border-red-400 focus:ring-red-400"
                            : "border-slate-200 focus:ring-blue-500"
                        }`}
                      />
                    </div>

                    {/* Izoh qismi */}
                    <div className="md:col-span-2">
                      <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                        Izoh <span className="text-[9px] text-slate-400 lowercase normal-case">(Ixtiyoriy)</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Ushbu mezon bo'yicha fikringiz..."
                        value={fileGrade.adminComment ?? ""}
                        onChange={(e) =>
                          handleGradeChange(
                            file._id,
                            "adminComment",
                            e.target.value
                          )
                        }
                        className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      />
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex justify-between items-center pt-4 border-t border-slate-100">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            {isFormValid ? (
              <span className="text-emerald-600 flex items-center gap-1 font-medium">
                <FaCheckCircle /> Barcha mezonlarga ball qo'yildi
              </span>
            ) : (
              <span className="text-slate-400 flex items-center gap-1">
                <FaExclamationCircle /> Barcha mezonlarga ball qo'ying
              </span>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setSelectedApp(null)}
              className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-all"
            >
              Bekor qilish
            </button>
            <button
              onClick={handleSaveGrades}
              disabled={!isFormValid}
              className={`flex items-center gap-2 px-5 py-2 text-sm font-bold rounded-xl transition-all shadow-sm ${
                isFormValid
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed"
              }`}
            >
              <FaSave /> Saqlash
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default GradeModel;