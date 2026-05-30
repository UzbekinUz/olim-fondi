import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "../assets/logo.png";
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Fond haqida", id: "about" },
    { label: "Shartlar", id: "process" },
    { label: "So'ngi grant", id: "latest" },
    { label: "Ariza topshirish", id: "apply" },
  ];

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false); // Menyu bosilganda yopilishi uchun
  };
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-cyan-500/10 shadow-sm h-20 md:h-25 flex items-center px-5 md:px-[5%] justify-between">
      {/* Logo */}
      <div className="font-sans font-extrabold text-lg text-slate-800 tracking-wider uppercase cursor-pointer">
        <img src={logo} alt="Logo" className="md:h-20  h-16 inline-block mr-2" />
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-8">
        {navLinks.map(({ label, id }) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className="text-slate-500 hover:text-[#0aacda] text-xs font-bold tracking-[0.07em] uppercase transition-colors"
          >
            {label}
          </button>
        ))}
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
        <div className="absolute top-16 left-0 w-full bg-white border-b border-slate-100 p-6 flex flex-col gap-4 md:hidden shadow-xl">
          {navLinks.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="text-left text-slate-600 font-semibold uppercase text-sm py-2"
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Navbar;