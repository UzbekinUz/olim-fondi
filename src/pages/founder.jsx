import { Quote, Award, Sparkles } from "lucide-react";
import { founder } from "../data/txt.json";

function FounderAppeal({ L }) {
  return (
    <section className="py-20 bg-slate-50 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Sahifa Sarlavhasi */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">
            {L(founder.signatureTitle)}
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {L(founder.pageTitle)}
          </p>
          <div className="w-16 h-1.5 bg-blue-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Asosiy Grid Konteyner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* O'NG TOMON (Responsive holatda TEPADA turadi: order-1) */}
          <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
            <div className="relative w-full max-w-sm sm:max-w-md">
              
              {/* Orqa fondagi chiroyli geometrik gradient bezak */}
              <div className="absolute inset-0 bg-linear-to-tr from-blue-600 via-indigo-600 to-indigo-800 rounded-3xl transform rotate-3 scale-102 shadow-xl opacity-90"></div>
              
              {/* Rasm ramkasi */}
              <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100 p-3">
                <div className="rounded-2xl overflow-hidden aspect-4/5 relative group">
                  <img
                    src="/modul/founder.jpg" /* Ta'sischi rasmi manzili */
                    alt={L(founder.imageAlt)}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950/40 via-transparent to-transparent"></div>
                </div>
                
                {/* Rasm ostidagi imzo yoki kichik sarlavha bloki */}
                <div className="p-4 text-center">
                  <h4 className="font-bold text-slate-900 text-lg">OLIM HASANOV FOUNDATION</h4>
                  <p className="text-xs text-blue-600 font-semibold uppercase tracking-wider mt-0.5">
                    {L(founder.signatureTitle)}
                  </p>
                </div>
              </div>

              {/* Kichik chiroyli ma'lumot ko'rsatkichi */}
              <div className="absolute -bottom-6 -left-6 bg-white shadow-lg rounded-2xl p-4 hidden sm:flex items-center space-x-3 border border-slate-100 max-w-xs animate-bounce-slow">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <p className="text-xs text-slate-700 font-medium leading-tight">
                  Ta'limga tikilgan sarmoya — kelajakka ishonchdir.
                </p>
              </div>

            </div>
          </div>

          {/* CHAP TOMON (Responsive holatda PASTDA turadi: order-2) */}
          <div className="lg:col-span-7 space-y-6 order-2 lg:order-1">
            
            {/* Salomlashish bloki */}
            <div className="flex items-center space-x-3 text-blue-600">
              <Quote className="w-8 h-8 rotate-180 text-blue-600/30 shrink-0" />
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {L(founder.greeting)}
              </h3>
            </div>

            {/* Asosiy Murojaat matnlari */}
            <div className="space-y-4 text-slate-600 text-base sm:text-lg leading-relaxed text-justify sm:text-left">
              <p>
                {L(founder.paragraph1)}
              </p>

              {/* Urg'u berilgan, ajralib turuvchi o'rta ctc blok */}
              <div className="bg-blue-600 text-white p-5 rounded-2xl shadow-xs font-semibold text-base flex items-start space-x-3.5 my-6 border border-blue-700/50">
                <Award className="w-6 h-6 text-blue-200 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  {L(founder.accentText)}
                </p>
              </div>

              <p>
                {L(founder.paragraph2)}
              </p>

              <p className="italic font-medium text-slate-800 border-l-4 border-amber-500 pl-4 py-1 bg-amber-50/50 rounded-r-xl">
                {L(founder.paragraph3)}
              </p>
            </div>

            {/* Yakuniy ta'sirchan iqtibos */}
            <div className="pt-4 border-t border-slate-200">
              <p className="text-slate-900 font-bold text-base sm:text-lg flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                {L(founder.closing)}
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default FounderAppeal;