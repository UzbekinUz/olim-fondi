import { CheckCircle2 } from "lucide-react";
import {about} from "../data/txt.json";
function About({L}) {
    return ( 
        <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">
            {L(about.historyTitle)}
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            {L(about.mainTitle )}
          </p>
          <div className="w-16 h-1.5 bg-blue-600 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Portret (Representative of Olim Hasanov) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-tr from-blue-600 to-indigo-600 rounded-2xl transform rotate-3 shadow-lg"></div>
              <div className="relative bg-slate-950 rounded-2xl overflow-hidden shadow-xl border border-slate-800 max-w-sm">
                <img
                  src="/modul/creator.png"
                  alt={L(about.portraitAlt)}
                  className="w-full object-cover aspect-4/5 filter grayscale contrast-125 opacity-90 hover:opacity-100 hover:filter-none transition-all duration-500"
                />
                <div className="absolute bottom-0 inset-x-0 bg-linear-to-t from-black/90 to-transparent p-6 text-white text-center">
                  <h3 className="text-xl font-bold">{L(about.personName)}</h3>
                  <p className="text-xs text-slate-300 font-semibold uppercase mt-1 tracking-widest">
                    {L(about.personRole)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Fond matni */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-slate-50 border-l-4 border-blue-600 p-6 rounded-r-xl">
              <p className="text-lg text-slate-700 italic font-medium">
                {L(about.quoteText)}
              </p>
            </div>

            <div className="space-y-4 text-slate-600 text-base leading-relaxed">
              <p dangerouslySetInnerHTML={{ __html: L(about.descriptionParagraph1) }} />
              <p dangerouslySetInnerHTML={{ __html: L(about.descriptionParagraph2) }} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded bg-emerald-100 flex items-center justify-center text-emerald-600 mt-1 shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    {L(about.feature1Title)}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {L(about.feature1Description)}
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded bg-emerald-100 flex items-center justify-center text-emerald-600 mt-1 shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    {L(about.feature2Title)}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {L(about.feature2Description)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
     );
}

export default About;