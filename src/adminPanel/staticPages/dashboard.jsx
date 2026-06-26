import axios from "axios";
import { Calendar, ChevronRight, Eye, FileCheck, FileText, FileX, Newspaper, Plus, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { API_LINK, SITE_LINK } from "../cfg";

function Dashboard({ setCurrentTab, setSelectedApp }) {
    // 1. LOCAL STATE'LAR
    const [news, setNews] = useState([]);
    const [apps, setApps] = useState([]);
    const [stats, setStats] = useState({
        total: 0,
        pending: 0,
        approved: 0,
        rejected: 0
    });
    const [isLoading, setIsLoading] = useState(true);

    // 2. DATA FETCHING (Yangiliklar, Arizalar va Statistika)
    useEffect(() => {
        const fetchDashboardData = async () => {
            setIsLoading(true);
            try {
                // Yangiliklarni yuklash
                const newsRes = await axios.get(`${API_LINK}/news/getall`);
                if (newsRes.data.ok) {
                    setNews(newsRes.data.data);
                }

                // Arizalarni yuklash (Backend yo'nalishingizga qarab moslang, masalan: /apps/getall)
                const appsRes = await axios.get(`${API_LINK}/apply/getall`);
                if (appsRes.data.ok) {
                    const allApps = appsRes.data.data || [];
                    setApps(allApps);

                    // Kelgan arizalar asosida statistikani hisoblash
                    // Agar backend tayyor stat ma'lumot bersa, to'g'ridan-to'g'ri o'shani yozish ham mumkin
                    const pending = allApps.filter(a => a.status === "pending" || a.status === "Kutilmoqda").length;
                    const approved = allApps.filter(a => a.status === "approved" || a.status === "Tasdiqlandi").length;
                    const rejected = allApps.filter(a => a.status === "rejected" || a.status === "Rad etildi").length;

                    setStats({
                        total: allApps.length,
                        pending,
                        approved,
                        rejected
                    });
                }
            } catch (error) {
                console.error("Dashboard ma'lumotlarini yuklashda xatolik:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    // Yuklanish holati (Loading Spinner)
    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
                <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
                <p className="text-sm font-medium text-slate-500 animate-pulse">Ma'lumotlar yuklanmoqda...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Sarlavha qismi */}
            <div>
                <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
                    Xush kelibsiz, Bekzodbek!
                </h2>
                <p className="text-sm text-slate-500">
                    Bugungi arizalar oqimi va jamg'armaning dolzarb yangiliklari tahlili.
                </p>
            </div>

            {/* Statistik vidjetlar paneli */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {/* Jami arizalar */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center space-x-4">
                    <div className="p-4 bg-indigo-50 rounded-xl text-indigo-600">
                        <FileText className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Jami arizalar</p>
                        <h3 className="text-2xl font-bold text-slate-800 mt-0.5">{stats.total}</h3>
                    </div>
                </div>

                {/* Kutilayotganlar */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center space-x-4">
                    <div className="p-4 bg-amber-50 rounded-xl text-amber-600">
                        <Calendar className="w-6 h-6 animate-pulse" />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Kutilayotganlar</p>
                        <h3 className="text-2xl font-bold text-slate-800 mt-0.5">{stats.pending}</h3>
                    </div>
                </div>

                {/* Tasdiqlanganlar */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center space-x-4">
                    <div className="p-4 bg-emerald-50 rounded-xl text-emerald-600">
                        <FileCheck className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Tasdiqlanganlar</p>
                        <h3 className="text-2xl font-bold text-slate-800 mt-0.5">{stats.approved}</h3>
                    </div>
                </div>

                {/* Rad etilganlar */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center space-x-4">
                    <div className="p-4 bg-rose-50 rounded-xl text-rose-600">
                        <FileX className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Rad etilganlar</p>
                        <h3 className="text-2xl font-bold text-slate-800 mt-0.5">{stats.rejected}</h3>
                    </div>
                </div>
            </div>

            {/* Pastki qism: Arizalar va Yangiliklar bo'limi */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Chap tomonda: Oxirgi arizalar jadvali */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden lg:col-span-2">
                    <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                        <h3 className="font-bold text-slate-800 flex items-center">
                            <span className="inline-block w-2.5 h-2.5 bg-indigo-600 rounded-full mr-2"></span>
                            Oxirgi kelib tushgan arizalar
                        </h3>
                        <button
                            onClick={() => setCurrentTab("applications")}
                            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                        >
                            Barchasi <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[500px]">
                            <thead>
                                <tr className="bg-slate-50/50 text-slate-400 text-xs font-semibold uppercase">
                                    <th className="py-3 px-5">F.I.SH</th>
                                    <th className="py-3 px-5">Universitet</th>
                                    <th className="py-3 px-5">Yo'nalish</th>
                                    <th className="py-3 px-5 text-right">Amal</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm divide-y divide-slate-100">
                                {apps.slice(0, 4).map((app) => (
                                    <tr key={app._id || app.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="py-4 px-5">
                                            <div className="font-semibold text-slate-800">
                                                {app.studentFullName || "Ism kiritilmagan"}
                                            </div>
                                            <div className="text-xs text-slate-400 font-mono">
                                                {app.emailAddress || "E-pochta yo'q"}
                                            </div>
                                        </td>
                                        <td className="py-4 px-5 text-slate-600 max-w-[150px] truncate">
                                            {app.universityName}
                                        </td>
                                        <td className="py-4 px-5 text-slate-600 font-medium">
                                            {app.studyField}
                                        </td>
                                        <td className="py-4 px-5 text-right">
                                            <button
                                                onClick={() => {
                                                    setSelectedApp(app);
                                                    setCurrentTab("applications"); // Ariza ko'rish rejimiga o'tkazish
                                                }}
                                                className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center ml-auto gap-1"
                                            >
                                                <Eye className="w-3.5 h-3.5" /> Ko'rish
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {apps.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="py-8 text-center text-slate-400">
                                            Hozircha kelib tushgan arizalar mavjud emas.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* O'ng tomonda: Faol yangiliklar snapshot qismi */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-slate-800 flex items-center">
                                <Newspaper className="text-indigo-500 mr-2 w-5 h-5" />
                                Faol yangiliklar
                            </h3>
                            <span className="bg-indigo-50 text-indigo-600 text-xs px-2.5 py-0.5 rounded-full font-bold">
                                {news.length} ta
                            </span>
                        </div>
                        <div className="space-y-4 max-h-[280px] overflow-y-auto pr-1">
                            {news.slice(0, 3).map((item) => (
                                <div
                                    key={item._id || item.id}
                                    onClick={() => setCurrentTab("news")}
                                    className="flex items-start space-x-3 p-2 hover:bg-slate-50 rounded-xl transition-all cursor-pointer"
                                >
                                    <img
                                        src={`${SITE_LINK}${item.image}`}
                                        alt={item.title}
                                        onError={(e) => {
                                            e.currentTarget.src = "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=200";
                                        }}
                                        className="w-12 h-12 rounded-lg object-cover shrink-0 shadow-sm"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-xs font-bold text-slate-800 truncate">
                                            {item.title}
                                        </h4>
                                        <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">
                                            {item.content}
                                        </p>
                                        <span className="inline-block mt-1 text-[10px] bg-slate-100 text-slate-600 font-bold px-1.5 py-0.5 rounded">
                                            {item.category}
                                        </span>
                                    </div>
                                </div>
                            ))}
                            {news.length === 0 && (
                                <p className="text-sm text-slate-400 py-6 text-center">
                                    Faol yangiliklar mavjud emas.
                                </p>
                            )}
                        </div>
                    </div>
                    <button
                        onClick={() => setCurrentTab("news")}
                        className="mt-4 w-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2"
                    >
                        <Plus className="w-4 h-4" /> Yangilik qo'shish yoki tahrirlash
                    </button>
                </div>

            </div>
        </div>
    );
}

export default Dashboard;