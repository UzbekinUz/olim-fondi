import { Target } from "lucide-react";
import {mission} from "../data/txt.json"; // JSON yo'lini to'g'rilab qo'ying

function Mission({L}) {

  return (
    <section id="mission" className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl -z-10"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Missiya Bloki */}
        <div className="bg-linear-to-r from-blue-700 to-indigo-900 rounded-3xl text-white p-8 sm:p-12 lg:p-16 shadow-xl mb-16 relative overflow-hidden">
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-white/5 rounded-full blur-2xl"></div>
          <div className="relative z-10 max-w-4xl">
            <div className="inline-flex items-center space-x-2 bg-white/10 rounded-full px-4 py-1.5 mb-6">
              <Target className="w-4 h-4 text-blue-300" />
              <span className="text-xs font-bold text-blue-100 uppercase tracking-wider">
                {L(mission.badge)}
              </span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-black tracking-tight mb-6">
              {L(mission.title)}
            </h3>
            <p className="text-lg sm:text-xl text-blue-100 leading-relaxed font-medium">
              {L(mission.description)}
            </p>
          </div>
        </div>

        {/* Qadriyatlar */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">
            {L(mission.principlesSubtitle)  }
          </h2>
          <p className="text-3xl font-extrabold text-slate-900">
            {L(mission.principlesTitle)}
          </p>
          <div className="w-16 h-1 bg-blue-600 mx-auto mt-3 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mission?.values?.map((value, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
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
    </section>
  );
}

export default Mission;