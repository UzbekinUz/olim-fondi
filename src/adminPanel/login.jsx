import { useState } from "react";

export default function Login({ setAdmin, setRef, ref }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);
  const [toasts, setToasts] = useState([]);
  
  const keytoenter = "admin";
  const passtoadmin = "admin2026";

  // --- DINAMIK TOAST TIZIMI ---
  const addToast = (message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    // 3.5 soniyadan keyin bildirishnomani o'chirish
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3500);
  };

  // --- TIZIMGA KIRISHNI TEKSHIRISH ---
  const handleLogin = (e) => {
    e.preventDefault();
    if (username === keytoenter && password === passtoadmin) {
      setAdmin({ admin: true });
      setRef(!ref)
    } else {
      setError("Foydalanuvchi nomi yoki parol noto'g'ri!");
      setShake(true);
      setTimeout(() => setShake(false), 400);
    }
  };

  // --- DEMO MA'LUMOTLARNI AVTOMATIK TO'LDIRISH ---
  const fillDemoCredentials = (e) => {
    e.preventDefault();
    setUsername("admin");
    setPassword("admin2026");
    addToast("Demo ma'lumotlar avtomatik to'ldirildi!", "success");
    setError("");
  };

  return (
    <div className="min-h-screen flex flex-col justify-between overflow-x-hidden bg-slate-900 text-slate-100 selection:bg-teal-500 selection:text-slate-950 transition-colors duration-300 font-sans relative">
      {/* CSS Animatsiyalar va Mukammal Shaffoflik (Glassmorphism) effektlari */}
      <style>{`
        .glass-container {
          background: rgba(15, 23, 42, 0.45);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
        }
        .toast-glass {
          background: rgba(15, 23, 42, 0.8);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-6px); }
          20%, 40%, 60%, 80% { transform: translateX(6px); }
        }
        .animate-shake {
          animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
        }
      `}</style>

      {/* ASOSIY QISM */}
      <main className="grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 relative">
        {/* Orqa fondagi jozibali Premium Neon Chiroqlar */}
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px] -z-10 animate-pulse pointer-events-none"></div>
        <div
          className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-indigo-500/10 rounded-full blur-[140px] -z-10 animate-pulse pointer-events-none"
          style={{ animationDelay: "3s", animationDuration: "6s" }}
        ></div>

        <div className={`w-full max-w-md transition-all duration-500 ease-out transform ${shake ? "animate-shake" : ""}`}>
          <div className="glass-container border border-slate-800/80 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] rounded-3xl p-8 sm:p-10 relative overflow-hidden">
            {/* Yuqoridagi premium gradient chiziq */}
            <div className="absolute top-0 left-0 right-0 h-0.75 bg-linear-to-r from-teal-400 via-emerald-400 to-indigo-500"></div>

            <div className="text-center mb-8">
              {/* Brend ikona */}
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-linear-to-br from-teal-500/20 to-indigo-500/10 border border-teal-500/30 text-teal-400 mb-4 shadow-inner">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-3xl font-extrabold text-white tracking-tight bg-linear-to-r from-white via-slate-100 to-slate-300 bg-clip-text">
                Xush kelibsiz!
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                Tizimga kirish uchun quyidagi maydonlarni to'ldiring
              </p>
            </div>

            {/* Xatolik xabari (Zamonaviy Neon Red uslubi) */}
            {error && (
              <div className="mb-6 p-4 rounded-2xl bg-red-950/20 border border-red-500/30 text-red-300 text-sm flex items-start space-x-3 transition-all duration-300 shadow-[0_0_15px_rgba(239,68,68,0.07)]">
                <svg className="w-5 h-5 shrink-0 mt-0.5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span className="font-medium">{error}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Login */}
              <div>
                <label htmlFor="username" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Foydalanuvchi nomi
                </label>
                <div className="relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block w-full pl-11 pr-4 py-3.5 border border-slate-800 rounded-xl bg-slate-950/50 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-400 transition-all duration-200 text-sm"
                    placeholder="Masalan: admin"
                    autoComplete="username"
                  />
                </div>
              </div>

              {/* Parol */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Parol
                  </label>
                  <button
                    onClick={fillDemoCredentials}
                    className="text-xs font-semibold text-teal-400 hover:text-teal-300 hover:underline transition-all bg-transparent border-none cursor-pointer"
                  >
                    Demoni to'ldirish
                  </button>
                </div>
                <div className="relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-11 pr-12 py-3.5 border border-slate-800 rounded-xl bg-slate-950/50 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-400 transition-all duration-200 text-sm"
                    placeholder="••••••••"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-slate-300 transition-colors focus:outline-none"
                  >
                    {showPassword ? (
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Kirish Tugmasi (Premium Aurora Gradient) */}
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center items-center py-3.5 px-4 border border-teal-500/20 rounded-xl text-sm font-bold text-slate-950 bg-linear-to-r from-teal-400 via-emerald-400 to-indigo-400 hover:brightness-110 active:brightness-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-teal-400 shadow-[0_15px_30px_rgba(45,212,191,0.2)] transition-all duration-200 transform active:scale-[0.98]"
                >
                  <span>Tizimga kirish</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* DINAMIK TOAST TIZIMI */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full px-4 sm:px-0">
        {toasts.map((toast) => {
          // eslint-disable-next-line no-useless-assignment
          let colorClasses = "";
          // eslint-disable-next-line no-useless-assignment
          let iconSvg = "";

          if (toast.type === "success") {
            colorClasses = "border-emerald-500/20 text-emerald-300 toast-glass shadow-[0_10px_30px_rgba(16,185,129,0.1)]";
            iconSvg = (
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mr-3 text-emerald-400 shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            );
          } else if (toast.type === "error") {
            colorClasses = "border-red-500/20 text-red-300 toast-glass shadow-[0_10px_30px_rgba(239,68,68,0.1)]";
            iconSvg = (
              <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center mr-3 text-red-400 shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            );
          } else {
            colorClasses = "border-indigo-500/20 text-indigo-300 toast-glass shadow-[0_10px_30px_rgba(99,102,241,0.1)]";
            iconSvg = (
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mr-3 text-indigo-400 shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            );
          }

          return (
            <div
              key={toast.id}
              className={`flex items-center p-3 sm:p-4 rounded-2xl shadow-2xl border text-sm transition-all duration-300 ${colorClasses}`}
            >
              <div className="flex items-center w-full">
                {iconSvg}
                <div className="font-semibold">{toast.message}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}