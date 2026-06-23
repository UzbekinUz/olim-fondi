// Lucide ikonkalari
import { Target, Award } from "lucide-react";
import { aboutM as about } from "../data/txt.json";

export default function AboutM({ L }) {
  return (
    <div className="bg-slate-50/50 py-16 sm:py-24">
      {/* Konteyner qo'shildi: tarkib chekkalarga yopishib qolmasligi va markazda turishi uchun */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Chap tomon: Missiya matnlari va Vizual iqtibos bloki */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
            <div className="space-y-4 text-slate-600 text-base sm:text-lg leading-relaxed">
              <p
                className="prose prose-slate max-w-none"
                dangerouslySetInnerHTML={{
                  __html: L(about.missionParagraph1),
                }}
              />
              <p>{L(about.missionParagraph2)}</p>
            </div>

            {/* Chiroyli vizual iqtibos bloki */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-md relative overflow-hidden group mt-auto">
              <div className="absolute -right-10 -bottom-10 text-white/5 transform group-hover:scale-110 transition-transform duration-500">
                <Target className="w-48 h-48" />
              </div>
              <div className="relative z-10 space-y-4">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <Award className="w-5 h-5 text-blue-200" />
                </div>
                <p className="text-xl font-medium italic leading-relaxed pt-2">
                  {L(about.missionQuote)}
                </p>
                <div className="w-12 h-1 bg-white/30 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* O'ng tomon: Jamoaning umumiy rasmi */}
          <div className="lg:col-span-5 relative min-h-[350px] lg:min-h-full flex">
            {/* Rasm orqasidagi yengil vizual effekt */}
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl opacity-10 blur-xl"></div>

            {/* Rasm konteyneri */}
            <div className="relative w-full rounded-2xl overflow-hidden shadow-lg border border-slate-100/80 group flex-1">
              <img
                src="/jamoa.jpg" // Jamoangiz rasmining manzili
                alt="Bizning jamoa"
                className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-103 transition-transform duration-700"
              />
              {/* Rasm ustidagi yengil gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent pointer-events-none"></div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}