import { useState, useRef } from 'react';
import axios from 'axios';
import { API_LINK } from '../cfg';
const ApplicationForm = ({ usernameId, applyCheck }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);
  
  // Markazlashgan tekstli state
  const [state, setState] = useState({
    studentFullName: "",
    birthDate: "",
    nationality: "O'zbekiston",
    permanentAddress: "",
    phoneNumber: "",
    emailAddress: "",
    passportSeria: "",
    passportNumber: "",
    jshshir: "",
    givenDate: "",
    expiresDate: "",
    givenBy: "",
    universityName: "",
    studyForm: "Kunduzgi",
    studyField: "",
    currentCourse: "",
    contractAmount: "",
    isDoingResearch: false,
    researchDetails: "",
    hasConferenceParticipation: false,
    hasPublications: false,
    usedPreviousGrants: false,
    previousGrantDetails: "",
    familyMembersCount: "",
    fatherFullName: "",
    fatherWorkPlace: "",
    fatherPosition: "",
    fatherBirthDate: "",
    motherFullName: "",
    motherWorkPlace: "",
    motherPosition: "",
    motherBirthDate: "",
    motivationLetter: "",
  });

  // Fayllar uchun state
  const [files, setFiles] = useState({
    cvFile: null,
    gpaFile: null,
    universityCertificate: null,
    passportFile: null
  });

  // Aka-uka (siblings) uchun state
  const [siblings, setSiblings] = useState([]);

  const addSibling = () => setSiblings([...siblings, { name: '', role: '', birth: '' }]);
  const removeSibling = (index) => setSiblings(siblings.filter((_, i) => i !== index));
  const handleSiblingChange = (index, field, value) => {
    const updated = [...siblings];
    updated[index][field] = value;
    setSiblings(updated);
  };

  // reportValidity orqali inputlarni tekshirish funksiyasi
  const validateCurrentStep = () => {
    if (!formRef.current) return false;
    
    // Faqat joriy step ichidagi inputlarni topamiz va tekshiramiz
    const stepContainer = formRef.current.querySelector(`#step-${currentStep}`);
    if (stepContainer) {
      const inputs = stepContainer.querySelectorAll('input[required], textarea[required], select[required]');
      for (let input of inputs) {
        if (!input.reportValidity()) {
          return false;
        }
      }
    }
    return true;
  };

  const nextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, 6));
    }
  };
  
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      e.target.setCustomValidity("Fayl hajmi 5MB dan oshmasligi kerak!");
      e.target.reportValidity();
      e.target.value = ""; 
      return;
    } else {
      e.target.setCustomValidity("");
    }
    setFiles({ ...files, [fieldName]: file });
  };

  // Ariza yuborish
  const postApplication = (e) => {
    if (e) e.preventDefault();
    
    if (!validateCurrentStep()) return;

    setLoading(true);
    const form = new FormData();

    form.append("usernameId", usernameId || "");

    const textFields = [
      "studentFullName", "birthDate", "nationality", "permanentAddress", "phoneNumber", "emailAddress",
      "universityName", "studyForm", "studyField", "currentCourse", "isDoingResearch", "researchDetails",
      "hasConferenceParticipation", "hasPublications", "usedPreviousGrants", "previousGrantDetails",
      "contractAmount", "familyMembersCount", "fatherFullName", "fatherWorkPlace", "fatherPosition",
      "fatherBirthDate", "motherFullName", "motherWorkPlace", "motherPosition", "motherBirthDate",
      "motivationLetter"
    ];

    textFields.forEach(field => {
      form.append(field, state[field]);
    });

    const passportObj = {
      passportSeria: state.passportSeria.toUpperCase(),
      passportNumber: state.passportNumber,
      jshshir: state.jshshir,
      givenDate: state.givenDate,
      expiresDate: state.expiresDate,
      givenBy: state.givenBy,
    };
    form.append("passportDetails", JSON.stringify(passportObj));
    form.append("siblings", JSON.stringify(siblings));

    form.append("cvFile", files.cvFile);
    form.append("gpaFile", files.gpaFile);
    form.append("universityCertificate", files.universityCertificate);
    form.append("passportFile", files.passportFile);

    axios
      .post(`${API_LINK}/apply/add`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-admin-token": `${localStorage.getItem("access_token")}`,
        },
      })
      .then((result) => {
        const { ok, msg } = result.data;
        if (!ok) {
          alert(msg);
        } else {
          alert(msg || "Ariza muvaffaqiyatli qabul qilindi!");
          setState({
            studentFullName: "", birthDate: "", nationality: "O'zbekiston", permanentAddress: "",
            phoneNumber: "", emailAddress: "", passportSeria: "", passportNumber: "", jshshir: "",
            givenDate: "", expiresDate: "", givenBy: "", universityName: "", studyForm: "Kunduzgi",
            studyField: "", currentCourse: "", contractAmount: "", isDoingResearch: false, researchDetails: "",
            hasConferenceParticipation: false, hasPublications: false, usedPreviousGrants: false, previousGrantDetails: "",
            familyMembersCount: "", fatherFullName: "", fatherWorkPlace: "", fatherPosition: "", fatherBirthDate: "",
            motherFullName: "", motherWorkPlace: "", motherPosition: "", motherBirthDate: "", motivationLetter: "",
          });
          applyCheck();
          setFiles({ cvFile: null, gpaFile: null, universityCertificate: null, passportFile: null });
          setSiblings([]);
          setCurrentStep(1);
        }
      })
      .catch((err) => {
        console.log(err);
        
        alert(err.response?.data?.msg || "Tizimda xatolik yuz berdi!");
      })
      .finally(() => setLoading(false));
  };

  const stepsHeader = ["1. Shaxsiy", "2. Pasport", "3. Ta'lim", "4. Oila", "5. Motivatsiya", "6. Hujjatlar"];

  return (
    <section id="apply" className="w-full min-h-[100vh] flex items-center justify-center px-4 py-8 bg-[#ebf4ff]">
      {/* Rasmga mos ravishda asosiy oq oyna (rounded-[20px] va shadow) */}
      <form ref={formRef} onSubmit={(e) => e.preventDefault()} className="w-full max-w-[850px] bg-white rounded-[20px] shadow-lg p-8 flex flex-col gap-6">
        
        {/* Top Navigatsiya bosqichlari */}
        <div className="w-full flex flex-col gap-2">
          <div className="flex justify-between items-center text-xs font-semibold text-gray-400 border-b pb-3">
            {stepsHeader.map((stepName, index) => (
              <span 
                key={index} 
                className={`pb-1 transition-all duration-200 ${currentStep === index + 1 ? "text-blue-600 font-bold border-b-2 border-blue-600" : ""}`}
              >
                {stepName}
              </span>
            ))}
          </div>
        </div>

        {/* Formaning ichki kontenti */}
        <div className="w-full min-h-[350px]">
          
          {/* STEP 1: SHAXSIY MA'LUMOTLAR */}
          {currentStep === 1 && (
            <div id="step-1" className="flex flex-col gap-4">
              <h3 className="text-xl font-bold text-blue-600 mb-2">1. Shaxsiy ma'lumotlar</h3>
              
              {/* Tizim foydalanuvchisi ID info */}
              

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-600">Talabaning F.I.SH (To'liq)*</label>
                  <input required type="text" className="w-full border border-gray-200 p-2.5 rounded-[8px] text-sm outline-none bg-gray-50/50 focus:bg-white focus:border-blue-500" value={state.studentFullName} onChange={(e) => setState({ ...state, studentFullName: e.target.value })} />
                </div>
                
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-600">Tug'ilgan sana*</label>
                  <input required type="date" className="w-full border border-gray-200 p-2.5 rounded-[8px] text-sm outline-none bg-gray-50/50 focus:bg-white focus:border-blue-500" value={state.birthDate} onChange={(e) => setState({ ...state, birthDate: e.target.value })} />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-600">Fuqaroligi*</label>
                  <input required type="text" className="w-full border border-gray-200 p-2.5 rounded-[8px] text-sm outline-none bg-gray-50/50 focus:bg-white focus:border-blue-500" value={state.nationality} onChange={(e) => setState({ ...state, nationality: e.target.value })} />
                </div>
                
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-600">Telefon raqam*</label>
                  <input required type="tel" placeholder="+998901234567" className="w-full border border-gray-200 p-2.5 rounded-[8px] text-sm outline-none bg-gray-50/50 focus:bg-white focus:border-blue-500" value={state.phoneNumber} onChange={(e) => setState({ ...state, phoneNumber: e.target.value })} />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-600">Email manzil*</label>
                <input required type="email" className="w-full md:w-1/2 border border-gray-200 p-2.5 rounded-[8px] text-sm outline-none bg-gray-50/50 focus:bg-white focus:border-blue-500" value={state.emailAddress} onChange={(e) => setState({ ...state, emailAddress: e.target.value })} />
              </div>
              
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-600">Doimiy yashash manzili*</label>
                <textarea required rows="2" className="w-full border border-gray-200 p-2.5 rounded-[8px] text-sm outline-none bg-gray-50/50 focus:bg-white focus:border-blue-500 resize-none" value={state.permanentAddress} onChange={(e) => setState({ ...state, permanentAddress: e.target.value })}></textarea>
              </div>
            </div>
          )}

          {/* STEP 2: PASPORT MA'LUMOTLARI */}
          {currentStep === 2 && (
            <div id="step-2" className="flex flex-col gap-4">
              <h3 className="text-xl font-bold text-blue-600 mb-2">2. Pasport / ID-karta ma'lumotlari</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-600">Pasport seriyasi (2 ta harf)*</label>
                  <input required type="text" maxLength="2" placeholder="AA" className="w-full border border-gray-200 p-2.5 rounded-[8px] text-sm outline-none uppercase bg-gray-50/50 focus:bg-white" value={state.passportSeria} onChange={(e) => setState({ ...state, passportSeria: e.target.value })} />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-600">Pasport raqami (7 ta raqam)*</label>
                  <input required type="text" maxLength="7" placeholder="1234567" className="w-full border border-gray-200 p-2.5 rounded-[8px] text-sm outline-none bg-gray-50/50 focus:bg-white" value={state.passportNumber} onChange={(e) => setState({ ...state, passportNumber: e.target.value })} />
                </div>

                <div className="flex flex-col gap-1 md:col-span-2">
                  <label className="text-xs font-semibold text-gray-600">JShShIR (PINFL - 14 ta raqam)*</label>
                  <input required type="text" maxLength="14" className="w-full border border-gray-200 p-2.5 rounded-[8px] text-sm outline-none bg-gray-50/50 focus:bg-white" value={state.jshshir} onChange={(e) => setState({ ...state, jshshir: e.target.value })} />
                </div>
                
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-600">Berilgan sana*</label>
                  <input required type="date" className="w-full border border-gray-200 p-2.5 rounded-[8px] text-sm outline-none bg-gray-50/50 focus:bg-white" value={state.givenDate} onChange={(e) => setState({ ...state, givenDate: e.target.value })} />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-600">Amal qilish muddati*</label>
                  <input required type="date" className="w-full border border-gray-200 p-2.5 rounded-[8px] text-sm outline-none bg-gray-50/50 focus:bg-white" value={state.expiresDate} onChange={(e) => setState({ ...state, expiresDate: e.target.value })} />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-600">Kim tomonidan berilgan*</label>
                <input required type="text" className="w-full border border-gray-200 p-2.5 rounded-[8px] text-sm outline-none bg-gray-50/50 focus:bg-white" value={state.givenBy} onChange={(e) => setState({ ...state, givenBy: e.target.value })} />
              </div>
            </div>
          )}

          {/* STEP 3: TA'LIM VA TADQIQOT */}
          {currentStep === 3 && (
            <div id="step-3" className="flex flex-col gap-4">
              <h3 className="text-xl font-bold text-blue-600 mb-2">3. Oliy ta'lim va Ilmiy faoliyat</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-600">Universitet nomi*</label>
                  <input required type="text" className="w-full border border-gray-200 p-2.5 rounded-[8px] text-sm outline-none bg-gray-50/50 focus:bg-white" value={state.universityName} onChange={(e) => setState({ ...state, universityName: e.target.value })} />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-600">Ta'lim shakli*</label>
                  <input required type="text" className="w-full border border-gray-200 p-2.5 rounded-[8px] text-sm outline-none bg-gray-50/50 focus:bg-white" value={state.studyForm} onChange={(e) => setState({ ...state, studyForm: e.target.value })} />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-600">Ta'lim yo'nalishi / Mutaxassislik*</label>
                  <input required type="text" className="w-full border border-gray-200 p-2.5 rounded-[8px] text-sm outline-none bg-gray-50/50 focus:bg-white" value={state.studyField} onChange={(e) => setState({ ...state, studyField: e.target.value })} />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-600">Hozirgi bosqich / Kurs*</label>
                  <input required type="text" placeholder="Masalan: 3-kurs" className="w-full border border-gray-200 p-2.5 rounded-[8px] text-sm outline-none bg-gray-50/50 focus:bg-white" value={state.currentCourse} onChange={(e) => setState({ ...state, currentCourse: e.target.value })} />
                </div>
              </div>

              <div className="flex flex-col gap-1 md:w-1/2">
                <label className="text-xs font-semibold text-gray-600">Yillik kontrakt miqdori (so'mda)*</label>
                <input required type="text" className="w-full border border-gray-200 p-2.5 rounded-[8px] text-sm outline-none bg-gray-50/50 focus:bg-white" value={state.contractAmount} onChange={(e) => setState({ ...state, contractAmount: e.target.value })} />
              </div>

              <div className="w-full space-y-3 border-t pt-4 mt-2 text-sm text-gray-700">
                <label className="flex items-center gap-2 cursor-pointer font-medium">
                  <input type="checkbox" checked={state.isDoingResearch} onChange={(e) => setState({ ...state, isDoingResearch: e.target.checked })} className="w-4 h-4 cursor-pointer" />
                  Ilmiy tadqiqot ishlari bilan shug'ullanasizmi?
                </label>
                <input type="text" placeholder="Agar shug'ullansangiz, mavzusini yozing" className="w-full border border-gray-200 p-2 rounded-[8px] text-sm outline-none bg-gray-50/50 focus:bg-white" value={state.researchDetails} onChange={(e) => setState({ ...state, researchDetails: e.target.value })} />

                <label className="flex items-center gap-2 cursor-pointer font-medium">
                  <input type="checkbox" checked={state.hasConferenceParticipation} onChange={(e) => setState({ ...state, hasConferenceParticipation: e.target.checked })} className="w-4 h-4 cursor-pointer" />
                  Konferensiyalarda ishtirok etganmisiz?
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-medium">
                  <input type="checkbox" checked={state.hasPublications} onChange={(e) => setState({ ...state, hasPublications: e.target.checked })} className="w-4 h-4 cursor-pointer" />
                  Ilmiy maqolalaringiz chop etilganmi?
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-medium">
                  <input type="checkbox" checked={state.usedPreviousGrants} onChange={(e) => setState({ ...state, usedPreviousGrants: e.target.checked })} className="w-4 h-4 cursor-pointer" />
                  Avval boshqa grantlardan foydalanganmisiz?
                </label>
                <input type="text" placeholder="Agar ha bo'lsa, grant tafsilotlarini yozing" className="w-full border border-gray-200 p-2 rounded-[8px] text-sm outline-none bg-gray-50/50 focus:bg-white" value={state.previousGrantDetails} onChange={(e) => setState({ ...state, previousGrantDetails: e.target.value })} />
              </div>
            </div>
          )}

          {/* STEP 4: OILA MA'LUMOTLARI */}
          {currentStep === 4 && (
            <div id="step-4" className="flex flex-col gap-4">
              <h3 className="text-xl font-bold text-blue-600 mb-2">4. Oila a'zolari haqida ma'lumot</h3>
              
              <div className="flex flex-col gap-1 md:w-1/2">
                <label className="text-xs font-semibold text-gray-600">Oila a'zolaringiz soni*</label>
                <input required type="number" className="w-full border border-gray-200 p-2.5 rounded-[8px] text-sm outline-none bg-gray-50/50 focus:bg-white" value={state.familyMembersCount} onChange={(e) => setState({ ...state, familyMembersCount: e.target.value })} />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div className="border border-gray-100 p-4 rounded-[12px] bg-gray-50/50 space-y-2">
                  <p className="text-xs font-bold text-gray-700 uppercase">Ota haqida ma'lumot:</p>
                  <input type="text" placeholder="F.I.SH" className="w-full border p-2 rounded-[6px] text-sm outline-none bg-white" value={state.fatherFullName} onChange={(e) => setState({ ...state, fatherFullName: e.target.value })} />
                  <input type="text" placeholder="Ish joyi" className="w-full border p-2 rounded-[6px] text-sm outline-none bg-white" value={state.fatherWorkPlace} onChange={(e) => setState({ ...state, fatherWorkPlace: e.target.value })} />
                  <input type="text" placeholder="Lavozimi" className="w-full border p-2 rounded-[6px] text-sm outline-none bg-white" value={state.fatherPosition} onChange={(e) => setState({ ...state, fatherPosition: e.target.value })} />
                  <input type="text" placeholder="Tug'ilgan yili" className="w-full border p-2 rounded-[6px] text-sm outline-none bg-white" value={state.fatherBirthDate} onChange={(e) => setState({ ...state, fatherBirthDate: e.target.value })} />
                </div>

                <div className="border border-gray-100 p-4 rounded-[12px] bg-gray-50/50 space-y-2">
                  <p className="text-xs font-bold text-gray-700 uppercase">Ona haqida ma'lumot:</p>
                  <input type="text" placeholder="F.I.SH" className="w-full border p-2 rounded-[6px] text-sm outline-none bg-white" value={state.motherFullName} onChange={(e) => setState({ ...state, motherFullName: e.target.value })} />
                  <input type="text" placeholder="Ish joyi" className="w-full border p-2 rounded-[6px] text-sm outline-none bg-white" value={state.motherWorkPlace} onChange={(e) => setState({ ...state, motherWorkPlace: e.target.value })} />
                  <input type="text" placeholder="Lavozimi" className="w-full border p-2 rounded-[6px] text-sm outline-none bg-white" value={state.motherPosition} onChange={(e) => setState({ ...state, motherPosition: e.target.value })} />
                  <input type="text" placeholder="Tug'ilgan yili" className="w-full border p-2 rounded-[6px] text-sm outline-none bg-white" value={state.motherBirthDate} onChange={(e) => setState({ ...state, motherBirthDate: e.target.value })} />
                </div>
              </div>

              {/* Dynamic Siblings */}
              <div className="w-full border-t pt-4 mt-2 space-y-3">
                <div className="flex justify-between items-center w-full">
                  <span className="text-sm font-bold text-gray-700">Aka-uka / opa-singillar:</span>
                  <button type="button" onClick={addSibling} className="bg-blue-600 text-white text-xs px-3 py-1.5 rounded-[6px] font-medium hover:bg-blue-700 transition">
                    + A'zo qo'shish
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {siblings.map((sibling, index) => (
                    <div key={index} className="p-3 border rounded-[10px] bg-slate-50 flex flex-col gap-2 relative">
                      <input required type="text" placeholder="Ismi*" value={sibling.name} onChange={(e) => handleSiblingChange(index, 'name', e.target.value)} className="w-full border p-2 rounded-[6px] text-sm outline-none bg-white" />
                      <div className="flex gap-2">
                        <input required type="text" placeholder="Kimligi (Aka/Opa)*" value={sibling.role} onChange={(e) => handleSiblingChange(index, 'role', e.target.value)} className="w-1/2 border p-2 rounded-[6px] text-sm outline-none bg-white" />
                        <input required type="text" placeholder="Tug'ilgan yili*" value={sibling.birth} onChange={(e) => handleSiblingChange(index, 'birth', e.target.value)} className="w-1/2 border p-2 rounded-[6px] text-sm outline-none bg-white" />
                      </div>
                      <button type="button" onClick={() => removeSibling(index)} className="text-xs text-red-600 text-right hover:underline font-semibold mt-1">O'chirish</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: MOTIVATSION XAT */}
          {currentStep === 5 && (
            <div id="step-5" className="flex flex-col gap-4">
              <h3 className="text-xl font-bold text-blue-600 mb-2">5. Motivatsion xat</h3>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-600">Nima uchun aynan siz ushbu grantga munosibsiz?*</label>
                <textarea required placeholder="Fikrlaringizni batafsil bayon qiling..." rows="10" className="w-full border border-gray-200 p-3 rounded-[10px] text-sm outline-none bg-gray-50/50 focus:bg-white focus:border-blue-500 font-sans leading-relaxed resize-none" value={state.motivationLetter} onChange={(e) => setState({ ...state, motivationLetter: e.target.value })}></textarea>
              </div>
            </div>
          )}

          {/* STEP 6: HUJJATLARNI YUKLASH */}
          {currentStep === 6 && (
            <div id="step-6" className="flex flex-col gap-4">
              <h3 className="text-xl font-bold text-blue-600 mb-2">6. Hujjatlarni yuklash</h3>
              <p className="text-xs text-amber-700 bg-amber-50 p-3 rounded-[8px] border border-amber-200 w-full">Fayllar formati PDF yoki rasm (JPG, PNG) bo'lishi hamda hajmi 5MB dan oshmasligi lozim.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-dashed border-gray-300 p-4 rounded-[10px] flex flex-col gap-2 bg-gray-50/30">
                  <span className="text-sm font-semibold text-gray-700">CV / Rezyume* {files.cvFile && "✅"}</span>
                  <input required type="file" accept=".pdf,image/*" onChange={(e) => handleFileChange(e, 'cvFile')} className="text-xs file:mr-3 file:py-1.5 file:px-3 file:rounded-[6px] file:border-0 file:bg-black file:text-white file:text-xs cursor-pointer" />
                </div>

                <div className="border border-dashed border-gray-300 p-4 rounded-[10px] flex flex-col gap-2 bg-gray-50/30">
                  <span className="text-sm font-semibold text-gray-700">GPA (Baholar tabeli)* {files.gpaFile && "✅"}</span>
                  <input required type="file" accept=".pdf,image/*" onChange={(e) => handleFileChange(e, 'gpaFile')} className="text-xs file:mr-3 file:py-1.5 file:px-3 file:rounded-[6px] file:border-0 file:bg-black file:text-white file:text-xs cursor-pointer" />
                </div>

                <div className="border border-dashed border-gray-300 p-4 rounded-[10px] flex flex-col gap-2 bg-gray-50/30">
                  <span className="text-sm font-semibold text-gray-700">Universitetdan ma'lumotnoma* {files.universityCertificate && "✅"}</span>
                  <input required type="file" accept=".pdf,image/*" onChange={(e) => handleFileChange(e, 'universityCertificate')} className="text-xs file:mr-3 file:py-1.5 file:px-3 file:rounded-[6px] file:border-0 file:bg-black file:text-white file:text-xs cursor-pointer" />
                </div>

                <div className="border border-dashed border-gray-300 p-4 rounded-[10px] flex flex-col gap-2 bg-gray-50/30">
                  <span className="text-sm font-semibold text-gray-700">Pasport / ID karta nusxasi* {files.passportFile && "✅"}</span>
                  <input required type="file" accept=".pdf,image/*" onChange={(e) => handleFileChange(e, 'passportFile')} className="text-xs file:mr-3 file:py-1.5 file:px-3 file:rounded-[6px] file:border-0 file:bg-black file:text-white file:text-xs cursor-pointer" />
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Navigatsiya tugmalari (Pastki o'ng va chap tomon dizayni) */}
        <div className="flex items-center justify-between border-t pt-4 mt-2">
          <button 
            type="button" 
            onClick={prevStep} 
            disabled={currentStep === 1 || loading}
            className="text-gray-400 font-medium text-sm px-5 py-2 rounded-[8px] hover:bg-gray-100 hover:text-gray-700 transition disabled:opacity-20 cursor-pointer"
          >
            ← Orqaga
          </button>

          {currentStep < 6 ? (
            <button 
              type="button" 
              onClick={nextStep}
              disabled={loading}
              className="bg-blue-600 text-white text-sm font-bold px-6 py-2.5 rounded-[8px] shadow-md hover:bg-blue-700 transition cursor-pointer"
            >
              Keyingisi →
            </button>
          ) : (
            <button 
              type="button"
              onClick={postApplication}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-8 py-2.5 rounded-[8px] shadow-md transition disabled:opacity-50 cursor-pointer"
            >
              {loading ? 'Yuborilmoqda...' : 'Yuborish 🚀'}
            </button>
          )}
        </div>

      </form>
    </section>
  );
};

export default ApplicationForm;