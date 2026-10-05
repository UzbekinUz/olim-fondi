import { timeline } from "../data/static.json";
import { timeline1 } from "../data/txt.json"; // Tarjimalar fayli
import { useState, useEffect } from "react";
import axios from "axios";
import { API_LINK, SITE_LINK } from "../cfg";
function Timeline({ L }) {
  const [timelineItems, setTimelineItems] = useState(timeline);
  const fetchXronology = async () => {
    try {
      const res = await axios.get(`${API_LINK}/sitesettings/getall`);
      if (res.data.ok) {
        setTimelineItems(res.data.data);
      }
    } catch (err) {
      console.error("Ma'lumotlarni yuklashda xatolik:", err);
    }
  };
  useEffect(() => {
    fetchXronology();
  }, []);
  return (
    <section id="timeline" className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Yuqori sarlavhalar qismi */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2
            className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3"
            data-aos="fade-up"
            data-aos-delay="0"
          >
            {L(timeline1.subtitle)}
          </h2>
          <p
            className="text-3xl sm:text-4xl font-extrabold text-slate-900"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {L(timeline1.title)}
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
            {L(timeline1.description)}
          </p>
        </div>

        {/* Vaqt chizig'i (Timeline) bloki */}
        <div className="relative border-l-2 border-slate-200 ml-4 sm:ml-8 lg:ml-32 space-y-12 max-w-5xl mx-auto">
          <div className="space-y-8">
            {timelineItems.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 text-slate-400 shadow-sm max-w-xl mx-auto">
                Hozircha hech qanday ma'lumot kiritilmagan.
              </div>
            ) : (
              <div className="relative max-w-5xl mx-auto">
                {/* Markaziy vertikal chiziq (Katta ekranda markazda, kichikda chap tomonda) */}
                <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-1 bg-gradient-to-b from-blue-500 via-indigo-500 to-slate-300 md:-translate-x-1/2 rounded-full"></div>

                <div className="space-y-12">
                  {timelineItems.map((item, index) => {
                    const isEven = index % 2 === 0; // Chap va o'ng tomonni belgilash
                    return (
                      <div
                        key={index}
                        className={`relative flex flex-col md:flex-row items-center ${
                          isEven ? "md:flex-row-reverse" : ""
                        }`}
                      >
                        {/* Markaziy dumaloq nuqta */}
                        <div className="absolute left-4 md:left-1/2 top-8 -translate-x-1/2 z-10 w-5 h-5 rounded-full bg-indigo-600 border-4 border-white shadow-md"></div>

                        {/* Bo'sh joy ajratish (Katta ekranda qarama-qarshi tomon uchun) */}
                        <div className="hidden md:block w-1/2"></div>

                        {/* Asosiy Voqea Kartasi */}
                        <div
                          className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? "md:pr-10" : "md:pl-10"}`}
                        >
                          <div className="relative group bg-white border border-slate-200 rounded-2xl p-5 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:border-indigo-300 transition-all duration-300">
                            {/* INGICHKA STRELKA SHAKLI (POINTER) */}
                            {/* Mobile uchun chap tomondagi strelka */}
                            <div className="block md:hidden absolute -left-2.5 top-7 w-0 h-0 border-y-[6px] border-y-transparent border-r-[10px] border-r-white filter drop-shadow-[-2px_0_1px_rgba(0,0,0,0.05)]"></div>

                            {/* Desktop uchun yo'nalishga qarab chap yoki o'ng strelka */}
                            <div
                              className={`hidden md:block absolute top-7 w-0 h-0 border-y-[7px] border-y-transparent filter drop-shadow-[0_1px_1px_rgba(0,0,0,0.05)] ${
                                isEven
                                  ? "-right-3 border-l-[12px] border-l-white"
                                  : "-left-3 border-r-[12px] border-r-white"
                              }`}
                            ></div>

                            {/* Karta ichki tuzilishi: Rasm kattalashtirilgan */}
                            <div className="flex flex-col sm:flex-row gap-5 items-start">
                              {/* KATTALASHTIRILGAN RASM */}
                              <div className="w-full sm:w-auto">
                                <img
                                  src={`${SITE_LINK}${item.photo}`}
                                  alt={item.action}
                                  className="w-full sm:w-36 md:w-40 lg:w-44 object-cover rounded-xl border border-slate-200 group-hover:border-indigo-200 transition-all shadow-sm"
                                />
                              </div>

                              {/* Matn va Ma'lumotlar */}
                              <div className="flex-1 flex flex-col justify-between self-stretch">
                                <div>
                                  <div className="flex items-center justify-between gap-2 mb-2">
                                    <span className="inline-block text-[16px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-md">
                                      {item.date}
                                    </span>
                                  </div>
                                  <p className="text-slate-700 text-sm leading-relaxed font-medium">
                                    {item.action}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Timeline;
