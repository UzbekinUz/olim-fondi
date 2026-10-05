import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaArrowLeft, FaExclamationTriangle } from "react-icons/fa";

export default function NotFound({ L }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center p-6 bg-slate-50">
      <div className="max-w-md space-y-6">
        <div className="w-20 h-20 bg-red-100 text-red-500 rounded-3xl flex items-center justify-center mx-auto shadow-sm">
          <FaExclamationTriangle className="text-4xl" />
        </div>

        <div className="space-y-2">
          <h1 className="text-6xl font-black text-slate-900 tracking-tight">404</h1>
          <h2 className="text-xl font-bold text-slate-800">
            {L
              ? L({ uz: "Sahifa topilmadi yoki ruxsat yo'q!", ru: "Страница не найдена!" })
              : "Sahifa topilmadi yoki ruxsat yo'q!"}
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Siz qidirayotgan sahifa mavjud emas, o'chirilgan yoki unga kirish uchun tizimdan o'tmagansiz.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto px-5 py-2.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-2xs"
          >
            <FaArrowLeft />
            <span>Orqaga qaytish</span>
          </button>

          <Link
            to="/"
            className="w-full sm:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-md shadow-blue-200"
          >
            <FaHome />
            <span>Bosh sahifa</span>
          </Link>
        </div>
      </div>
    </div>
  );
}