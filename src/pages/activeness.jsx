import { BookOpen, Heart, Rocket, Landmark, Flame } from "lucide-react";
import { activitiesPage } from "../data/txt.json";
import { mission } from "../data/txt.json"; 

// Ranglar va ikonalar xaritasini yaratib olamiz
const iconMap = {
  blue: <BookOpen className="w-6 h-6 text-blue-600" />,
  emerald: <Heart className="w-6 h-6 text-emerald-600" />,
  indigo: <Rocket className="w-6 h-6 text-indigo-600" />,
  amber: <Landmark className="w-6 h-6 text-amber-600" />
};

const colorStyles = {
  blue: "hover:border-blue-200 hover:shadow-blue-500/5 bg-blue-50/30",
  emerald: "hover:border-emerald-200 hover:shadow-emerald-500/5 bg-emerald-50/30",
  indigo: "hover:border-indigo-200 hover:shadow-indigo-500/5 bg-indigo-50/30",
  amber: "hover:border-amber-200 hover:shadow-amber-500/5 bg-amber-50/30"
};

const bulletColors = {
  blue: "bg-blue-500",
  emerald: "bg-emerald-500",
  indigo: "bg-indigo-500",
  amber: "bg-amber-500"
};

function Activities({ L }) {
  return (
    <section className="py-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
        {/* Sahifa Sarlavhasi */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {L(activitiesPage.title)}
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mt-3 max-w-xl mx-auto leading-relaxed">
            {L(activitiesPage.subtitle)}
          </p>
          <div className="w-12 h-1 bg-slate-900 mx-auto mt-5 rounded-full"></div>
        </div>

        {/* Yo'nalishlar Grid Tizimi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {activitiesPage.directions.map((direction, idx) => {
            const colorKey = direction.color || "blue";
            return (
              <div
                key={idx}
                className={`border border-slate-100 p-6 sm:p-8 rounded-3xl transition-all duration-300 flex flex-col justify-between ${colorStyles[colorKey]}`}
              >
                <div>
                  {/* Ikonka va Sarlavha boshi */}
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-xs border border-slate-100 flex items-center justify-center shrink-0">
                      {iconMap[colorKey]}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                      {L(direction.title)}
                    </h3>
                  </div>

                  {/* Ichki ro'yxat punktlari */}
                  <ul className="space-y-4">
                    {direction.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start text-sm sm:text-base text-slate-600 leading-relaxed">
                        <span className={`w-2 h-2 rounded-full mt-2.5 mr-3 shrink-0 ${bulletColors[colorKey]}`}></span>
                        <span>{L(item)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* FOND SHIORI - PREMIUM BANNER */}
        <div className="bg-linear-to-tr from-slate-900 via-slate-950 to-blue-950 rounded-3xl text-white p-8 sm:p-12 text-center relative overflow-hidden shadow-xl border border-slate-800">
          {/* Orqa fon nur bezaklari */}
          <div className="absolute -right-24 -bottom-24 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl"></div>
          <div className="absolute -left-24 -top-24 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl"></div>

          <div className="relative z-10 max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest text-blue-300">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>{L(activitiesPage.mottoTitle)}</span>
            </div>
            
            <p className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight font-serif italic pt-2">
              {L(activitiesPage.mottoText)}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Activities;