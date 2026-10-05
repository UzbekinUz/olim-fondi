import {
  Award,
  Building,
  ChevronDown,
  ChevronUp,
  Edit,
  ExternalLink,
  FileCheck,
  FileX,
  GraduationCap,
  IceCream,
  Mail,
  Phone,
  Search,
  Trash2,
} from "lucide-react";
import { API_LINK, SITE_LINK } from "../../cfg";
import AdminPaymentReceiptSection from "../stp/adddoc";
import AchievementManager from "../stp/addAchivement";
import axios from "axios";

function Scholar({
  searchTerm,
  setSearchTerm,
  scholars,
  getId,
  docLabels,
  handleDeleteScholar,
  setEditItem,
  fetchData,
  expandedScholarId,
  toggleExpand,
  userRole,
}) {
  // Takomillashtirilgan handleFreeze funksiyasi
  const handleFreeze = (currentFreezeState, id) => {
    // Agar ko'zda tutilgan freeze qiymati undefined/null bo'lsa, u holda false deb olinadi
    const isCurrentlyFrozen = Boolean(currentFreezeState);
    const nextFreezeState = !isCurrentlyFrozen; // Aksiga o'zgartiramiz

    axios
      .put(
        `${API_LINK}/stipendiat/achievements`,
        { id: id, freeze: nextFreezeState },
        {
          headers: {
            "x-admin-token": localStorage.getItem("access_admin_token"),
          },
        },
      )
      .then((res) => {
        console.log("Freeze holati o'zgartirildi:", res.data);
        // Sahifadagi ma'lumotlarni qayta yuklab, UI ni yangilaymiz
        if (fetchData) {
          fetchData();
        }
      })
      .catch((err) => {
        console.error("Freeze qilishda xatolik yuz berdi:", err);
      });
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="F.I.SH, Login yoki Universitet bo'yicha qidirish..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition shadow-xs text-sm"
        />
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="divide-y divide-slate-100">
          {scholars
            .filter((s) => {
              const term = searchTerm.toLowerCase();
              return (
                (s.fullName && s.fullName.toLowerCase().includes(term)) ||
                (s.login && s.login.toLowerCase().includes(term)) ||
                (s.university && s.university.toLowerCase().includes(term))
              );
            })
            .map((scholar) => {
              const scholarId = getId(scholar);
              const isExpanded = expandedScholarId === scholarId;
              if (userRole === "Bugalter") {
                return (
                  <>
                    <div className="p-4 flex items-center justify-between hover:bg-slate-50/60 transition gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center font-bold text-sm shrink-0 overflow-hidden">
                          {scholar.photo3x4 ? (
                            <img
                              src={
                                scholar.photo3x4.startsWith("http")
                                  ? scholar.photo3x4
                                  : `${SITE_LINK}${scholar.photo3x4}`
                              }
                              alt="Profile"
                              className="w-full h-full object-cover"
                            />
                          ) : scholar.fullName ? (
                            scholar.fullName[0]
                          ) : (
                            "@"
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-slate-800 text-sm md:text-base">
                              {scholar.fullName || `@${scholar.login}`}
                            </h3>
                            {scholar.isProfileCompleted ? (
                              <span className="text-[10px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full border border-emerald-200 font-medium">
                                To'liq
                              </span>
                            ) : (
                              <span className="text-[10px] bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full border border-amber-200 font-medium">
                                Chala
                              </span>
                            )}
                            {/* Muzlatilganlik holatini ko'rsatish (Ixtiyoriy) */}
                            {scholar.freeze && userRole === "Editor" && (
                              <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full border border-blue-200 font-medium">
                                Muzlatilgan
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-400 font-mono">
                            @{scholar.login}{" "}
                            {scholar.university
                              ? `• ${scholar.university}`
                              : ""}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => toggleExpand(scholarId)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition cursor-pointer"
                        >
                          Batafsil
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </button>

                        <button
                          onClick={() =>
                            setEditItem({
                              type: "scholar",
                              data: { ...scholar },
                            })
                          }
                          className={
                            userRole === "Editor"
                              ? "p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition cursor-pointer"
                              : "hidden"
                          }
                        >
                          <Edit className="w-4 h-4" />
                        </button>

                        {/* Freeze/Unfreeze tugmasi */}
                        <button
                          onClick={() =>
                            handleFreeze(scholar.freeze, scholar._id)
                          }
                          title={
                            scholar.freeze ? "Muzdan chiqarish" : "Muzlatish"
                          }
                          className={`p-2 rounded-lg transition cursor-pointer ${
                            userRole === "Editor"
                              ? "text-slate-400 hover:text-blue-600 hover:bg-blue-50"
                              : "hidden"
                          }`}
                        >
                          <IceCream className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleDeleteScholar(scholarId)}
                          className={
                            userRole === "Editor"
                              ? "p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                              : "hidden"
                          }
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    {isExpanded && (
                      <div className="bg-slate-50/80 p-5 border-t border-slate-100 space-y-6">
                        <AdminPaymentReceiptSection
                          stpdata={scholar}
                          onUpdateSuccess={fetchData}
                        />
                      </div>
                    )}
                  </>
                );
              } else {
                return (
                  <div key={scholarId} className="transition">
                    <div className="p-4 flex items-center justify-between hover:bg-slate-50/60 transition gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center font-bold text-sm shrink-0 overflow-hidden">
                          {scholar.photo3x4 ? (
                            <img
                              src={
                                scholar.photo3x4.startsWith("http")
                                  ? scholar.photo3x4
                                  : `${SITE_LINK}${scholar.photo3x4}`
                              }
                              alt="Profile"
                              className="w-full h-full object-cover"
                            />
                          ) : scholar.fullName ? (
                            scholar.fullName[0]
                          ) : (
                            "@"
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-slate-800 text-sm md:text-base">
                              {scholar.fullName || `@${scholar.login}`}
                            </h3>
                            {scholar.isProfileCompleted ? (
                              <span className="text-[10px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full border border-emerald-200 font-medium">
                                To'liq
                              </span>
                            ) : (
                              <span className="text-[10px] bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full border border-amber-200 font-medium">
                                Chala
                              </span>
                            )}
                            {/* Muzlatilganlik holatini ko'rsatish (Ixtiyoriy) */}
                            {scholar.freeze && userRole === "Editor" && (
                              <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full border border-blue-200 font-medium">
                                Muzlatilgan
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-400 font-mono">
                            @{scholar.login}{" "}
                            {scholar.university
                              ? `• ${scholar.university}`
                              : ""}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => toggleExpand(scholarId)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition cursor-pointer"
                        >
                          Batafsil
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </button>

                        <button
                          onClick={() =>
                            setEditItem({
                              type: "scholar",
                              data: { ...scholar },
                            })
                          }
                          className={
                            userRole === "Editor"
                              ? "p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition cursor-pointer"
                              : "hidden"
                          }
                        >
                          <Edit className="w-4 h-4" />
                        </button>

                        {/* Freeze/Unfreeze tugmasi */}
                        <button
                          onClick={() =>
                            handleFreeze(scholar.freeze, scholar._id)
                          }
                          title={
                            scholar.freeze ? "Muzdan chiqarish" : "Muzlatish"
                          }
                          className={`p-2 rounded-lg transition cursor-pointer ${
                            userRole === "Editor"
                              ? "text-slate-400 hover:text-blue-600 hover:bg-blue-50"
                              : "hidden"
                          }`}
                        >
                          <IceCream className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleDeleteScholar(scholarId)}
                          className={
                            userRole === "Editor"
                              ? "p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                              : "hidden"
                          }
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="bg-slate-50/80 p-5 border-t border-slate-100 space-y-6">
                        <div className="flex flex-col md:flex-row gap-6 bg-white p-4 rounded-xl border border-slate-200/80">
                          <div className="shrink-0 flex flex-col items-center gap-2">
                            <div className="w-28 h-36 bg-slate-100 border border-slate-200 rounded-xl overflow-hidden flex items-center justify-center text-slate-400">
                              {scholar.photo3x4 ? (
                                <img
                                  src={
                                    scholar.photo3x4.startsWith("http")
                                      ? scholar.photo3x4
                                      : `${SITE_LINK}${scholar.photo3x4}`
                                  }
                                  alt="3x4 Rasm"
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <span className="text-xs text-center p-2 text-slate-400">
                                  3x4 Rasm yo'q
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex-1 space-y-2 text-xs">
                            <h4 className="font-bold text-slate-800 text-base border-b pb-2">
                              {scholar.fullName || "Ism ko'rsatilmagan"}
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-slate-600">
                              <div className="flex items-center gap-2">
                                <Building className="w-4 h-4 text-slate-400" />
                                <span>
                                  <strong>OTM:</strong>{" "}
                                  {scholar.university || "—"}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <GraduationCap className="w-4 h-4 text-slate-400" />
                                <span>
                                  <strong>Yo'nalish / Daraja:</strong>{" "}
                                  {scholar.fieldOfStudy || "—"} (
                                  {scholar.degree || "—"})
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-slate-400" />
                                <span>
                                  <strong>Email:</strong> {scholar.email || "—"}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-slate-400" />
                                <span>
                                  <strong>Tel:</strong> {scholar.phone || "—"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {scholar.achievements &&
                          scholar.achievements.length > 0 && (
                            <div className="space-y-2">
                              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                                <Award className="w-4 h-4 text-amber-500" />
                                Erishilgan Yutuq va Stipendiyalar
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {scholar.achievements.map((ach) => (
                                  <div
                                    key={getId(ach)}
                                    className="bg-white p-3 rounded-xl border border-amber-200/60 flex items-start justify-between gap-2 shadow-2xs"
                                  >
                                    <div>
                                      <p className="font-semibold text-xs text-slate-800">
                                        {ach.title}
                                      </p>
                                      <p className="text-[11px] text-slate-500 mt-0.5">
                                        {ach.description}
                                      </p>
                                      <span className="inline-block mt-1 text-[10px] bg-amber-50 text-amber-700 px-2 py-0.5 rounded font-mono">
                                        {ach.year}-yil
                                      </span>
                                    </div>
                                    {ach.certificateUrl && (
                                      <a
                                        href={ach.certificateUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-blue-600 hover:text-blue-800 p-1 shrink-0"
                                        title="Sertifikatni ko'rish"
                                      >
                                        <ExternalLink className="w-4 h-4" />
                                      </a>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                        <div className="space-y-2">
                          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                            Biriktirilgan Hujjatlar
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                            {docLabels.map((docItem) => {
                              const docPath = scholar.documents?.[docItem.key];
                              const isUploaded = Boolean(docPath);
                              const fullFileUrl = isUploaded
                                ? docPath.startsWith("http")
                                  ? docPath
                                  : `${SITE_LINK}${docPath}`
                                : null;

                              return (
                                <div
                                  key={docItem.key}
                                  className={`p-3 rounded-xl border flex items-center justify-between gap-2 transition ${
                                    isUploaded
                                      ? "bg-white border-slate-200 shadow-2xs"
                                      : "bg-slate-100/50 border-slate-200/50"
                                  }`}
                                >
                                  <span className="font-medium text-slate-700">
                                    {docItem.label}:
                                  </span>

                                  <div>
                                    {isUploaded ? (
                                      <a
                                        href={fullFileUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-1 font-semibold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-2.5 py-1 rounded-md transition"
                                      >
                                        <FileCheck className="w-3.5 h-3.5" />
                                        Faylni ochish
                                        <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
                                      </a>
                                    ) : (
                                      <span className="inline-flex items-center gap-1 text-slate-400 bg-slate-200/60 px-2 py-0.5 rounded-md text-[11px]">
                                        <FileX className="w-3.5 h-3.5" />
                                        Yuklanmagan
                                      </span>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        <AdminPaymentReceiptSection
                          stpdata={scholar}
                          onUpdateSuccess={fetchData}
                        />
                        <AchievementManager
                          stpdata={scholar}
                          onUpdateSuccess={fetchData}
                        />
                      </div>
                    )}
                  </div>
                );
              }
            })}
        </div>
      </div>
    </div>
  );
}

export default Scholar;
