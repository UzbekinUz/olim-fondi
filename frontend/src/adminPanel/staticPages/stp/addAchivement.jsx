import { useState } from "react";
import axios from "axios";
import {
  Trash2,
  Plus,
  Loader2,
  Award,
  Calendar,
  Link as LinkIcon,
  FileText,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { API_LINK } from "../../cfg";

const API_BASE_URL = API_LINK;

const AchievementManager = ({ stpdata, onUpdateSuccess }) => {
  const achievementsList = stpdata?.achievements || [];
  
  const [newAchievement, setNewAchievement] = useState({
    title: "",
    year: "",
    description: "",
    certificateUrl: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAchievement((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddAchievement = async (e) => {
    e.preventDefault();
    if (!newAchievement.title.trim() || !newAchievement.year.trim()) {
      setError("Sarlavha va yil majburiy!");
      return;
    }

    setSubmitting(true);
    setError("");
    try {
      const response = await axios.put(
        `${API_BASE_URL}/stipendiat/achievements`,
        { id: stpdata?._id, achievements: { ...newAchievement } },
        {
          headers: {
            "x-admin-token": localStorage.getItem("access_admin_token"),
          },
        }
      );

      if (response.data?.ok) {
        if (typeof onUpdateSuccess === "function") {
          onUpdateSuccess();
        }
        setNewAchievement({
          title: "",
          year: "",
          description: "",
          certificateUrl: "",
        });
      }
    } catch (err) {
      console.error("Yutuq qo'shishda xatolik:", err);
      setError("Yutuqni saqlashda xatolik yuz berdi.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteAchievement = async (achievementId) => {
  if (!window.confirm("Rostdan ham ushbu yutuqni o'chirmoqchimisiz?")) return;

  // Massivdan o'chirilayotgan yutuqni chiqarib tashlaymiz
  const updatedAchievements = achievementsList.filter(
    (item) => (item._id || item.title) !== achievementId
  );

  try {
    const response = await axios.put(
      `${API_BASE_URL}/stipendiat/achievements`, // yoki edit yo'nalishingiz
      {
        id: stpdata._id,
        achievements: updatedAchievements, // Yangilangan massiv
      },
      {
        headers: {
          "x-admin-token": localStorage.getItem("access_admin_token"),
        },
      }
    );
    

    if (response.data.ok) {
      onUpdateSuccess(); // Ma'lumotlarni qayta yuklash
    }
  } catch (err) {
    console.error("O'chirishda xatolik:", err);
  }
};

  return (
    <div className="max-w-4xl mx-auto p-0 md:p-8 bg-white text-slate-800 transition-all">
      {/* Sarlavha qismi */}
      <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
        <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
          <Award className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-800">
            Yutuqlar va Sertifikatlar
          </h2>
          <p className="text-xs text-slate-500">
            O'z yutuqlaringiz, erishgan natijalaringiz va sertifikatlaringizni boshqaring
          </p>
        </div>
      </div>

      {/* Xatolik xabari */}
      {error && (
        <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-sm flex items-center gap-3 animate-fadeIn">
          <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Form qismi */}
      <form
        onSubmit={handleAddAchievement}
        className="space-y-4 mb-8 bg-slate-50/80 "
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
              Sarlavha <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Award className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                type="text"
                name="title"
                placeholder="Masalan: Web Development Competition"
                value={newAchievement.title}
                onChange={handleInputChange}
                className="w-full bg-white border border-slate-200 rounded-lg pl-10 pr-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
              Yil <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Calendar className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                type="text"
                name="year"
                placeholder="Masalan: 2024"
                value={newAchievement.year}
                onChange={handleInputChange}
                className="w-full bg-white border border-slate-200 rounded-lg pl-10 pr-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                required
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">
            Sertifikat / Hujjat URL <span className="text-slate-400 font-normal">(ixtiyoriy)</span>
          </label>
          <div className="relative">
            <LinkIcon className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="url"
              name="certificateUrl"
              placeholder="https://example.com/certificate.pdf"
              value={newAchievement.certificateUrl}
              onChange={handleInputChange}
              className="w-full bg-white border border-slate-200 rounded-lg pl-10 pr-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">
            Tavsif <span className="text-slate-400 font-normal">(ixtiyoriy)</span>
          </label>
          <div className="relative">
            <FileText className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <textarea
              name="description"
              rows="2"
              placeholder="Yutuq haqida qisqacha ma'lumot..."
              value={newAchievement.description}
              onChange={handleInputChange}
              className="w-full bg-white border border-slate-200 rounded-lg pl-10 pr-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none transition-all"
            ></textarea>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="flex items-center justify-center gap-2 w-full md:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white rounded-lg font-medium text-sm shadow-sm hover:shadow transition-all cursor-pointer"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Qo'shilmoqda...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" /> Yutuq qo'shish
              </>
            )}
          </button>
        </div>
      </form>

      {/* Ro'yxat qismi */}
      <div>
        <h3 className="text-base font-bold text-slate-700 mb-3 flex items-center justify-between">
          <span>Mavjud Yutuqlar</span>
          <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-semibold">
            {achievementsList.length} ta
          </span>
        </h3>

        {achievementsList.length === 0 ? (
          <div className="text-center py-8 px-4 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
            <Award className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-slate-500 text-sm font-medium">
              Hozircha hech qanday yutuq qo'shilmagan.
            </p>
            <p className="text-slate-400 text-xs mt-1">
              Yangi yutuq qo'shish uchun yuqoridagi shakldan foydalaning.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {achievementsList.map((item, index) => {
              const itemKey = item?._id || item?.id || `${item?.title}-${item?.year}-${index}`;

              return (
                <div
                  key={itemKey}
                  className="flex items-start justify-between bg-white p-4 rounded-xl border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow transition-all"
                >
                  <div className="space-y-1.5 pr-4">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h4 className="font-bold text-slate-800 text-sm md:text-base">
                        {item?.title}
                      </h4>
                      <span className="text-xs bg-blue-50 text-blue-600 px-2.5 py-0.5 rounded-full font-semibold border border-blue-100">
                        {item?.year}
                      </span>
                    </div>

                    {item?.description && (
                      <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                        {item?.description}
                      </p>
                    )}

                    {item?.certificateUrl && (
                      <a
                        href={item?.certificateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline pt-1 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Sertifikatni ko'rish
                      </a>
                    )}
                  </div>

                  <button
                    onClick={() => handleDeleteAchievement(item?._id)}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all shrink-0"
                    title="O'chirish"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AchievementManager;