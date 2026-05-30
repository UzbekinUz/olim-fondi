function About() {
  const features = [
    {
      icon: "📚",
      title: "To'liq ta'lim granti",
      desc: "Kontrakt mablag'larini to'liq yoki qisman qoplash imkoniyati.",
    },
    {
      icon: "💼",
      title: "Kafolatlangan ish o'rni",
      desc: "Bitiruvchilar AAT Group kompaniyalar tarmog'iga ishga joylashish kafolatiga ega bo'ladilar.",
    },
    {
      icon: "🌱",
      title: "Uzoq muddatli hamkorlik",
      desc: "Bu shunchaki bir martalik yordam emas — fond bitiruvchilar bilan aloqani saqlab boradi.",
    },
  ];

  return (
    <section id="about" className="py-20 px-5 bg-white">
      <div className="max-w-[1100px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
          {/* Chap qism: Maqsad va Xususiyatlar */}
          <div>
            <div className="mb-10">
              <div className="text-[#0aacda] font-bold text-xs uppercase tracking-[0.12em] mb-2">
                Fondning maqsadi
              </div>
              <h2 className="text-4xl font-extrabold text-slate-900 mb-4 uppercase">
                Kelajak kadrlariga investitsiya
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed">
                Fondning bosh maqsadi — bilimli, intiluvchan va salohiyatli
                yoshlarga moliyaviy qiyinchiliklar sababli o'qishdan to'xtab
                qolmasliklari uchun ko'maklashish.
              </p>
            </div>

            <ul className="space-y-6">
              {features.map((f) => (
                <li key={f.title} className="flex gap-4 items-start">
                  <div className="w-10 h-10 flex-shrink-0 bg-sky-50 border border-[#0aacda]/20 flex items-center justify-center text-lg rounded-sm">
                    {f.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 mb-1 uppercase tracking-wide">
                      {f.title}
                    </h4>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* O'ng qism: Fond Falsafasi */}
          <div className="bg-slate-900 border-l-4 border-[#0aacda] p-8 md:p-10 shadow-xl">
            <p className="text-lg md:text-xl font-medium text-white/90 leading-relaxed italic mb-6">
              «Bilim — eng katta boylik. Bitta iqtidorli yoshga yordam berish —
              butun jamiyatga investitsiya kiritish demakdir.»
            </p>
            <div className="text-xs text-[#0aacda] font-bold uppercase tracking-widest">
              — Fond falsafasi
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default About;
