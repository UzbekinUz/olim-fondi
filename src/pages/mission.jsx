import { Compass, Sparkles, Target } from "lucide-react";
import { mission } from "../data/txt.json"; // JSON yo'lini to'g'rilab qo'ying

function Mission({ L }) {
  return (
    <section
      id="mission"
      className="py-20 bg-slate-50 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl -z-10"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-linear-to-br from-slate-900 via-indigo-950 to-blue-950 rounded-3xl text-white p-8 sm:p-12 lg:p-14 shadow-xl mb-16 relative overflow-hidden">
          {/* Dekorativ fon elementlari */}
          <div className="absolute -right-16 -bottom-16 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl"></div>
          <div className="absolute -left-16 -top-16 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            {/* Yuqori kichik Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/10 rounded-full px-4 py-1.5 mb-10 backdrop-blur-xs">
              <Target className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-bold text-blue-200 uppercase tracking-wider">
                {L(mission.badge)}
              </span>
            </div>

            {/* Uchta ustunli Grid (Missiya, Maqsad, Orzu) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
              {/* 1. БИЗНИНГ МИССИЯМИЗ */}
              <div className="space-y-4 pb-6 lg:pb-0">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                    <Target className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-black tracking-tight text-white sm:text-2xl">
                    {L(mission.missionTitle)}
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                  {L(mission.missionDesc)}
                </p>
              </div>

              {/* 2. БИЗНИНГ МАҚСАДИМИЗ */}
              <div className="space-y-4 pt-6 lg:pt-0 lg:pl-8">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
                    <Compass className="w-5 h-5 text-indigo-400" />
                  </div>
                  <h3 className="text-xl font-black tracking-tight text-white sm:text-2xl">
                    {L(mission.goalTitle)}
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                  {L(mission.goalDesc)}
                </p>
              </div>

              {/* 3. БИЗНИНГ ОРЗУМИЗ */}
              <div className="space-y-4 pt-6 lg:pt-0 lg:pl-8">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center border border-amber-500/30">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                  </div>
                  <h3 className="text-xl font-black tracking-tight text-white sm:text-2xl">
                    {L(mission.dreamTitle)}
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                  {L(mission.dreamDesc)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Qadriyatlar */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">
            {L(mission.principlesSubtitle)}
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
