import { Edit, Trash2 } from "lucide-react";

function Expert({experts,getId,setEditItem,handleDeleteExpert}) {
    return ( 
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <h2 className="font-semibold text-slate-700 text-sm">
                Ekspertlar Ro'yxati ({experts.length})
              </h2>
            </div>
            <div className="divide-y divide-slate-100 text-sm">
              {experts.map((expert) => {
                const expertId = getId(expert);
                return (
                  <div
                    key={expertId}
                    className="p-4 flex items-center justify-between hover:bg-slate-50/60 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs">
                        E
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800">
                          {expert.fullName || expert.username}
                        </h3>
                        <p className="text-xs text-slate-400">
                          @{expert.username} • {expert.role || "Ekspert"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() =>
                          setEditItem({ type: "expert", data: { ...expert } })
                        }
                        className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition cursor-pointer"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteExpert(expertId)}
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
     );
}

export default Expert;