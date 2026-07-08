import { mission } from "../data/txt.json"; 

function Qadryat({L}) {
    return ( 
        <section id="qadryat" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="">
            {/* Qadriyatlar Sarlavhasi */}
                    <div className="text-center max-w-3xl mx-auto mb-12" data-aos="fade-up">
                      <h2 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">
                        {L(mission.principlesSubtitle)}
                      </h2>
                      <p className="text-3xl font-extrabold text-slate-900">
                        {L(mission.principlesTitle)}
                      </p>
                      <div className="w-16 h-1 bg-blue-600 mx-auto mt-3 rounded-full"></div>
                    </div>
            
                    {/* Qadriyatlar Grid - Har bir karta kechikish bilan chiqadi */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
                      {mission?.values?.map((value, idx) => (
                        <div
                          key={idx}
                          className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                          data-aos="fade-up"
                          data-aos-delay={idx * 100} // 0ms, 100ms, 200ms, 300ms kechikish
                        >
                          <h4 className="text-lg font-bold text-slate-900 mb-2">
                            {L(value.title)}
                          </h4>
                          <p className="text-sm text-slate-500 leading-relaxed">
                            {L(value.desc)}
                          </p>
                        </div>
                      ))}
                    </div>
        </div>
        </div>
    </section>
     );
}

export default Qadryat;