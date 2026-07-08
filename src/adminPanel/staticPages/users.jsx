import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import { API_LINK } from "../cfg";
import { 
  Search, User, UserCheck, UserX, 
  ChevronLeft, ChevronRight, Users as UsersIcon 
} from "lucide-react";

function Users({ handleRef, apps, setNeeded }) {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    axios.get(`${API_LINK}/user/getall`).then((response) => {
      // Oxirgi qo'shilganlar boshida turishi uchun reverse
      setUsers(response.data.data.reverse());
      setNeeded((prev) => ({ ...prev, totalUsers: response.data.data.length }));
    });
  }, [handleRef,setNeeded]);

  // Qidiruv va Filtr logikasi
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const userId = user._id || user.id;
      const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase());
      const hasApplied = apps.some((app) => app.usernameId === userId);
      
      if (statusFilter === "applied") return matchesSearch && hasApplied;
      if (statusFilter === "notApplied") return matchesSearch && !hasApplied;
      return matchesSearch;
    });
  }, [users, searchTerm, statusFilter, apps]);

  // Filtrlar o'zgarganda birinchi sahifaga qaytish
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentPage(1);
  }, [searchTerm, statusFilter, itemsPerPage]);

  // Pagination logikasi
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="p-4 sm:p-8 bg-slate-50 min-h-screen font-sans">
      {/* Header va Boshqaruv paneli */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-100 text-indigo-600 rounded-2xl">
              <UsersIcon size={24} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Foydalanuvchilar</h2>
            <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm font-semibold">
              {filteredUsers.length} ta
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-50">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Username bo'yicha qidirish..." 
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select 
            className="px-4 py-2.5 rounded-xl border border-slate-200 outline-none cursor-pointer hover:bg-slate-50"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Barcha foydalanuvchilar</option>
            <option value="applied">Ariza topshirganlar</option>
            <option value="notApplied">Topshirmaganlar</option>
          </select>

          <div className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl">
            <span className="text-sm text-slate-500">Ko'rsatish:</span>
            <input 
              type="number" value={itemsPerPage} min="5" max="50"
              className="w-12 text-center outline-none font-bold"
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
            />
          </div>
        </div>
      </div>

      {/* Jadval */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-sm uppercase tracking-wider">
              <th className="p-5 font-semibold">Username</th>
              <th className="p-5 font-semibold">Parol</th>
              <th className="p-5 font-semibold">Holati</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {currentUsers.map((user) => {
              const userId = user._id || user.id;
              const hasApplied = apps.some((a) => a.usernameId === userId);
              return (
                <tr key={user.id} className="hover:bg-indigo-50/30 transition-colors">
                  <td className="p-5 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                      <User size={16} />
                    </div>
                    <span className="font-medium text-slate-700">{user.username}</span>
                  </td>
                  <td className="p-5 font-mono text-slate-500">{user.password}</td>
                  <td className="p-5">
                    {hasApplied ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-bold">
                        <UserCheck size={14} /> Topshirgan
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-50 text-rose-600 rounded-lg text-xs font-bold">
                        <UserX size={14} /> Topshirmagan
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {currentUsers.length === 0 && (
          <div className="p-10 text-center text-slate-400">Natija topilmadi</div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center mt-8 gap-2">
          <button 
            disabled={currentPage === 1} 
            onClick={() => setCurrentPage(prev => prev - 1)}
            className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-sm disabled:opacity-40 hover:bg-slate-50 transition-all"
          >
            <ChevronLeft size={20} />
          </button>
          
          <div className="flex gap-1 overflow-x-auto px-2 max-w-[60vw]">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button 
                key={page} 
                onClick={() => setCurrentPage(page)} 
                className={`min-w-10 h-10 rounded-xl font-semibold transition-all ${
                  currentPage === page 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                    : 'bg-white border border-slate-200 hover:border-indigo-300'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button 
            disabled={currentPage === totalPages} 
            onClick={() => setCurrentPage(prev => prev + 1)}
            className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-sm disabled:opacity-40 hover:bg-slate-50 transition-all"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}

export default Users;