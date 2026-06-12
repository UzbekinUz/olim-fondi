import { Award } from "lucide-react";
import { graduates } from "../data/static.json";
import {winners} from "../data/txt.json"; // Tarjimalar faylini chaqirish

function Winners({ L,lang }) {

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">
            {L(winners.subtitle)}
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            {L(winners.title)}
          </p>
          <div className="w-16 h-1 bg-blue-600 mx-auto mt-3 rounded-full"></div>
          <p className="text-slate-500 mt-4">
            {L(winners.description)}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {graduates.map((grad, idx) => (
            <div
              key={idx}
              className="bg-slate-50 rounded-2xl p-6 border border-slate-200/60 relative overflow-hidden group hover:bg-white hover:border-blue-500 hover:shadow-lg transition-all duration-300"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/5 rounded-full blur-lg"></div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                  <Award className="w-5 h-5" />
                </div>
                {/* Ism ko'p tilli bo'lmasa grad.name, aks holda grad.name[lang] */}
                <h4 className="text-lg font-bold text-slate-900">
                  {L(grad.name)}
                </h4>
              </div>
              <div className="space-y-2.5">
                {grad.awards[lang].map((award, i) => (
                  <div key={i} className="flex items-start space-x-2 text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                    <p className="text-slate-600 font-medium leading-tight">
                      {/* static.json ichidagi ob'ektdan joriy tilni o'qish */}
                      {award}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Winners;