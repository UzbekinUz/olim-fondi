function Stats() {
  const stats = [
    { id: "stat1", val: "47", suffix: "", label: "Jami grantlar berilgan" },
    { id: "stat2", val: "12", suffix: "", label: "Faol stipendiatorlar" },
    { id: "stat3", val: "94", suffix: "%", label: "Bitiruvchilar ish topgan" },
    { id: "stat4", val: "8", suffix: "", label: "Hamkor universitetlar" },
  ];

  return (
    <div className="bg-slate-900 border-y border-[#0aacda]/20 py-10 px-5">
      <div className="max-w-[1100px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-y-10">
        {stats.map((s, i) => (
          <div
            key={s.id}
            className={`text-center px-4 ${
              i < stats.length - 1 ? "border-r border-white/10" : ""
            }`}
          >
            <div className="text-4xl md:text-5xl font-extrabold text-sky-300 leading-none mb-3 tracking-tight">
              {s.val}{s.suffix}
            </div>
            <div className="text-[10px] md:text-xs text-white/50 uppercase tracking-[0.15em] font-bold">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Stats ;