function Process() {
   const steps = [
    { num: "01", title: "Hujjat topshirish", desc: "Reyting daftarchasi, ijtimoiy holatni tasdiqlovchi hujjatlar va motivatsion xat taqdim etiladi." },
    { num: "02", title: "Suhbat bosqichi", desc: "Fond hay'ati bilan yuzma-yuz suhbat. Nomzodning dunyoqarashi va kelajakdagi rejalari baholanadi." },
    { num: "03", title: "Grant va ish joyi", desc: "Tanlangan nomzodlar ta'lim granti oladi. Bitiruvchilarga AAT Group'da kafolatlangan ish o'rni beriladi." },
  ];

  const deadlines = [
    { phase: "Ariza qabul bosqichi", date: "1 – 31 AVGUST 2025", status: "Yopiq", type: "closed" },
    { phase: "Hujjatlar ko'rib chiqish", date: "1 – 15 SENTABR 2025", status: "Tugallangan", type: "closed" },
    { phase: "Suhbat bosqichi", date: "16 – 30 SENTABR 2025", status: "Tugallangan", type: "closed" },
    { phase: "Natijalar e'lon qilinishi", date: "5 OKTABR 2025", status: "Tugallangan", type: "closed" },
    { phase: "2026 yilgi ariza qabuli", date: "1 AVGUST 2026", status: "Kutilmoqda", type: "upcoming" },
  ];

  return (
    <section id="process" className="py-20 px-5 bg-slate-50">
      <div className="max-w-[1100px] mx-auto">
        {/* Sarlavha */}
        <div className="mb-16 text-center md:text-left">
          <div className="text-[#0aacda] font-bold text-xs uppercase tracking-[0.12em] mb-2">Saralash jarayoni</div>
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4 uppercase">Grant olish shartlari</h2>
          <p className="text-slate-500 text-lg max-w-2xl">Fond har yili avgust–sentabr oylarida ariza qabul qiladi. Saralash ikki bosqichda amalga oshiriladi.</p>
        </div>

        {/* Qadamlar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {steps.map((s, i) => (
            <div key={i} className="bg-white p-8 border border-slate-200 hover:border-[#0aacda]/30 transition-all shadow-sm">
              <div className="text-[#0aacda] font-extrabold text-3xl mb-4">{s.num}</div>
              <h4 className="font-bold text-slate-900 mb-3 uppercase tracking-wide">{s.title}</h4>
              <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Muddatlar */}
        <div>
          <div className="text-[#0aacda] font-bold text-xs uppercase tracking-[0.14em] mb-6">2025–2026 o'quv yili muddatlari</div>
          <div className="bg-white border border-slate-200">
            {deadlines.map((d, i) => (
              <div 
                key={i} 
                className={`flex flex-wrap items-center justify-between p-5 ${i !== deadlines.length - 1 ? 'border-b border-slate-100' : ''} gap-4`}
              >
                <span className="font-medium text-slate-700">{d.phase}</span>
                <span className="font-bold text-[#0aacda] text-sm tracking-wide">{d.date}</span>
                <span className={`text-[10px] font-bold uppercase px-3 py-1 rounded-sm ${
                  d.type === 'upcoming' ? 'bg-sky-100 text-[#0aacda]' : 'bg-slate-100 text-slate-500'
                }`}>
                  {d.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Process;