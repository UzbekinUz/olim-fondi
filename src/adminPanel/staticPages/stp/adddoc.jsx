import { useState, useRef } from "react";
import {
  FaReceipt,
  FaCloudUploadAlt,
  FaCheckCircle,
  FaEye,
  FaTrashAlt,
  FaSpinner,
  FaExclamationTriangle,
  FaUpload,
  FaFilePdf,
} from "react-icons/fa";
import { SITE_LINK, API_LINK } from "../../cfg";
import axios from "axios";
import { ExternalLink } from "lucide-react";

function AdminPaymentReceiptSection({ stpdata, onUpdateSuccess }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef(null);

  const paymentReceipt = stpdata?.paymentReceipt;

  // Fayl manzilini shakllantirish
  const getFileSrc = (fileData) => {
    if (!fileData) return "";
    if (typeof fileData === "string") {
      return fileData.startsWith("http") ? fileData : `${SITE_LINK}${fileData}`;
    }
    return "";
  };

  // Fayl tanlash
  const handleFileSelect = (e) => {
    setErrorMessage("");
    const file = e.target.files?.[0];

    if (!file) return;

    // Faqat PDF va Rasm formatlariga ruxsat berish
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/webp",
    ];
    if (!allowedTypes.includes(file.type)) {
      setErrorMessage(
        "Faqat PDF yoki Rasm (JPG, PNG, WEBP) formatini tanlang!",
      );
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage("Fayl hajmi 10MB dan oshmasligi kerak!");
      return;
    }

    setSelectedFile(file);
  };

  // Chekni serverga yuklash (Admin API)
  const handleUploadSubmit = async () => {
    if (!selectedFile) {
      setErrorMessage("Iltimos, avval chek faylini tanlang!");
      return;
    }

    try {
      setUploading(true);
      setErrorMessage("");

      const formData = new FormData();
      formData.append("paymentReceipt", selectedFile);
      formData.append("id", stpdata?._id);

      const token = localStorage.getItem("access_admin_token"); // Admin tokeni
      const res = await axios.post(
        `${API_LINK}/stipendiat/adddocadmin`,
        formData,
        {
          headers: {
            "x-admin-token": token,
            "Content-Type": "multipart/form-data",
          },
        },
      );
    //   console.log(res.data,stpdata);
      
      if (res?.data?.ok) {
        alert(res.data?.msg || "To'lov cheki muvaffaqiyatli yuklandi!");
        if (fileInputRef.current) fileInputRef.current.value = "";
        setSelectedFile(null);
        onUpdateSuccess();
      } else {
        setErrorMessage(res?.data?.msg || "Fayl yuklashda xatolik yuz berdi!");
      }
    } catch (err) {
      console.error("Yuklashda xatolik:", err);
      console.log(err);
      
      setErrorMessage(
        err.response?.data?.msg || "Server bilan bog'lanishda xatolik!",
      );
    } finally {
      setUploading(false);
    }
  };

  // Chekni o'chirish (Admin API)
  const handleDeleteReceipt = async () => {
    if (!window.confirm("Rostdan ham ushbu to'lov chekini o'chirmoqchimisiz?"))
      return;

    try {
      setDeleting(true);
      setErrorMessage("");

      const token = localStorage.getItem("access_admin_token");

      // Backend (req.body) qabul qilishi uchun { data: { ... } } shaklida yuboriladi
      const res = await axios.delete(
        `${API_LINK}/stipendiat/deldocadmin`,
        {
          headers: {
            "x-admin-token": token,
          },
          data: {
            id: stpdata._id, // Bu yerga stipendiatning ID sini bering (masalan: stipendiat._id)
            docType: "paymentReceipt", // Qaysi hujjat o'chirilishi ko'rsatiladi
          },
        }
      );

      if (res?.data?.ok) {
        alert(res?.data?.msg || "To'lov cheki muvaffaqiyatli o'chirildi!");
        if (onUpdateSuccess) onUpdateSuccess();
      } else {
        setErrorMessage(res?.data?.msg || "O'chirishda xatolik yuz berdi!");
      }
    } catch (err) {
      console.error("O'chirishda xatolik:", err);
      setErrorMessage(
        err.response?.data?.msg || "Server bilan bog'lanishda xatolik!"
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="p-5 bg-slate-50/70 rounded-2xl border border-slate-200/80 flex flex-col justify-between gap-4">
      {/* Sarlavha va Tavsif */}
      <div
        
        className="bg-white p-3 rounded-xl border border-amber-200/60 flex items-start justify-between gap-2 shadow-2xs"
      >
        <div>
          <p className="font-semibold text-xs text-slate-800">KONTRAKT SHARTNOIMASI</p>
          
        </div>
        {stpdata.contractAgreement && (
          <a
            href={`${SITE_LINK}${stpdata.contractAgreement}`}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 hover:text-blue-800 p-1 shrink-0"
            title="Sertifikatni ko'rish"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>
      <div className="space-y-1.5">
        <h3 className="text-xs font-extrabold text-slate-800 flex items-center gap-2">
          <FaReceipt className="text-emerald-600 text-base" /> Jamg'arma To'lov
          Cheki (Admin Paneli)
        </h3>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          Talabaga to'lov amalga oshirilgandan so'ng rasmiy chek (PDF/Rasm)
          biriktiring.
        </p>
      </div>

      {/* Xatolik xabari */}
      {errorMessage && (
        <div className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-xl">
          <FaExclamationTriangle className="shrink-0 text-rose-500 text-base" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Yashirin fayl inputi */}
      <input
        type="file"
        ref={fileInputRef}
        accept="application/pdf,image/*"
        disabled={uploading || deleting}
        className="hidden"
        onChange={handleFileSelect}
      />

      {paymentReceipt ? (
        /* Agar to'lov cheki allaqachon biriktirilgan bo'lsa */
        <div className="flex items-center justify-between p-3 bg-emerald-50/80 border border-emerald-200/90 rounded-xl text-xs gap-2">
          <div className="flex items-center gap-2.5 truncate">
            <FaCheckCircle className="text-emerald-600 shrink-0 text-base" />
            <span className="truncate font-bold text-emerald-950">
              Chek biriktirilgan
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={getFileSrc(paymentReceipt)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition shadow-xs"
            >
              <FaEye className="text-xs" /> Ko'rish
            </a>

            <button
              type="button"
              disabled={deleting}
              onClick={handleDeleteReceipt}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg transition shadow-xs disabled:opacity-50"
            >
              {deleting ? (
                <FaSpinner className="animate-spin" />
              ) : (
                <FaTrashAlt className="text-xs" />
              )}{" "}
              O'chirish
            </button>
          </div>
        </div>
      ) : (
        /* Chek biriktirilmagan bo'lsa */
        <div className="space-y-3">
          {selectedFile ? (
            /* Fayl tanlanganda ko'rinadigan blok */
            <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl space-y-3">
              <div className="flex items-center gap-2 text-xs text-blue-900 font-bold truncate">
                <FaFilePdf className="text-emerald-600 text-lg shrink-0" />
                <span className="truncate">{selectedFile.name}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={uploading}
                  onClick={handleUploadSubmit}
                  className="flex-1 flex items-center justify-center gap-2 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition shadow-xs disabled:opacity-50"
                >
                  {uploading ? (
                    <>
                      <FaSpinner className="animate-spin text-sm" />
                      <span>Yuklanmoqda...</span>
                    </>
                  ) : (
                    <>
                      <FaUpload className="text-xs" />
                      <span>Chekni Saqlash</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  disabled={uploading}
                  onClick={() => {
                    setSelectedFile(null);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                  className="px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-lg transition"
                >
                  Bekor qilish
                </button>
              </div>
            </div>
          ) : (
            /* Fayl tanlash tugmasi */
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex items-center justify-center gap-2 p-4 rounded-xl border border-dashed border-emerald-300 bg-white hover:bg-emerald-50 text-emerald-700 text-xs font-bold transition"
            >
              <FaCloudUploadAlt className="text-xl" />
              <span>To'lov chekini yuklash (PDF/Rasm)</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default AdminPaymentReceiptSection;
