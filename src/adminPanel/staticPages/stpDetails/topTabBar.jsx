import { Plus, UserCheck, Users } from "lucide-react";

function TopTabBar({setActiveTab,activeTab,setIsAddExpertModal,setIsAddScholarModal,userRole}) {
    return ( 
        <div className="bg-white rounded-2xl p-4 md:p-6 shadow-xs border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab("scholars")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition cursor-pointer ${
                activeTab === "scholars"
                  ? "bg-white text-blue-600 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Users className="w-4 h-4" />
              Stipendiatlar
            </button>
            <button
              onClick={() => setActiveTab("experts")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition cursor-pointer ${
                userRole === "Bugalter"? "hidden" : activeTab === "experts"
                  ? "bg-white text-indigo-600 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <UserCheck className="w-4 h-4" />
              Ekspertlar
            </button>
          </div>

          <div className={userRole === "Bugalter" ? "hidden" : ""}>
            {activeTab === "scholars" ? (
              <button
                onClick={() => setIsAddScholarModal(true)}
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-medium text-sm transition shadow-xs w-full md:w-auto cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Yangi Stipendiat
              </button>
            ) : (
              <button
                onClick={() => setIsAddExpertModal(true)}
                className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl font-medium text-sm transition shadow-xs w-full md:w-auto cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Yangi Ekspert
              </button>
            )}
          </div>
        </div>
     );
}

export default TopTabBar;