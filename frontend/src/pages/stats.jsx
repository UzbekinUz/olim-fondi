import { TrendingUp, Award, BarChart2 } from "lucide-react";
import { stats } from "../data/txt.json"; // Sarlavha matnlari uchun
import { useEffect, useState } from "react";
import axios from "axios";
import { API_LINK } from "../cfg";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

function Stats({ L }) {
  const [statGrowth, setStatGrowth] = useState([]);
  const [statParts, setStatParts] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // API larni parallel chaqirish
    const fetchAllStats = async () => {
      try {
        setLoading(true);
        const [growthRes, partsRes, achivRes] = await Promise.all([
          axios.get(`${API_LINK}/sitesettings/getallstat1`),
          axios.get(`${API_LINK}/sitesettings/getallstat2`),
          axios.get(`${API_LINK}/sitesettings/getallstat3`)
        ]);

        if (growthRes.data.ok) setStatGrowth(growthRes.data.data || []);
        if (partsRes.data.ok) setStatParts(partsRes.data.data || []);
        if (achivRes.data.ok) setAchievements(achivRes.data.data || []);
      } catch (err) {
        console.error("Statistika yuklashda xatolik:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllStats();
  }, []);

  return (
    <section id="stats" className="py-20 bg-slate-950 text-white relative overflow-hidden">
      {/* Visual background accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Sarlavhalar qismi */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span 
            className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-3 block"
            data-aos="fade-up"
          >
            {L(stats?.badge) || "Statistika"}
          </span>
          <h2 
            className="text-3xl sm:text-4xl font-black tracking-tight"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {L(stats?.title) || "Loyiha ko'rsatkichlari"}
          </h2>
          <div 
            className="w-16 h-1 bg-gradient-to-r from-blue-500 to-emerald-500 mx-auto mt-4 rounded-full"
            data-aos="fade-up"
            data-aos-delay="150"
          ></div>
          <p 
            className="text-slate-400 mt-4 text-sm sm:text-base"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            {L(stats?.subtitle) || "Yillar davomida erishilgan natijalar va tanlovlar statistikasi"}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Chap tomon: StatGrowth Line Chart */}
          <div 
            className="lg:col-span-6 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between backdrop-blur-md shadow-xl"
            data-aos="fade-right"
            data-aos-delay="300"
          >
            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2.5 text-blue-400">
                <TrendingUp className="w-5 h-5 text-blue-500" />
                {L(stats?.chartTitle) || "O'sish dinamikasi (StatGrowth)"}
              </h3>
              
              {loading ? (
                <div className="h-72 flex items-center justify-center text-slate-500 text-sm">
                  Yuklanmoqda...
                </div>
              ) : statGrowth.length === 0 ? (
                <div className="h-72 flex items-center justify-center text-slate-500 text-sm">
                  Ma'lumot topilmadi
                </div>
              ) : (
                <div className="h-72 w-full pt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={statGrowth}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                      <XAxis dataKey="year" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                      <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#0f172a', 
                          borderColor: '#334155', 
                          borderRadius: '12px',
                          color: '#fff'
                        }}
                        itemStyle={{ color: '#38bdf8' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="amount" 
                        name="Arizalar miqdori" 
                        stroke="#38bdf8" 
                        strokeWidth={3} 
                        dot={{ r: 5, fill: '#0284c7', stroke: '#38bdf8', strokeWidth: 2 }} 
                        activeDot={{ r: 7, fill: '#38bdf8' }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
            
            <p className="text-xs text-slate-500 mt-6 italic border-t border-slate-800/80 pt-4">
              {L(stats?.note) || "* Ma'lumotlar oylik va yillik hisobotlar asosida yangilanadi."}
            </p>
          </div>

          {/* O'ng tomon: StatParts Jadvali & Yutuqlar (Achivments) */}
          <div 
            className="lg:col-span-6 bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between backdrop-blur-md shadow-xl"
            data-aos="fade-left"
            data-aos-delay="350"
          >
            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2.5 text-emerald-400">
                <BarChart2 className="w-5 h-5 text-emerald-500" />
                {L(stats?.tableTitle) || "Bosqichlar kesimida (StatParts)"}
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[11px]">
                      <th className="pb-3 font-semibold">{L(stats?.tableHeaders?.year) || "Yil"}</th>
                      <th className="pb-3 font-semibold text-center">{L(stats?.tableHeaders?.applied) || "1-bosqich"}</th>
                      <th className="pb-3 font-semibold text-center">{L(stats?.tableHeaders?.stage2) || "2-bosqich"}</th>
                      <th className="pb-3 font-semibold text-center">{L(stats?.tableHeaders?.stage3) || "3-bosqich"}</th>
                      <th className="pb-3 font-semibold text-right text-emerald-400">{L(stats?.tableHeaders?.winners) || "G'oliblar"}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {loading ? (
                      <tr>
                        <td colSpan="5" className="py-8 text-center text-slate-500">Yuklanmoqda...</td>
                      </tr>
                    ) : statParts.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="py-8 text-center text-slate-500">Ma'lumot topilmadi</td>
                      </tr>
                    ) : (
                      statParts.map((row, idx) => (
                        <tr 
                          key={row._id || idx} 
                          className="hover:bg-slate-800/40 transition-colors"
                          data-aos="fade-left"
                          data-aos-delay={400 + idx * 70}
                        >
                          <td className="py-3 font-bold text-slate-200">{row.year}</td>
                          <td className="py-3 text-center text-slate-400">{row.first || 0}</td>
                          <td className="py-3 text-center text-slate-400">{row.second || 0}</td>
                          <td className="py-3 text-center text-slate-400">{row.third || 0}</td>
                          <td className="py-3 text-right font-black text-emerald-400">{row.amount || 0}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Achivment Paneli */}
            <div 
              className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 mt-6 shadow-inner"
              data-aos="zoom-in"
              data-aos-delay="600"
            >
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-4 h-4 text-amber-400" />
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {L(stats?.achievementsTitle) || "Erishilgan yutuqlar"}
                </h4>
              </div>

              {achievements.length === 0 ? (
                <div className="text-center text-xs text-slate-500 py-2">Yutuqlar mavjud emas</div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {achievements.map((item, idx) => (
                    <div key={item._id || idx} className="bg-slate-900 p-2.5 rounded-xl border border-slate-800/80 text-center">
                      <div className="text-lg font-black text-amber-400">{item.amount}</div>
                      <div className="text-[10px] text-slate-400 font-medium line-clamp-1 mt-0.5" title={item.name}>
                        {item.name}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default Stats;