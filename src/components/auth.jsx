import { useState } from "react";
import axios from "axios";
import { Loader2, Eye, EyeOff, ShieldCheck, User, Lock } from "lucide-react";
import { API_LINK } from "../cfg";
import {auth} from "../data/txt.json"
// lang — joriy til (masalan: "uz", "ru", "en"). Odatiy qiymat "uz" qilib ketildi.
function Auth({ setRefresh, refresh, L }) {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [state, setState] = useState({
    username: "",
    password: "",
  });

  const [toast, setToast] = useState({
    show: false,
    msg: "",
    type: "ok",
  });

  function showToast(msg, type = "ok") {
    setToast({ show: true, msg, type });
    setTimeout(() => {
      setToast({ show: false, msg: "", type: "ok" });
    }, 3000);
  }

  // Safe translation helper: Agar obyekt kelsa, tanlangan tilni oladi, aks holda default 'uz'


  function Submit(e) {
    e.preventDefault();
    setIsLoading(true);

    const endpoint = isLoginMode 
      ? `${API_LINK}/user/signin` 
      : `${API_LINK}/user/add`;

    axios
      .post(endpoint, state)
      .then((res) => {
        if (isLoginMode) {
          const { ok, msg, access_token } = res.data;
          if (!ok) {
            showToast(msg, "error");
            setIsLoading(false);
          } else {
            showToast(msg, "ok");
            localStorage.setItem("access_token", access_token);
            setTimeout(() => {
              setRefresh(!refresh);
            }, 1200);
          }
        } else {
          const { ok, msg } = res.data;
          if (!ok) {
            showToast(msg, "error");
            setIsLoading(false);
          } else {
            showToast(msg, "ok");
            setTimeout(() => {
              setIsLoginMode(true);
              setState({ username: "", password: "" });
              setIsLoading(false);
            }, 1500);
          }
        }
      })
      .catch((err) => {
        console.error(err);
        showToast(t("auth.toastErrorConnection"), "warning");
        setIsLoading(false);
      });
  }

  return (
    <div className="flex items-center justify-center w-full min-h-[calc(100vh-80px)] bg-gradient-to-tr from-blue-50/70 via-slate-50 to-sky-50/40 px-4 py-8 relative overflow-hidden font-sans">
      
      <div className="absolute top-10 left-10 w-72 h-72 bg-sky-200/40 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl pointer-events-none"></div>

      {/* --- CUSTOM TOAST NOTIFICATION --- */}
      {toast.show && (
        <div className={`fixed top-6 right-6 z-50 flex items-center p-4 rounded-xl shadow-xl border text-white font-medium backdrop-blur-sm transform transition-all duration-300 ${
          toast.type === "ok" ? "bg-emerald-600/95 border-emerald-500" :
          toast.type === "error" ? "bg-rose-600/95 border-rose-500" : "bg-amber-500/95 border-amber-400"
        }`}>
          <span className="mr-2.5 text-lg">
            {toast.type === "ok" ? "⚡" : toast.type === "error" ? "🛑" : "⚠️"}
          </span>
          {toast.msg}
        </div>
      )}

      {/* Asosiy Kontrener */}
      <div className="flex items-center justify-between w-full max-w-md md:max-w-5xl bg-white/90 backdrop-blur-md rounded-2xl p-6 md:p-10 shadow-2xl shadow-blue-900/5 border border-white/60 transition-all duration-300">
        
        {/* --- LEFT VISUAL PANEL --- */}
        <div className="hidden md:flex w-1/2 flex-col items-center justify-center p-8 bg-gradient-to-br from-slate-50 to-blue-50/60 rounded-xl border border-slate-100 min-h-[500px]">
          <div className="relative flex items-center justify-center">
            <div className="absolute w-44 h-44 bg-blue-200/40 rounded-full blur-3xl animate-pulse"></div>
            <svg 
              className={`w-52 h-52 text-blue-600 relative z-10 transition-transform duration-700 ${isLoading ? "rotate-180 scale-95" : "hover:scale-105"}`} 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="text-center mt-8 max-w-sm">
            <h3 className="text-xl font-bold text-slate-800 flex items-center justify-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-600" /> {L(auth.panelTitle)}
            </h3>
            <p className="text-slate-500 text-sm mt-2 leading-relaxed">
              {L(auth.panelDesc)}
            </p>
          </div>
        </div>

        {/* --- FORM PANEL --- */}
        <div className="w-full md:w-[420px] flex flex-col justify-center px-1 md:px-6">
          
          <div className="flex md:hidden items-center justify-center mb-6">
            <div className="w-14 h-14 bg-gradient-to-tr from-blue-600 to-sky-400 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 transform rotate-6">
              <ShieldCheck className="w-7 h-7 text-white transform -rotate-6" />
            </div>
          </div>

          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
              {isLoginMode ? L(auth.titleLogin) : L(auth.titleRegister)}
            </h2>
            <p className="text-sm text-slate-400 mt-2 mb-6 md:mb-8 font-medium">
              {isLoginMode ? L(auth.subtitleLogin) : L(auth.subtitleRegister)}
            </p>
          </div>

          <form onSubmit={Submit} className="space-y-4 md:space-y-5">
            
            {/* Username Input */}
            <div className="space-y-1.5">
              <label htmlFor="username" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block pl-1">
                {L(auth.labelUsername)}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  id="username"
                  disabled={isLoading}
                  value={state.username}
                  onChange={(e) => setState({ ...state, username: e.target.value })}
                  className="block pl-10 pr-4 py-3 w-full text-slate-800 bg-slate-50/50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 focus:bg-white transition-all text-sm disabled:bg-slate-50 disabled:text-slate-400 shadow-sm"
                  placeholder={L(auth.placeholderUsername)}
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <label htmlFor="password" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block pl-1">
                {L(auth.labelPassword)}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  disabled={isLoading}
                  value={state.password}
                  onChange={(e) => setState({ ...state, password: e.target.value })}
                  className="block pl-10 pr-11 py-3 w-full text-slate-800 bg-slate-50/50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 focus:bg-white transition-all text-sm disabled:bg-slate-50 disabled:text-slate-400 shadow-sm"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full mt-2 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-blue-400 disabled:to-indigo-400 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/10 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-200 active:scale-[0.99] text-sm flex items-center justify-center gap-2"
            >
              {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              {isLoading 
                ? (isLoginMode ? L(auth.btnLoadingLogin) : L(auth.btnLoadingRegister)) 
                : (isLoginMode ? L(auth.btnSubmitLogin) : L(auth.btnSubmitRegister))}
            </button>

            {/* Mode Switcher */}
            <div className="text-center text-sm text-slate-500 mt-6 pt-3 border-t border-slate-100">
              {isLoginMode ? (
                <p>
                  {L(auth.switchNeedAccount)}{" "}
                  <button
                    type="button"
                    disabled={isLoading}
                    onClick={() => { setIsLoginMode(false); setState({ username: "", password: "" }); }}
                    className="font-bold text-blue-600 hover:text-blue-700 cursor-pointer transition-colors inline-block"
                  >
                    {L(auth.switchActionRegister)}
                  </button>
                </p>
              ) : (
                <p>
                  {L(auth.switchHaveAccount)}{" "}
                  <button
                    type="button"
                    disabled={isLoading}
                    onClick={() => { setIsLoginMode(true); setState({ username: "", password: "" }); }}
                    className="font-bold text-blue-600 hover:text-blue-700 cursor-pointer transition-colors inline-block"
                  >
                    {L(auth.switchActionLogin)}
                  </button>
                </p>
              )}
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}

export default Auth;