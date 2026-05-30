import React from 'react';

const Latest = () => {
  const miniStats = [
    { val: "3.92", label: "Reyting ball (5.0 dan)" },
    { val: "1 yil", label: "Grant muddati" },
    { val: "AAT", label: "Ish joyi kafolati" },
  ];

  return (
    <section id="latest" className="py-24 px-5 bg-slate-50 relative overflow-hidden">
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .pulse-ring {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: .5; transform: scale(1.1); }
        }
      `}</style>

      <div className="max-w-[1100px] mx-auto">
        {/* Header qismi */}
        <div className="mb-16 text-center">
          <div className="inline-block px-4 py-1.5 bg-[#0aacda]/10 text-[#0aacda] font-bold text-xs uppercase tracking-[0.2em] rounded-full mb-4">
            So'nggi muvaffaqiyat
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">2025 yil g'olibi</h2>
          <div className="h-1 w-20 bg-[#0aacda] mx-auto rounded-full mb-6"></div>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Fondimizning eng iqtidorli talabasi Nodira Karimova bilan tanishing.
          </p>
        </div>

        {/* Asosiy Karta */}
        <div className="animate-float bg-[#262626] p-8 md:p-12 shadow-2xl shadow-black/30 transition-all duration-500 hover:-translate-y-2">
          <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-10 items-start">
            
            {/* Chap tomon: Yashil chiziq va Matn */}
            <div className="flex gap-6">
              <div className="w-2 bg-[#84cc16] shrink-0"></div>
              <div>
                <h3 className="text-2xl font-black text-[#84cc16] mb-2 uppercase tracking-wide">Nodira Karimova</h3>
                <p className="text-lg font-bold text-[#84cc16] mb-6 uppercase">Toshkent Davlat Texnika Universiteti</p>
                <div className="text-slate-200 leading-relaxed max-w-xl text-lg italic">
                  «Bu grant nafaqat moliyaviy yordam, balki kelajagim uchun mustahkam poydevor. Hozirda AAT Groupda amaliyot o'tamoqdaman va o'z imkoniyatlarimni namoyon etmoqdaman.»
                </div>
              </div>
            </div>

            {/* O'ng tomon: Avatar */}
            <div className="relative mx-auto md:ml-auto">
              <div className="w-48 h-48 rounded-full bg-slate-700 flex items-center justify-center border-4 border-[#333]">
                <svg className="w-24 h-24 text-slate-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Stats qismi */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          {miniStats.map((m, idx) => (
            <div 
              key={idx} 
              className="group bg-white p-6 text-center rounded-2xl border border-slate-200 shadow-sm transition-all hover:border-[#84cc16] hover:shadow-lg"
            >
              <div className="text-2xl font-black text-slate-900 group-hover:text-[#84cc16] transition-colors">{m.val}</div>
              <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mt-1">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Latest;