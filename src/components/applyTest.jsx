import React, { useState } from 'react';

const ApplicationForm = () => {
  const API_URL = 'http://localhost:5000/api/applications';
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Sibling (Aka-uka) ma'lumotlari uchun dynamic state
  const [siblings, setSiblings] = useState([]);

  // Aka-uka qo'shish funksiyasi
  const addSibling = () => {
    setSiblings([...siblings, { name: '', role: '', birth: '' }]);
  };

  // Aka-uka ma'lumotini o'chirish
  const removeSibling = (index) => {
    const updated = siblings.filter((_, i) => i !== index);
    setSiblings(updated);
  };

  // Input o'zgarganda dynamic yangilash
  const handleSiblingChange = (index, field, value) => {
    const updated = [...siblings];
    updated[index][field] = value;
    setSiblings(updated);
  };

  // Keyingi qadamga o'tish (Validatsiya bilan)
  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 6));
  // Orqaga qaytish
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  // Formani yuborish
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);

    // Dynamic aka-ukalar massivini FormData ichiga JSON formatida tiqamiz
    formData.append('siblings', JSON.stringify(siblings));

    try {
      const response = await fetch(`${API_URL}/create`, {
        method: 'POST',
        body: formData, // Fayllar va boshqa ma'lumotlar ketadi
      });

      const result = await response.json();

      if (response.ok) {
        alert('Arizangiz muvaffaqiyatli topshirildi va barcha ma’lumotlar saqlandi! 🎉');
        e.target.reset();
        setSiblings([]);
        setCurrentStep(1);
      } else {
        alert(`Xatolik: ${result.message || 'Xato yuz berdi'}`);
      }
    } catch (error) {
      console.error(error);
      alert('Serverga ulanishda xatolik! Localhost ishlayotganini tekshiring.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="apply" className="min-h-screen text-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-4 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-slate-900/90 backdrop-blur-md rounded-3xl p-6 md:p-10 border border-slate-800 shadow-2xl">
        
        {/* Progress Bar (Qadamlar chizig'i) */}
        <div className="mb-10">
          <div className="flex justify-between items-center text-xs md:text-sm font-medium text-slate-400 mb-4">
            <span className={currentStep === 1 ? 'text-cyan-400 font-bold' : ''}>1. Shaxsiy</span>
            <span className={currentStep === 2 ? 'text-cyan-400 font-bold' : ''}>2. Pasport</span>
            <span className={currentStep === 3 ? 'text-cyan-400 font-bold' : ''}>3. Ta'lim</span>
            <span className={currentStep === 4 ? 'text-cyan-400 font-bold' : ''}>4. Oila</span>
            <span className={currentStep === 5 ? 'text-cyan-400 font-bold' : ''}>5. Motivatsiya</span>
            <span className={currentStep === 6 ? 'text-cyan-400 font-bold' : ''}>6. Hujjatlar</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-cyan-500 h-full transition-all duration-300"
              style={{ width: `${(currentStep / 6) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Asosiy Forma */}
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-8">
          
          {/* STEP 1: SHAXSIY MA'LUMOTLAR */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <h3 className="text-xl font-bold text-cyan-400 border-b border-slate-800 pb-2">1. Shaxsiy ma'lumotlar</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">Username ID (Identifikator)*</label>
                  <input type="text" name="usernameId" required className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 focus:border-cyan-500 text-white outline-none" placeholder="Masalan: user123" />
                </div>
                <div>
                  <label className="block text-sm mb-1">Talabaning F.I.SH (To'liq)*</label>
                  <input type="text" name="studentFullName" required className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 focus:border-cyan-500 text-white outline-none" />
                </div>
                <div>
                  <label className="block text-sm mb-1">Tug'ilgan sana*</label>
                  <input type="date" name="birthDate" required className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 focus:border-cyan-500 text-white outline-none" />
                </div>
                <div>
                  <label className="block text-sm mb-1">Fuqaroligi*</label>
                  <input type="text" name="nationality" defaultValue="O'zbekiston" required className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 focus:border-cyan-500 text-white outline-none" />
                </div>
                <div>
                  <label className="block text-sm mb-1">Telefon raqam*</label>
                  <input type="tel" name="phoneNumber" placeholder="+998901234567" required className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 focus:border-cyan-500 text-white outline-none" />
                </div>
                <div>
                  <label className="block text-sm mb-1">Email manzil*</label>
                  <input type="email" name="emailAddress" required className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 focus:border-cyan-500 text-white outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm mb-1">Doimiy yashash manzili*</label>
                <textarea name="permanentAddress" required rows="2" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 focus:border-cyan-500 text-white outline-none resize-none"></textarea>
              </div>
            </div>
          )}

          {/* STEP 2: PASPORT MA'LUMOTLARI */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-cyan-400 border-b border-slate-800 pb-2">2. Pasport / ID-karta ma'lumotlari</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm mb-1">Pasport Seriyasi (2 ta harf)*</label>
                  <input type="text" name="passportDetails[passportSeria]" maxLength="2" placeholder="AA" required className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 focus:border-cyan-500 text-white outline-none uppercase" />
                </div>
                <div>
                  <label className="block text-sm mb-1">Pasport Raqami (7 ta raqam)*</label>
                  <input type="text" name="passportDetails[passportNumber]" maxLength="7" placeholder="1234567" required className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 focus:border-cyan-500 text-white outline-none" />
                </div>
                <div>
                  <label className="block text-sm mb-1">JShShIR (PINFL - 14 ta raqam)*</label>
                  <input type="text" name="passportDetails[jshshir]" maxLength="14" required className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 focus:border-cyan-500 text-white outline-none" />
                </div>
                <div>
                  <label className="block text-sm mb-1">Berilgan sana*</label>
                  <input type="date" name="passportDetails[givenDate]" required className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 focus:border-cyan-500 text-white outline-none" />
                </div>
                <div>
                  <label className="block text-sm mb-1">Amal qilish muddati*</label>
                  <input type="date" name="passportDetails[expiresDate]" required className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 focus:border-cyan-500 text-white outline-none" />
                </div>
                <div>
                  <label className="block text-sm mb-1">Kim tomonidan berilgan*</label>
                  <input type="text" name="passportDetails[givenBy]" placeholder="XTB yoki IIB" required className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 focus:border-cyan-500 text-white outline-none" />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: TA'LIM VA TADQIQOT */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-cyan-400 border-b border-slate-800 pb-2">3. Oliy ta'lim va Ilmiy faoliyat</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">Universitet nomi*</label>
                  <input type="text" name="universityName" required className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 focus:border-cyan-500 text-white outline-none" />
                </div>
                <div>
                  <label className="block text-sm mb-1">Ta'lim shakli (Kunduzgi/Sirtqi/...)*</label>
                  <input type="text" name="studyForm" placeholder="Masalan: Kunduzgi" required className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 focus:border-cyan-500 text-white outline-none" />
                </div>
                <div>
                  <label className="block text-sm mb-1">Ta'lim yo'nalishi / Mutaxassislik*</label>
                  <input type="text" name="studyField" required className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 focus:border-cyan-500 text-white outline-none" />
                </div>
                <div>
                  <label className="block text-sm mb-1">Hozirgi bosqich / Kurs*</label>
                  <input type="text" name="currentCourse" placeholder="3-kurs" required className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 focus:border-cyan-500 text-white outline-none" />
                </div>
                <div>
                  <label className="block text-sm mb-1">Yillik kontrakt miqdori (so'mda)*</label>
                  <input type="text" name="contractAmount" placeholder="12 000 000" required className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 focus:border-cyan-500 text-white outline-none" />
                </div>
              </div>

              {/* Ilmiy faoliyat checkboxlari */}
              <div className="space-y-3 bg-slate-850 p-4 rounded-xl border border-slate-800">
                <div className="flex items-center gap-2">
                  <input type="checkbox" name="isDoingResearch" id="research" className="w-4 h-4 text-cyan-500 bg-slate-800 border-slate-700 rounded focus:ring-cyan-500" />
                  <label htmlFor="research" className="text-sm">Ilmiy tadqiqot ishlari bilan shug'ullanasizmi?</label>
                </div>
                <div>
                  <input type="text" name="researchDetails" placeholder="Agar ha bo'lsa, mavzusini yozing" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white outline-none focus:border-cyan-500" />
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" name="hasConferenceParticipation" id="conf" className="w-4 h-4 text-cyan-500 bg-slate-800 border-slate-700 rounded focus:ring-cyan-500" />
                  <label htmlFor="conf" className="text-sm">Konferensiyalarda ishtirok etganmisiz?</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" name="hasPublications" id="pub" className="w-4 h-4 text-cyan-500 bg-slate-800 border-slate-700 rounded focus:ring-cyan-500" />
                  <label htmlFor="pub" className="text-sm">Ilmiy maqolalaringiz chop etilganmi?</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" name="usedPreviousGrants" id="grant" className="w-4 h-4 text-cyan-500 bg-slate-800 border-slate-700 rounded focus:ring-cyan-500" />
                  <label htmlFor="grant" className="text-sm">Avval boshqa grantlardan foydalanganmisiz?</label>
                </div>
                <div>
                  <input type="text" name="previousGrantDetails" placeholder="Agar ha bo'lsa, grant tafsilotlari" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white outline-none focus:border-cyan-500" />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: OILA MA'LUMOTLARI */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-cyan-400 border-b border-slate-800 pb-2">4. Oila a'zolari haqida ma'lumot</h3>
              <div className="w-full md:w-1/3">
                <label className="block text-sm mb-1">Oila a'zolaringiz soni*</label>
                <input type="number" name="familyMembersCount" required className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 focus:border-cyan-500 text-white outline-none" />
              </div>

              {/* Ota-ona ma'lumotlari */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="space-y-3 p-4 bg-slate-800/40 border border-slate-800 rounded-2xl">
                  <h4 className="text-sm font-semibold text-indigo-400">Otangiz haqida (ixtiyoriy)</h4>
                  <input type="text" name="fatherFullName" placeholder="F.I.SH" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white outline-none" />
                  <input type="text" name="fatherWorkPlace" placeholder="Ish joyi" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white outline-none" />
                  <input type="text" name="fatherPosition" placeholder="Lavozimi" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white outline-none" />
                  <input type="text" name="fatherBirthDate" placeholder="Tug'ilgan yili" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white outline-none" />
                </div>
                <div className="space-y-3 p-4 bg-slate-800/40 border border-slate-800 rounded-2xl">
                  <h4 className="text-sm font-semibold text-indigo-400">Onangiz haqida (ixtiyoriy)</h4>
                  <input type="text" name="motherFullName" placeholder="F.I.SH" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white outline-none" />
                  <input type="text" name="motherWorkPlace" placeholder="Ish joyi" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white outline-none" />
                  <input type="text" name="motherPosition" placeholder="Lavozimi" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white outline-none" />
                  <input type="text" name="motherBirthDate" placeholder="Tug'ilgan yili" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white outline-none" />
                </div>
              </div>

              {/* SIBLINGS (Aka-uka / Opa-singillar) - DYNAMIC */}
              <div className="space-y-4 border-t border-slate-800 pt-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-md font-semibold text-cyan-400">Aka-uka va opa-singillaringiz</h4>
                  <button type="button" onClick={addSibling} className="bg-cyan-600 hover:bg-cyan-700 text-white text-xs px-3 py-1.5 rounded-lg font-medium cursor-pointer">
                    + A'zo qo'shish
                  </button>
                </div>

                {siblings.map((sibling, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-3 p-3 bg-slate-800/20 border border-slate-800 rounded-xl items-end animate-fadeIn">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Ismi*</label>
                      <input type="text" required value={sibling.name} onChange={(e) => handleSiblingChange(index, 'name', e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Kimligi (Aka/Uka/Opa/Singil)*</label>
                      <input type="text" required value={sibling.role} onChange={(e) => handleSiblingChange(index, 'role', e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white outline-none" placeholder="Masalan: Aka" />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Tug'ilgan yili*</label>
                      <input type="text" required value={sibling.birth} onChange={(e) => handleSiblingChange(index, 'birth', e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white outline-none" placeholder="2005" />
                    </div>
                    <button type="button" onClick={() => removeSibling(index)} className="bg-red-900/40 text-red-400 border border-red-900 hover:bg-red-900/60 text-xs py-1.5 rounded-lg font-medium cursor-pointer">
                      O'chirish
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 5: MOTIVATSION XAT */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-cyan-400 border-b border-slate-800 pb-2">5. Motivatsion xat</h3>
              <div>
                <label className="block text-sm mb-2 text-slate-300">Nima uchun aynan siz ushbu grantga munosibsiz? (Batafsil bayon qiling)*</label>
                <textarea name="motivationLetter" required rows="10" className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-4 focus:border-cyan-500 text-white outline-none resize-none font-sans text-sm leading-relaxed" placeholder="Motivatsion xatingizni shu yerga yozing..."></textarea>
              </div>
            </div>
          )}

          {/* STEP 6: HUJJATLARNI YUKLASH */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-cyan-400 border-b border-slate-800 pb-2">6. Zaruriy fayllarni yuklash</h3>
              <p className="text-xs text-yellow-400 mb-4">Eslatma: Fayllar formati PDF yoki rasm bo'lishi, hajmi 5MB dan oshmasligi lozim.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-slate-800/40 border border-slate-800 rounded-xl">
                  <label className="block text-sm font-medium mb-2">CV / Rezyume*</label>
                  <input type="file" name="cvFile" required className="w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 cursor-pointer" />
                </div>
                <div className="p-4 bg-slate-800/40 border border-slate-800 rounded-xl">
                  <label className="block text-sm font-medium mb-2">GPA (Baholar tabeli / Transkript)*</label>
                  <input type="file" name="gpaFile" required className="w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 cursor-pointer" />
                </div>
                <div className="p-4 bg-slate-800/40 border border-slate-800 rounded-xl">
                  <label className="block text-sm font-medium mb-2">Universitetdan ma'lumotnoma (Certificate)*</label>
                  <input type="file" name="universityCertificate" required className="w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 cursor-pointer" />
                </div>
                <div className="p-4 bg-slate-800/40 border border-slate-800 rounded-xl">
                  <label className="block text-sm font-medium mb-2">Pasport / ID nusxasi (Fayl)*</label>
                  <input type="file" name="passportFile" required className="w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 cursor-pointer" />
                </div>
              </div>
            </div>
          )}

          {/* Navigatsiya tugmalari */}
          <div className="flex justify-between items-center border-t border-slate-800 pt-6">
            <button 
              type="button" 
              onClick={prevStep} 
              disabled={currentStep === 1 || loading}
              className="px-6 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-30 cursor-pointer text-sm font-medium transition"
            >
              ← Orqaga
            </button>

            {currentStep < 6 ? (
              <button 
                type="button" 
                onClick={nextStep}
                className="px-6 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white font-medium cursor-pointer text-sm transition"
              >
                Keyingisi →
              </button>
            ) : (
              <button 
                type="submit" 
                disabled={loading}
                className="px-8 py-2.5 rounded-xl bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold cursor-pointer text-sm transition disabled:opacity-50"
              >
                {loading ? 'Yuborilmoqda... ⏳' : 'Arizani yakuniy yuborish 🚀'}
              </button>
            )}
          </div>

        </form>
      </div>
    </section>
  );
};

export default ApplicationForm;