import {
  GraduationCap,
  LayoutDashboard,
  FileText,
  Newspaper,
  LogOut,
  ChevronRight,
  Bell,
  Calendar,
  Users,
} from "lucide-react";
import { useState } from "react";
import Dashboard from "../staticPages/dashboard";
import Application from "../staticPages/application";
import NewsManager from "./news";
import RahbariyatAdmin from "./rahbariyat";

function SideBar({
  news = [],
  apps = [],
  handleStatusChange,
  currentDateStr,
  setSelectedApp,
  setAdmin,
  sidebarOpen,
  setSidebarOpen,
  setRefresh,
  refresh
}) {
  const [currentTab, setCurrentTab] = useState("dashboard");
  // Statistikani hisoblash
  const statTotal = apps.length;
  const statPending = apps.filter((a) => a.status === "pending").length;
  const statApproved = apps.filter((a) => a.status === "approved").length;
  const statRejected = apps.filter((a) => a.status === "rejected").length;

  return (
    <div className="flex flex-1 h-full overflow-hidden">
      {/* Sidebar Menu */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-slate-300 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out md:translate-x-0 md:relative md:flex md:flex-col shadow-2xl`}
      >
        {/* Brand header */}
        <div className="hidden md:flex items-center space-x-3 px-6 py-5 border-b border-slate-800 bg-slate-950">
          <div className="bg-indigo-600/20 p-2 rounded-xl border border-indigo-500/30">
            <GraduationCap className="text-yellow-400 w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-white text-sm tracking-wide leading-none">
              OLIM FONDI
            </h1>
          </div>
        </div>

        {/* User Info */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-900/50 flex items-center space-x-3">
          <div>
            <h4 className="text-sm font-semibold text-slate-200">Bekzodbek</h4>
            <p className="text-xs text-slate-400 flex items-center">
              <span className="w-2 h-2 bg-emerald-500 rounded-full mr-1.5 animate-pulse"></span>
              Bosh Administrator
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
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
            className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group ${currentTab === "news" ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "hover:bg-slate-800 hover:text-white text-slate-300"}`}
          >
            <Users
              className={`mr-3 w-5 h-5 ${currentTab === "news" ? "text-white" : "text-slate-400 group-hover:text-indigo-400"}`}
            />
            Rahbariyat
          </button>
        </nav>

        {/* Bottom logout info */}
        <div className="p-4 border-t border-slate-800 text-xs text-slate-500 flex justify-between items-center bg-slate-950">
          <span>© 2026 Olim Fondi</span>
          <button
            onClick={() => setAdmin(false)}
            className="hover:text-slate-300 cursor-pointer flex items-center gap-1 bg-transparent border-none text-slate-500 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" /> Chiqish
          </button>
        </div>
      </aside>

      {/* Sidebar Overlay (Mobile only) */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden bg-slate-100">
        {/* Header bar (Desktop only) */}
        <header className="hidden md:flex items-center justify-between bg-white px-8 py-4 border-b border-slate-200 shadow-sm z-10">
          <div className="flex items-center space-x-1">
            <span className="text-slate-400 text-sm">Tizim</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 mx-1" />
            <span className="font-medium text-slate-800 text-sm">
              {currentTab === "dashboard" && "Boshqaruv paneli"}
              {currentTab === "applications" && "Arizalar reyestri"}
              {currentTab === "news" && "Yangiliklar boshqaruvi (CMS)"}
            </span>
          </div>
          <div className="flex items-center space-x-6">
            <div className="relative cursor-pointer hover:text-indigo-600 transition-colors">
              <Bell className="w-5 h-5 text-slate-500" />
              {statPending > 0 && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full animate-pulse"></span>
              )}
            </div>
            <div className="text-sm font-medium text-slate-500 flex items-center bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
              <Calendar className="mr-2 text-indigo-500 w-4 h-4" />
              <span>{currentDateStr}</span>
            </div>
          </div>
        </header>

        {/* Dynamic content wrapper */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {/* 1. DASHBOARD TAB */}
          {currentTab === "dashboard" && (
            <Dashboard 
              news={news} 
              apps={apps} 
              setCurrentTab={setCurrentTab} 
              setSelectedApp={setSelectedApp} 
              statTotal={statTotal} 
              statPending={statPending} 
              statApproved={statApproved} 
              statRejected={statRejected} 
            />
          )}

          {/* 2. APPLICATIONS TAB */}
          {currentTab === "applications" && (
            <Application 
              setRefresh={setRefresh} 
              refresh={refresh} 
              apps={apps} 
              handleStatusChange={handleStatusChange} 
              setSelectedApp={setSelectedApp} 
            />
          )}

          {/* 3. NEWS CMS TAB */}
          {currentTab === "news" && (
            <NewsManager/>
          )}
          {currentTab === "rahbariyat" && (
            <RahbariyatAdmin/>
          )}
        </div>
      </main>
    </div>
  );
}

export default SideBar;