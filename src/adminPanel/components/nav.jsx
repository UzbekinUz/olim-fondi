import { FileText, LayoutDashboard, Newspaper, Settings2, User, Users2 } from "lucide-react";

function Navbar({adminInfo, currentTab, setCurrentTab, setSidebarOpen, statPending, needed}) {
  return (
    <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
      {adminInfo?.role === "Editor" ? (
        <>
          <button
            onClick={() => {
              setCurrentTab("dashboard");
              setSidebarOpen(false);
            }}
            className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group ${currentTab === "dashboard" ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "hover:bg-slate-800 hover:text-white text-slate-300"}`}
          >
            <LayoutDashboard
              className={`mr-3 w-5 h-5 ${currentTab === "dashboard" ? "text-white" : "text-slate-400 group-hover:text-indigo-400"}`}
            />
            Boshqaruv paneli
          </button>

          <button
            onClick={() => {
              setCurrentTab("applications");
              setSidebarOpen(false);
            }}
            className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group ${currentTab === "applications" ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "hover:bg-slate-800 hover:text-white text-slate-300"}`}
          >
            <FileText
              className={`mr-3 w-5 h-5 ${currentTab === "applications" ? "text-white" : "text-slate-400 group-hover:text-indigo-400"}`}
            />
            Arizalar
            {statPending > 0 && (
              <span className="ml-auto bg-amber-500/20 text-amber-400 text-xs font-bold px-2 py-0.5 rounded-full border border-amber-500/30">
                {statPending}
              </span>
            )}
          </button>

          <button
            onClick={() => {
              setCurrentTab("news");
              setSidebarOpen(false);
            }}
            className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group ${currentTab === "news" ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "hover:bg-slate-800 hover:text-white text-slate-300"}`}
          >
            <Newspaper
              className={`mr-3 w-5 h-5 ${currentTab === "news" ? "text-white" : "text-slate-400 group-hover:text-indigo-400"}`}
            />
            Yangiliklar CMS
          </button>
          <button
            onClick={() => {
              setCurrentTab("rahbariyat");
              setSidebarOpen(false);
            }}
            className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group ${currentTab === "rahbariyat" ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "hover:bg-slate-800 hover:text-white text-slate-300"}`}
          >
            <User
              className={`mr-3 w-5 h-5 ${currentTab === "rahbariyat" ? "text-white" : "text-slate-400 group-hover:text-indigo-400"}`}
            />
            Rahbariyat
          </button>
          <button
            onClick={() => {
              setCurrentTab("foydalanuvchilar");
              setSidebarOpen(false);
            }}
            className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group ${currentTab === "foydalanuvchilar" ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "hover:bg-slate-800 hover:text-white text-slate-300"}`}
          >
            <Users2
              className={`mr-3 w-5 h-5 ${currentTab === "foydalanuvchilar" ? "text-white" : "text-slate-400 group-hover:text-indigo-400"}`}
            />
            Foydalanuvchilar
            {needed.totalUsers > 0 && (
              <span className="ml-auto bg-amber-500/20 text-amber-400 text-xs px-2 py-0.5 rounded-full border border-amber-500/30">
                {needed.totalUsers}
              </span>
            )}
          </button>
        </>
      ) : adminInfo?.role === "Admin" ? (
        <>
          <button
            onClick={() => {
              setCurrentTab("news");
              setSidebarOpen(false);
            }}
            className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group ${currentTab === "news" ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "hover:bg-slate-800 hover:text-white text-slate-300"}`}
          >
            <Newspaper
              className={`mr-3 w-5 h-5 ${currentTab === "news" ? "text-white" : "text-slate-400 group-hover:text-indigo-400"}`}
            />
            Yangiliklar CMS
          </button>
          <button
            onClick={() => {
              setCurrentTab("rahbariyat");
              setSidebarOpen(false);
            }}
            className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group ${currentTab === "rahbariyat" ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "hover:bg-slate-800 hover:text-white text-slate-300"}`}
          >
            <User
              className={`mr-3 w-5 h-5 ${currentTab === "rahbariyat" ? "text-white" : "text-slate-400 group-hover:text-indigo-400"}`}
            />
            Rahbariyat
          </button>
        </>
      ) : adminInfo?.role === "Checker" ? (
        <>
          <button
            onClick={() => {
              setCurrentTab("applications");
              setSidebarOpen(false);
            }}
            className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group ${currentTab === "applications" ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "hover:bg-slate-800 hover:text-white text-slate-300"}`}
          >
            <FileText
              className={`mr-3 w-5 h-5 ${currentTab === "applications" ? "text-white" : "text-slate-400 group-hover:text-indigo-400"}`}
            />
            Arizalar
            {statPending > 0 && (
              <span className="ml-auto bg-amber-500/20 text-amber-400 text-xs font-bold px-2 py-0.5 rounded-full border border-amber-500/30">
                {statPending}
              </span>
            )}
          </button>
        </>
      ) : null}
      <button
        onClick={() => {
          setCurrentTab("sozlamalar");
          setSidebarOpen(false);
        }}
        className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group ${currentTab === "sozlamalar" ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "hover:bg-slate-800 hover:text-white text-slate-300"}`}
      >
        <Settings2
          className={`mr-3 w-5 h-5 ${currentTab === "sozlamalar" ? "text-white" : "text-slate-400 group-hover:text-indigo-400"}`}
        />
        Sozlamalar
      </button>
    </nav>
  );
}

export default Navbar;
