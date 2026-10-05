import { useState, useEffect } from "react";
import {
  FaUser,
  FaCloudUploadAlt,
  FaCheckCircle,
  FaExclamationTriangle,
  FaTrashAlt,
  FaFilePdf,
  FaEye,
  FaIdCard,
  FaLock,
  FaSave,
  FaSnowflake,
} from "react-icons/fa";
import { HiDocumentText } from "react-icons/hi";
import { SITE_LINK } from "../cfg";
import ContractAndPaymentSection from "./addDoc";

// Stipendiat yuklashi kerak bo'lgan hujjatlar ro'yxati
const REQUIRED_DOCUMENTS = [
  { id: "residenceCertificate", label: "Yashash joyidan ma'lumotnoma" },
  { id: "studyCertificate", label: "O'qish joyidan ma'lumotnoma" },
  { id: "familyCertificate", label: "Oila a'zolari haqida ma'lumotnoma" },
  { id: "passportCopy", label: "Pasport nusxasi (ID / Pasport)" },
  { id: "motivationLetter", label: "Yuklagan motivatsion xati" },
  { id: "objectiveSheet", label: "Namunaviy obyektivka (Ma'lumotnoma)" },
  { id: "schoolDiploma", label: "Shahodatnoma / Diplom" },
  { id: "transcript", label: "Transkript (Baho varaqasi)" },
  { id: "dtmResult", label: "DTM natijasi" },
  { id: "ieltsCertificate", label: "IELTS sertifikati" },
  { id: "cefrCertificate", label: "CEFR sertifikati" },
  { id: "achievementsProof", label: "Sertifikat (Boshqa)" },
  {
    id: "motivationProof",
    label: "Motivatsion xatda aytilgan ma'lumotlar isboti",
  },
];

// Majburiy text input maydonlari
const REQUIRED_FIELDS = [
  "fullName",
  "email",
  "phone",
  "university",
  "fieldOfStudy",
  "degree",
];

function ProfilForm({
  handleProfileUpdate,
  formData = {},
  handleChange,
  loading = false,
  handleDeleteDocument,
  setFiles,
  stpdata = {},
  files = {},
  handleRef,
  full = false,      // Parentdan kelgan holat
  setFull,           // Parentdagi stateni yangilovchi funksiya
}) {
  const [uploadingDocId, setUploadingDocId] = useState(null);

  // Akkaunt / Ma'lumotlar muzlatilganligini tekshirish
  const isFrozen = Boolean(stpdata?.freeze);

  // Forma to'liq to'ldirilganligini tekshirish va Parent state'iga uzatish
  useEffect(() => {
    // 1. Barcha majburiy text inputlar to'ldirilganmi?
    const areFieldsValid = REQUIRED_FIELDS.every(
      (field) => formData[field] && formData[field].toString().trim() !== ""
    );

    // 2. 3x4 rasm va barcha majburiy PDF hujjatlar yuklanganmi?
    const hasPhoto = Boolean(files.photo3x4);
    const areDocsValid = REQUIRED_DOCUMENTS.every((doc) => Boolean(files[doc.id]));

    // Umumiy holat
    const isComplete = areFieldsValid && hasPhoto && areDocsValid;

    // Parent stateni yangilaymiz (faqat qiymat o'zgargandagina chart/loop tushmasligi uchun)
    if (typeof setFull === "function" && full !== isComplete) {
      setFull(isComplete);
    }
  }, [formData, files, full, setFull]);

  const isProfileCompleted = stpdata?.isProfileCompleted || full;

  // Fayl yuklash handler
  const handleFileChange = (e, fieldName) => {
    if (isFrozen) return; // Agar muzlatilgan bo'lsa fayl yuklash bajarilmaydi

    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Fayl hajmi 5MB dan oshmasligi kerak!");
      e.target.value = "";
      return;
    }

    setUploadingDocId(fieldName);

    setFiles((prevFiles) => ({
      ...prevFiles,
      [fieldName]: file,
    }));

    setUploadingDocId(null);
  };

  // Fayl URL-ni aniqlash
  const getFileSrc = (fileData) => {
    if (!fileData) return "";
    if (typeof fileData === "string") {
      return fileData.startsWith("http") ? fileData : `${SITE_LINK}${fileData}`;
    }
    if (fileData instanceof File) {
      return URL.createObjectURL(fileData);
    }
    return "";
  };

  return (
    <form
      onSubmit={(e) => {
        if (isFrozen) {
          e.preventDefault();
          return;
        }
        handleProfileUpdate(e);
      }}
      className="space-y-8 font-sans max-w-7xl mx-auto pb-12"
    >
      {/* FREEZE (MUZLATILGAN) BANNERI - Agar stpdata.freeze true bo'lsa chiqadi */}
      {isFrozen && (
        <div className="p-4 bg-sky-50 border border-sky-200 text-sky-900 rounded-2xl flex items-center gap-3 shadow-xs">
          <div className="p-2.5 bg-sky-500 text-white rounded-xl">
            <FaSnowflake className="text-xl animate-spin-slow" />
          </div>
          <div>
            <h4 className="font-extrabold text-sm">Profil ma'lumotlari muzlatilgan</h4>
            <p className="text-xs text-sky-700">
              Profil holati muzlatilganligi sababli ma'lumotlarni o'zgartirish yoki yangi hujjat topshirish imkoniyati cheklangan.
            </p>
          </div>
        </div>
      )}

      {/* 1. STATUS BANNER */}
      <div
        className={`p-6 rounded-3xl border transition-all duration-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm ${
          full
            ? "bg-emerald-50/90 border-emerald-200/80 text-emerald-950"
            : "bg-amber-50/90 border-amber-200/80 text-amber-950"
        }`}
      >
        <div className="flex items-center gap-4">
          <div
            className={`p-3.5 rounded-2xl shrink-0 shadow-sm ${
              full
                ? "bg-emerald-500 text-white"
                : "bg-amber-500 text-white"
            }`}
          >
            {full ? (
              <FaCheckCircle className="text-2xl" />
            ) : (
              <FaExclamationTriangle className="text-2xl" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-base tracking-tight">
                Profil Holati: {full ? "To'liq" : "To'liq emas"}
              </h3>
              <span
                className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                  full
                    ? "bg-emerald-200/80 text-emerald-800"
                    : "bg-amber-200/80 text-amber-800"
                }`}
              >
                {full ? "Aktiv" : "Cheklangan"}
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
              {full
                ? "Sizning profilingiz va barcha hujjatlaringiz to'liq. Ariza topshirishingiz mumkin."
                : "Diqqat! Ariza bo'limiga o'tish uchun profil ma'lumotlari va barcha hujjatlar to'liq topshirilishi kerak."}
            </p>
          </div>
        </div>

        {!full && (
          <div className="flex items-center gap-2 text-amber-800 bg-amber-100/80 px-4 py-2.5 rounded-xl text-xs font-bold shrink-0 border border-amber-200/60">
            <FaLock /> Ariza Topshirish Yopiq
          </div>
        )}
      </div>

      {/* SHAXSIY MA'LUMOTLAR VA HUJJATLAR */}
      <div className="space-y-8">
        {/* 2. SHAXSIY MA'LUMOTLAR */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
          <h2 className="text-lg font-black text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-4">
            <FaIdCard className="text-blue-600" /> Shaxsiy ma'lumotlar
          </h2>

          {/* 3x4 Rasm yuklash bloki */}
          <div className="flex flex-col sm:flex-row items-center gap-6 p-4 bg-slate-50/70 border border-slate-200/80 rounded-2xl">
            <div className="relative w-28 h-36 bg-slate-200/70 rounded-xl overflow-hidden border-2 border-dashed border-slate-300 flex items-center justify-center shrink-0 group">
              {files.photo3x4 ? (
                <img
                  src={getFileSrc(files.photo3x4)}
                  alt="3x4 Rasm"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center p-2">
                  <FaUser className="text-3xl text-slate-400 mx-auto mb-1" />
                  <span className="text-[10px] text-slate-500 font-bold block">
                    3x4 Rasm *
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-2 text-center sm:text-left">
              <h4 className="text-xs font-bold text-slate-800">
                3x4 Rasmingizni yuklang <span className="text-rose-500">*</span>
              </h4>
              <p className="text-[11px] text-slate-500 max-w-xs leading-relaxed">
                Rasm sifatli, tiniq va rasmiy uslubda bo'lishi talab etiladi
                (JPG, PNG).
              </p>
              <label
                className={`inline-flex items-center gap-2 px-4 py-2 border rounded-xl text-xs font-bold transition ${
                  isFrozen
                    ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
                    : "bg-blue-50 text-blue-600 hover:bg-blue-100 border-blue-200/60 cursor-pointer"
                }`}
              >
                <FaCloudUploadAlt className="text-base" /> Rasm tanlash
                <input
                  type="file"
                  accept="image/*"
                  disabled={isFrozen}
                  className="hidden"
                  onChange={(e) => handleFileChange(e, "photo3x4")}
                />
              </label>
            </div>
          </div>

          {/* Input maydonlari */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                F.I.SH <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                disabled={isFrozen}
                value={formData.fullName || ""}
                onChange={handleChange}
                placeholder="Ism va familiyangiz"
                className="w-full p-3 border border-slate-200/90 rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition bg-slate-50/30 focus:bg-white disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Email <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                disabled={isFrozen}
                value={formData.email || ""}
                onChange={handleChange}
                placeholder="example@mail.com"
                className="w-full p-3 border border-slate-200/90 rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition bg-slate-50/30 focus:bg-white disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Telefon <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="phone"
                disabled={isFrozen}
                value={formData.phone || ""}
                onChange={handleChange}
                placeholder="+998 90 123 45 67"
                className="w-full p-3 border border-slate-200/90 rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition bg-slate-50/30 focus:bg-white disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Universitet (OTM) <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="university"
                disabled={isFrozen}
                value={formData.university || ""}
                onChange={handleChange}
                placeholder="OTM nomini kiriting"
                className="w-full p-3 border border-slate-200/90 rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition bg-slate-50/30 focus:bg-white disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Yo'nalish / Soha <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="fieldOfStudy"
                disabled={isFrozen}
                value={formData.fieldOfStudy || ""}
                onChange={handleChange}
                placeholder="Masalan: Iqtisodiyot yoki IT"
                className="w-full p-3 border border-slate-200/90 rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition bg-slate-50/30 focus:bg-white disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Ilmiy daraja <span className="text-rose-500">*</span>
              </label>
              <select
                name="degree"
                disabled={isFrozen}
                value={formData.degree || ""}
                onChange={handleChange}
                className="w-full p-3 border border-slate-200/90 rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition bg-slate-50/30 focus:bg-white disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed"
                required
              >
                <option value="">Tanlang...</option>
                <option value="Bakalavr">Bakalavr</option>
                <option value="Magistr">Magistr</option>
                <option value="PhD">PhD</option>
                <option value="Mustaqil izlanuvchi">Mustaqil izlanuvchi</option>
              </select>
            </div>
          </div>
        </div>

        {/* 3. MAJBURIY HUJJATLAR YUKLASH SEKSIYASI */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4 mb-6">
            <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
              <HiDocumentText className="text-blue-600 text-xl" /> Profil
              Hujjatlari
            </h2>
            <span className="text-[11px] font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full w-fit">
              Faqat PDF (Max 5MB)
            </span>
          </div>

          <p className="text-xs text-slate-500 mb-6 leading-relaxed">
            Stipendiya talablariga muvofiq, quyidagi barcha hujjatlarni to'liq
            va sifatli shaklda yuklashingiz shart:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {REQUIRED_DOCUMENTS.map((doc) => {
              const uploadedFile = files[doc.id];
              const isUploading = uploadingDocId === doc.id;

              return (
                <div
                  key={doc.id}
                  className={`p-4 rounded-2xl border flex flex-col justify-between gap-3 transition ${
                    uploadedFile
                      ? "bg-slate-50/70 border-slate-200/70"
                      : "bg-amber-50/30 border-amber-200/60"
                  }`}
                >
                  <span className="text-xs font-bold text-slate-800 leading-snug">
                    {doc.label} <span className="text-rose-500">*</span>
                  </span>

                  {/* Fayl statusi va yuklash boshqaruvi */}
                  {uploadedFile ? (
                    <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200 text-xs shadow-2xs">
                      <div className="flex items-center gap-2 truncate max-w-[170px]">
                        <FaFilePdf className="text-rose-500 shrink-0 text-base" />
                        <span className="truncate font-medium text-slate-700">
                          {uploadedFile.name || "Hujjat fayli"}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <a
                          href={getFileSrc(uploadedFile)}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="Ko'rish"
                        >
                          <FaEye />
                        </a>
                        {!isFrozen && (
                          <button
                            type="button"
                            onClick={() => {
                              if (handleDeleteDocument) {
                                handleDeleteDocument(doc.id);
                              } else {
                                setFiles((prev) => {
                                  const updated = { ...prev };
                                  delete updated[doc.id];
                                  return updated;
                                });
                              }
                            }}
                            className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                            title="O'chirish"
                          >
                            <FaTrashAlt />
                          </button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <label
                      className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border border-dashed text-xs font-bold transition ${
                        isFrozen
                          ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
                          : isUploading
                          ? "bg-slate-100 text-slate-400 border-slate-300 cursor-wait"
                          : "bg-white text-blue-600 border-blue-200 hover:bg-blue-50 hover:border-blue-300 cursor-pointer"
                      }`}
                    >
                      <FaCloudUploadAlt className="text-base" />
                      {isUploading ? "Yuklanmoqda..." : "Hujjatni yuklash"}
                      <input
                        type="file"
                        accept="application/pdf"
                        disabled={isUploading || isFrozen}
                        className="hidden"
                        onChange={(e) => handleFileChange(e, doc.id)}
                      />
                    </label>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Shartnoma va to'lov sektsiyasi */}
      <ContractAndPaymentSection stpdata={stpdata} ref={handleRef} isFrozen={isFrozen} />

      {/* PASTDAGI ASOIY SAQLASH TUGMASI (ACTION BAR) */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200/80 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 sticky bottom-4 z-10 backdrop-blur-md">
        <div className="text-xs text-slate-500 text-center sm:text-left">
          {isFrozen
            ? "Profil muzlatilgan. O'zgartirishlar kiritish imkonsiz."
            : "Ma'lumotlarni saqlashdan oldin barcha kiritilgan va yuklangan fayllar to'g'riligini tekshiring."}
        </div>
        <button
          type="submit"
          disabled={loading || isFrozen}
          className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white rounded-xl font-bold text-xs transition shadow-lg hover:shadow-blue-500/25 disabled:bg-slate-300 disabled:shadow-none disabled:cursor-not-allowed flex items-center justify-center gap-2 shrink-0"
        >
          <FaSave className="text-sm" />
          {loading
            ? "Saqlanmoqda..."
            : isFrozen
            ? "O'zgartirish muzlatilgan"
            : "Barcha ma'lumotlarni saqlash"}
        </button>
      </div>
    </form>
  );
}

export default ProfilForm;