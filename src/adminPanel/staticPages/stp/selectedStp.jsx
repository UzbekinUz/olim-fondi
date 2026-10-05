import { FaTimes } from "react-icons/fa";
import { SITE_LINK } from "../../cfg";

function SelectedStp({handleSaveGrades,setSelectedApp,selectedApp,grades, setGrades}) {
  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-base font-bold text-slate-900">
            Arizani Baholash
          </h2>
          <button
            onClick={() => setSelectedApp(null)}
            className="text-slate-400"
          >
            <FaTimes />
          </button>
        </div>

        <div className="space-y-3">
          {selectedApp.files?.map((f, idx) => (
            <div
              key={f._id || idx}
              className="p-4 rounded-xl bg-slate-50 border space-y-2"
            >
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold">
                  {f.markingId?.title || `Mezon #${idx + 1}`}
                </span>
                {f.file && (
                  <a
                    href={`${SITE_LINK}${f.file}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 font-bold"
                  >
                    PDF ko'rish ↗
                  </a>
                )}
              </div>
              <div className="grid grid-cols-3 gap-2">
                <input
                  type="number"
                  placeholder="Ball"
                  value={grades[f._id]?.score ?? 0}
                  onChange={(e) =>
                    setGrades({
                      ...grades,
                      [f._id]: { ...grades[f._id], score: e.target.value },
                    })
                  }
                  className="text-xs p-2 rounded-lg border bg-white font-bold text-blue-600"
                />
                <input
                  type="text"
                  placeholder="Izoh..."
                  value={grades[f._id]?.adminComment || ""}
                  onChange={(e) =>
                    setGrades({
                      ...grades,
                      [f._id]: {
                        ...grades[f._id],
                        adminComment: e.target.value,
                      },
                    })
                  }
                  className="col-span-2 text-xs p-2 rounded-lg border bg-white"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={handleSaveGrades}
            className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold"
          >
            Saqlash
          </button>
        </div>
      </div>
    </div>
  );
}

export default SelectedStp;
