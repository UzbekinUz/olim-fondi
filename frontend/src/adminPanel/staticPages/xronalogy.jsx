import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_LINK, SITE_LINK } from '../cfg';

function Xronalogy() {
    const [items, setItems] = useState([]);
    const [formData, setFormData] = useState({ date: '', action: '', photo: null });
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);
    const API_URL = `${API_LINK}/sitesettings`;

    const fetchXronology = async () => {
        try {
            const res = await axios.get(`${API_URL}/getall`);
            if (res.data.ok) {
                setItems(res.data.data);
            }
        } catch (err) {
            console.error("Ma'lumotlarni yuklashda xatolik:", err);
        }
    };

    useEffect(() => {
        fetchXronology();
    }, []);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, photo: file });
        if (file) {
            setPreviewUrl(URL.createObjectURL(file));
        } else {
            setPreviewUrl(null);
        }
    };

    const resetForm = () => {
        setFormData({ date: '', action: '', photo: null });
        setEditingId(null);
        setPreviewUrl(null);
        const fileInput = document.getElementById('photoInput');
        if (fileInput) fileInput.value = '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        data.append('date', formData.date);
        data.append('action', formData.action);
        if (formData.photo) {
            data.append('photo', formData.photo);
        }

        try {
            const config = {
                headers: { 'x-admin-token': `${localStorage.getItem("access_admin_token")}` }
            };

            if (editingId) {
                const res = await axios.put(`${API_URL}/edit/${editingId}`, data, config);
                if (res.data.ok) {
                    fetchXronology();
                    resetForm();
                } else {
                    alert(res.data.msg);
                }
            } else {
                if (!formData.photo) {
                    alert("Rasm yuklash majburiy!");
                    setLoading(false);
                    return;
                }
                const res = await axios.post(`${API_URL}/add`, data, config);
                if (res.data.ok) {
                    fetchXronology();
                    resetForm();
                } else {
                    alert(res.data.msg);
                }
            }
        } catch (err) {
            console.error("Xatolik:", err);
            alert("Xatolik yuz berdi!");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (item) => {
        setEditingId(item._id);
        setFormData({
            date: item.date,
            action: item.action,
            photo: null
        });
        setPreviewUrl(`${API_LINK}${item.photo}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Haqiqatan ham ushbu xronologiyani o'chirmoqchimisiz?")) return;

        try {
            const res = await axios.delete(`${API_URL}/delete/${id}`, {
                headers: { 'x-admin-token': `${localStorage.getItem("access_admin_token")}` }
            });
            if (res.data.ok) {
                fetchXronology();
            } else {
                alert(res.data.msg);
            }
        } catch (err) {
            console.error("O'chirishda xatolik:", err);
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 min-h-screen text-slate-800 font-sans bg-slate-50/50">
            {/* Header bo'limi */}
            <header className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                    Xronologiya Boshqaruvi
                </h2>
                <p className="text-slate-500 text-sm mt-1">
                    Olimfondi.uz platformasining voqealar va harakatlar tarixi
                </p>
            </header>

            {/* Boshqaruv Formasi (Yorug' Karta) */}
            <form 
                onSubmit={handleSubmit} 
                className="max-w-3xl mx-auto bg-white border border-slate-200/90 rounded-2xl p-6 md:p-8 mb-16 shadow-xl shadow-slate-200/50 transition-all duration-300"
            >
                <div className="flex items-center gap-3 mb-6">
                    <span className="bg-indigo-50 border border-indigo-200 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                        {editingId ? "Tahrirlash Rejimi" : "Yangi Yozuv"}
                    </span>
                    <h3 className="text-lg font-bold text-slate-800">
                        {editingId ? "Xronologiyani Yangilash" : "Xronologiya Qo'shish"}
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4">
                    {/* Sana input */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-slate-600">Sana va Vaqt</label>
                        <input
                            type="text"
                            name="date"
                            placeholder="Masalan: 2024-yil 15-mart"
                            value={formData.date}
                            onChange={handleInputChange}
                            className="bg-slate-50 border border-slate-300 rounded-lg px-4 py-2.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all text-sm"
                            required
                        />
                    </div>

                    {/* Rasm input */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-slate-600">
                            Rasm {editingId && "(Tanlanmasa eski rasm qoladi)"}
                        </label>
                        <label 
                            htmlFor="photoInput" 
                            className="bg-slate-50 border border-dashed border-slate-300 rounded-lg px-4 py-2.5 text-slate-500 text-sm cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/30 hover:text-indigo-600 transition-all text-center truncate"
                        >
                            📁 {formData.photo ? formData.photo.name : "Faylni tanlang..."}
                        </label>
                        <input
                            id="photoInput"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </div>
                </div>

                {/* Harakat textarea */}
                <div className="flex flex-col gap-1.5 mb-4">
                    <label className="text-xs font-semibold text-slate-600">Harakat / Hodisa Tafsiloti</label>
                    <textarea
                        name="action"
                        placeholder="Ushbu sana bilan bog'liq batafsil ma'lumot kiritiladi..."
                        value={formData.action}
                        onChange={handleInputChange}
                        rows={3}
                        className="bg-slate-50 border border-slate-300 rounded-lg px-4 py-2.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all text-sm resize-y"
                        required
                    />
                </div>

                {/* Rasm ko'rinishi (Preview) */}
                {previewUrl && (
                    <div className="flex items-center gap-4 bg-slate-100 p-3 rounded-lg mb-5 border border-slate-200">
                        <span className="text-xs text-slate-500 font-medium">Rasm ko'rinishi:</span>
                        <img 
                            src={previewUrl} 
                            alt="Preview" 
                            className="w-16 h-16 object-cover rounded-md border border-slate-300" 
                        />
                    </div>
                )}

                {/* Tugmalar */}
                <div className="flex items-center gap-3">
                    <button 
                        type="submit" 
                        disabled={loading}
                        className={`px-6 py-2.5 rounded-lg font-semibold text-sm text-white shadow-md transition-all transform active:scale-95 disabled:opacity-50 cursor-pointer ${
                            editingId 
                                ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-amber-200' 
                                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-indigo-200'
                        }`}
                    >
                        {loading ? "Saqlanmoqda..." : editingId ? "Saqlash" : "Qo'shish"}
                    </button>

                    {editingId && (
                        <button 
                            type="button" 
                            onClick={resetForm}
                            className="bg-slate-100 border border-slate-300 text-slate-600 hover:bg-slate-200 px-5 py-2.5 rounded-lg font-medium text-sm transition-all cursor-pointer"
                        >
                            Bekor qilish
                        </button>
                    )}
                </div>
            </form>

            {/* Xronologiya Ro'yxati (Chap / O'ng Zikzak Timeline) */}
            <div className="space-y-8">
                <h3 className="text-xl font-bold text-slate-800 text-center flex items-center justify-center gap-2 mb-10">
                    Mavjud Xronologiya 
                    <span className="text-xs bg-indigo-50 text-indigo-600 border border-indigo-200 px-2.5 py-0.5 rounded-full font-semibold">
                        {items.length}
                    </span>
                </h3>

                {items.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 text-slate-400 shadow-sm max-w-xl mx-auto">
                        Hozircha hech qanday ma'lumot kiritilmagan.
                    </div>
                ) : (
                    <div className="relative max-w-5xl mx-auto">
                        {/* Markaziy vertikal chiziq (Katta ekranda markazda, kichikda chap tomonda) */}
                        <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-1 bg-gradient-to-b from-blue-500 via-indigo-500 to-slate-300 md:-translate-x-1/2 rounded-full"></div>

                        <div className="space-y-12">
                            {items.map((item, index) => {
                                const isEven = index % 2 === 0; // Chap va o'ng tomonni belgilash
                                return (
                                    <div 
                                        key={item._id} 
                                        className={`relative flex flex-col md:flex-row items-center ${
                                            isEven ? 'md:flex-row-reverse' : ''
                                        }`}
                                    >
                                        {/* Markaziy dumaloq nuqta */}
                                        <div className="absolute left-4 md:left-1/2 top-8 -translate-x-1/2 z-10 w-5 h-5 rounded-full bg-indigo-600 border-4 border-white shadow-md"></div>

                                        {/* Bo'sh joy ajratish (Katta ekranda qarama-qarshi tomon uchun) */}
                                        <div className="hidden md:block w-1/2"></div>

                                        {/* Asosiy Voqea Kartasi */}
                                        <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pr-10' : 'md:pl-10'}`}>
                                            <div className="relative group bg-white border border-slate-200 rounded-2xl p-5 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:border-indigo-300 transition-all duration-300">
                                                
                                                {/* INGICHKA STRELKA SHAKLI (POINTER) */}
                                                {/* Mobile uchun chap tomondagi strelka */}
                                                <div className="block md:hidden absolute -left-2.5 top-7 w-0 h-0 border-y-[6px] border-y-transparent border-r-[10px] border-r-white filter drop-shadow-[-2px_0_1px_rgba(0,0,0,0.05)]"></div>
                                                
                                                {/* Desktop uchun yo'nalishga qarab chap yoki o'ng strelka */}
                                                <div className={`hidden md:block absolute top-7 w-0 h-0 border-y-[7px] border-y-transparent filter drop-shadow-[0_1px_1px_rgba(0,0,0,0.05)] ${
                                                    isEven 
                                                        ? '-right-3 border-l-[12px] border-l-white' 
                                                        : '-left-3 border-r-[12px] border-r-white'
                                                }`}></div>

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
                                                                <span className="inline-block text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-md">
                                                                    {item.date}
                                                                </span>
                                                            </div>
                                                            <p className="text-slate-700 text-sm leading-relaxed font-medium">
                                                                {item.action}
                                                            </p>
                                                        </div>

                                                        {/* Amallar (Tahrirlash va O'chirish) */}
                                                        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-100 justify-end">
                                                            <button 
                                                                onClick={() => handleEdit(item)}
                                                                className="p-2 bg-blue-50 border border-blue-200 text-blue-600 hover:bg-blue-100 rounded-lg transition-all cursor-pointer text-xs font-medium flex items-center gap-1"
                                                                title="Tahrirlash"
                                                            >
                                                                ✏️ Tahrirlash
                                                            </button>
                                                            <button 
                                                                onClick={() => handleDelete(item._id)}
                                                                className="p-2 bg-rose-50 border border-rose-200 text-rose-600 hover:bg-rose-100 rounded-lg transition-all cursor-pointer text-xs font-medium flex items-center gap-1"
                                                                title="O'chirish"
                                                            >
                                                                🗑️ O'chirish
                                                            </button>
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
    );
}

export default Xronalogy;