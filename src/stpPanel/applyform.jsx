import { FaFilePdf, FaTrash, FaUpload } from "react-icons/fa";

function ApplyForm({
  period,
  handleSubmit,
  markings = [],
  selectedFiles = {},
  handleRemoveFile,
  errors = {},
  submitLoading,
  handleFileChange
}) {    

  // Barcha mezonlar bo'yicha fayl tanlanganligini tekshirish
  const isAllFilesUploaded =
    markings.length > 0 &&
    markings.every((marking) => Boolean(selectedFiles[marking._id]));

  // Shaklni yuborishdan oldin qayta tekshiruv
  const onFormSubmit = (e) => {
    e.preventDefault();
    if (!isAllFilesUploaded) {
      alert("Iltimos, barcha mezonlar bo'yicha PDF fayllarni biriktiring!");
      return;
    }
    handleSubmit(e);
  };

  return (
    <div className="max-w-4xl mx-auto my-8 p-4 md:p-6 bg-white rounded-2xl shadow-xs border border-slate-100 space-y-6">
      <div className="border-b pb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
        <div>
          <h2 className="text-xl font-bold text-slate-800">
            Stipendiya Arizasini Topshirish
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Davr:{" "}
            <span className="font-bold text-blue-600">
              {period?.title || period?.name}
            </span>
          </p>
        </div>
      </div>

      <form onSubmit={onFormSubmit} className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wider">
            Mezonlar bo'yicha hujjatlarni biriktiring (PDF, max 5MB):
          </h3>
          <span className="text-xs font-bold text-slate-500">
            Yuklandi:{" "}
            <span
              className={
                isAllFilesUploaded
                  ? "text-emerald-600 font-extrabold"
                  : "text-amber-600 font-extrabold"
              }
            >
              {Object.keys(selectedFiles).length} / {markings.length}
            </span>
          </span>
        </div>

        <div className="space-y-3">
          {markings.map((marking, index) => {
            const currentSelectedFile = selectedFiles[marking._id];

            return (
              <div
                key={marking._id}
                className={`p-4 border rounded-xl transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${
                  currentSelectedFile
                    ? "bg-slate-50/50 border-emerald-200"
                    : "bg-slate-50/50 border-slate-200 hover:border-blue-300"
                }`}
              >
                <div className="flex items-start gap-3 flex-1">
                  <span
                    className={`w-6 h-6 rounded-full text-xs flex items-center justify-center font-bold shrink-0 mt-0.5 ${
                      currentSelectedFile
                        ? "bg-emerald-600 text-white"
                        : "bg-blue-600 text-white"
                    }`}
                  >
                    {index + 1}
                  </span>
                  <div>
                    <h4 className="text-xs font-extrabold text-slate-800">
                      {marking.title || marking.name}
                    </h4>
                    {marking.description && (
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {marking.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="w-full md:w-auto flex flex-col items-end gap-1">
                  {currentSelectedFile ? (
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-800">
                      <FaFilePdf className="text-red-500 text-sm" />
                      <span className="truncate max-w-37.5 font-medium">
                        {currentSelectedFile.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFile(marking._id)}
                        className="text-red-500 hover:text-red-700 ml-1"
                        title="Bekor qilish"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg shadow-2xs text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors">
                      <FaUpload className="text-blue-600" />
                      <span>PDF fayl tanlash</span>
                      <input
                        type="file"
                        accept=".pdf,application/pdf"
                        onChange={(e) => handleFileChange(marking._id, e)}
                        className="hidden"
                      />
                    </label>
                  )}

                  {errors[marking._id] && (
                    <span className="text-[10px] text-red-500 font-medium">
                      {errors[marking._id]}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 pt-4 border-t flex flex-col sm:flex-row items-center justify-between gap-3">
          {!isAllFilesUploaded && (
            <p className="text-[11px] font-semibold text-amber-600">
              * Arizani yuborish uchun barcha mezonlar bo'yicha PDF fayllarni biriktirishingiz shart.
            </p>
          )}

          <button
            type="submit"
            disabled={submitLoading || !isAllFilesUploaded}
            className={`w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold text-white transition-all flex items-center justify-center gap-2 ${
              submitLoading || !isAllFilesUploaded
                ? "bg-slate-300 cursor-not-allowed shadow-none"
                : "bg-blue-600 hover:bg-blue-700 active:scale-95 shadow-md shadow-blue-200"
            }`}
          >
            {submitLoading ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Saqlanmoqda...</span>
              </>
            ) : (
              <span>Arizani Topshirish</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ApplyForm;