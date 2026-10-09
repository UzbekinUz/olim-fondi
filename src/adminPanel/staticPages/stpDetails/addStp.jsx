import { RefreshCw, X, UserPlus, Key, User, GraduationCap, Tag } from "lucide-react";

function AddS({
  loadingAction,
  setScholarForm,
  generateScholarCreds,
  scholarForm,
  setIsAddScholarModal,
  handleAddScholar,
}) {
  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md border border-slate-100 overflow-hidden transform transition-all">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-base">
                Yangi Stipendiat Qo'shish
              </h3>
              <p className="text-xs text-slate-500">
                Tizimga kirish ma'lumotlarini kiriting
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAddScholarModal(false)}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleAddScholar} className="p-6 space-y-4">
          {/* Login Field */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Login / Foydalanuvchi nomi
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={scholarForm.login}
                onChange={(e) =>
                  setScholarForm({ ...scholarForm, login: e.target.value })
                }
                placeholder="stipendiat_123"
                className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Parol
            </label>
            <div className="relative">
              <Key className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={scholarForm.password}
                onChange={(e) =>
                  setScholarForm({
                    ...scholarForm,
                    password: e.target.value,
                  })
                }
                placeholder="••••••••"
                className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition"
              />
            </div>
          </div>

          {/* Category Field (Text Input) */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Kategoriya
            </label>
            <div className="relative">
              <Tag className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={scholarForm.category || ""}
                onChange={(e) =>
                  setScholarForm({ ...scholarForm, category: e.target.value })
                }
                placeholder="Kategoriyani kiriting (masalan: Prezident, Ibn Sino...)"
                className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition"
              />
            </div>
          </div>

          {/* Type Select Field */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Stipendiya turi
            </label>
            <div className="relative">
              <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                value={scholarForm.type}
                onChange={(e) =>
                  setScholarForm({ ...scholarForm, type: e.target.value })
                }
                className="w-full pl-10 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition appearance-none cursor-pointer"
              >
                <option value="">Stipendiya turini tanlang</option>
                <option value="Stipendiyali">Stipendiyali</option>
                <option value="Stipendiyasiz">Stipendiyasiz</option>
              </select>
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                ▼
              </div>
            </div>
          </div>

          {/* Random Generator */}
          <div className="pt-1">
            <button
              type="button"
              onClick={generateScholarCreds}
              className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50/60 hover:bg-blue-100/60 px-3 py-2 rounded-xl transition cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Tasodifiy generatsiya
            </button>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end gap-2.5 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsAddScholarModal(false)}
              className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition cursor-pointer"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              disabled={loadingAction}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl transition shadow-md shadow-blue-500/20 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loadingAction && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
              {loadingAction ? "Saqlanmoqda..." : "Qo'shish"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddS;