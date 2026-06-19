import { criteria } from "../data/static.json";
import {criteria1} from "../data/txt.json";
function Criteria({L}) {

  return (
    <section id="criteria" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">
            {L(criteria1.subtitle)}
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            {L(criteria1.title)}
          </p>
          <div className="w-16 h-1 bg-blue-600 mx-auto mt-3 rounded-full"></div>
          <p className="text-slate-500 mt-4">{L(criteria1.description)}</p>
        </div>

        {/* Criteria Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
          {criteria.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm flex flex-col justify-between"
            >
              <div className="p-6">
                <span className="text-xs font-bold text-slate-400 block mb-2 uppercase tracking-widest">
                  {L(criteria1.criterionLabel)} {idx + 1}
                </span>
                {/* Agar criteria array'idagi title va desc ni ham tarjima qilmoqchi bo'lsangiz, ularни static.json faylida tillarga ajratish kerak */}
                <h4 className="text-base font-extrabold text-slate-900 tracking-tight leading-snug mb-2">
                  {L(item.title)}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {L(item.desc) }
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

        {/* Admission Percentage breakdown banner */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 mb-6 text-center sm:text-left">
            {L(criteria1.bannerTitle)}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl text-center">
              <div className="text-4xl sm:text-5xl font-black text-blue-600">
                60%
              </div>
              <h4 className="font-bold text-blue-950 mt-2">{L(criteria1.needTitle)}</h4>
              <p className="text-xs text-slate-500 mt-1">{L(criteria1.needDesc)}</p>
            </div>
            <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-2xl text-center">
              <div className="text-4xl sm:text-5xl font-black text-indigo-600">
                20%
              </div>
              <h4 className="font-bold text-indigo-950 mt-2">
                {L(criteria1.potentialTitle)}
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                {L(criteria1.potentialDesc)}
              </p>
            </div>
            <div className="bg-cyan-50 border border-cyan-100 p-6 rounded-2xl text-center">
              <div className="text-4xl sm:text-5xl font-black text-cyan-600">
                20%
              </div>
              <h4 className="font-bold text-cyan-950 mt-2">
                {L(criteria1.activityTitle)}
              </h4>
              <p className="text-xs text-slate-500 mt-1">{L(criteria1.activityDesc)}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Criteria;
