import { criteria } from "../data/static.json";
import { criteria1 } from "../data/txt.json";

function Criteria({ L }) {
  return (
    <section id="criteria" className="py-20 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Asosiy Sarlavha Bloki */}
        <div className="text-center max-w-3xl mx-auto mb-16" data-aos="fade-up">
          <h2 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">
            {L(criteria1.subtitle)}
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            {L(criteria1.title)}
          </p>
          <div className="w-16 h-1 bg-blue-600 mx-auto mt-3 rounded-full"></div>
          <p className="text-slate-500 mt-4">{L(criteria1.description)}</p>
        </div>

        {/* Mezon Kartalari (Criteria Cards) - Ketma-ket pastdan chiqadi */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
          {criteria.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm flex flex-col justify-between transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
              data-aos="fade-up"
              data-aos-delay={idx * 100} // Kartalar ketma-ket to'lqin bo'lib chiqadi
            >
              <div className="p-6">
                <span className="text-xs font-bold text-slate-400 block mb-2 uppercase tracking-widest">
                  {L(criteria1.criterionLabel)} {idx + 1}
                </span>
                <h4 className="text-base font-extrabold text-slate-900 tracking-tight leading-snug mb-2">
                  {L(item.title)}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {L(item.desc)}
                </p>
              </div>
              <div
                className={`bg-linear-to-r ${item.color} py-4 px-6 text-center text-white`}
              >
                <span className="text-lg font-black tracking-wider block">
                  {L(item.value)}
                </span>
                <span className="text-[10px] uppercase font-bold text-white/85 tracking-widest block mt-0.5">
                  {L(criteria1.maxScore)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Yo'nalishlar Taqsimoti Banneri */}
        <div className="space-y-12">
          <div 
            className="bg-slate-50/70 rounded-3xl border border-slate-200/60 p-6 sm:p-10"
            data-aos="fade-up"
            data-aos-delay="150"
          >
            <div className="text-center md:text-left mb-8">
              <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                {L(criteria1.directionTitle)}
              </h3>
              <div className="w-12 h-1 bg-blue-600 mt-3 rounded-full mx-auto md:mx-0"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* 60% — Ijtimoiy imkoniyati cheklanganlar */}
              <div 
                className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-xs flex flex-col justify-between"
                data-aos="fade-up"
                data-aos-delay="250"
              >
                <div>
                  <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-black mb-4">
                    60%
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-3">
                    {L(criteria1.socialTitle)}
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {L(criteria1.socialDesc)}
                  </p>
                </div>

                <ul className="space-y-2.5 border-t border-slate-100 pt-4">
                  {criteria1.socialItems && Array.isArray(L(criteria1.socialItems))
                    ? L(criteria1.socialItems).map((item, idx) => (
                        <li key={idx} className="flex items-center text-xs sm:text-sm text-slate-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2.5 shrink-0"></span>
                          {item}
                        </li>
                      ))
                    : null}
                </ul>
              </div>

              {/* 40% — Iqtidorli va yuqori salohiyatli */}
              <div 
                className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-xs flex flex-col justify-between"
                data-aos="fade-up"
                data-aos-delay="350"
              >
                <div>
                  <div className="inline-flex items-center space-x-2 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-black mb-4">
                    40%
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-3">
                    {L(criteria1.talentedTitle)}
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {L(criteria1.talentedDesc)}
                  </p>
                </div>

                <ul className="space-y-2.5 border-t border-slate-100 pt-4">
                  {criteria1.talentedItems && Array.isArray(L(criteria1.talentedItems))
                    ? L(criteria1.talentedItems).map((item, idx) => (
                        <li key={idx} className="flex items-center text-xs sm:text-sm text-slate-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mr-2.5 shrink-0"></span>
                          {item}
                        </li>
                      ))
                    : null}
                </ul>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Criteria;