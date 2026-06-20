import { useEffect, useState } from "react";
import { Calendar, Tag, ChevronRight, Search, Loader2 } from "lucide-react";
import axios from "axios";
import { API_LINK, SITE_LINK } from "../cfg"; // Rasm linki uchun SITE_LINK qo'shildi

export default function News() {
  const [news, setNews] = useState([]);
  const [load, setLoad] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Barchasi");
  const [searchQuery, setSearchQuery] = useState("");

  // 1. BACKEND'DAN MA'LUMOTLARNI YUKLASH
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoad(true);
    axios
      .get(`${API_LINK}/news/getall`)
      .then((e) => {
        const { ok, data } = e.data;
        if (ok) {
          setNews(data);
        }
      })
      .catch((err) => console.error("Yangiliklarni yuklashda xatolik:", err))
      .finally(() => setLoad(false));
  }, []);

  // 2. DINAMIK RAVISHDA UNIKAL KATEGORIYALAR RO'YXATINI SHAKLLANTIRISH
  const categories = [
    "Barchasi",
    ...new Set(news.map((item) => item.category).filter(Boolean)),
  ];

  // 3. YANGILIKLARNI FILTRLASH (Kategoriya va Qidiruv bo'yicha)
  const filteredNews = news.filter((item) => {
    const matchesCategory =
      selectedCategory === "Barchasi" || item.category === selectedCategory;
    
    const matchesSearch =
      (item.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.content || "").toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Sanani o'zbekcha formatga o'tkazish funksiyasi
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("uz-UZ", options);
  };

  return (
    <section
      id="news"
      className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-200"
    >
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {/* Qidiruv va Sarlavha paneli */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Jamg'arma Yangiliklari</h1>
            <p className="text-sm text-slate-500">Tizimdagi eng so'nggi e'lonlar, grantlar va tadbirlar.</p>
          </div>
          
          {/* Matnli Qidiruv Inputi */}
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Yangiliklardan qidirish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
            />
          </div>
        </div>

        {/* Kategoriyalar Filteri */}
        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-blue-600 text-white shadow-md transform scale-105"
                  : "bg-white text-slate-600 hover:bg-blue-50 hover:text-blue-600 border border-slate-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* LOADING (YUKLANISH) EFFEKTI */}
        {load ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-3">
            <Loader2 className="w-9 h-9 animate-spin text-blue-600" />
            <p className="text-sm font-medium text-slate-400">Yangiliklar yuklanmoqda...</p>
          </div>
        ) : filteredNews.length > 0 ? (
          /* YANGILIKLAR RO'YXATI CARD PANELI */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((item) => (
              <article
                key={item._id || item.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-slate-100 flex flex-col group"
              >
                {/* Rasm qismi */}
                <div className="relative h-56 overflow-hidden bg-slate-100">
                  <img
                    src={`${SITE_LINK}${item.image}`}
                    alt={item.title}
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=600";
                    }}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-white/90 text-blue-700 shadow-sm backdrop-blur-sm">
                      <Tag className="w-3 h-3 mr-1" />
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Kontent qismi */}
                <div className="p-6 flex flex-col grow">
                  <div className="flex items-center text-sm text-slate-500 mb-3">
                    <Calendar className="w-4 h-4 mr-2 text-slate-400" />
                    <time dateTime={item.date}>{formatDate(item.date)}</time>
                  </div>

                  <h2 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors duration-200">
                    {item.title}
                  </h2>

                  <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3 grow">
                    {item.content}
                  </p>

                  <div className="mt-auto pt-4 border-t border-slate-100">
                    <button className="inline-flex items-center text-blue-600 font-semibold text-sm hover:text-blue-800 transition-colors duration-200 group/btn">
                      Batafsil o'qish
                      <ChevronRight className="w-4 h-4 ml-1 transform group-hover/btn:translate-x-1 transition-transform duration-200" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* MAVJUD EMAS HOLATI */
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
            <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-slate-100 mb-4">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-1">
              Hech narsa topilmadi
            </h3>
            <p className="text-slate-500">
              Kiritilgan so'rov yoki tanlangan kategoriya bo'yicha yangiliklar mavjud emas.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("Barchasi");
              }}
              className="mt-6 text-blue-600 hover:underline font-medium"
            >
              Filtrlarni tozalash
            </button>
          </div>
        )}
      </main>
    </section>
  );
}