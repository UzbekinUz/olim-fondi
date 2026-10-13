import { statsBreakdown } from "../data/static.json";
import { chart1 } from "../data/txt.json";

function Chart({ L }) {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Yuqori sarlavhalar qismi */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 
            className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3"
            data-aos="fade-up"
            data-aos-delay="0"
          >
            {L(chart1.subtitle)}
          </h2>
          <p 
            className="text-3xl sm:text-4xl font-extrabold text-slate-900"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {L(chart1.mainTitle)}
          </p>
          <div 
            className="w-16 h-1 bg-blue-600 mx-auto mt-3 rounded-full"
            data-aos="fade-up"
            data-aos-delay="150"
          ></div>
          <p 
            className="text-slate-500 mt-4"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            {L(chart1.description)}
          </p>
        </div>

        {/* Tahliliy kartochkalar bloki */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {statsBreakdown.map((item, idx) => (
            <div
              key={idx}
              data-aos="fade-up"
              data-aos-delay={300 + idx * 150}
              className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex justify-between items-baseline mb-4">
                <h4 className="text-lg font-bold text-slate-900 max-w-[70%]">
                  {L(item.title)}
                </h4>
                <span className="text-3xl font-black text-blue-600">
                  {L(item.percent)}
                </span>
              </div>
              <p className="text-sm text-slate-500 mb-6">{L(item.desc)}</p>
              
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-linear-to-r from-blue-600 to-indigo-600 rounded-full"
                  style={{ width: L(item.percent) }}
                ></div>
              </div>

              {/* Pastki qismdagi teglar (Tags) */}
              <div className="mt-6 pt-6 border-t border-slate-100 flex items-center space-x-3 text-xs font-bold text-slate-400">
                <span className="bg-slate-100 px-2.5 py-1 rounded text-[10px] uppercase">
                  {L(chart1.tagMinistries)}
                </span>
                <span className="bg-slate-100 px-2.5 py-1 rounded text-[10px] uppercase">
                  {L(chart1.tagBanks)}
                </span>
                <span className="bg-slate-100 px-2.5 py-1 rounded text-[10px] uppercase">
                  {L(chart1.tagUniversities)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Chart;