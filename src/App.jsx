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

// AOS kutubxonasini va uning CSS-ni import qilamiz
import AOS from "aos";
import "aos/dist/aos.css";

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [lang, setLang] = useState("uz");
  const [authCheck, setAuthCheck] = useState(false);
  const [app, setApp] = useState({ });
  const [bor, setBor] = useState(false)

  const [admin, setAdmin] = useState({
    auth: false,
    usernameId: "",
    username: "",
  });

  // AOS-ni bir marta sayt yuklanganda ishga tushiramiz
  useEffect(() => {
    AOS.init({
      duration: 1000, // animatsiya davomiyligi (ms)
      once: true,     // animatsiya scroll qilganda faqat 1 marta ishlaydi
      offset: 100,    // element ekranga necha px yig'indida ko'ringanda animatsiya boshlanishi
      easing: "ease-in-out", // animatsiya silliqligi
    });
  }, []);

  function L(element) {
    if (!element) return "";
    return element[lang] || element["uz"];
  }

  function applyCheck(userId) {
    try {
      axios.get(`${API_LINK}/apply/${userId}`).then((d) => {
        const { ok, data } = d.data;
        
        if (ok) {
          setBor(true);
          setApp(data);
          
        } else {
          setBor(false );
        }
      });
    } catch (error) {
      console.error("Server bilan bog'lanishda xatolik:", error.message);
      alert("Serverga ulanib bo'lmadi!");
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setAdmin({ auth: false, usernameId: "", username: "" });
      return;
    }

    axios
      .get(`${API_LINK}/user/check`, {
        headers: { "x-admin-token": token },
      })
      .then((res) => {
        const { ok, userInfo } = res.data;
        if (ok) {
          setAdmin({ auth: true, ...userInfo });
          applyCheck(userInfo.usernameId);
        } else {
          setAdmin({ auth: false, usernameId: "", username: "" });
          localStorage.removeItem("access_token");
        }
      })
      .catch(() => {
        setAdmin({ auth: false, usernameId: "", username: "" });
      });
  }, [authCheck]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden">
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
        admin={admin}
      />

      <Routes>
        <Route path="/about-olim-foundation" element={<AboutPage L={L} />}/>
        <Route path="/" element={<Home scrollToSection={scrollToSection} L={L} />} />
        <Route path="/structure" element={<Structure L={L} />} />
        <Route path="/main-criteria-elements" element={<MainCriterias L={L} />} />
        <Route path="/statistics" element={<Stats L={L} />} />
        <Route path="/main-winner-elements" element={<MainWinners L={L} lang={lang} />} />
        <Route path="/history-timeline" element={<Timeline L={L} />} />
        <Route
          path="/main-enterence"
          element={
            <MainEnterence
              L={L}
              setAuthCheck={setAuthCheck}
              admin={admin}
              app={app}
              bor={bor}
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