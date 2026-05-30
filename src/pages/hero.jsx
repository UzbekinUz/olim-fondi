function Hero() {
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <section className="min-h-screen w-full bg-white flex items-center justify-center text-center px-5 md:px-10 py-20 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[20%] w-[60%] h-[55%] bg-[#0aacda]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-[10%] right-[10%] w-[40%] h-[30%] bg-[#0aacda]/5 rounded-full blur-3xl" />
      </div>

      {/* Grid bg */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(10,172,218,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(10,172,218,0.06)_1px,transparent_1px)] bg-[length:48px_48px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)]" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-sky-50 border border-[#0aacda]/25 text-[#0aacda] text-xs font-bold tracking-[0.12em] uppercase px-5 py-1.5 rounded-sm mb-6">
          Xayriya ta'lim fondi
        </div>

        <h1 className="font-sans font-extrabold text-slate-900 leading-[0.9] mb-6 tracking-tight uppercase text-5xl sm:text-7xl lg:text-[88px]">
          «Olim Hasanov»
          <br />
          <span className="text-[#0aacda]">Nomidagi Fond</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-500 max-w-lg mx-auto mb-10 leading-relaxed font-normal">
          Iqtidorli yoshlarga moliyaviy qiyinchiliklar sababli o'qishdan to'xtab
          qolmasliklari uchun ko'maklashish
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => scrollTo("apply")}
            className="w-full sm:w-auto px-8 py-4 bg-[#0aacda] text-white font-bold uppercase tracking-wider hover:bg-[#088fb5] transition-all"
          >
            Ariza topshirish
          </button>
          <button
            onClick={() => scrollTo("about")}
            className="w-full sm:w-auto px-8 py-4 border-2 border-slate-200 text-slate-800 font-bold uppercase tracking-wider hover:border-[#0aacda] hover:text-[#0aacda] transition-all"
          >
            Fond haqida
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
