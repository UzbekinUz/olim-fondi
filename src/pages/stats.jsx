import { TrendingUp } from "lucide-react";
import { statistics } from "../data/static.json";
import { stats } from "../data/txt.json"; // JSON faylini chaqiramiz

function Stats({ L }) {
  return (
    <section id="stats" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Sarlavhalar qismi */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span 
            className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-3 block"
            data-aos="fade-up"
            data-aos-delay="0"
          >
            {L(stats.badge)}
          </span>
          <h2 
            className="text-3xl sm:text-4xl font-black"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {L(stats.title)}
          </h2>
          <div 
            className="w-16 h-1 bg-blue-500 mx-auto mt-4 rounded-full"
            data-aos="fade-up"
            data-aos-delay="150"
          ></div>
          <p 
            className="text-slate-400 mt-4"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            {L(stats.subtitle)}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Chap tomon: Diagramma bloki */}
          <div 
            className="lg:col-span-7 bg-slate-800/60 border border-slate-700/60 rounded-3xl p-6 sm:p-8 flex flex-col justify-between"
            data-aos="fade-right"
            data-aos-delay="300"
          >
            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-400" />
                {L(stats.chartTitle)}
              </h3>
              
              {/* Diagramma ustunlari - har biri birin-ketin chiqadi */}
              <div className="space-y-6 pt-4">
                {[
                  { year: "2021", val: 60, pct: "6%" },
                  { year: "2022", val: 80, pct: "8%" },
                  { year: "2023", val: 150, pct: "15%" },
                  { year: "2024", val: 162, pct: "16.2%" },
                  { year: "2025", val: 1000, pct: "100%" },
                ].map((bar, idx) => (
                  <div 
                    key={idx} 
                    className="space-y-1"
                    data-aos="fade-right"
                    data-aos-delay={400 + idx * 100}
                  >
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-300">
                        {bar.year} {L(stats.yearSuffix)}
                      </span>
                      <span className="text-blue-400">
                        {bar.val} {L(stats.applicationsCount)}
                      </span>
                    </div>
                    <div className="h-3.5 bg-slate-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-linear-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-1000"
                        style={{ width: bar.pct }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-6 italic">
              {L(stats.note)}
            </p>
          </div>

          {/* O'ng tomon: Jadval bloki */}
          <div 
            className="lg:col-span-5 bg-slate-800/40 border border-slate-700/60 rounded-3xl p-6 sm:p-8 flex flex-col justify-between overflow-x-auto"
            data-aos="fade-left"
            data-aos-delay="350"
          >
            <div>
              <h3 className="text-xl font-bold mb-6">{L(stats.tableTitle)}</h3>
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-700 text-slate-400 uppercase tracking-wider">
                    <th className="pb-3 font-semibold">{L(stats.tableHeaders.year)}</th>
                    <th className="pb-3 font-semibold text-center">{L(stats.tableHeaders.applied)}</th>
                    <th className="pb-3 font-semibold text-center">{L(stats.tableHeaders.stage2)}</th>
                    <th className="pb-3 font-semibold text-center">{L(stats.tableHeaders.stage3)}</th>
                    <th className="pb-3 font-semibold text-right text-emerald-400">{L(stats.tableHeaders.winners)}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {statistics.applications.map((row, idx) => (
                    <tr 
                      key={idx} 
                      className="hover:bg-slate-800/40 transition-colors"
                      data-aos="fade-left"
                      data-aos-delay={450 + idx * 80}
                    >
                      <td className="py-3.5 font-bold text-slate-200">{row.year}</td>
                      <td className="py-3.5 text-center text-slate-300">{row.total}</td>
                      <td className="py-3.5 text-center text-slate-300">{row.stage2}</td>
                      <td className="py-3.5 text-center text-slate-300">{row.stage3}</td>
                      <td className="py-3.5 text-right font-black text-emerald-400">{row.winners}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Kichik yutuqlar paneli */}
            <div 
              className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-4 mt-6"
              data-aos="zoom-in"
              data-aos-delay="800"
            >
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                {L(stats.achievementsTitle)}
              </h4>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-xl font-black text-emerald-400">{L(stats.achievements.stat1)}</div>
                  <div className="text-[10px] text-slate-300">{L(stats.achievements.desc1)}</div>
                </div>
                <div>
                  <div className="text-xl font-black text-cyan-400">{L(stats.achievements.stat2)}</div>
                  <div className="text-[10px] text-slate-300">{L(stats.achievements.desc2)}</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default Stats;