import { useEffect, useState } from "react";
import {structure} from "../data/txt.json"; // Tarjimalar fayli
import axios from "axios";
import { API_LINK, SITE_LINK } from "../cfg";

function Structure({ L }) {
  const [activeTab, setActiveTab] = useState("barchasi");
  const [team, setTeam] = useState([]); // Backenddan keladigan ma'lumotlar uchun state
  const [loading, setLoading] = useState(true);

  // 1. Backenddan ma'lumotlarni yuklab olish
  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        setLoading(true);
        // Siz yozgan backend getAll funksiyasiga mos so'rov yuboramiz
        const response = await axios.get(`${API_LINK}/webdata/getall`);
        if (response.data.ok) {
          setTeam(response.data.data);
        }
      } catch (error) {
        console.error("Rahbariyat ma'lumotlarini yuklashda xatolik:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, []);

  // 2. Kategoriya bo'yicha filterlash mantiqi
  const filteredTeam =
    activeTab === "barchasi"
      ? team
      : team.filter((member) => member.category === activeTab);

  const tabsList = [
    { name: L(structure.tabs.barchasi), id: "barchasi" },
    { name: L(structure.tabs.rahbariyat), id: "Rahbariyat" },
    { name: L(structure.tabs.ekspertlar), id: "Ekspertlar" },
    { name: L(structure.tabs.kuratorlar), id: "Kuratorlar" },
    { name: L(structure.tabs.volontyorlar), id: "Volontyorlar" }
  ];
  
  return (
    <section id="structure" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">
            {L(structure.title)}
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            {L(structure.subtitle)}
          </p>
          <div className="w-16 h-1 bg-blue-600 mx-auto mt-3 rounded-full"></div>
          <p className="text-slate-500 mt-4">
            {L(structure.description)}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {tabsList.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold tracking-wide border transition-all duration-200 cursor-pointer ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-150"
                  : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Team Grid */}
        {loading ? (
          <div className="text-center py-10 text-slate-500 font-semibold">
            Yuklanmoqda...
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredTeam.map((member, idx) => (
              <div
                key={member._id || idx}
                className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 group hover:border-blue-400 hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                {/* Rasmni to'liq yumaloq (doira) qilish bo'limi */}
                <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto bg-slate-200 relative overflow-hidden rounded-full border-4 border-white shadow-sm group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={`${SITE_LINK}${member.photo}`} // Backend'dagi photo maydonidan rasm manzili
                    alt={member.name}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = "https://via.placeholder.com/150"; }}
                  />
                </div>

                <div className="p-4 text-center mt-2">
                  {/* Kategoriya Badge */}
                  <div className="mb-2">
                    <span className="text-[9px] font-bold tracking-wider uppercase bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full shadow-sm">
                      {L(structure.tabs[member.category]) || member.category}
                    </span>
                  </div>

                  <h4 className="font-extrabold text-slate-900 text-base group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                    {member.name} {/* Backend ma'lumoti matn bo'lgani uchun L() tarjimasiz berildi */}
                  </h4>
                  <p className="text-xs text-slate-500 font-semibold mt-1 line-clamp-2">
                    {member.position} {/* Backend modelidagi 'position' maydoni */}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Structure;