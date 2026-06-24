import { useState, useRef, useEffect } from "react";
import { Menu, X, Globe, LogOut, FileText, ChevronDown } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import { navbar } from "../data/txt.json";
import axios from "axios";
import { API_LINK } from "../cfg";

function Header({
  scrollToSection,
  mobileMenuOpen,
  setMobileMenuOpen,
  language,
  setLanguage,
  L,
  app,
  authCheck,
  userInfo,
  setUserInfo,
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    { name: L(navbar.navAbout), path: "/about-olim-foundation" },
    { name: L(navbar.navStructure), path: "/structure" },
    { name: L(navbar.navOriginal) || L(navbar.navMission), path: "/main-winner-elements" },
    { name: L(navbar.navCriteria), path: "/main-criteria-elements"},
    { name: L(navbar.navNews), path: "/", sectionId: "news" },
    { name: L(navbar.navStats), path: "/statistics" },
    { name: L(navbar.navTimeline), path: "/history-timeline" },
  ];

  const handleNavClick = (item) => {
    setMobileMenuOpen(false);

    if (item.sectionId) {
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          scrollToSection?.(item.sectionId);
        }, 100);
      } else {
        scrollToSection?.(item.sectionId);
      }
    }
  };

  const handleLogout = () => {
    try {
      const token = localStorage.getItem("access_token");
      axios
        .get(`${API_LINK}/user/leave`, {
          headers: {
            "x-admin-token": token,
          },
        })
        .then((response) => {
          if (response.data.ok) {
            localStorage.removeItem("access_token");
            setUserInfo({
              auth: false,
              usernameId: "",
              username: "",
            });
            navigate("/");
          }
        });
    } catch (error) {
      console.error(
        "Chiqishda xatolik yuz berdi:",
        error.response?.data?.msg || error.message
      );
      alert("Profildan chiqishda xatolik yuz berdi. Qayta urinib ko'ring.");
    }
  };

  const handleApplyClick = () => {
    setMobileMenuOpen(false);
    navigate("/main-enterence");
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo - Birinchi bo'lib chapdan chiqadi */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 cursor-pointer"
            data-aos="fade-right"
          >
            <img src={Logo} className="h-15" alt="logo" />
          </Link>

          {/* Desktop Navigation - Har bir havola ketma-ket (100ms farq bilan) tepadan tushadi */}
          <nav className="hidden md:flex space-x-1">
            {navItems.map((item, index) => {
              const isSection = !!item.sectionId;
              const isActive = location.pathname === item.path && !isSection;

              return isSection ? (
                <button
                  key={index}
                  onClick={() => handleNavClick(item)}
                  data-aos="fade-down"
                  data-aos-delay={index * 100}
                  className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:text-blue-600 hover:bg-slate-50 transition-colors duration-200"
                >
                  {item.name}
                </button>
              ) : (
                <Link
                  key={index}
                  to={item.path}
                  data-aos="fade-down"
                  data-aos-delay={index * 100}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 ${
                    isActive
                      ? "text-blue-600 bg-blue-50/60"
                      : "text-slate-600 hover:text-blue-600 hover:bg-slate-50"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions - Nav menyudan keyin o'ng tomondan ketma-ket chiqadi */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Language Changer */}
            <div 
              className="flex items-center space-x-1 text-slate-600 hover:text-blue-600 transition-colors"
              data-aos="fade-left"
              data-aos-delay={navItems.length * 100}
            >
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

            {/* Profil yoki Ariza tugmasi - Eng oxirida chiqadi */}
            <div 
              data-aos="fade-left" 
              data-aos-delay={(navItems.length + 1) * 100}
            >
              {authCheck ? (
                <div className="h-8 w-20 bg-slate-100 animate-pulse rounded-xl"></div>
              ) : userInfo.auth ? (
                /* Foydalanuvchi profili Dropdown */
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center space-x-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-4 py-2 rounded-xl text-sm font-bold text-slate-700 transition-all"
                  >
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs">
                      {userInfo.username?.charAt(0).toUpperCase()}
                    </div>
                    <span className="max-w-30 truncate">{userInfo.username}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform ${
                        dropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-100 rounded-xl shadow-xl py-2 z-50 animate-fadeIn">
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          handleApplyClick();
                        }}
                        className="flex items-center space-x-2 w-full px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                      >
                        <FileText className="w-4 h-4" />
                        <span>{app.bor ? "Arizam" : "Ariza topshirish"}</span>
                      </button>
                      <hr className="border-slate-100 my-1" />
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          handleLogout();
                        }}
                        className="flex items-center space-x-2 w-full px-4 py-2.5 text-sm font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Chiqish</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={handleApplyClick}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-blue-200 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
                >
                  {L(navbar.applyBtn)}
                </button>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
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
          {userInfo.auth && (
            <div className="bg-slate-50 p-4 rounded-xl mb-4 border border-slate-100">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {userInfo.username?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">
                    {userInfo.username}
                  </h4>
                  <p className="text-xs text-slate-400">
                    ID: {userInfo.usernameId}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleApplyClick}
                  className="flex items-center justify-center space-x-1.5 bg-white border border-slate-200 py-2 rounded-lg text-xs font-bold text-slate-600 active:bg-slate-50"
                >
                  <FileText className="w-3.5 h-3.5 text-blue-500" />
                  <span>{app.bor ? "Arizam" : "Ariza topshirish"}</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="flex items-center justify-center space-x-1.5 bg-rose-50 py-2 rounded-lg text-xs font-bold text-rose-600 active:bg-rose-100"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Chiqish</span>
                </button>
              </div>
            </div>
          )}

          {navItems.map((item, index) => {
            const isSection = !!item.sectionId;
            return isSection ? (
              <button
                key={index}
                onClick={() => handleNavClick(item)}
                className="block w-full text-left px-4 py-2.5 rounded-lg text-base font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
              >
                {item.name}
              </button>
            ) : (
              <Link
                key={index}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-left px-4 py-2.5 rounded-lg text-base font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
              >
                {item.name}
              </Link>
            );
          })}

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

          {!userInfo.auth && (
            <div className="pt-2 px-4">
              <button
                onClick={handleApplyClick}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold text-center shadow-md shadow-blue-200 transition-all active:scale-95"
              >
                {L(navbar.applyBtn)}
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;