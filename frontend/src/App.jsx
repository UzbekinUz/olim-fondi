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
import AOS from "aos";
import "aos/dist/aos.css";
import AppAdmin from "./adminPanel/App";
import AuthStp from "./stpPanel/authStp";
import NotFound from "./helper/notfoundpage";
import StipendiatCabinet from "./stpPanel/stpCabinet";

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [lang, setLang] = useState("uz");
  const [authCheck, setAuthCheck] = useState(false);
  const [authCheckStp, setAuthCheckStp] = useState(false);
  const handleAuthCheckStpChange = () => {
    setAuthCheckStp(!authCheckStp);
  };
  const [stp, setStp] = useState({
    auth: false,
    stpId: "",
    login: "",
  });
  const [app, setApp] = useState({});
  const [bor, setBor] = useState("false");
  const [bor1, setBor1] = useState({});
  const [applyMode, setApplyMode] = useState("false");
  const [admin, setAdmin] = useState({
    auth: false,
    usernameId: "",
    username: "",
  });

  // AOS-ni bir marta sayt yuklanganda ishga tushiramiz
  useEffect(() => {
    AOS.init({
      duration: 1000, // animatsiya davomiyligi (ms)
      once: true, // animatsiya scroll qilganda faqat 1 marta ishlaydi
      offset: 100, // element ekranga necha px yig'indida ko'ringanda animatsiya boshlanishi
      easing: "ease-in-out", // animatsiya silliqligi
    });
  }, []);

  function L(element) {
    if (!element) return "";
    return element[lang] || element["uz"];
  }

  function applyCheck(userId) {
    axios
      .get(`${API_LINK}/apply/${userId}`)
      .then((d) => {
        const { ok, data } = d.data;

        if (ok) {
          setBor((prev) => (prev === "resend" ? "resend" : "true"));
          setApp(data);
        } else {
          setBor("false");
        }
      })
      .catch((error) => {
        console.error("Server bilan bog'lanishda xatolik:", error.message);
      });
  }
  function stpApplyCheck(stpId) {
    const token = localStorage.getItem("access_stp_token");

    axios
      .get(`${API_LINK}/application/checkapp/${stpId}`, {
        headers: { "x-stp-token": token },
      })
      .then((res) => {
        const { ok } = res.data;

        if (ok) {
          setBor1(res.data);
        } else {
          setBor1({});
        }
      })
      .catch(() => setBor1({}));
  }
  useEffect(() => {
    const token = localStorage.getItem("access_stp_token");
    if (!token) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStp({ auth: false, stpId: "", login: "" });
      return;
    }

    axios
      .get(`${API_LINK}/stipendiat/check`, {
        headers: { "x-stp-token": token },
      })
      .then((res) => {
        const { ok, stpInfo } = res.data;
        if (ok) {
          setStp({ auth: true, ...stpInfo });
          stpApplyCheck(stpInfo.stpId);
        } else {
          setStp({ auth: false, stpId: "", login: "" });
          localStorage.removeItem("access_stp_token");
        }
      })
      .catch(() => {
        setStp({ auth: false, stpId: "", login: "" });
      });
  }, [authCheckStp]);

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
      // eslint-disable-next-line react-hooks/set-state-in-effect
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authCheck]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden">
      <ScrollToTop />

      <Header
        bor={bor}
        applyMode={applyMode}
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
        stp={stp}
        stpCheck={handleAuthCheckStpChange}
      />

      <Routes>
        <Route path="/about-olim-foundation" element={<AboutPage L={L} />} />
        <Route
          path="/"
          element={
            <Home
              scrollToSection={scrollToSection}
              L={L}
              applyMode={applyMode}
            />
          }
        />
        <Route path="/structure" element={<Structure L={L} />} />
        <Route
          path="/main-criteria-elements"
          element={<MainCriterias L={L} />}
        />
        <Route path="/statistics" element={<Stats L={L} />} />
        <Route
          path="/main-winner-elements"
          element={<MainWinners L={L} lang={lang} stpinfo={stp} stp={bor1} />}
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
              bor={bor}
              applyCheck={applyCheck}
              authCheck={authCheck}
              setBor={setBor}
              applyMode={applyMode}
            />
          }
        />
        <Route
          path="/main-winner-element"
          element={
            <AuthStp
              L={L}
              stp={stp}
              stpCheck={handleAuthCheckStpChange}
              applyCheck={applyCheck}
              setAuthCheck={setAuthCheck}
              
            />
          }
        />
        <Route
          path="/main-winner-element/stipendiat-kobinetiga-kirish"
          element={
            <AuthStp stp={stp} stpCheck={handleAuthCheckStpChange} L={L} />
          }
        />
        <Route
          path="/main-winner-element/stipendiat-cabinet"
          element={
            stp.auth?<StipendiatCabinet
              stp={bor1}
              stpinfo={stp}
              stpCheck={handleAuthCheckStpChange}
              L={L}
            />:<NotFound/>
          }
        />
        <Route
          path="/admin"
          element={
            <AppAdmin applyMode={applyMode} setApplyMode={setApplyMode} />
          }
        />
        <Route path="*" element={<NotFound />} />
        {/* <Route path="/stp" element={<StpApp stp={bor1} />} /> */}
      </Routes>

      <Footer scrollToSection={scrollToSection} L={L} />
      {showScrollTop && <UpButton />}
    </div>
  );
}
