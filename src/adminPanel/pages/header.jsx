import { GraduationCap, Menu } from "lucide-react";

function Header({setSidebarOpen}) {
    return ( 
        <header className="bg-slate-900 text-white flex items-center justify-between px-4 py-3 md:hidden shadow-md">
                <div className="flex items-center space-x-3">
                  <div className="bg-indigo-600/30 p-2 rounded-lg border border-indigo-500/20">
                    <GraduationCap className="text-yellow-400 w-6 h-6" />
                  </div>
                  <span className="font-bold text-md tracking-wider">OLIM FONDI</span>
                </div>
                <button 
                  onClick={() => setSidebarOpen(true)}
                  className="text-white hover:text-indigo-400 focus:outline-none"
                >
                  <Menu className="w-6 h-6" />
                </button>
              </header>
     );
}

export default Header;