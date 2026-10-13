import { useState, useRef } from "react";
import {
  FaFileInvoiceDollar,
  FaFilePdf,
  FaEye,
  FaCloudUploadAlt,
  FaReceipt,
  FaCheckCircle,
  FaDownload,
  FaClock,
  FaSpinner,
  FaExclamationTriangle,
  FaUpload,
} from "react-icons/fa";
import { SITE_LINK, API_LINK } from "../cfg";
import axios from "axios";

function ContractAndPaymentSection({ stpdata, ref }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef(null);

  // Input'da fayl tanlanganda holatga (state) saqlash
  const handleFileSelect = (e) => {
    setErrorMessage("");
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
      setErrorMessage("Faqat PDF formatidagi hujjatni tanlang!");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage("Fayl hajmi 5MB dan oshmasligi kerak!");
      return;
    }

    setSelectedFile(file);
  };

  // "Yuklash" tugmasi bosilganda serverga API orqali jo'natish
  const handleUploadSubmit = async () => {
    if (!selectedFile) {
      setErrorMessage("Iltimos, avval PDF fayl tanlang!");
      return;
    }

    try {
      setUploading(true);
      setErrorMessage("");

      const formData = new FormData();
      formData.append("contractAgreement", selectedFile);

      const token = localStorage.getItem("access_stp_token");
      const res = await axios.post(
        `${API_LINK}/stipendiat/adddocstp`,
        formData,
        {
          headers: {
            "x-stp-token": token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res?.data?.ok || res?.status === 200) {
        ref()
        alert(res.data.msg);
        if (fileInputRef.current) fileInputRef.current.value = "";
        setSelectedFile(null);
      } else {
        setErrorMessage(res?.data?.msg || "Fayl yuklashda xatolik yuz berdi!");
      }
    } catch (err) {
      console.error("Yuklashda xatolik:", err);
      setErrorMessage("Server bilan bog'lanishda xatolik yuz berdi!");
    } finally {
      setUploading(false);
    }
  };

  const contractDoc = stpdata?.contractAgreement;
  const paymentReceipt = stpdata?.paymentReceipt;

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
      {/* Sektor sarlavhasi */}
      <h2 className="text-lg font-black text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-4">
        <FaFileInvoiceDollar className="text-blue-600 text-xl" /> Kontrakt va To'lov Ma'lumotlari
      </h2>

      {/* Xatolik bo'lsa ko'rsatish */}
      {errorMessage && (
        <div className="flex items-center gap-2 p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-xl">
          <FaExclamationTriangle className="shrink-0 text-rose-500 text-base" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Yashirin fayl kiritish (input) */}
      <input
        type="file"
        ref={fileInputRef}
        accept="application/pdf"
        disabled={uploading}
        className="hidden"
        onChange={handleFileSelect}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 1-USTUN: KONTRAKT HUJJATI */}
        <div className="p-5 bg-slate-50/70 rounded-2xl border border-slate-200/80 flex flex-col justify-between gap-4">
          <div className="space-y-1.5">
            <h3 className="text-xs font-extrabold text-slate-800 flex items-center gap-2">
              <FaFilePdf className="text-rose-500 text-base" /> Kontrakt Hujjati (O'quv shartnomasi)
            </h3>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              OTM bilan tuzilgan ikki tomonlama kontrakt hujjatingizni PDF shaklida yuklang (Max 5MB).
            </p>
          </div>

          {contractDoc ? (
            /* Agar shartnoma allaqachon serverga yuklangan bo'lsa */
            <div className="flex items-center justify-between p-3 bg-emerald-50/80 border border-emerald-200/90 rounded-xl text-xs gap-2">
              <div className="flex items-center gap-2 truncate">
                <FaCheckCircle className="text-emerald-600 shrink-0 text-base" />
                <span className="truncate font-bold text-emerald-950">
                  Kontrakt yuklangan
                </span>
              </div>

              <a
                href={`${SITE_LINK}${stpdata.contractAgreement}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition shadow-xs shrink-0"
              >
                <FaEye className="text-xs" /> Ko'rish
              </a>
            </div>
          ) : (
            /* Agar shartnoma hali yuklanmagan bo'lsa */
            <div className="space-y-3">
              {selectedFile ? (
                /* Fayl tanlangandan keyin chiqadigan ko'rinish */
                <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl space-y-3">
                  <div className="flex items-center gap-2 text-xs text-blue-900 font-bold truncate">
                    <FaFilePdf className="text-rose-500 text-lg shrink-0" />
                    <span className="truncate">{selectedFile.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={uploading}
                      onClick={handleUploadSubmit}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition shadow-xs disabled:opacity-50"
                    >
                      {uploading ? (
                        <>
                          <FaSpinner className="animate-spin text-sm" />
                          <span>Yuklanmoqda...</span>
                        </>
                      ) : (
                        <>
                          <FaUpload className="text-xs" />
                          <span>Yuklash</span>
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
                      className="px-3 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-lg transition"
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
                  className="w-full flex items-center justify-center gap-2 p-4 rounded-xl border border-dashed border-blue-300 bg-white hover:bg-blue-50 text-blue-600 text-xs font-bold transition"
                >
                  <FaCloudUploadAlt className="text-xl" />
                  <span>Fayl tanlash (PDF)</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* 2-USTUN: TO'LOV CHEKI (Admin yuklaydi) */}
        <div className="p-5 bg-slate-50/70 rounded-2xl border border-slate-200/80 flex flex-col justify-between gap-4">
          <div className="space-y-1.5">
            <h3 className="text-xs font-extrabold text-slate-800 flex items-center gap-2">
              <FaReceipt className="text-emerald-600 text-base" /> Jamg'arma To'lov Cheki
            </h3>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Jamg'arma tomonidan to'lov amalga oshirilgach, rasmiy chek shu yerda ko'rinadi.
            </p>
          </div>

          {paymentReceipt ? (
            <div className="flex items-center justify-between p-3 bg-emerald-50/80 border border-emerald-200/90 rounded-xl text-xs">
              <div className="flex items-center gap-2.5 truncate">
                <FaCheckCircle className="text-emerald-600 shrink-0 text-base" />
                <span className="truncate font-bold text-emerald-950">
                  To`lov tasdiqlangan
                </span>
              </div>
              <a
                href={`${SITE_LINK}${stpdata.paymentReceipt}`}
                target="_blank"
                rel="noreferrer"
                download
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition shadow-xs shrink-0"
              >
                <FaDownload className="text-xs" /> O'rnatib olish
              </a>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2 p-3 bg-amber-50/80 border border-amber-200/80 rounded-xl text-amber-900 text-xs font-semibold">
              <FaClock className="text-amber-600 shrink-0" />
              <span>To'lov cheki kutilmoqda (Admin biriktiradi)</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ContractAndPaymentSection;