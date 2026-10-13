import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_LINK } from '../cfg';

function Marking() {
    const [items, setItems] = useState([]);
    const [formData, setFormData] = useState({
        order: '',
        title: '',
        paragraph: '',
        mark: '',
        accept: false, // Boolean shaklida
        color: '#3b82f6'
    });
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);

    const API_URL = `${API_LINK}/sitesettings`;

    // 1. Barcha markinglarni yuklash (getall)
    const fetchMarkings = async () => {
        try {
            const res = await axios.get(`${API_URL}/getallmark`);
            if (res.data.ok) {
                setItems(res.data.data);
            }
        } catch (err) {
            console.error("Markinglarni yuklashda xatolik:", err);
        }
    };

    useEffect(() => {
        fetchMarkings();
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const resetForm = () => {
        setFormData({
            order: '',
            title: '',
            paragraph: '',
            mark: '',
            accept: false,
            color: '#3b82f6'
        });
        setEditingId(null);
    };

    // 2. Qo'shish (add) va Tahrirlash (edit)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const config = {
                headers: { 
                    'Content-Type': 'application/json',
                    'x-admin-token': `${localStorage.getItem("access_admin_token")}` 
                }
            };

            const payload = {
                order: Number(formData.order) || 0,
                title: formData.title,
                paragraph: formData.paragraph,
                mark: Number(formData.mark) || 0,
                accept: Boolean(formData.accept), // Boolean bo'lishini ta'minlash
                color: formData.color
            };

            if (editingId) {
                const res = await axios.put(`${API_URL}/editmark/${editingId}`, payload, config);
                if (res.data.ok) {
                    fetchMarkings();
                    resetForm();
                } else {
                    alert(res.data.msg);
                }
            } else {
                const res = await axios.post(`${API_URL}/addmark`, payload, config);
                if (res.data.ok) {
                    fetchMarkings();
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

    // Tahrirlash rejimiga o'tish
    const handleEdit = (item) => {
        setEditingId(item._id);
        setFormData({
            order: item.order || '',
            title: item.title || '',
            paragraph: item.paragraph || '',
            mark: item.mark || '',
            accept: Boolean(item.accept),
            color: item.color || '#3b82f6'
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // 3. O'chirish (delete)
    const handleDelete = async (id) => {
        if (!window.confirm("Haqiqatan ham ushbu ma'lumotni o'chirmoqchimisiz?")) return;

        try {
            const res = await axios.delete(`${API_URL}/deletemark/${id}`, {
                headers: { 'x-admin-token': `${localStorage.getItem("access_admin_token")}` }
            });
            if (res.data.ok) {
                fetchMarkings();
            } else {
                alert(res.data.msg);
            }
        } catch (err) {
            console.error("O'chirishda xatolik:", err);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 font-sans text-slate-800">
            <div className="max-w-5xl mx-auto">
                
                {/* Sarlavha qismi */}
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
                        Marking Boshqaruvi
                    </h2>
                    <p className="mt-2 text-sm text-slate-500">
                        Baholash mezoni va ballar strukturasini boshqarish
                    </p>
                    <div className="w-16 h-1 bg-blue-600 mx-auto mt-3 rounded-full"></div>
                </div>

                {/* Form kartasi */}
                <form 
                    onSubmit={handleSubmit} 
                    className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-12 transition-all"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider ${
                            editingId ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                            {editingId ? 'Tahrirlash rejimi' : 'Yangi qo\'shish'}
                        </span>
                        <h3 className="text-lg font-bold text-slate-800">
                            {editingId ? 'Markingni tahrirlash' : 'Yangi Marking qo\'shish'}
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                        {/* Order input */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-600 mb-1">
                                Tartib (Order)
                            </label>
                            <input
                                type="number"
                                name="order"
                                placeholder="Masalan: 1"
                                value={formData.order}
                                onChange={handleInputChange}
                                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                            />
                        </div>

                        {/* Mark input */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-600 mb-1">
                                Baho / Ball (Mark)
                            </label>
                            <input
                                type="number"
                                name="mark"
                                placeholder="Masalan: 85"
                                value={formData.mark}
                                onChange={handleInputChange}
                                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                            />
                        </div>

                        {/* Color picker */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-600 mb-1">
                                Rang (Color)
                            </label>
                            <div className="flex items-center gap-3 bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5">
                                <input
                                    type="color"
                                    name="color"
                                    value={formData.color}
                                    onChange={handleInputChange}
                                    className="w-7 h-7 border-0 cursor-pointer bg-transparent rounded"
                                />
                                <span className="text-xs font-mono font-medium text-slate-600">
                                    {formData.color}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Title input */}
                    <div className="mb-4">
                        <label className="block text-xs font-semibold text-slate-600 mb-1">
                            Sarlavha (Title)
                        </label>
                        <input
                            type="text"
                            name="title"
                            placeholder="Marking sarlavhasini kiriting..."
                            value={formData.title}
                            onChange={handleInputChange}
                            required
                            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                        />
                    </div>

                    {/* Accept Checkbox (Kimlar baholashi) */}
                    <div className="mb-4 bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                        <label className="flex items-center gap-3 cursor-pointer select-none">
                            <input
                                type="checkbox"
                                name="accept"
                                checked={formData.accept}
                                onChange={handleInputChange}
                                className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
                            />
                            <div>
                                <span className="text-sm font-semibold text-slate-800">
                                    Ekspertlar ham baholay olsin (Accept: {formData.accept ? 'True' : 'False'})
                                </span>
                                <p className="text-xs text-slate-500 mt-0.5">
                                    {formData.accept 
                                        ? "Bunga Ekspertlar va Editorlar baholaydi" 
                                        : "Faqat Editorlar baholaydi"}
                                </p>
                            </div>
                        </label>
                    </div>

                    {/* Paragraph input */}
                    <div className="mb-6">
                        <label className="block text-xs font-semibold text-slate-600 mb-1">
                            Izoh / Paragraf (Paragraph)
                        </label>
                        <textarea
                            name="paragraph"
                            rows="3"
                            placeholder="Batafsil ma'lumot va izoh..."
                            value={formData.paragraph}
                            onChange={handleInputChange}
                            required
                            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition resize-y"
                        />
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-3">
                        <button 
                            type="submit" 
                            disabled={loading}
                            className={`px-5 py-2.5 rounded-lg text-white font-medium text-sm transition-all shadow-sm active:scale-95 ${
                                editingId 
                                    ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-200' 
                                    : 'bg-blue-600 hover:bg-blue-700 shadow-blue-200'
                            }`}
                        >
                            {loading ? 'Saqlanmoqda...' : editingId ? 'Saqlash' : 'Qo\'shish'}
                        </button>

                        {editingId && (
                            <button 
                                type="button" 
                                onClick={resetForm}
                                className="px-5 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-sm transition active:scale-95"
                            >
                                Bekor qilish
                            </button>
                        )}
                    </div>
                </form>

                {/* Ro'yxat bloki */}
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                            Mavjud Markinglar
                            <span className="text-xs bg-blue-50 text-blue-600 border border-blue-200 px-2.5 py-0.5 rounded-full font-semibold">
                                {items.length}
                            </span>
                        </h3>
                    </div>

                    {items.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-300 text-slate-400">
                            Hozircha hech qanday marking kiritilmagan.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {items.map((item) => (
                                <div 
                                    key={item._id} 
                                    style={{ borderLeftColor: item.color || '#3b82f6' }}
                                    className="bg-white rounded-xl p-5 border border-slate-200 border-l-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md">
                                                #{item.order ?? 0}
                                            </span>
                                            {item.mark !== undefined && (
                                                <span 
                                                    style={{ 
                                                        backgroundColor: item.color ? `${item.color}15` : '#eff6ff',
                                                        color: item.color || '#2563eb'
                                                    }}
                                                    className="text-xs font-bold px-2.5 py-0.5 rounded-full border border-current opacity-90"
                                                >
                                                    Ball: {item.mark}
                                                </span>
                                            )}
                                        </div>

                                        <h4 className="text-base font-bold text-slate-800 mb-1 line-clamp-1">
                                            {item.title}
                                        </h4>

                                        {/* Accept holatini ko'rsatuvchi badge */}
                                        <div className="mb-3">
                                            {item.accept ? (
                                                <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-md px-2 py-0.5 inline-flex items-center gap-1">
                                                    👑 Ekspert + Editor
                                                </span>
                                            ) : (
                                                <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 border border-slate-200 rounded-md px-2 py-0.5 inline-flex items-center gap-1">
                                                    ✏️ Faqat Editor
                                                </span>
                                            )}
                                        </div>

                                        <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
                                            {item.paragraph}
                                        </p>
                                    </div>

                                    {/* Edit / Delete buttons */}
                                    <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                                        <button 
                                            onClick={() => handleEdit(item)}
                                            className="flex-1 text-xs font-semibold py-1.5 px-3 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-md transition"
                                        >
                                            ✏️ Tahrirlash
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(item._id)}
                                            className="flex-1 text-xs font-semibold py-1.5 px-3 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-md transition"
                                        >
                                            🗑️ O'chirish
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}

export default Marking;