export default function Footer() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="bg-slate-900 border-t border-[#0aacda]/15 pt-12 pb-7 px-5">
      <div className="max-w-[1100px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-12 mb-12">
          {/* Logo va Missiya */}
          <div>
            <div className="font-sans font-extrabold text-lg uppercase text-white mb-3 tracking-wider">
              «Olim Hasanov» <span className="text-sky-300">Fondi</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-[260px]">
              Iqtidorli yoshlarning kelajagiga investitsiya kiritish — bizning missiyamiz.
            </p>
          </div>

          {/* Sayt bo'limlari */}
          <FooterCol 
            title="Sayt bo'limlari" 
            links={[
              { label: "Fond haqida", id: "about" },
              { label: "Grant shartlari", id: "process" },
              { label: "So'ngi grant sohibi", id: "latest" },
              { label: "Ariza topshirish", id: "apply" },
            ]} 
            onNav={scrollTo} 
          />

          {/* Bog'lanish */}
          <FooterCol 
            title="Bog'lanish" 
            links={[
              { label: "fond@aat-group.uz", href: "#" },
              { label: "+998 71 200 00 00", href: "#" },
              { label: "Toshkent, O'zbekiston", href: "#" },
              { label: "AAT Group", href: "#" },
            ]} 
          />
        </div>

        {/* Pastki qism */}
        <div className="border-t border-white/5 pt-6 flex flex-wrap justify-between items-center text-[12px] text-white/20 gap-4">
          <span>© 2025 Olim Hasanov nomidagi Xayriya Fondi</span>
          <span>AAT Group hamkorligi</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links, onNav }) {
  return (
    <div>
      <h5 className="text-[10px] font-bold uppercase tracking-[0.12em] text-sky-300 mb-4">{title}</h5>
      <ul className="flex flex-col gap-3">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href || "#"}
              onClick={l.id && onNav ? (e) => { e.preventDefault(); onNav(l.id); } : undefined}
              className="text-white/40 hover:text-sky-300 text-sm transition-colors"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}