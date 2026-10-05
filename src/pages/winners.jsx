import { Award, UserCogIcon, UserStarIcon } from "lucide-react";
import { graduates } from "../data/static.json";
import { winners } from "../data/txt.json"; // Tarjimalar faylini chaqirish
import { Link } from "react-router-dom";
import { SiAdminer } from "react-icons/si";

function Winners({ L, lang, stp }) {
  const isAuth = stp.auth 
  // Foydalanuvchi tizimga kirgan bo'lsa to'g'ridan-to'g'ri kabinetga, aks holda kirish sahifasiga
  const targetLink = isAuth
    ? "/main-winner-element/stipendiat-cabinet"
    : "/main-winner-element/stipendiat-kobinetiga-kirish";
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between">
          <Link
            to={"/admin"}
            className="py-2 text-white px-5 bg-[#df9090] rounded-2xl text-center flex items-center hover:bg-amber-600 transition-all duration-200"
          >
            <UserCogIcon className="mr-2" />
            Ekspert kabinti
          </Link>
          <Link
            to={targetLink}
            className="py-2 text-white px-5 bg-amber-700 rounded-2xl text-center flex items-center hover:bg-amber-600 transition-all duration-200"
          >
            <UserStarIcon className="mr-2" />
            {isAuth ? "Stipendiat kabineti" : "Stipendiat kabinetiga kirish"}
          </Link>
        </div>
        {/* Yuqori sarlavhalar qismi */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2
            className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3"
            data-aos="fade-up"
            data-aos-delay="0"
          >
            {L(winners.subtitle)}
          </h2>
          <p
            className="text-3xl sm:text-4xl font-extrabold text-slate-900"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {L(winners.title)}
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
            {L(winners.description)}
          </p>
        </div>

        {/* G'oliblar ro'yxati (Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {graduates.map((grad, idx) => (
            <div
              key={idx}
              data-aos="fade-up"
              data-aos-delay={300 + idx * 150}
              className="bg-slate-50 rounded-2xl p-6 border border-slate-200/60 relative overflow-hidden group hover:bg-white hover:border-blue-500 hover:shadow-lg transition-all duration-300"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/5 rounded-full blur-lg"></div>

              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                  <Award className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-slate-900">
                  {L(grad.name)}
                </h4>
              </div>

              {/* Yutuqlari ro'yxati */}
              <div className="space-y-2.5">
                {grad.awards[lang].map((award, i) => (
                  <div key={i} className="flex items-start space-x-2 text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                    <p className="text-slate-600 font-medium leading-tight">
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
