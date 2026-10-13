import { Bot, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { footer1 } from "../data/txt.json";

function Footer({ scrollToSection, L }) {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* 1. Logo va qisqacha tavsif */}
          <div className="space-y-4" data-aos="fade-up" data-aos-delay="0">
            <div className="flex items-center space-x-3">
              <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                <img src="/logo.png" className="h-15" alt="logo" />
              </Link>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {L(footer1.description)}
            </p>
            <div className="text-xs text-slate-400 font-bold uppercase tracking-wider pt-2">
              LIVE • LEARN • EVOLVE
            </div>
          </div>

          {/* 2. Navigatsiya havolalari */}
          <div data-aos="fade-up" data-aos-delay="100">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              {L(footer1.footerLinksTitle)}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  to="/about-olim-foundation"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="hover:text-white transition block"
                >
                  {L(footer1.linkAbout)}
                </Link>
              </li>
              <li>
                <Link
                  to="/structure"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="hover:text-white transition block"
                >
                  {L(footer1.linkStructure)}
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection("mission")}
                  className="hover:text-white transition text-left cursor-pointer"
                >
                  {L(footer1.linkMission)}
                </button>
              </li>
              <li>
                <Link
                  to="/main-criteria-elements"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="hover:text-white transition block"
                >
                  {L(footer1.linkCriteria)}
                </Link>
              </li>
              <li>
                <Link
                  to="/main-enterence"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="hover:text-white transition block"
                >
                  {L(footer1.linkApply)}
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Statistika yoki Loyihalar bo'limi */}
          <div data-aos="fade-up" data-aos-delay="200">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              {L(footer1.statsTitle)}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/statistics" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-slate-200">
                  • {L(footer1.stat1)}
                </Link>
              </li>
              <li>• {L(footer1.stat2)}</li>
              <li>• {L(footer1.stat3)}</li>
              <li>• {L(footer1.stat4)}</li>
            </ul>
          </div>

          {/* 4. Kontaktlar paneli */}
          <div className="space-y-3 text-xs" data-aos="fade-up" data-aos-delay="300">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              {L(footer1.contactTitle)}
            </h4>
            <a
              href="https://t.me/Olimfondi_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 hover:text-white transition"
            >
              <Bot className="w-4 h-4 text-blue-500" />
              <span>@Olimfondi_bot</span>
            </a>
            <a
              href="mailto:info@olimfondi.uz"
              className="flex items-center space-x-2 hover:text-white transition"
            >
              <Mail className="w-4 h-4 text-blue-500" />
              <span>info@olimfondi.uz</span>
            </a>
            <div className="flex items-start space-x-2">
              <MapPin className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
              <span className="leading-relaxed">{L(footer1.address)}</span>
            </div>
          </div>
        </div>

        {/* Mualliflik huquqi - Eng oxirida chiqadi */}
        <div 
          className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <p>
            © {new Date().getFullYear()} {L(footer1.copyright)}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;