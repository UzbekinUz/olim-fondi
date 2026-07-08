import axios from "axios";
import { API_LINK } from "../cfg";
import { useState } from "react";

function Profile({adminInfo,setAdmin,handleRef, addToast}) {
  const [username, setUsername] = useState(adminInfo?.username || "");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(adminInfo?.role || "");
  const [loadingProfile, setLoadingProfile] = useState(false);
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoadingProfile(true);

    try {
      const response = await axios.put(
        `${API_LINK}/admin/edit`,
        {
          id: adminInfo.adminId,
          username,
          password: password || undefined,
          role,
        },
        {
          headers: {
            "x-admin-token": `${localStorage.getItem("access_admin_token")}`,
          },
        },
      );

      const resData = response.data;

      if (resData.ok) {
        addToast("Profil ma'lumotlari muvaffaqiyatli yangilandi!", "success");
        setAdmin(resData.data);
        handleRef();
        setPassword("");
      } else {
        addToast(resData.msg || "Yangilashda xatolik yuz berdi", "error");
      }
    } catch (err) {
      console.error(err);
      addToast("Server bilan aloqa uzildi!", "error");
    } finally {
      setLoadingProfile(false);
    }
  };
  return (
    <div className="glass-card border border-white/60 rounded-3xl p-6 sm:p-8 shadow-lg relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-teal-400 to-emerald-400"></div>

      <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <svg
          className="w-5 h-5 text-teal-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
        Profil Ma'lumotlarini Yangilash
      </h2>

      <form onSubmit={handleUpdateProfile} className="space-y-6 max-w-xl">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
            Foydalanuvchi nomi
          </label>
          <input
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="block w-full px-4 py-3 border border-slate-300 rounded-xl bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 text-sm shadow-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
            Yangi Parol (O'zgartirmaslik uchun bo'sh qoldiring)
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="block w-full px-4 py-3 border border-slate-300 rounded-xl bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 text-sm shadow-sm"
          />
        </div>

        {/* <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
            Lavozim (Role)
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="block w-full px-4 py-3 border border-slate-300 rounded-xl bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 text-sm shadow-sm"
          >
            <option value="Admin">Admin</option>
            <option value="Editor">Editor</option>
            <option value="Checker">Checker</option>

          </select>
        </div> */}

        <button
          type="submit"
          disabled={loadingProfile}
          className="flex justify-center items-center py-3 px-6 rounded-xl text-sm font-bold text-white bg-linear-to-r from-teal-500 to-emerald-500 hover:brightness-105 active:scale-[0.98] transition-all duration-200 shadow-md shadow-teal-500/20 disabled:opacity-50"
        >
          {loadingProfile ? "Saqlanmoqda..." : "O'zgarishlarni saqlash"}
        </button>
      </form>
    </div>
  );
}

export default Profile;
