import { useState } from 'react';
import { Calendar, Tag, ChevronRight, Search} from 'lucide-react';

const initialNews = [
  {
    id: 1,
    title: "2026-yilgi Yozgi Ilmiy Grantlar Tanlovi E'lon qilindi",
    category: "Grant",
    date: "2026-06-14",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600",
    content: "Olim Fondi yosh tadqiqotchilar va faol talabalarni qo'llab-quvvatlash uchun 2026-yilgi yozgi bosqich grantlarini e'lon qiladi. Arizalar joriy yilning 30-iyuniga qadar qabul qilinadi. Grant miqdori jami kontrakt summasining 100% gacha bo'lgan qismini qamrab oladi."
  },
  {
    id: 2,
    title: "Respublika Yosh Olimlarining Simpoziumi bo'lib o'tdi",
    category: "Tadbir",
    date: "2026-06-11",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=600",
    content: "Toshkent shahridagi simpoziumda jamg'arma stipendiatlari o'z ilmiy loyihalarini taqdim qildilar. Eng faol 3 ta innovatsion tadqiqot mualliflariga xorijiy laboratoriyalarda malaka oshirish sertifikati berildi."
  },
  {
    id: 3,
    title: "Hujjatlar qabul qilish jarayonida yangi tahrirdagi shartlar",
    category: "E'lon",
    date: "2026-06-05",
    image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=600",
    content: "Diqqat! Joriy mavsumdan boshlab arizachilarning ilmiy rahbarlaridan olingan tavsiyanomalari ham talab qilinadi. Barcha fayllarni faqat PDF formatda va aniq skaner qilingan ko'rinishda taqdim etishingiz so'raladi."
  }
];

export default function News() {
  const [selectedCategory, setSelectedCategory] = useState('Barchasi');
  const [searchQuery, setSearchQuery] = useState('');

  // Unikal kategoriyalarni olish
  const categories = ['Barchasi', ...new Set(initialNews.map(news => news.category))];

  // Yangiliklarni filtrlash
  const filteredNews = initialNews.filter(news => {
    const matchesCategory = selectedCategory === 'Barchasi' || news.category === selectedCategory;
    const matchesSearch = news.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          news.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('uz-UZ', options);
  };

  return (
    <section id="news" className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-200">
      
      {/* Header Qismi */}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Kategoriyalar Filteri */}
        <div className="mb-10">
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-in-out ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-md transform scale-105'
                    : 'bg-white text-slate-600 hover:bg-blue-50 hover:text-blue-600 border border-slate-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Yangiliklar Ro'yxati */}
        {filteredNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((news) => (
              <article 
                key={news.id} 
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-slate-100 flex flex-col group"
              >
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={news.image} 
                    alt={news.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-white/90 text-blue-700 shadow-sm backdrop-blur-sm">
                      <Tag className="w-3 h-3 mr-1" />
                      {news.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6 flex flex-col grow">
                  <div className="flex items-center text-sm text-slate-500 mb-3">
                    <Calendar className="w-4 h-4 mr-2 text-slate-400" />
                    <time dateTime={news.date}>{formatDate(news.date)}</time>
                  </div>
                  
                  <h2 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors duration-200">
                    {news.title}
                  </h2>
                  
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3 grow">
                    {news.content}
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
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
            <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-slate-100 mb-4">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-1">Hech narsa topilmadi</h3>
            <p className="text-slate-500">Kiritilgan so'rov yoki tanlangan kategoriya bo'yicha yangiliklar yo'q.</p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('Barchasi');
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