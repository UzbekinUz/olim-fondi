import { Link } from "react-router-dom";
import { hero } from "../data/txt.json"; 
import { useState, useEffect, useRef } from "react";
import { useTypewriter } from "../helper/typer";

// Silliq sanash hooki
function useAnimatedNumber(endValue, duration = 2000, startAnimation = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!startAnimation) return;
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const currentCount = Math.floor(progress * endValue);
      setCount(currentCount);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(endValue);
      }
    };
    window.requestAnimationFrame(step);
  }, [endValue, duration, startAnimation]);
  return count;
}

// Ekranga chiqqanini aniqlash
function useOnScreen(ref) {
  const [isIntersecting, setIntersecting] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting));
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, [ref]);
  return isIntersecting;
}

function Hero({ L }) {
  const statsRef = useRef(null);
  const isStatsVisible = useOnScreen(statsRef);

  const scholarsCount = useAnimatedNumber(60, 2500, isStatsVisible);
  const applicationsCount = useAnimatedNumber(1000, 2500, isStatsVisible);
  const establishedCount = useAnimatedNumber(2020, 2000, isStatsVisible);

  // Animatsiya qilinadigan so'zlar ro'yxati
  const words = ["Live Learn Evolve."];
  const { displayedText, currentWordIndex } = useTypewriter(words, 100, 50, 1000);

  // Har bir so'z uchun alohida chiroyli ranglar stili
  const textStyles = [
    "bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent",
    "bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent",
    "bg-linear-to-r from-blue-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent"
  ];

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-blue-50/70 via-white to-slate-50 py-20 sm:py-24 lg:py-32">
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 text-center lg:text-left">
            
            {/* 1. Badge - Birinchi bo'lib chiqadi */}
            <div 
              className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-200/60 rounded-full px-4 py-1.5 mb-6 shadow-sm"
              data-aos="fade-right"
              data-aos-delay="0"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse"></span>
              <span className="text-xs font-bold text-blue-800 uppercase tracking-wider">
                {L(hero.badge)}
              </span>
            </div>

            {/* 2. Sarlavha - Keyinroq chiqadi */}
            <h1 
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-none mb-6 min-h-[70px] sm:min-h-[90px]"
              data-aos="fade-right"
              data-aos-delay="150"
            >
              <span className={`relative inline-block ${textStyles[currentWordIndex]}`}>
                {displayedText}
                <span className="absolute -right-2 top-0 h-full w-[4px] bg-slate-800 animate-pulse"></span>
              </span>
            </h1>

            {/* 3. Ta'rif matni */}
            <p 
              className="text-lg sm:text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-8"
              data-aos="fade-right"
              data-aos-delay="300"
            >
              {L(hero.description)}
            </p>

            {/* Tugmalar har biri alohida kechikish bilan chiqadi */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              {/* 4. Ariza topshirish tugmasi */}
              <Link
                to="/main-enterence"
                data-aos="fade-up"
                data-aos-delay="450"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-base shadow-lg shadow-blue-300/50 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
              >
                {L(hero.applyBtn)}
              </Link>
              
              {/* 5. Batafsil tugmasi */}
              <Link
                to="/about-olim-foundation"
                data-aos="fade-up"
                data-aos-delay="550"
                className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 px-8 py-4 rounded-xl font-bold text-base shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                {L(hero.moreBtn)}
              </Link>
            </div>

            {/* Statistika har bir ustuni alohida va ketma-ketlikda chiqadi */}
            <div 
              ref={statsRef}
              className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-slate-200/80 max-w-md mx-auto lg:mx-0"
            >
              {/* 6. Birinchi statistika */}
              <div data-aos="fade-up" data-aos-delay="700">
                <div className="text-2xl sm:text-3xl font-extrabold text-blue-600">
                  {scholarsCount}+
                </div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">
                  {L(hero.stats.scholars)}
                </div>
              </div>
              
              {/* 7. Ikkinchi statistika */}
              <div data-aos="fade-up" data-aos-delay="800">
                <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600">
                  {applicationsCount > 999 ? applicationsCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") : applicationsCount}+
                </div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">
                  {L(hero.stats.applications)}
                </div>
              </div>
              
              {/* 8. Uchinchi statistika */}
              <div data-aos="fade-up" data-aos-delay="900">
                <div className="text-2xl sm:text-3xl font-extrabold text-cyan-600">
                  {establishedCount}
                </div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">
                  {L(hero.stats.established)}
                </div>
              </div>
            </div>
          </div>

          {/* Hero Right Image Component - Matnlardan so'ng o'ng tarafdan kiradi */}
          <div className="lg:col-span-5 relative flex justify-center" data-aos="fade-left" data-aos-delay="400">
            <div className="relative w-full max-w-sm sm:max-w-md aspect-square rounded-3xl overflow-hidden transform hover:rotate-1 transition-transform duration-300">
              <img
                src="/hero.png"
                alt={`[${L(hero.imageAlt)}]`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-xs font-semibold tracking-wider uppercase text-blue-300">
                  {L(hero.mottoTitle)}
                </span>
                <p className="text-lg font-bold mt-1">{L(hero.mottoText)}</p>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 w-36 h-36 bg-blue-100 rounded-3xl -z-10 blur-xl"></div>
            <div className="absolute -top-6 -right-6 w-36 h-36 bg-indigo-100 rounded-full -z-10 blur-xl"></div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;