import { Calendar, Edit3, Newspaper, Plus, Trash2, Loader2, Check, X } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_LINK, SITE_LINK } from "../cfg";

// Formani tozalash uchun dastlabki bo'sh holat
const initialFormState = {
    title: "",
    category: "E'lon",
    date: new Date().toISOString().substring(0, 10),
    content: "",
    image: null
};

export default function NewsManager() {
    // ------------------------------------------
    // 1. BARCHA LOCAL STATE'LAR
    // ------------------------------------------
    const [news, setNews] = useState([]); // Yangiliklar ro'yxati
    const [isFetchLoading, setIsFetchLoading] = useState(false); // Dastlabki yuklanish (Skeleton)
    const [isSubmitting, setIsSubmitting] = useState(false); // Form saqlanayotgan paytdagi loading
    const [deletingId, setDeletingId] = useState(null); // O'chirilayotgan element IDsi

    // Modal va Form holatlari
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingIdx, setEditingIdx] = useState(null); // null bo'lsa yangi qo'shish, raqam bo'lsa tahrirlash
    const [newsForm, setNewsForm] = useState(initialFormState);

    // Toast (Xabarnoma) holati
    const [toast, setToast] = useState({ show: false, msg: "", icon: null, colorClass: "" });

    // ------------------------------------------
    // 2. TOAST (XABARNOMA) TRIGGER FUNKSIYASI
    // ------------------------------------------
    const triggerToast = (msg, icon, colorClass) => {
        setToast({ show: true, msg, icon, colorClass });
        setTimeout(() => {
            setToast({ show: false, msg: "", icon: null, colorClass: "" });
        }, 4000);
    };

    // ------------------------------------------
    // 3. API AMALLARI (GET, POST, PUT, DELETE)
    // ------------------------------------------
    
    // Yangiliklarni yuklash (Dastlabki yuklanish)
    useEffect(() => {
        const fetchNews = async () => {
            setIsFetchLoading(true);
            try {
                const response = await axios.get(`${API_LINK}/news/getall`);
                if (response.data.ok) {
                    setNews(response.data.data);
                } else {
                    console.error(response.data.msg);
                }
            } catch (error) {
                console.error("Yangiliklarni yuklashda xatolik:", error);
            } finally {
                setIsFetchLoading(false);
            }
        };
        fetchNews();
    }, []);

    // Yangilikni o'chirish
    const handleDeleteClick = async (item) => {
        if (!item._id) return;
        if (window.confirm("Haqiqatdan ham ushbu yangilikni o'chirmoqchimisiz?")) {
            setDeletingId(item._id);
            try {
                const response = await axios.delete(`${API_LINK}/news/delete/${item._id}`);
                if (response.data.ok) {
                    setNews(prev => prev.filter(n => n._id !== item._id));
                    triggerToast("Yangilik muvaffaqiyatli o'chirildi!", <Trash2 className="w-5 h-5" />, "text-rose-400");
                } else {
                    alert(response.data.msg);
                }
            } catch (error) {
                console.error("O'chirishda xatolik:", error);
                alert("Server bilan bog'lanishda xatolik yuz berdi.");
            } finally {
                setDeletingId(null);
            }
        }
    };

    // Formni serverga yuborish (Qo'shish yoki O'zgartirish)
    const handleNewsSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData();
        formData.append("title", newsForm.title);
        formData.append("category", newsForm.category);
        formData.append("date", newsForm.date);
        formData.append("content", newsForm.content);
        if (newsForm.image) {
            formData.append("image", newsForm.image);
        }

        try {
            if (editingIdx !== null) {
                // --- TAHRIRLASH (PUT) ---
                const currentItem = news[editingIdx];
                const response = await axios.put(`${API_LINK}/news/edit/${currentItem._id}`, formData);

                if (response.data.ok) {
                    setNews(prev => prev.map((item, i) => i === editingIdx ? response.data.data : item));
                    triggerToast("Yangilik muvaffaqiyatli tahrirlandi!", <Check className="w-5 h-5" />, "text-indigo-400");
                    setIsModalOpen(false);
                } else {
                    alert(response.data.msg);
                }
            } else {
                // --- YANGI QO'SHISH (POST) ---
                const response = await axios.post(`${API_LINK}/news/add`, formData);

                if (response.data.ok) {
                    setNews(prev => [response.data.data, ...prev]);
                    triggerToast("Yangi yangilik muvaffaqiyatli chop etildi!", <Newspaper className="w-5 h-5" />, "text-emerald-400");
                    setIsModalOpen(false);
                } else {
                    alert(response.data.msg);
                }
            }
        } catch (error) {
            console.error("Xatolik:", error);
            alert("Server bilan bog'lanishda xatolik yuz berdi.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // ------------------------------------------
    // 4. MODAL OYNASINI OCHISH FUNKSIYALARI
    // ------------------------------------------
    const openAddNews = () => {
        setEditingIdx(null);
        setNewsForm(initialFormState);
        setIsModalOpen(true);
    };

    const openEditNews = (idx) => {
        const item = news[idx];
        setEditingIdx(idx);
        setNewsForm({
            title: item.title,
            category: item.category,
            date: item.date ? item.date.substring(0, 10) : "",
            content: item.content,
            image: null // Fayl qayta tanlanishi ixtiyoriy
        });
        setIsModalOpen(true);
    };

    return (
        <div className="space-y-6 p-6 max-w-7xl mx-auto relative">
            
            {/* TOAST XABARNOMA BILDIRISHNOMASI */}
            {toast.show && (
                <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-800 flex items-center gap-3 animate-bounce">
                    <div className={toast.colorClass}>{toast.icon}</div>
                    <span className="text-sm font-medium">{toast.msg}</span>
                </div>
            )}

            {/* DASHBOARD HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Yangiliklar boshqaruvi (CMS)</h2>
                    <p className="text-sm text-slate-500">Sayt uchun barcha turdagi yangiliklarni qo'shing yoki o'zgartiring.</p>
                </div>
                <button
                    onClick={openAddNews}
                    disabled={isFetchLoading}
                    className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold text-sm px-5 py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                    <Plus className="w-4 h-4" /> Yangilik qo'shish
                </button>
            </div>

            {/* SKELETON LOADING OR MAIN RO'YXAT */}
            {isFetchLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((n) => (
                        <div key={n} className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 animate-pulse">
                            <div className="bg-slate-200 h-48 rounded-xl w-full" />
                            <div className="space-y-2">
                                <div className="bg-slate-200 h-4 rounded w-1/3" />
                                <div className="bg-slate-200 h-5 rounded w-3/4" />
                                <div className="bg-slate-200 h-4 rounded w-full" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : news.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {news.map((item, idx) => (
                        <div key={item._id || idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                            <div>
                                <div className="relative h-48 overflow-hidden bg-slate-100">
                                    <img
                                        src={`${SITE_LINK}${item.image}`}
                                        alt={item.title}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.currentTarget.src = "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=600";
                                        }}
                                    />
                                    <span className="absolute top-3 left-3 bg-indigo-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                                        {item.category}
                                    </span>
                                </div>
                                <div className="p-5 space-y-2">
                                    <div className="text-xs text-slate-400 flex items-center gap-1">
                                        <Calendar className="w-3.5 h-3.5" /> {item.date ? item.date.substring(0, 10) : ""}
                                    </div>
                                    <h3 className="font-bold text-slate-800 line-clamp-2">{item.title}</h3>
                                    <p className="text-slate-600 text-xs line-clamp-3 leading-relaxed">{item.content}</p>
                                </div>
                            </div>
                            <div className="px-5 py-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
                                <span className="text-[10px] font-semibold text-slate-400 uppercase">Foydalanuvchiga faol</span>
                                <div className="flex space-x-1">
                                    <button
                                        onClick={() => openEditNews(idx)}
                                        disabled={deletingId !== null}
                                        className="p-2 bg-white border border-slate-200 text-slate-600 hover:text-indigo-600 rounded-lg text-xs"
                                        title="Tahrirlash"
                                    >
                                        <Edit3 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteClick(item)}
                                        disabled={deletingId !== null}
                                        className="p-2 bg-white border border-slate-200 text-slate-600 hover:text-rose-600 rounded-lg text-xs flex items-center justify-center"
                                        title="O'chirish"
                                    >
                                        {deletingId === item._id ? <Loader2 className="w-4 h-4 animate-spin text-rose-500" /> : <Trash2 className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-2xl border border-slate-200">
                    <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-400 mb-4">
                        <Newspaper className="w-8 h-8" />
                    </div>
                    <h4 className="font-bold text-slate-700 text-lg">Yangiliklar mavjud emas</h4>
                    <p className="text-sm text-slate-400 mt-1">Yuqoridagi tugma orqali tizimga birinchi yangilikni kiriting.</p>
                </div>
            )}

            {/* QO'SHISH VA TAHRIRLASH MODAL OYNARI */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-sm" role="dialog" aria-modal="true">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
                        <div className="inline-block align-bottom bg-white rounded-3xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full border border-slate-100">
                            {/* Modal Header */}
                            <div className="bg-indigo-900 px-6 py-5 text-white flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-bold">{editingIdx !== null ? "Yangilikni tahrirlash" : "Yangi yangilik yaratish"}</h3>
                                    <p className="text-xs text-indigo-200 mt-0.5">Ma'lumotlarni kiriting va saqlash tugmasini bosing.</p>
                                </div>
                                <button type="button" disabled={isSubmitting} onClick={() => setIsModalOpen(false)} className="text-slate-300 hover:text-white transition-colors disabled:opacity-50">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
            
                            {/* Form Box */}
                            <form onSubmit={handleNewsSubmit}>
                                <div className="p-6 space-y-4 bg-slate-50">
                                    {/* Sarlavha */}
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Sarlavha (Title)</label>
                                        <input 
                                            type="text" 
                                            required
                                            disabled={isSubmitting}
                                            value={newsForm.title}
                                            onChange={(e) => setNewsForm({...newsForm, title: e.target.value})}
                                            placeholder="Yangilik sarlavhasini kiriting..." 
                                            className="w-full px-4 py-2.5 border border-slate-200 bg-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all disabled:bg-slate-100"
                                        />
                                    </div>
            
                                    <div className="grid grid-cols-2 gap-4">
                                        {/* Kategoriya */}
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Kategoriya</label>
                                            <select 
                                                required
                                                disabled={isSubmitting}
                                                value={newsForm.category}
                                                onChange={(e) => setNewsForm({...newsForm, category: e.target.value})}
                                                className="w-full px-4 py-2.5 border border-slate-200 bg-white rounded-xl text-sm focus:outline-none text-slate-700 disabled:bg-slate-100"
                                            >
                                                <option value="E'lon">E'lon</option>
                                                <option value="Grant">Grant</option>
                                                <option value="Tadbir">Tadbir</option>
                                                <option value="Natija">Natija</option>
                                            </select>
                                        </div>
                                        {/* Sana */}
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">E'lon qilish sanasi</label>
                                            <input 
                                                type="date" 
                                                required
                                                disabled={isSubmitting}
                                                value={newsForm.date}
                                                onChange={(e) => setNewsForm({...newsForm, date: e.target.value})}
                                                className="w-full px-4 py-2.5 border border-slate-200 bg-white rounded-xl text-sm text-slate-700 disabled:bg-slate-100"
                                            />
                                        </div>
                                    </div>
            
                                    {/* Rasm fayli */}
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Rasm faylini tanlang {editingIdx !== null && "(Ixtiyoriy)"}</label>
                                        <input 
                                            type="file" 
                                            accept="image/*"
                                            disabled={isSubmitting}
                                            required={editingIdx === null}
                                            onChange={(e) => e.target.files?.[0] && setNewsForm({...newsForm, image: e.target.files[0]})}
                                            className="w-full px-4 py-2 border border-slate-200 bg-white rounded-xl text-sm file:mr-4 file:py-1.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 disabled:opacity-60"
                                        />
                                        <p className="text-slate-400 text-[10px] mt-1">Formatlar: JPG, PNG, WEBP. Maksimal o'lcham 5MB.</p>
                                    </div>
            
                                    {/* Matn (Content) */}
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Batafsil matn</label>
                                        <textarea 
                                            required
                                            disabled={isSubmitting}
                                            rows={5}
                                            value={newsForm.content}
                                            onChange={(e) => setNewsForm({...newsForm, content: e.target.value})}
                                            placeholder="Yangilik matnini batafsil yozing..." 
                                            className="w-full px-4 py-2.5 border border-slate-200 bg-white rounded-xl text-sm focus:outline-none disabled:bg-slate-100"
                                        />
                                    </div>
                                </div>
            
                                {/* Modal Footer Buttons */}
                                <div className="bg-slate-100 px-6 py-4 flex items-center justify-end space-x-2 rounded-b-3xl border-t border-slate-200">
                                    <button type="button" disabled={isSubmitting} onClick={() => setIsModalOpen(false)} className="bg-white border border-slate-300 text-slate-700 px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-slate-50 disabled:opacity-50">
                                        Bekor qilish
                                    </button>
                                    <button type="submit" disabled={isSubmitting} className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 disabled:bg-indigo-400">
                                        {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                                        {isSubmitting ? "Saqlanmoqda..." : "Saqlash"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}