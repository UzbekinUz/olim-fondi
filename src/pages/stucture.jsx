import { useState } from "react";
import { team } from "../data/static.json";
import {structure} from "../data/txt.json"; // Tarjimalar fayli

function Structure({ L }) {
  const [activeTab, setActiveTab] = useState("barchasi");

  const filteredTeam =
    activeTab === "barchasi"
      ? team
      : team.filter((member) => member.category === activeTab);

  const tabsList = [
    { name: L(structure.tabs.barchasi), id: "barchasi" },
    { name: L(structure.tabs.rahbariyat), id: "rahbariyat" },
    { name: L(structure.tabs.ekspertlar), id: "ekspertlar" },
    { name: L(structure.tabs.kuratorlar), id: "kuratorlar" },
    { name: L(structure.tabs.volontyorlar), id: "volontyorlar" }
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
              className={`px-5 py-2.5 rounded-xl text-sm font-bold tracking-wide border transition-all duration-200 ${
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredTeam.map((member, idx) => (
            <div
              key={idx}
              className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200/80 group hover:border-blue-400 hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="aspect-4/5 bg-slate-200 relative overflow-hidden">
                <img
                  src={member.img}
                  alt={`[${L(member.name)} ${L(structure.imageAlt)}]`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-bold tracking-wider uppercase bg-white/95 text-blue-700 px-2.5 py-1 rounded-full shadow-sm">
                    {L(structure.tabs[member.category])  || member.category}
                  </span>
                </div>
              </div>
              <div className="p-4 sm:p-5 text-center">
                <h4 className="font-extrabold text-slate-900 text-base group-hover:text-blue-600 transition-colors duration-200">
                  {L(member.name)}
                </h4>
                <p className="text-xs text-slate-500 font-semibold mt-1">
                  {L(member.role)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Structure;