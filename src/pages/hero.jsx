import { Link } from "react-router-dom";
import { hero } from "../data/txt.json"; // Tarjimalar faylini to'g'ri yo'ldan chaqiring

function Hero({ L }) {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-blue-50/70 via-white to-slate-50 py-20 sm:py-24 lg:py-32">
      {/* Subtle decorative background grids */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-200/60 rounded-full px-4 py-1.5 mb-6 shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse"></span>
              <span className="text-xs font-bold text-blue-800 uppercase tracking-wider">
                {L(hero.badge)}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-none mb-6">
              Live. Learn.
              <br />
              <span className="bg-linear-to-r from-blue-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
                Evolve.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-8">
              {L(hero.description)}
            </p>

            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <Link
                to="/main-enterence"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-base shadow-lg shadow-blue-300/50 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
              >
                {L(hero.applyBtn)}
              </Link>
              <Link
                to="/abou-olim-foundation"
                className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 px-8 py-4 rounded-xl font-bold text-base shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                {L(hero.moreBtn)}
              </Link>
            </div>

            {/* Quick stats tags */}
            <div className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-slate-200/80 max-w-md mx-auto lg:mx-0">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-blue-600">
                  60+
                </div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">
                  {L(hero.stats.scholars)}
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600">
                  1000+
                </div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">
                  {L(hero.stats.applications)}
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-cyan-600">
                  2020
                </div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">
                  {L(hero.stats.established)}
                </div>
              </div>
            </div>
          </div>

          {/* Hero Right Image Component */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md aspect-square rounded-3xl overflow-hidden  transform hover:rotate-1 transition-transform duration-300">
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
            {/* Back decoration */}
            <div className="absolute -bottom-6 -left-6 w-36 h-36 bg-blue-100 rounded-3xl -z-10 blur-xl"></div>
            <div className="absolute -top-6 -right-6 w-36 h-36 bg-indigo-100 rounded-full -z-10 blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
