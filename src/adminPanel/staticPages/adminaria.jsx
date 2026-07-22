import { useEffect, useState } from "react";
import { API_LINK } from "../cfg";
import axios from "axios";

function Adminaria({ adminInfo, addToast, activeTab }) {
  const [adminsList, setAdminsList] = useState([]);
  const [loadingAdmins, setLoadingAdmins] = useState(false);
  
  // Filter holati ("All", "Editor", "Checker")
  const [roleFilter, setRoleFilter] = useState("All");

  // Admin qo'shish modal holatlari
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole] = useState("Admin");
  const [loadingAdd, setLoadingAdd] = useState(false);

  // Admin tahrirlash (Edit) modal holatlari
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingAdminId, setEditingAdminId] = useState(null);
  const [editUsername, setEditUsername] = useState("");
  const [editPassword, setEditPassword] = useState(""); // ixtiyoriy (bo'sh qolsa o'zgarmaydi)
  const [editRole, setEditRole] = useState("Admin");
  const [loadingEdit, setLoadingEdit] = useState(false);

  // Adminlarni yuklash funksiyasi
  const fetchAdmins = async () => {
    setLoadingAdmins(true);
    try {
      const response = await axios.get(`${API_LINK}/admin/getall`);
      if (response.data.ok) {
        setAdminsList(response.data.data);
      } else {
        addToast("Adminlarni yuklash imkoni bo'lmadi", "error");
      }
    } catch (err) {
      console.error(err);
      addToast("Adminlarni yuklashda xatolik yuz berdi", "error");
    } finally {
      setLoadingAdmins(false);
    }
  };

  useEffect(() => {
    if (activeTab === "admins" && adminInfo?.role === "Editor") {
      fetchAdmins();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, adminInfo]);

  // Yangi Admin Qo'shish
  const handleAddAdmin = async (e) => {
    e.preventDefault();
    if (!newUsername || !newPassword) {
      addToast("Iltimos, barcha maydonlarni to'ldiring!", "error");
      return;
    }
    setLoadingAdd(true);

    try {
      const response = await axios.post(`${API_LINK}/admin/add`, {
        username: newUsername,
        password: newPassword,
        role: newRole,
      });

      if (response.data.ok) {
        addToast("Yangi admin muvaffaqiyatli qo'shildi!", "success");
        setIsModalOpen(false);
        setNewUsername("");
        setNewPassword("");
        setNewRole("Admin");
        fetchAdmins();
      } else {
        addToast(response.data.msg || "Admin qo'shishda xatolik", "error");
      }
    } catch (err) {
      console.error(err);
      addToast("Serverda xatolik yuz berdi!", "error");
    } finally {
      setLoadingAdd(false);
    }
  };

  // Tahrirlash oynasini ochish va ma'lumotlarni to'ldirish
  const openEditModal = (admin) => {
    setEditingAdminId(admin._id);
    setEditUsername(admin.username);
    setEditRole(admin.role || "Checker");
    setEditPassword(""); // Parol xavfsizlik uchun yashirin tutiladi
    setIsEditModalOpen(true);
  };

  // Admin ma'lumotlarini yangilash (Edit submit)
  const handleEditAdmin = async (e) => {
    e.preventDefault();
    if (!editUsername) {
      addToast("Foydalanuvchi nomi bo'sh bo'lishi mumkin emas!", "error");
      return;
    }
    setLoadingEdit(true);

    try {
      const updateData = {
        id:editingAdminId,
        username: editUsername,
        role: editRole,
      };
      // Agar parol maydoni to'ldirilgan bo'lsa, uni ham yuboramiz
      if (editPassword.trim()) {
        updateData.password = editPassword;
      }

      // Backend API endpointingizga moslang (masalan: /admin/edit/:id yoki /admin/update/:id)
      const response = await axios.put(`${API_LINK}/admin/edit/`, updateData,{headers: {
        "x-admin-token": `${localStorage.getItem("access_admin_token")}`,
      }});

      if (response.data.ok) {
        addToast("Admin ma'lumotlari muvaffaqiyatli yangilandi!", "success");
        setIsEditModalOpen(false);
        fetchAdmins();
      } else {
        addToast(response.data.msg || "O'zgartirishda xatolik yuz berdi", "error");
      }
    } catch (err) {
      console.error(err);
      addToast("Server xatoligi tufayli yangilab bo'lmadi", "error");
    } finally {
      setLoadingEdit(false);
    }
  };

  // Adminni o'chirish
  const handleDeleteAdmin = async (id) => {
    if (!window.confirm("Haqiqatan ham ushbu adminni o'chirmoqchimisiz?")) return;

    try {
      const response = await axios.delete(`${API_LINK}/admin/delete/${id}`);

      if (response.data.ok) {
        addToast("Admin o'chirildi!", "success");
        setAdminsList((prev) => prev.filter((admin) => admin._id !== id));
      } else {
        addToast(response.data.msg || "O'chirishda xatolik yuz berdi", "error");
      }
    } catch (err) {
      console.error(err);
      addToast("Xatolik yuz berdi", "error");
    }
  };

  // --- FILTERLASH MANTIQI ---
  const filteredAdmins = adminsList.filter((admin) => {
    // Tizimga kirgan adminni ro'yxatda yashirish
    if (admin._id === adminInfo.adminId || admin._id === adminInfo._id) return false;

    // Rol bo'yicha filterlash
    if (roleFilter === "All") return true;
    if (roleFilter === "Editor") return admin.role === "Editor";
    if (roleFilter === "Checker") return !admin.role || admin.role === "Checker" || admin.role === "Admin"; 
    return true;
  });

  return (
    <div className="glass-card border border-white/60 rounded-3xl p-6 sm:p-8 shadow-lg relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-indigo-500 to-purple-500"></div>

      {/* Sarlavha va "Admin Qo'shish" Tugmasi */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Barcha Tizim Adminlari
        </h2>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 transition-all shadow-md shadow-indigo-600/10"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Yangi Admin Qo'shish
        </button>
      </div>

      {/* --- FILTER TUGMALARI BO'LIMI --- */}
      <div className="flex flex-wrap gap-2 mb-6 p-1 bg-slate-100/80 rounded-xl w-fit border border-slate-200/50">
        {["All", "Editor", "Checker"].map((filterType) => (
          <button
            key={filterType}
            onClick={() => setRoleFilter(filterType)}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
              roleFilter === filterType
                ? "bg-white text-indigo-600 shadow-xs border border-slate-200/30 font-bold"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            {filterType === "All" && "Hammasi"}
            {filterType === "Editor" && "Editorlar"}
            {filterType === "Checker" && "Tekshiruvchilar (Checker)"}
          </button>
        ))}
      </div>

      {/* --- JADVAL BO'LIMI --- */}
      {loadingAdmins ? (
        <div className="flex justify-center py-12">
          <svg className="animate-spin h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider font-semibold">
                <th className="py-3 px-4">Foydalanuvchi nomi</th>
                <th className="py-3 px-4">Lavozimi (Role)</th>
                <th className="py-3 px-4 text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredAdmins.map((admin) => {
                // Editor o'zga bir Editorni tahrirlay yoki o'chira olmaydi
                const isEditorEditingEditor = adminInfo?.role === "Editor" && admin.role === "Editor";
                const isSelf = admin._id === adminInfo._id || admin._id === adminInfo.adminId;
                const isDisabled = isEditorEditingEditor || isSelf;
                console.log(adminInfo.adminId!=="6a4df82ceae5501eb08e97a9");
                

                return (
                  <tr key={admin._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-4 font-medium text-slate-800">{admin.username}</td>
                    <td className="py-4 px-4">
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                        admin.role === "Editor"
                          ? "bg-indigo-50 border border-indigo-200 text-indigo-700"
                          : "bg-amber-50 border border-amber-200 text-amber-700"
                      }`}>
                        {!admin.role ? "Tekshiruvchi" : admin.role}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right flex justify-end gap-2">
                      {/* TAHRIRLASH (EDIT) TUGMASI */}
                      <button
                        disabled={adminInfo.adminId!=="6a4df82ceae5501eb08e97a9"}
                        onClick={() => openEditModal(admin)}
                        className="p-2 text-blue-500 hover:bg-blue-50 border border-transparent hover:border-blue-200 rounded-xl transition-all disabled:opacity-20 disabled:pointer-events-none"
                        title={isEditorEditingEditor ? "Editor boshqa editorni tahrirlay olmaydi" : "Tahrirlash"}
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>

                      {/* O'CHIRISH TUGMASI */}
                      <button
                        disabled={adminInfo.adminId!=="6a4df82ceae5501eb08e97a9"&&isDisabled}
                        onClick={() => handleDeleteAdmin(admin._id)}
                        className="p-2 text-red-500 hover:bg-red-50 border border-transparent hover:border-red-200 rounded-xl transition-all disabled:opacity-20 disabled:pointer-events-none"
                        title="O'chirish"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filteredAdmins.length === 0 && (
            <p className="text-center text-slate-400 py-8 text-sm">
              Ushbu turdagi adminlar mavjud emas.
            </p>
          )}
        </div>
      )}

      {/* --- 1. ADMIN QO'SHISH MODAL OYNASI --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white/95 border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <h3 className="text-lg font-bold text-slate-800 mb-5">Yangi Admin Qo'shish</h3>
            <form onSubmit={handleAddAdmin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1.5">Foydalanuvchi nomi</label>
                <input type="text" required value={newUsername} onChange={(e) => setNewUsername(e.target.value)} placeholder="Username kiriting" className="block w-full px-4 py-2.5 border border-slate-300 rounded-xl bg-white text-slate-800 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1.5">Parol</label>
                <input type="password" required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="••••••••" className="block w-full px-4 py-2.5 border border-slate-300 rounded-xl bg-white text-slate-800 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1.5">Lavozimi (Role)</label>
                <select value={newRole} onChange={(e) => setNewRole(e.target.value)} className="block w-full px-4 py-2.5 border border-slate-300 rounded-xl bg-white text-slate-800 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm">
                  <option value="Admin">Admin</option>
                  <option value="Editor">Editor</option>
                  <option value="Checker">Checker (Tekshiruvchi)</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="w-full py-2.5 rounded-xl text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200">Bekor qilish</button>
                <button type="submit" disabled={loadingAdd} className="w-full py-2.5 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50">{loadingAdd ? "Qo'shilmoqda..." : "Saqlash"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- 2. ADMIN TAHRIRLASH (EDIT) MODAL OYNASI --- */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white/95 border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative">
            <button onClick={() => setIsEditModalOpen(false)} className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <h3 className="text-lg font-bold text-slate-800 mb-5">Admin Ma'lumotlarini Tahrirlash</h3>
            <form onSubmit={handleEditAdmin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1.5">Foydalanuvchi nomi</label>
                <input type="text" required value={editUsername} onChange={(e) => setEditUsername(e.target.value)} className="block w-full px-4 py-2.5 border border-slate-300 rounded-xl bg-white text-slate-800 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1.5">Yangi Parol (Ixtiyoriy)</label>
                <input type="password" value={editPassword} onChange={(e) => setEditPassword(e.target.value)} placeholder="O'zgartirmaslik uchun bo'sh qoldiring" className="block w-full px-4 py-2.5 border border-slate-300 rounded-xl bg-white text-slate-800 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1.5">Lavozimi (Role)</label>
                <select value={editRole} onChange={(e) => setEditRole(e.target.value)} className="block w-full px-4 py-2.5 border border-slate-300 rounded-xl bg-white text-slate-800 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm">
                  <option value="Admin">Admin</option>
                  <option value="Editor">Editor</option>
                  <option value="Checker">Checker (Tekshiruvchi)</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setIsEditModalOpen(false)} className="w-full py-2.5 rounded-xl text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200">Bekor qilish</button>
                <button type="submit" disabled={loadingEdit} className="w-full py-2.5 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50">{loadingEdit ? "Yangilanmoqda..." : "Yangilash"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Adminaria;