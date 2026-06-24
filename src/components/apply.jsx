import { useState } from "react";
import {
  Upload,
  Plus,
  Trash2,
  User,
  FileText,
  BookOpen,
  Briefcase,
  ChevronRight,
  ChevronLeft,
  Users,
  MessageSquare,
} from "lucide-react";

const Apply = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    studentFullName: "",
    birthDate: "",
    nationality: "",
    permanentAddress: "",
    phoneNumber: "",
    emailAddress: "",
    universityName: "",
    studyForm: "Kunduzgi",
    studyField: "",
    currentCourse: 1,
    isDoingResearch: false,
    researchDetails: "",
    hasConferenceParticipation: false,
    hasPublications: false,
    usedPreviousGrants: false,
    previousGrantDetails: "",
    contractAmount: 0,
    familyMembersCount: 0,
    fatherFullName: "",
    fatherWorkPlace: "",
    fatherPosition: "",
    fatherBirthDate: "",
    motherFullName: "",
    motherWorkPlace: "",
    motherPosition: "",
    motherBirthDate: "",
    siblings: [],
    motivationFuturePlans: "",
    motivationEducationImpact: "",
    motivationFondAssistance: "",
    motivationIsDeserving: "",
    cvFile: null,
    gpaFile: null,
    universityCertificate: null,
  });

  const updateField = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const addSibling = () => {
    setFormData((prev) => ({
      ...prev,
      siblings: [
        ...prev.siblings,
        {
          fullName: "",
          birthDate: "",
          studyOrWorkPlace: "",
          positionOrCourse: "",
          studyForm: "",
          contractType: "",
        },
      ],
    }));
  };

  const removeSibling = (index) => {
    setFormData((prev) => ({
      ...prev,
      siblings: prev.siblings.filter((_, i) => i !== index),
    }));
  };

  const updateSibling = (index, field, value) => {
    const newSiblings = [...formData.siblings];
    newSiblings[index][field] = value;
    setFormData((prev) => ({ ...prev, siblings: newSiblings }));
  };

  const handleFileChange = (field, file) => {
    setFormData((prev) => ({ ...prev, [field]: file }));
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 6));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <section id="apply" className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div 
        data-aos="fade-up"
        data-aos-duration="500"
        className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200"
      >
        <div className="p-6 border-b bg-slate-50">
          <h1 className="text-2xl font-bold text-blue-900">Grant Arizasi</h1>
          <p className="text-slate-500 text-sm mt-1">Qadam {step} / 6</p>
        </div>

        {/* key={step} qo'shildi: qadam o'zgarganda AOS animatsiyasi qayta ishga tushadi */}
        <div key={step} data-aos="fade-in" data-aos-duration="300" className="p-6">
          {/* Step 1: Shaxsiy */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="flex items-center gap-2 font-semibold text-blue-800">
                <User size={20} /> 1. Shaxsiy ma'lumotlar
              </h2>
              <input
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Ism sharifingiz"
                onChange={(e) => updateField("studentFullName", e.target.value)}
              />
              <input
                type="date"
                className="w-full p-3 border rounded-lg"
                onChange={(e) => updateField("birthDate", e.target.value)}
              />
              <input
                className="w-full p-3 border rounded-lg"
                placeholder="Millati"
                onChange={(e) => updateField("nationality", e.target.value)}
              />
              <textarea
                className="w-full p-3 border rounded-lg"
                placeholder="Doimiy manzil"
                onChange={(e) =>
                  updateField("permanentAddress", e.target.value)
                }
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  className="p-3 border rounded-lg"
                  placeholder="Telefon raqam"
                  onChange={(e) => updateField("phoneNumber", e.target.value)}
                />
                <input
                  className="p-3 border rounded-lg"
                  placeholder="Email"
                  type="email"
                  onChange={(e) => updateField("emailAddress", e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Step 2: Ta'lim */}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="flex items-center gap-2 font-semibold text-blue-800">
                <BookOpen size={20} /> 2. Ta'lim haqida
              </h2>
              <input
                className="w-full p-3 border rounded-lg"
                placeholder="Universitet nomi"
                onChange={(e) => updateField("universityName", e.target.value)}
              />
              <select
                className="w-full p-3 border rounded-lg"
                onChange={(e) => updateField("studyForm", e.target.value)}
              >
                <option value="Kunduzgi">Kunduzgi</option>
                <option value="Sirtqi">Sirtqi</option>
              </select>
              <input
                className="w-full p-3 border rounded-lg"
                placeholder="Ta'lim yo'nalishi"
                onChange={(e) => updateField("studyField", e.target.value)}
              />
              <input
                type="number"
                min="1"
                max="6"
                className="w-full p-3 border rounded-lg"
                placeholder="Kurs"
                onChange={(e) => updateField("currentCourse", e.target.value)}
              />
              <div className="flex gap-4 items-center">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      updateField("isDoingResearch", e.target.checked)
                    }
                  />{" "}
                  Ilmiy izlanish bormi?
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      updateField("hasPublications", e.target.checked)
                    }
                  />{" "}
                  Nashrlar bormi?
                </label>
              </div>
            </div>
          )}

          {/* Step 3: Moliya */}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="flex items-center gap-2 font-semibold text-blue-800">
                <Briefcase size={20} /> 3. Moliya va grant
              </h2>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  onChange={(e) =>
                    updateField("usedPreviousGrants", e.target.checked)
                  }
                />{" "}
                Avval grant yutganmisiz?
              </label>
              <textarea
                className="w-full p-3 border rounded-lg"
                placeholder="Oldingi grant haqida qisqacha"
                onChange={(e) =>
                  updateField("previousGrantDetails", e.target.value)
                }
              />
              <input
                type="number"
                className="w-full p-3 border rounded-lg"
                placeholder="Kontrakt summasi"
                onChange={(e) => updateField("contractAmount", e.target.value)}
              />
            </div>
          )}

          {/* Step 4: Oila */}
          {step === 4 && (
            <div className="space-y-6">
              <h2 className="flex items-center gap-2 font-semibold text-blue-800">
                <Users size={20} /> 4. Oila ma'lumotlari
              </h2>
              <input
                type="number"
                className="w-full p-3 border rounded-lg"
                placeholder="Oila a'zolari soni"
                onChange={(e) =>
                  updateField("familyMembersCount", e.target.value)
                }
              />

              <div className="grid md:grid-cols-2 gap-4 border-t pt-4">
                <div className="space-y-2">
                  <h3 className="font-medium text-sm text-slate-500">Ota</h3>
                  <input
                    className="w-full p-2 border rounded"
                    placeholder="Ism sharif"
                    onChange={(e) =>
                      updateField("fatherFullName", e.target.value)
                    }
                  />
                  <input
                    className="w-full p-2 border rounded"
                    placeholder="Ish joyi"
                    onChange={(e) =>
                      updateField("fatherWorkPlace", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium text-sm text-slate-500">Ona</h3>
                  <input
                    className="w-full p-2 border rounded"
                    placeholder="Ism sharif"
                    onChange={(e) =>
                      updateField("motherFullName", e.target.value)
                    }
                  />
                  <input
                    className="w-full p-2 border rounded"
                    placeholder="Ish joyi"
                    onChange={(e) =>
                      updateField("motherWorkPlace", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium text-slate-700">
                    Aka-uka / Opa-singillar
                  </h3>
                  <button
                    onClick={addSibling}
                    className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
                  >
                    <Plus size={16} /> Qo'shish
                  </button>
                </div>
                {formData.siblings.map((s, i) => (
                  <div
                    key={i}
                    className="p-4 border rounded-xl bg-slate-50 mb-4 relative shadow-sm animate-fadeIn"
                  >
                    <button
                      onClick={() => removeSibling(i)}
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input
                        className="p-2 border rounded"
                        placeholder="Ism"
                        onChange={(e) =>
                          updateSibling(i, "fullName", e.target.value)
                        }
                      />
                      <input
                        type="date"
                        className="p-2 border rounded"
                        onChange={(e) =>
                          updateSibling(i, "birthDate", e.target.value)
                        }
                      />
                      <input
                        className="p-2 border rounded"
                        placeholder="O'qish/Ish joyi"
                        onChange={(e) =>
                          updateSibling(i, "studyOrWorkPlace", e.target.value)
                        }
                      />
                      <input
                        className="p-2 border rounded"
                        placeholder="Lavozim/Kurs"
                        onChange={(e) =>
                          updateSibling(i, "positionOrCourse", e.target.value)
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Motivatsiya */}
          {step === 5 && (
            <div className="space-y-4">
              <h2 className="flex items-center gap-2 font-semibold text-blue-800">
                <MessageSquare size={20} /> 5. Motivatsion qism
              </h2>
              <textarea
                className="w-full p-3 border rounded-lg h-44 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="• Sizning yaqin kelajak uchun belgilagan rejalaringiz&#10;• Sizning oliy ma’lumotli bo‘lishingiz sizga, oilangizga va jamiyatga qanday yordam ko‘rsatadi?&#10;• Bizning fond sizning maqsadlaringizga qanday yordam ko‘rsatadi?&#10;• O‘zingizni haqiqatdan munosibman deb o‘ylaysizmi?&#10;• Nima uchun aynan siz stipendiya g'olibi bo‘lishingiz kerak?"
              />
            </div>
          )}

          {/* Step 6: Fayllar */}
          {step === 6 && (
            <div className="space-y-6">
              <h2 className="flex items-center gap-2 font-semibold text-blue-800">
                <FileText size={20} /> 6. Hujjatlarni yuklash
              </h2>
              {[
                { label: "CV / Rezume", key: "cvFile" },
                { label: "GPA / Transkript", key: "gpaFile" },
                {
                  label: "O'qishdan ma'lumotnoma",
                  key: "universityCertificate",
                },
              ].map((item) => (
                <div
                  key={item.key}
                  className="border-2 border-dashed border-slate-300 p-6 rounded-xl text-center hover:bg-slate-50 transition"
                >
                  <Upload className="mx-auto text-blue-400 mb-2" size={32} />
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {item.label}
                  </label>
                  <input
                    type="file"
                    className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    onChange={(e) =>
                      handleFileChange(item.key, e.target.files[0])
                    }
                  />
                </div>
              ))}
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            {step > 1 && (
              <button
                onClick={prevStep}
                className="flex items-center gap-2 bg-slate-100 px-6 py-2 rounded-lg hover:bg-slate-200 transition cursor-pointer"
              >
                <ChevronLeft size={18} /> Orqaga
              </button>
            )}
            <button
              onClick={
                step === 6 ? () => alert("Arizangiz yuborildi!") : nextStep
              }
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg ml-auto hover:bg-blue-700 transition cursor-pointer"
            >
              {step === 6 ? (
                "Yuborish"
              ) : (
                <>
                  Keyingi <ChevronRight size={18} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Apply;