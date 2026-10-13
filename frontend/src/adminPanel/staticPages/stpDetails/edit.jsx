import { GraduationCap, X } from "lucide-react";

function Edit({ loadingAction, editItem, setEditItem, handleSaveEdit }) {
  if (!editItem) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md border border-slate-100 overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <h3 className="font-bold text-slate-800">
            {editItem.type === "scholar"
              ? "Stipendiatni Tahrirlash"
              : "Ekspertni Tahrirlash"}
          </h3>
          <button
            onClick={() => setEditItem(null)}
            className="text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSaveEdit} className="p-5 space-y-4">
          {editItem.type === "scholar" ? (
            <>
              {/* F.I.SH */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  F.I.SH
                </label>
                <input
                  type="text"
                  value={editItem.data.fullName || ""}
                  onChange={(e) =>
                    setEditItem({
                      ...editItem,
                      data: {
                        ...editItem.data,
                        fullName: e.target.value,
                      },
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                />
              </div>

              {/* Login */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Login
                </label>
                <input
                  type="text"
                  value={editItem.data.login || ""}
                  onChange={(e) =>
                    setEditItem({
                      ...editItem,
                      data: { ...editItem.data, login: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                />
              </div>

              {/* Password (TUZATILGAN QISM) */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Yangi Parol (O'zgartirmaslik uchun bo'sh qoldiring)
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={editItem.data.password || ""}
                  onChange={(e) =>
                    setEditItem({
                      ...editItem,
                      data: { ...editItem.data, password: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Status
                </label>
                <select
                  value={editItem.data.status || ""}
                  onChange={(e) =>
                    setEditItem({
                      ...editItem,
                      data: { ...editItem.data, status: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none bg-white"
                >
                  <option value="">Statusni tanlang</option>
                  <option value="active">Active</option>
                  <option value="suspended">Suspended (chetlashtirilgan)</option>
                  <option value="graduated">Graduated</option>
                </select>
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Kategoriya
                </label>
                <input
                  type="text"
                  value={editItem.data.category || ""}
                  onChange={(e) =>
                    setEditItem({
                      ...editItem,
                      data: {
                        ...editItem.data,
                        category: e.target.value,
                      },
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                />
              </div>

              {/* Stipendiya turi */}
              <div className="relative">
                <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  value={editItem.data.type || ""}
                  onChange={(e) =>
                    setEditItem({
                      ...editItem,
                      data: { ...editItem.data, type: e.target.value },
                    })
                  }
                  className="w-full pl-10 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition appearance-none cursor-pointer"
                >
                  <option value="">Stipendiya turini tanlang</option>
                  <option value="Stipendiyali">Stipendiyali</option>
                  <option value="Stipendiyasiz">Stipendiyasiz</option>
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
                  ▼
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Ekspert Username */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Foydalanuvchi nomi (Username)
                </label>
                <input
                  type="text"
                  required
                  value={editItem.data.username || ""}
                  onChange={(e) =>
                    setEditItem({
                      ...editItem,
                      data: {
                        ...editItem.data,
                        username: e.target.value,
                      },
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                />
              </div>

              {/* Ekspert Paroli */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Yangi Parol (O'zgartirmaslik uchun bo'sh qoldiring)
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={editItem.data.password || ""}
                  onChange={(e) =>
                    setEditItem({
                      ...editItem,
                      data: {
                        ...editItem.data,
                        password: e.target.value,
                      },
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                />
              </div>
            </>
          )}

          {/* Tugmalar */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setEditItem(null)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition cursor-pointer"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              disabled={loadingAction}
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition cursor-pointer disabled:opacity-50"
            >
              {loadingAction ? "Saqlanmoqda..." : "Saqlash"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Edit;