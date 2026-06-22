import { CheckCircle2, Target, Award } from "lucide-react";
import { about } from "../data/txt.json";

function About({ L }) {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Sarlavha bloki */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">
            {L(about.historyTitle)}
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {L(about.mainTitle)}
          </p>
          <div className="w-16 h-1.5 bg-blue-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Asosiy Grid: Portret va Tarix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          {/* Portret qismi */}
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

          {/* Fond tarixi va matnlari */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-slate-50 border-l-4 border-blue-600 p-6 rounded-r-xl shadow-xs">
              <p className="text-lg text-slate-700 italic font-medium leading-relaxed">
                {L(about.quoteText)}
              </p>
            </div>

            <div className="space-y-4 text-slate-600 text-base leading-relaxed">
              <p
                dangerouslySetInnerHTML={{
                  __html: L(about.descriptionParagraph1),
                }}
              />
              <p
                dangerouslySetInnerHTML={{
                  __html: L(about.descriptionParagraph2),
                }}
              />
            </div>

            {/* Imkoniyatlar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded bg-emerald-100 flex items-center justify-center text-emerald-600 mt-1 shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    {L(about.feature1Title)}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
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
                  <p className="text-xs text-slate-500 mt-0.5">
                    {L(about.feature2Description)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* YANGI QO'SHILGAN QISM: Fondning Oliy Maqsadi & Missiyasi */}
        <div className="mt-16 pt-12 border-t border-slate-100">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6 lg:pl-4">
              <div className="space-y-4 text-slate-600 text-base leading-relaxed">
                <p
                  dangerouslySetInnerHTML={{
                    __html: L(about.missionParagraph1),
                  }}
                />
                <p>{L(about.missionParagraph2)}</p>
              </div>
            </div>
            {/* Chap tomon: Chiroyli vizual iqtibos bloki */}
            <div className="lg:col-span-5 bg-linear-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-md relative overflow-hidden group">
              <div className="absolute -right-10 -bottom-10 text-white/5 transform group-hover:scale-110 transition-transform duration-500">
                <Target className="w-48 h-48" />
              </div>
              <div className="relative z-10 space-y-4">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <Award className="w-5 h-5 text-blue-200" />
                </div>
                <p className="text-xl font-medium italic leading-relaxed pt-2">
                  {L(about.missionQuote)}
                </p>
                <div className="w-12 h-1 bg-white/30 rounded-full"></div>
              </div>
            </div>

            {/* O'ng tomon: Missiya matnlari */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
