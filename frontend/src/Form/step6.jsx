function StepSix({ state, setState, setFiles, files }) {
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

  return (
    <div id="step-6" className="flex flex-col gap-6">
      <h3 className="text-xl font-bold text-blue-600 mb-2">
        6. Hujjatlarni yuklash
      </h3>

      {/* --- 1-QISM: MOTIVATSION XAT --- */}
      <div className="flex flex-col gap-3 pb-6 border-b border-gray-100">
        <h4 className="text-md font-bold text-gray-800"> Motivatsion xat yuklash</h4>
        
        <p className="text-xs text-blue-700 bg-blue-50 p-3 rounded-lg border border-blue-200 w-full">
          Motivatsion xatni <strong>Microsoft Word (.docx)</strong> formatida yuklang. 
          Fayl hajmi 5MB dan oshmasligi lozim.
        </p>

        <div className="border border-dashed border-blue-300 p-4 rounded-[10px] flex flex-col gap-2 bg-blue-50/10 max-w-md">
          <span className="text-sm font-semibold text-gray-700">
            Motivatsion xat* {files.motivationLetter && "✅"}
          </span>
          <input
            required
            type="file"
            accept=".docx"
            onChange={(e) => handleFileChange(e, "motivationLetter")}
            className="text-xs file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-blue-600 file:text-white file:text-xs cursor-pointer"
          />
        </div>
      </div>

      {/* --- 2-QISM: MAJBURIY HUJJATLAR --- */}
      <div className="flex flex-col gap-3">
        <h4 className="text-md font-bold text-gray-800">Qolgan majburiy hujjatlar</h4>

        <p className="text-xs text-amber-700 bg-amber-50 p-3 rounded-lg border border-amber-200 w-full">
          Quyidagi hujjatlar formati <strong>faqat PDF</strong> bo'lishi hamda har birining hajmi 5MB dan oshmasligi lozim.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* CV / Rezyume */}
          <div className="border border-dashed border-gray-300 p-4 rounded-[10px] flex flex-col gap-2 bg-gray-50/30">
            <span className="text-sm font-semibold text-gray-700">
              CV / Rezyume* {files.cvFile && "✅"}
            </span>
            <input
              required
              type="file"
              accept=".pdf"
              onChange={(e) => handleFileChange(e, "cvFile")}
              className="text-xs file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-black file:text-white file:text-xs cursor-pointer"
            />
          </div>

          {/* GPA */}
          <div className="border border-dashed border-gray-300 p-4 rounded-[10px] flex flex-col gap-2 bg-gray-50/30">
            <span className="text-sm font-semibold text-gray-700">
              GPA (Baholar tabeli)* {files.gpaFile && "✅"}
            </span>
            <input
              required
              type="file"
              accept=".pdf"
              onChange={(e) => handleFileChange(e, "gpaFile")}
              className="text-xs file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-black file:text-white file:text-xs cursor-pointer"
            />
          </div>

          {/* Universitetdan ma'lumotnoma */}
          <div className="border border-dashed border-gray-300 p-4 rounded-[10px] flex flex-col gap-2 bg-gray-50/30">
            <span className="text-sm font-semibold text-gray-700">
              Universitetdan ma'lumotnoma* {files.universityCertificate && "✅"}
            </span>
            <input
              required
              type="file"
              accept=".pdf"
              onChange={(e) => handleFileChange(e, "universityCertificate")}
              className="text-xs file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-black file:text-white file:text-xs cursor-pointer"
            />
          </div>

          {/* Pasport / ID */}
          <div className="border border-dashed border-gray-300 p-4 rounded-[10px] flex flex-col gap-2 bg-gray-50/30">
            <span className="text-sm font-semibold text-gray-700">
              Pasport / ID karta nusxasi* {files.passportFile && "✅"}
            </span>
            <input
              required
              type="file"
              accept=".pdf"
              onChange={(e) => handleFileChange(e, "passportFile")}
              className="text-xs file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-black file:text-white file:text-xs cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* --- 3-QISM: IMTIYOZLAR (IXTIYORIY) --- */}
      <div className="w-full border-t pt-4 mt-2 space-y-3">
        <label className="flex items-center gap-2 cursor-pointer font-semibold text-sm text-gray-700">
          <input
            type="checkbox"
            checked={state.hasPrivilege}
            onChange={(e) =>
              setState({ ...state, hasPrivilege: e.target.checked })
            }
            className="w-4 h-4 cursor-pointer"
          />
          Sizda biror bir imtiyoz mavjudmi? (Ijtimoiy daftarlar, chin
          yetimlik, nogironlik va h.k.)
        </label>

        {state.hasPrivilege && (
          <div
            data-aos="fade-down"
            data-aos-duration="300"
            className="border border-dashed border-blue-300 p-4 rounded-[10px] flex flex-col gap-2 bg-blue-50/20 max-w-md"
          >
            <span className="text-sm font-semibold text-blue-700">
              Imtiyozni tasdiqlovchi hujjat* {files.privilegeFile && "✅"}
            </span>
            <input
              required
              type="file"
              accept=".pdf"
              onChange={(e) => handleFileChange(e, "privilegeFile")}
              className="text-xs file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-black file:text-white file:text-xs cursor-pointer"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default StepSix;