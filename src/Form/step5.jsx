function StepFive({ setFiles, files }) {
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
    <div id="step-5" className="flex flex-col gap-4">
      <div className="flex justify-between items-end mb-2">
        <h3 className="text-xl font-bold text-blue-600">5. Motivatsion xat</h3>
      </div>

      <p className="text-xs text-amber-700 bg-amber-50 p-3 rounded-lg border border-amber-200 w-full">
        Motivatsion xatni Microsoft Word .docx formatida yuklang. 
        Fayl hajmi 5MB dan oshmasligi lozim.
      </p>

      <div className="border border-dashed border-gray-300 p-4 rounded-[10px] flex flex-col gap-2 bg-gray-50/30 max-w-md">
        <span className="text-sm font-semibold text-gray-700">
          Motivatsion xat fayli* {files?.motivationLetter && "✅"}
        </span>
        <input
          required
          type="file"
          accept=".docx"
          onChange={(e) => handleFileChange(e, "motivationLetter")}
          className="text-xs file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-black file:text-white file:text-xs cursor-pointer"
        />
      </div>
    </div>
  );
}

export default StepFive;