import { useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react"; // Yuklanish spinneri uchun
import { API_LINK } from "../cfg";

function Auth({ setRefresh, refresh }) {
  // true = Sign In (Kirish), false = Sign Up (Ro'yxatdan o'tish)
  const [isLoginMode, setIsLoginMode] = useState(true);
  
  // Tugma bosilgandagi loading holati
  const [isLoading, setIsLoading] = useState(false);

  // Server kodingizga mos state
  const [state, setState] = useState({
    username: "",
    password: "",
  });

  // Custom Toast xabarlari uchun state
  const [toast, setToast] = useState({
    show: false,
    msg: "",
    type: "ok", // "ok", "error", "warning"
  });

  // Xabarlarni ko'rsatish funksiyasi (Custom Toast)
  function showToast(msg, type = "ok") {
    setToast({ show: true, msg, type });
    setTimeout(() => {
      setToast({ show: false, msg: "", type: "ok" });
    }, 3000);
  }

  function Submit(e) {
    e.preventDefault();
    setIsLoading(true); // Loadingni yoqish

    const endpoint = isLoginMode 
      ? `${API_LINK}/user/signin` 
      : `${API_LINK}/user/add`;

    axios
      .post(endpoint, state)
      .then((res) => {
        if (isLoginMode) {
          // SIGN IN
          const { ok, msg, access_token } = res.data;
          if (!ok) {
            showToast(msg, "error");
            setIsLoading(false); // Xatolik bo'lsa loadingni o'chirish
          } else {
            showToast(msg, "ok");
            localStorage.setItem("access_token", access_token);
            setTimeout(() => {
              setRefresh(!refresh);
            }, 1200);
          }
        } else {
          // SIGN UP
          const { ok, msg } = res.data;
          if (!ok) {
            showToast(msg, "error");
            setIsLoading(false); // Xatolik bo'lsa loadingni o'chirish
          } else {
            showToast(msg, "ok");
            setTimeout(() => {
              setIsLoginMode(true);
              setState({ username: "", password: "" });
              setIsLoading(false); // Amaliyot tugagach o'chirish
            }, 1500);
          }
        }
      })
      .catch((err) => {
        console.error(err);
        showToast("Qayta urinib ko'ring!", "warning");
        setIsLoading(false); // Tarmoq xatosi bo'lsa loadingni o'chirish
      });
  }

  return (
    <div className="flex items-center justify-center w-full h-screen bg-gray-50 px-4 relative overflow-hidden">
      
      {/* --- CUSTOM TOAST NOTIFICATION --- */}
      {toast.show && (
        <div className={`fixed top-5 right-5 z-50 flex items-center p-4 rounded-xl shadow-xl border text-white font-medium transform transition-all duration-300 animate-bounce ${
          toast.type === "ok" ? "bg-emerald-600 border-emerald-500" :
          toast.type === "error" ? "bg-rose-600 border-rose-500" : "bg-amber-600 border-amber-500"
        }`}>
          <span className="mr-2">
            {toast.type === "ok" ? "✅" : toast.type === "error" ? "❌" : "⚠️"}
          </span>
          {toast.msg}
        </div>
      )}

      <div className="flex items-center justify-between w-full max-w-[950px] bg-white rounded-2xl p-8 md:p-12 shadow-2xl border border-gray-100">
        
        {/* --- SVG ANIMATSIYA --- */}
        <div className="hidden md:flex w-1/2 flex-col items-center justify-center p-6 space-y-6">
          <svg className={`w-64 h-64 text-blue-600 ${isLoading ? "animate-spin duration-1000" : "animate-pulse"}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 22 12 2C12 2 12 2 12 2ZM12 6C13.66 6 15 7.34 15 9C15 10.66 13.66 12 12 12C10.34 12 9 10.66 9 9C9 7.34 10.34 6 12 6ZM12 20.2C9.33 20.2 6.96 18.84 5.56 16.77C5.6 14.78 9.6 13.7 12 13.7C14.39 13.7 18.39 14.78 18.44 16.77C17.04 18.84 14.67 20.2 12 20.2Z" fill="currentColor"/>
          </svg>
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-700">Xavfsiz Tizim</h3>
            <p className="text-gray-400 text-sm mt-1">Ma'lumotlaringiz xavfsiz himoyalangan</p>
          </div>
        </div>

        {/* --- FORMA QISMI --- */}
        <div className="w-full md:w-[380px] flex flex-col justify-center">
          <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight">
            {isLoginMode ? "Kirish" : "Ro'yxatdan o'tish"}
          </h2>
          <p className="text-xs text-gray-400 mt-2 mb-8 font-medium uppercase tracking-wider">
            {isLoginMode 
              ? "Tizimga kirish faqat mas'ul xodimlar uchun !!!" 
              : "Yangi mas'ul xodimni ro'yxatdan o'tkazish"}
          </p>

          <form onSubmit={Submit} className="space-y-5">
            {/* Username Input */}
            <div className="relative">
              <input
                type="text"
                id="username"
                disabled={isLoading}
                value={state.username}
                onChange={(e) => setState({ ...state, username: e.target.value })}
                className="block px-4 py-3.5 w-full text-gray-900 bg-transparent rounded-xl border border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 peer transition-all text-sm disabled:bg-gray-50 disabled:text-gray-400"
                placeholder=" "
                required
              />
              <label 
                htmlFor="username"
                className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-left bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-3 pointer-events-none"
              >
                Username
              </label>
            </div>

            {/* Password Input */}
            <div className="relative">
              <input
                type="password"
                id="password"
                disabled={isLoading}
                value={state.password}
                onChange={(e) => setState({ ...state, password: e.target.value })}
                className="block px-4 py-3.5 w-full text-gray-900 bg-transparent rounded-xl border border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 peer transition-all text-sm disabled:bg-gray-50 disabled:text-gray-400"
                placeholder=" "
                required
              />
              <label 
                htmlFor="password"
                className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-left bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-3 pointer-events-none"
              >
                Parol
              </label>
            </div>

            {/* Submit Button with Loading */}
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:shadow-xl transition-all duration-200 active:scale-[0.98] text-sm flex items-center justify-center gap-2"
            >
              {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              {isLoading 
                ? (isLoginMode ? "Kirilmoqda..." : "Ro'yxatdan o'tilmoqda...") 
                : (isLoginMode ? "Kirish" : "Ro'yxatdan o'tish")}
            </button>

            {/* Mode Switcher */}
            <p className="text-center text-sm text-gray-500 mt-5">
              {isLoginMode ? (
                <>
                  Hisobingiz yo'qmi?{" "}
                  <button
                    type="button"
                    disabled={isLoading}
                    onClick={() => { setIsLoginMode(false); setState({ username: "", password: "" }); }}
                    className="font-bold text-blue-600 cursor-pointer hover:underline disabled:opacity-50"
                  >
                    Ro'yxatdan o'tish
                  </button>
                </>
              ) : (
                <>
                  Sizda allaqachon hisob bormi?{" "}
                  <button
                    type="button"
                    disabled={isLoading}
                    onClick={() => { setIsLoginMode(true); setState({ username: "", password: "" }); }}
                    className="font-bold text-blue-600 cursor-pointer hover:underline disabled:opacity-50"
                  >
                    Kirish
                  </button>
                </>
              )}
            </p>
          </form>
        </div>

      </div>
    </div>
  );
}

export default Auth;