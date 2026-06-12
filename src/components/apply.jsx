import { CheckCircle2, Send } from "lucide-react";
import { useState } from "react";

function Apply() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    gpa: "",
    reason: "",
    achievements: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        name: "",
        phone: "",
        email: "",
        gpa: "",
        reason: "",
        achievements: "",
      });
    }, 5000);
  };
  return (
    <section id="apply" className="py-20 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden">
          {/* Form Header banner */}
          <div className="bg-linear-to-r from-blue-700 to-indigo-900 p-8 text-white text-center">
            <span className="text-xs font-bold tracking-widest uppercase text-blue-300 bg-white/10 px-3 py-1 rounded-full">
              Saralash Tanlovi
            </span>
            <h3 className="text-2xl sm:text-3xl font-black mt-3">
              Stipendiyaga Ariza Topsherish
            </h3>
            <p className="text-sm text-blue-100 mt-2 max-w-xl mx-auto">
              Agar siz yordamga muhtoj, faol va yuqori salohiyatli talaba
              bo'lsangiz, quyidagi formani to'ldirib ariza yuboring.
            </p>
          </div>

          {/* Form element */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-6">
            {formSubmitted ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-6 rounded-2xl text-center space-y-3 animate-fadeIn">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold">
                  Arizangiz muvaffaqiyatli qabul qilindi!
                </h4>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Arizangiz fond komissiyasi va kuratorlari tomonidan batafsil
                  tekshiriladi va tez orada siz bilan aloqaga chiqishadi.
                  Rahmat!
                </p>
              </div>
            ) : null}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  F.I.SH (To'liq ismingiz)
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Masalan: Axmedov Farrux"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Telefon raqamingiz
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="Masalan: +998 90 123 45 67"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Elektron pochta (Email)
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="Masalan: farrux@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Akademik GPA ballingiz
                </label>
                <input
                  type="text"
                  required
                  value={formData.gpa}
                  onChange={(e) =>
                    setFormData({ ...formData, gpa: e.target.value })
                  }
                  placeholder="Masalan: 4.8 yoki 92%"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Ilmiy yutuqlaringiz va sertifikatlaringiz
              </label>
              <textarea
                rows="3"
                value={formData.achievements}
                onChange={(e) =>
                  setFormData({ ...formData, achievements: e.target.value })
                }
                placeholder="IELTS, maqolalar, yutuqlar yoki tanlov g'olibliklarini yozing..."
                className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
              ></textarea>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Nima sababdan ushbu stipendiyani sizga berishimiz kerak?
              </label>
              <textarea
                rows="4"
                required
                value={formData.reason}
                onChange={(e) =>
                  setFormData({ ...formData, reason: e.target.value })
                }
                placeholder="Sizning ijtimoiy holatingiz va nima uchun aynan siz tanlanishingiz kerakligi haqida samimiy yozing..."
                className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
              ></textarea>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={formSubmitted}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold tracking-wide shadow-lg shadow-blue-200 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>Arizani jo'natish</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Apply;
