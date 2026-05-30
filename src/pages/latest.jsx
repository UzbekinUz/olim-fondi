import React from 'react';
import imge from "../assets/image.png";
const Latest = () => {
  // Kamronbek uchun yangilangan ma'lumotlar
  const achievements = [
    "O'zbekiston Respublikasi Prezidenti davlat stipendiyasi",
    "Alisher Navoiy nomli davlat stipendiyasi",
    "“Yilning eng bilimdon talabasi” - 1-o‘rin",
    "BAA xalqaro havo huquqi tanlovi - “Best Oralist”",
    "Belarus xalqaro havo huquqi tanlovi - 2-o‘rin",
    "“Bo‘lajak adliya xodimi” - “Eng notiq huquqshunos”"
  ];

  return (
    <section id="latest" className="py-24 px-5 bg-slate-50">
      <div className="max-w-[1100px] mx-auto">
        {/* Header qismi */}
        <div className="mb-16 text-center">
          <div className="inline-block px-4 py-1.5 bg-blue-600/10 text-blue-600 font-bold text-xs uppercase tracking-[0.2em] rounded-full mb-4">
            Muvaffaqiyat tarixi
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">2024-yil g‘olibi</h2>
          <div className="h-1 w-20 bg-blue-600 mx-auto rounded-full mb-6"></div>
        </div>

        {/* Asosiy Karta */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 items-center">
            {/* Avatar qismi */}
            <div className="w-48 md:w-64 p-0 rounded-2xl bg-blue-100 flex items-center justify-center border-4 border-white shadow-lg overflow-hidden">
                <img src={imge} className='w-full h-full object-cover' alt="Kamronbek Tursunmurodov" />
            </div>
            <div>
              <h3 className="text-3xl font-black text-slate-900 mb-2">Tursunmurodov Kamronbek</h3>
              <p className="text-blue-600 font-bold text-lg mb-6 uppercase tracking-wider">Olim fondi stipendiati</p>
              
              <blockquote className="text-slate-600 italic text-xl border-l-4 border-blue-600 pl-4 py-2 mb-8">
                "Olim fondi stipendiati bo‘lish menga hayotdagi eng muhim qoidalardan birini yana bir bor isbotladi — bu hech qachon taslim bo‘lmaslikdir."
              </blockquote>

              <div className="space-y-3">
                <h4 className="font-bold text-slate-900">Asosiy yutuqlari:</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {achievements.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-700 text-sm">
                      <span className="text-blue-600 font-bold">🏆</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Maslahat qismi */}
        <div className="mt-12 bg-slate-900 text-white p-8 rounded-3xl">
          <h3 className="text-2xl font-bold mb-6">Yoshlarga tavsiyalar:</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4 border border-slate-700 rounded-xl hover:bg-slate-800 transition">
              <p className="font-bold mb-2">1. Unikal bo'ling</p>
              <p className="text-slate-400 text-sm">O‘zingizni boshqalar bilan taqqoslamang. "Compete to be unique."</p>
            </div>
            <div className="p-4 border border-slate-700 rounded-xl hover:bg-slate-800 transition">
              <p className="font-bold mb-2">2. Xatolardan qo'rqmang</p>
              <p className="text-slate-400 text-sm">Muhimi — o‘sha xatodan saboq chiqarish va takrorlamaslik.</p>
            </div>
            <div className="p-4 border border-slate-700 rounded-xl hover:bg-slate-800 transition">
              <p className="font-bold mb-2">3. Harakatdan to'xtamang</p>
              <p className="text-slate-400 text-sm">Muvaffaqiyatsizlik vaqtinchalik. Yutqazsangiz ham, yana urinib ko‘ring.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Latest;