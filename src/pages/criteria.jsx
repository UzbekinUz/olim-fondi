import { useState, useEffect } from "react";
import axios from "axios";
import { criteria1 } from "../data/txt.json";
import { API_LINK } from "../cfg"; // Backend URL manzilingiz

function Criteria({ L }) {
  const [criteria, setCriteria] = useState([]);
  const [loading, setLoading] = useState(true);

  // Backend'dan ma'lumotlarni olish
  useEffect(() => {
    const fetchCriteria = async () => {
      try {
        const res = await axios.get(`${API_LINK}/sitesettings/getallmark`);
        if (res.data.ok) {
          setCriteria(res.data.data);
        }
      } catch (err) {
        console.error("Mezonlarni yuklashda xatolik:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCriteria();
  }, []);

  return (
    <section id="criteria" className="py-20 bg-slate-50/70 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Asosiy Sarlavha Bloki */}
        <div className="text-center max-w-3xl mx-auto mb-16" data-aos="fade-up">
          <h2 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">
            {L(criteria1.subtitle)}
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {L(criteria1.title)}
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mt-4 rounded-full"></div>
          <p className="text-slate-500 mt-4 text-sm sm:text-base leading-relaxed">
            {L(criteria1.description)}
          </p>
        </div>

        {/* Mezon Kartalari (Criteria Cards) - Backend Ma'lumotlari */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
          </div>
        ) : criteria.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-2xl border border-slate-200 text-slate-400 mb-16">
            Hozircha baholash mezonlari kiritilmagan.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-16">
            {criteria.map((item, idx) => {
              const cardColor = item.color || "#3b82f6";
              
              return (
                <div
                  key={item._id || idx}
                  className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  data-aos="fade-up"
                  data-aos-delay={idx * 100}
                >
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                          {L(criteria1.criterionLabel)} {item.order ?? idx + 1}
                        </span>
                        
                        {/* Rang belgisi (Dot) */}
                        <span 
                          className="w-2.5 h-2.5 rounded-full ring-4 ring-slate-100"
                          style={{ backgroundColor: cardColor }}
                        ></span>
                      </div>

                      <h4 className="text-base font-extrabold text-slate-900 tracking-tight leading-snug mb-2 group-hover:text-blue-600 transition-colors">
                        {(item.title)}
                      </h4>

                      <p className="text-xs text-slate-500 leading-relaxed">
                        {(item.paragraph )}
                      </p>
                    </div>
                  </div>

                  {/* Karta Pastki Qismi: Ball va Gradient */}
                  <div
                    style={{
                      background: `linear-gradient(135deg, ${cardColor} 0%, ${cardColor}dd 100%)`
                    }}
                    className="py-3.5 px-5 text-center text-white flex items-center justify-between shadow-inner"
                  >
                    <div className="text-left">
                      <span className="text-[10px] uppercase font-bold text-white/80 tracking-widest block">
                        {L(criteria1.maxScore)}
                      </span>
                      <span className="text-lg font-black tracking-wider block leading-none mt-0.5">
                        {item.mark ?? item.value}
                      </span>
                    </div>

                    <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-xs font-black">
                      ✓
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Yo'nalishlar Taqsimoti Banneri */}
        <div className="space-y-12">
          <div 
            className="bg-white/80 backdrop-blur-md rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-sm"
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
                className="bg-gradient-to-br from-slate-50 to-blue-50/30 p-6 sm:p-8 rounded-2xl border border-blue-100 shadow-xs flex flex-col justify-between hover:border-blue-200 transition-all"
                data-aos="fade-up"
                data-aos-delay="250"
              >
                <div>
                  <div className="inline-flex items-center space-x-2 bg-blue-600 text-white px-3.5 py-1 rounded-full text-xs font-black mb-4 shadow-sm shadow-blue-200">
                    60%
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-3">
                    {L(criteria1.socialTitle)}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    {L(criteria1.socialDesc)}
                  </p>
                </div>

                <ul className="space-y-3 border-t border-slate-200/60 pt-5">
                  {criteria1.socialItems && Array.isArray(L(criteria1.socialItems))
                    ? L(criteria1.socialItems).map((item, idx) => (
                        <li key={idx} className="flex items-start text-xs sm:text-sm text-slate-700 font-medium">
                          <span className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 mr-3 shrink-0 ring-4 ring-blue-100"></span>
                          <span>{item}</span>
                        </li>
                      ))
                    : null}
                </ul>
              </div>

              {/* 40% — Iqtidorli va yuqori salohiyatli */}
              <div 
                className="bg-gradient-to-br from-slate-50 to-indigo-50/30 p-6 sm:p-8 rounded-2xl border border-indigo-100 shadow-xs flex flex-col justify-between hover:border-indigo-200 transition-all"
                data-aos="fade-up"
                data-aos-delay="350"
              >
                <div>
                  <div className="inline-flex items-center space-x-2 bg-indigo-600 text-white px-3.5 py-1 rounded-full text-xs font-black mb-4 shadow-sm shadow-indigo-200">
                    40%
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-3">
                    {L(criteria1.talentedTitle)}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    {L(criteria1.talentedDesc)}
                  </p>
                </div>

                <ul className="space-y-3 border-t border-slate-200/60 pt-5">
                  {criteria1.talentedItems && Array.isArray(L(criteria1.talentedItems))
                    ? L(criteria1.talentedItems).map((item, idx) => (
                        <li key={idx} className="flex items-start text-xs sm:text-sm text-slate-700 font-medium">
                          <span className="w-2 h-2 rounded-full bg-indigo-600 mt-1.5 mr-3 shrink-0 ring-4 ring-indigo-100"></span>
                          <span>{item}</span>
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