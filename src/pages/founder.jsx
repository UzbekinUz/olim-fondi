import { Quote, Award, Sparkles } from "lucide-react";
import { founder } from "../data/txt.json";

function FounderAppeal({ L }) {
  return (
    <section className="py-24 bg-slate-50 min-h-screen flex items-center overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Sahifa Sarlavhasi - Pastdan tepaga silliq chiqadi */}
        <div className="text-center max-w-3xl mx-auto mb-16" data-aos="fade-up">
          <h2 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3 flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
            {L(founder.signatureTitle)}
          </h2>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {L(founder.pageTitle)}
          </h1>
          <div className="w-16 h-1.5 bg-blue-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Murojaat Kontenti Card - Sarlavhadan biroz keyinroq ko'tariladi */}
        <div 
          className="bg-white rounded-3xl shadow-xs border border-slate-100 p-8 sm:p-12 space-y-8 relative overflow-hidden"
          data-aos="fade-up"
          data-aos-delay="150"
        >
          
          {/* Orqa fondagi nafis dekorativ element */}
          <div className="absolute -right-12 -top-12 w-40 h-40 bg-blue-50 rounded-full blur-2xl pointer-events-none"></div>

          {/* Salomlashish bloki */}
          <div className="flex items-center space-x-3 text-blue-600">
            <Quote className="w-10 h-10 rotate-180 text-blue-600/20 shrink-0" />
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {L(founder.greeting)}
            </h3>
          </div>

          {/* Asosiy Murojaat matnlari */}
          <div className="space-y-6 text-slate-700 text-base sm:text-lg leading-relaxed text-justify sm:text-left">
            <p className="first-letter:text-4xl first-letter:font-bold first-letter:text-blue-600 first-letter:mr-1">
              {L(founder.paragraph1)}
            </p>

            {/* Urg'u berilgan, ajralib turuvchi o'rta ctc blok - Karta ichida qo'shimcha dinamika beradi */}
            <div 
              className="bg-linear-to-r from-blue-600 to-indigo-700 text-white p-6 rounded-2xl shadow-md font-semibold text-base sm:text-lg flex items-start space-x-4 my-8 border border-blue-700/50"
              data-aos="fade-up"
              data-aos-delay="250"
              data-aos-anchor-placement="top-bottom"
            >
              <Award className="w-6 h-6 text-blue-200 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                {L(founder.accentText)}
              </p>
            </div>

            <p>
              {L(founder.paragraph2)}
            </p>

            <p className="italic font-medium text-slate-800 border-l-4 border-amber-500 pl-5 py-2 bg-amber-50/60 rounded-r-2xl">
              {L(founder.paragraph3)}
            </p>
          </div>

          {/* Yakuniy ta'sirchan iqtibos va imzo o'rni */}
          <div 
            className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            data-aos="fade-up"
            data-aos-delay="350"
            data-aos-anchor-placement="top-bottom"
          >
            <p className="text-slate-900 font-bold text-base sm:text-lg flex items-center gap-2 max-w-xl">
              <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0"></span>
              {L(founder.closing)}
            </p>
            
            {/* Rasmiy imzo bloki */}
            <div className="text-left sm:text-right shrink-0">
              <p className="text-sm font-black text-slate-900 tracking-tight">Olim Fondi</p>
              <p className="text-xs text-slate-400 font-medium">{L(founder.signatureTitle)}</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default FounderAppeal;