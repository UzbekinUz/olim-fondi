import { useState, useEffect } from "react";
import "./App.css";
import Timeline from "./pages/timeline";
import Header from "./pages/header";
import Structure from "./pages/stucture";
import Stats from "./pages/stats";
import UpButton from "./components/upButton";
import Footer from "./pages/footer";
import axios from "axios";
import { API_LINK } from "./cfg";
import Home from "./Routes/home";
import MainCriterias from "./Routes/mainCriterias";
import MainWinners from "./Routes/mainWinners";
import MainEnterence from "./Routes/mainEnterance";
import { Route, Routes } from "react-router-dom";
import AboutPage from "./Routes/aboutPage";
import ScrollToTop from "./helper/scrollTop";
export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [lang, setLang] = useState("uz");
  const [authCheck, setAuthCheck] = useState(false);
  const [app, setApp] = useState({ bor: false });

  // Admin (foydalanuvchi) holati
  const [admin, setAdmin] = useState({
    auth: false,
    usernameId: "",
    username: "",
  });

  // Tilni almashtirish funksiyasi (Optimallashtirildi)
  function L(element) {
    if (!element) return "";
    return element[lang] || element["uz"]; // Agar tanlangan til bo'lmasa, default 'uz' qaytaradi
  }
  function applyCheck(userId) {
    try {
      // Backend API manzilingiz (o'zingiznikiga moslab olasiz)
      axios.get(`${API_LINK}/apply/${userId}`).then((d) => {
        const { ok, data } = d.data;

        if (ok) {
          setApp({ bor: true, ...app, data });
        } else {
          setApp({ bor: false });
        }
      });
    } catch (error) {
      console.error("Server bilan bog'lanishda xatolik:", error.message);
      alert("Serverga ulanib bo'lmadi!");
    }
  }
  // Scroll hodisasini kuzatish (Scroll-to-top tugmasi uchun)
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sekin (smooth) scroll qilish funksiyasi
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  // Token mavjudligini va foydalanuvchi holatini tekshirish
  useEffect(() => {
    const token = localStorage.getItem("access_token");

    // Agar token bo'lmasa, serverga so'rov yuborib o'tirmaymiz
    if (!token) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAdmin({ auth: false, usernameId: "", username: "" });
      return;
    }

    axios
      .get(`${API_LINK}/user/check`, {
        headers: {
          "x-admin-token": token,
        },
      })
      .then((res) => {
        const { ok, userInfo } = res.data;
        if (ok) {
          setAdmin({ auth: true, ...userInfo });
          applyCheck(userInfo.usernameId);
        } else {
          setAdmin({ auth: false, usernameId: "", username: "" });
          localStorage.removeItem("access_token"); // Yaroqsiz tokenni o'chirish
        }
      })
      .catch(() => {
        setAdmin({ auth: false, usernameId: "", username: "" });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authCheck]);
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
        <ScrollToTop />
      
      <Header
        scrollToSection={scrollToSection}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        language={lang}
        setLanguage={setLang}
        L={L}
        setUserInfo={setAdmin}
        userInfo={admin}
        authCheck={authCheck}
        app={app}
        admin={admin} // Header ichida balki "Chiqish" yoki "Profil" tugmasi kerakdir
      />

      <Routes>
        <Route path="/about-olim-foundation" element={<AboutPage L={L} />}/>
        <Route
          path="/"
          element={<Home scrollToSection={scrollToSection} L={L} />}
        />
        <Route path="/structure" element={<Structure L={L} />} />
        <Route
          path="/main-criteria-elements"
          element={<MainCriterias L={L} />}
        />
        <Route path="/statistics" element={<Stats L={L} />} />
        <Route
          path="/main-winner-elements"
          element={<MainWinners L={L} lang={lang} />}
        />
        <Route path="/history-timeline" element={<Timeline L={L} />} />
        <Route
          path="/main-enterence"
          element={
            <MainEnterence
            L={L}
              setAuthCheck={setAuthCheck}
              admin={admin}
              app={app}
              applyCheck={applyCheck}
              authCheck={authCheck}
            />
          }
        />
      </Routes>

      <Footer scrollToSection={scrollToSection} L={L} />
      {showScrollTop && <UpButton />}
    </div>
  );
}
