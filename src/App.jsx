import { useState, useEffect } from 'react';
import './App.css';
import Timeline from './pages/timeline';
import Header from './pages/header';
import Hero from './pages/hero';
import About from './pages/about';
import Mission from './pages/mission';
import Structure from './pages/stucture';
import Criteria from './pages/criteria';
import Shans from './pages/shans';
import Stats from './pages/stats';
import Winners from './pages/winners';
import Chart from './pages/chart';
import Apply from './components/apply';
import UpButton from './components/upButton';
import Footer from './pages/footer';
import News from './components/news';
import ApplicationForm from './components/applyTest';
export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);  
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [lang, setLang] = useState("uz");
  function L(element) {
    return lang === "uz" ? element.uz : lang === "ru" ? element.ru : element.en;
  }
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      {/* HEADER & NAVIGATION */}
      <Header scrollToSection={scrollToSection} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen } language={lang} setLanguage={setLang} L={L} />
      {/* HERO SECTION */}
      <Hero scrollToSection={scrollToSection} L={L} />

      <News/>

      {/* FOND HAQIDA & OLIM HASANOV XOTIRASI */}
      <About scrollToSection={scrollToSection} L={L} />
      {/* MISSIYA VA QADRIYATLAR */}
      <Mission L={L} />
      {/* RAHBARIYAT VA TASHKILIY TUZILMA */}
      <Structure L={L} />
      {/* STIPENDIYA SARALASH MEZONLARI */}
      <Criteria L={L}   />
      {/* IMKONIYATLAR VA QULAYLIKLAR */}
      <Shans  L={L} />
      {/* ARIZALAR STATISTIKASI (INTERACTIVE GRAPH & TABLE) */}
      <Stats L={L} />
      {/* NOMDOR VA ATOQLI STIPENDIYALAR SOHIBLARI */}
      <Winners L={L}   lang={lang}/>
      {/* STIPENDIYANTLAR BITIRGANDAN SO'NG (PIE CHART BREAKDOWN REPLACEMENT) */}
      <Chart L={L} />
      {/* TIMELINE (XRONOLOGIYA 2020 - KELAJAK) */}
      <Timeline L={L} />
      {/* ARIZA TOPSHIRISH BO'LIMI (INTERACTIVE REGISTRATION FORM) */}
      {/* <Apply L={L} /> */}
      {/* FOOTER */}
      <ApplicationForm/>
      <Footer scrollToSection={scrollToSection} L={L} />
      {showScrollTop && (
        <UpButton/>
      )}
    </div>
  );
}