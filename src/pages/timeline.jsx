import { timeline } from "../data/static.json";
import {timeline1} from "../data/txt.json"; // Tarjimalar fayli

function Timeline({ L}) {

  return (
    <section id="timeline" className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">
            {L(timeline1.subtitle)}
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            {L(timeline1.title)}
          </p>
          <div className="w-16 h-1 bg-blue-600 mx-auto mt-3 rounded-full"></div>
          <p className="text-slate-500 mt-4">
            {L(timeline1.description)}
          </p>
        </div>

        <div className="relative border-l-2 border-slate-200 ml-4 sm:ml-8 lg:ml-32 space-y-12 max-w-5xl mx-auto">
          {timeline.map((item, idx) => (
            <div key={idx} className="relative pl-8 sm:pl-12 group">
              {/* Year Marker */}
              <div className="absolute -left-3 sm:-left-4 top-1.5 w-6 sm:w-8 h-8 rounded-full bg-white border-2 border-blue-600 flex items-center justify-center z-10 group-hover:bg-blue-600 transition-colors duration-200">
                <div className="w-2 h-2 rounded-full bg-blue-600 group-hover:bg-white"></div>
              </div>

              {/* Content Box */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/60 group-hover:border-blue-400 group-hover:bg-white group-hover:shadow-md transition-all duration-300">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-xl font-black text-blue-600">
                    {L(item.year)}
                  </span>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    {L(timeline1.stage)}
                  </span>
                </div>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {/* static.json ichidagi ob'ektdan joriy tilni o'qish */}
                  {L(item.text)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Timeline;