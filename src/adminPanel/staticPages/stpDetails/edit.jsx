import { X } from "lucide-react";

function Edit({ loadingAction, editItem, setEditItem, handleSaveEdit }) {
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
            </>
          ) : (
            <>
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
