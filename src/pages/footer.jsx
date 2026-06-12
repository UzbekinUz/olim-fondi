import { GraduationCap, Mail, MapPin, Phone } from "lucide-react";
import { footer1 } from "../data/txt.json";
function Footer({scrollToSection, L}) {

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-lg font-black tracking-wider text-white">OLIM FONDI</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">{L(footer1.description)}</p>
            <div className="text-xs text-slate-400 font-bold uppercase tracking-wider pt-2">
              LIVE • LEARN • EVOLVE
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">{L(footer1.footerLinksTitle)}</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => scrollToSection("about")} className="hover:text-white transition">{L(footer1.linkAbout)}</button></li>
              <li><button onClick={() => scrollToSection("structure")} className="hover:text-white transition">{L(footer1.linkStructure)}</button></li>
              <li><button onClick={() => scrollToSection("mission")} className="hover:text-white transition">{L(footer1.linkMission)}</button></li>
              <li><button onClick={() => scrollToSection("criteria")} className="hover:text-white transition">{L(footer1.linkCriteria)}</button></li>
              <li><button onClick={() => scrollToSection("apply")} className="hover:text-white transition">{L(footer1.linkApply)}</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">{L(footer1.statsTitle)}</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>• {L(footer1.stat1)}</li>
              <li>• {L(footer1.stat2)}</li>
              <li>• {L(footer1.stat3)}</li>
              <li>• {L(footer1.stat4)}</li>
            </ul>
          </div>

          <div className="space-y-3 text-xs">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">{L(footer1.contactTitle)}</h4>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-blue-500" />
              <span>+998 (90) 123-45-67</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-blue-500" />
              <span>info@olimfondi.uz</span>
            </div>
            <div className="flex items-start space-x-2">
              <MapPin className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
              <span>{L(footer1.address)}</span>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {L(footer1.copyright)}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;