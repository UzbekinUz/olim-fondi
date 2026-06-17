import { useState, useEffect } from "react";
import "./App.css";
import Timeline from "./pages/timeline";
import Header from "./pages/header";
import Hero from "./pages/hero";
import About from "./pages/about";
import Mission from "./pages/mission";
import Structure from "./pages/stucture";
import Criteria from "./pages/criteria";
import Shans from "./pages/shans";
import Stats from "./pages/stats";
import Winners from "./pages/winners";
import Chart from "./pages/chart";
import UpButton from "./components/upButton";
import Footer from "./pages/footer";
import News from "./components/news";
import ApplicationForm from "./components/applyTest";
import Auth from "./components/auth";
import axios from "axios";
import { API_LINK } from "./cfg";

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
          try {
            // Backend API manzilingiz (o'zingiznikiga moslab olasiz)
            axios
              .get(
                `${API_LINK}/apply/${userInfo.usernameId}`,
              )
              .then((d) => {
                const { ok, msg, data } = d.data;
                if (ok) {
                  setApp({ bor: true, ...app, data });
                } else {
                  setApp({ bor: false });
                  alert(msg);
                }
              });
          } catch (error) {
            console.error("Server bilan bog'lanishda xatolik:", error.message);
            alert("Serverga ulanib bo'lmadi!");
          }
        } else {
          console.log(res.data);
          setAdmin({ auth: false, usernameId: "", username: "" });
          localStorage.removeItem("access_token"); // Yaroqsiz tokenni o'chirish
        }
      })
      .catch((err) => {
        console.error("Auth check error:", err);
        setAdmin({ auth: false, usernameId: "", username: "" });
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authCheck]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      {/* HEADER & NAVIGATION */}
      <Header
        scrollToSection={scrollToSection}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        language={lang}
        setLanguage={setLang}
        L={L}
        admin={admin} // Header ichida balki "Chiqish" yoki "Profil" tugmasi kerakdir
      />

      {/* HERO SECTION */}
      <Hero scrollToSection={scrollToSection} L={L} />

      {/* YANGILIKLAR */}
      <News />

      {/* FOND HAQIDA */}
      <About scrollToSection={scrollToSection} L={L} />

      {/* MISSIYA VA QADRIYATLAR */}
      <Mission L={L} />

      {/* TASHKILIY TUZILMA */}
      <Structure L={L} />

      {/* SARALASH MEZONLARI */}
      <Criteria L={L} />

      {/* IMKONIYATLAR */}
      <Shans L={L} />

      {/* STATISTIKA */}
      <Stats L={L} />

      {/* STIPENDIYA SOHIBLARI */}
      <Winners L={L} lang={lang} />

      {/* GRAFIK (CHART) */}
      <Chart L={L} />

      {/* XRONOLOGIYA (TIMELINE) */}
      <Timeline L={L} />

      {/* ARIZA TOPSHIRISH VA AUTH MANTIGI (SHARTLI RENDER) */}
      <div id="apply" className="py-10 bg-white">
        {admin.auth ? (
          // Agar tizimga kirgan bo'lsa, ariza formasini ko'rsatamiz va unga usernameId ni dinamik beramiz
          !app.bor?<ApplicationForm usernameId={admin.usernameId} />:"A'rizangiz tekshirilmoqda"
        ) : (
          // Agar tizimga kirmagan bo'lsa, avval login/register qilishini so'raymiz
          <div className="flex flex-col items-center justify-center">
            <p className="text-center text-rose-500 font-semibold mb-4">
              Ariza topshirishdan oldin tizimga kirishingiz yoki ro'yxatdan
              o'tishingiz shart!
            </p>
            <Auth refresh={authCheck} setRefresh={setAuthCheck} />
          </div>
        )}
      </div>

      {/* FOOTER */}
      <Footer scrollToSection={scrollToSection} L={L} />

      {/* YUQORIGA QAYTISH TUGMASI */}
      {showScrollTop && <UpButton />}
    </div>
  );
}
