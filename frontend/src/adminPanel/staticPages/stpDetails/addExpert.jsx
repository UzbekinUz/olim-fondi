import { RefreshCw, X } from "lucide-react";

function AddExpert({loadingAction,setExpertForm,setIsAddExpertModal,handleAddExpert, expertForm,generateExpertCreds}) {
    return ( 
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md border border-slate-100 overflow-hidden">
              <div className="flex items-center justify-between p-5 border-b border-slate-100">
                <h3 className="font-bold text-slate-800">
                  Yangi Ekspert Qo'shish
                </h3>
                <button
                  onClick={() => setIsAddExpertModal(false)}
                  className="text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddExpert} className="p-5 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Foydalanuvchi nomi
                  </label>
                  <input
                    type="text"
                    required
                    value={expertForm.username}
                    onChange={(e) =>
                      setExpertForm({ ...expertForm, username: e.target.value })
                    }
                    placeholder="expert_123"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Parol
                  </label>
                  <input
                    type="text"
                    required
                    value={expertForm.password}
                    onChange={(e) =>
                      setExpertForm({ ...expertForm, password: e.target.value })
                    }
                    placeholder="••••••••"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                  />
                </div>

                <div className="flex justify-between items-center pt-2">
                  <button
                    type="button"
                    onClick={generateExpertCreds}
                    className="flex items-center gap-1.5 text-xs text-indigo-600 hover:text-indigo-700 font-medium cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Tasodifiy generatsiya
                  </button>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setIsAddExpertModal(false)}
                      className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition cursor-pointer"
                    >
                      Bekor qilish
                    </button>
                    <button
                      type="submit"
                      disabled={loadingAction}
                      className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition cursor-pointer disabled:opacity-50"
                    >
                      {loadingAction ? "Saqlanmoqda..." : "Qo'shish"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
     );
}

export default AddExpert;