import { Menu, X } from "lucide-react";
import Logo from '../assets/logo.png';
import { Globe } from "lucide-react";
import {navbar} from "../data/txt.json";
function Header({ scrollToSection, mobileMenuOpen, setMobileMenuOpen, language, setLanguage, L }) {
  // Tarjimani olish uchun yordamchi funksiya

  // Navigatsiya elementlari
  const navItems = [
    { name: L(navbar.navAbout), id: "about" },
    { name: L(navbar.navStructure), id: "structure" },
    { name: L(navbar.navMission), id: "mission" },
    { name: L(navbar.navCriteria), id: "criteria" },
    { name: L(navbar.navNews), id: "news" },
    { name: L(navbar.navStats), id: "stats" },
    { name: L(navbar.navTimeline), id: "timeline" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div>
              <span className="text-xl font-black bg-linear-to-r from-blue-700 to-indigo-900 bg-clip-text text-transparent block tracking-wide">
                <img src={Logo} className="h-15" alt="ligo" />
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:text-blue-600 hover:bg-slate-50 transition-colors duration-200"
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Desktop Actions: Language & Apply Button */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Language Changer */}
            <div className="flex items-center space-x-1 text-slate-600 hover:text-blue-600 transition-colors">
              <Globe className="w-4 h-4" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-transparent text-sm font-semibold cursor-pointer outline-none appearance-none pr-2"
              >
                <option value="uz">UZ</option>
                <option value="ru">RU</option>
                <option value="en">EN</option>
              </select>
            </div>

            <button
              onClick={() => scrollToSection("apply")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-blue-200 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
            >
              {L(navbar.applyBtn)}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-600 p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-6 bg-white border-b border-slate-200 space-y-2 animate-fadeIn">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                scrollToSection(item.id);
                setMobileMenuOpen(false); // Link bosilganda menyu yopilishi uchun
              }}
              className="block w-full text-left px-4 py-3 rounded-lg text-base font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
            >
              {item.name}
            </button>
          ))}
          
          {/* Mobile Language Switcher */}
          <div className="flex items-center justify-center space-x-6 py-4 border-t border-slate-100 mt-2">
            {["uz", "ru", "en"].map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`uppercase text-sm font-bold transition-colors ${
                  language === lang
                    ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          <div className="pt-2 px-4">
            <button
              onClick={() => {
                scrollToSection("apply");
                setMobileMenuOpen(false);
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold text-center shadow-md shadow-blue-200 transition-all active:scale-95"
            >
              {L(navbar.applyBtn)}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
