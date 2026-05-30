import { Menu, X, Globe } from "lucide-react"; // Globe ikonkasini qo'shdim
import { useState } from "react";
import logo from "../assets/logo.png";

function Navbar({lang , setLang}) {
  const [isOpen, setIsOpen] = useState(false);
  // Til holati

  const navLinks = [
    { label: "Fond haqida", id: "about" },
    { label: "Shartlar", id: "process" },
    { label: "So'ngi grant", id: "latest" },
    { label: "Ariza topshirish", id: "apply" },
  ];

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  // Til o'zgartiruvchi funksiya
  const changeLanguage = (newLang) => {
    setLang(newLang);
    // Bu yerda i18n kutubxonasi funksiyasini chaqirishingiz mumkin
    console.log("Tanlangan til:", newLang);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-cyan-500/10 shadow-sm h-20 md:h-25 flex items-center px-5 md:px-[5%] justify-between">
      {/* Logo */}
      <div className="font-sans font-extrabold text-lg text-slate-800 tracking-wider uppercase cursor-pointer">
        <img src={logo} alt="Logo" className="md:h-20 h-16 inline-block mr-2" />
      </div>

      {/* Desktop Menu & Language Switcher */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map(({ label, id }) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className="text-slate-500 hover:text-[#0aacda] text-xs font-bold tracking-[0.07em] uppercase transition-colors"
          >
            {label}
          </button>
        ))}

        {/* Til o'zgartirish tugmalari */}
        <div className="flex gap-2 border-l border-slate-200 pl-6 ml-2">
          {["UZB", "ENG", "RUS"].map((l) => (
            <button
              key={l}
              onClick={() => changeLanguage(l)}
              className={`text-[10px] font-bold uppercase transition-all ${
                lang === l ? "text-[#0aacda]" : "text-slate-400 hover:text-slate-700"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Burger Menu Button (Mobile) */}
      <button 
        className="md:hidden p-2 text-slate-800"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div className="absolute top-20 left-0 w-full bg-white border-b border-slate-100 p-6 flex flex-col gap-4 md:hidden shadow-xl">
          {navLinks.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="text-left text-slate-600 font-semibold uppercase text-sm py-2"
            >
              {label}
            </button>
          ))}
          {/* Mobile til o'zgartirgich */}
          <div className="flex gap-4 pt-4 border-t border-slate-100">
            {["UZB", "ENG", "RUS"].map((l) => (
              <button key={l} onClick={() => changeLanguage(l)} className={`font-bold ${lang === l ? "text-[#0aacda]" : "text-slate-400"}`}>
                {l}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;