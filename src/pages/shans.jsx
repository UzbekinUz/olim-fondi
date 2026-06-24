import { shans } from "../data/static.json";
import { shans1 } from "../data/txt.json"; // JSON faylni chaqirib olamiz

function Shans({ L }) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Yuqori qism sarlavhalari */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          {/* 1. Kichik sarlavha */}
          <h2 
            className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3"
            data-aos="fade-up"
            data-aos-delay="0"
          >
            {L(shans1.subtitle)}
          </h2>
          
          {/* 2. Asosiy katta sarlavha */}
          <p 
            className="text-3xl sm:text-4xl font-extrabold text-slate-900"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {L(shans1.title)}
          </p>
          
          {/* 3. Ostidagi chiziq */}
          <div 
            className="w-16 h-1 bg-blue-600 mx-auto mt-3 rounded-full"
            data-aos="fade-up"
            data-aos-delay="200"
          ></div>
        </div>

        {/* Kartochkalar to'plami */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {shans.map((item, idx) => (
            <div
              key={idx}
              data-aos="fade-up"
              data-aos-delay={300 + idx * 150} 
              className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 hover:bg-white hover:border-blue-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-2xl mb-6 ${item.color}`}
              >
                {idx + 1}
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">
                {/* static.json ichidagi ob'ektdan joriy tilni o'qish */}
                {L(item.title)}
              </h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                {L(item.desc)}
              </p>
            </div>  
          ))}
        </div> 
      </div>
    </section>
  );
}

export default Shans;