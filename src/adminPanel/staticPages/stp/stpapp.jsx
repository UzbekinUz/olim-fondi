function StpApp({selectedPeriod, setSelectedPeriod, periods, statusFilter, setStatusFilter,search, setSearch, filteredApps,handleOpenGradeModal}) {
    return ( <div className="space-y-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Bosqich</label>
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white"
                >
                  <option value="">Barcha bosqichlar</option>
                  {periods.map((p) => (
                    <option key={p._id} value={p._id}>
                      {p.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Holat</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white"
                >
                  <option value="all">Barcha holatlar</option>
                  <option value="submitted">Yuborilgan</option>
                  <option value="reviewed">Tekshirilgan</option>
                  <option value="approved">Tasdiqlangan</option>
                  <option value="rejected">Radd etilgan</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Qidiruv</label>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Ism bo'yicha..."
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200"
                />
              </div>
            </div>

            {/* Jadval */}
            <div className="bg-white rounded-2xl border border-slate-200/80 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold border-b">
                  <tr>
                    <th className="p-4">Talaba</th>
                    <th className="p-4">Bosqich</th>
                    <th className="p-4">Holat</th>
                    <th className="p-4">Ball</th>
                    <th className="p-4 text-right">Amal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredApps.map((app) => (
                    <tr key={app._id} className="hover:bg-slate-50/50">
                      <td className="p-4 font-bold text-slate-800">
                        {app.studentId?.name || "Ismsiz"} {app.studentId?.surname || ""}
                      </td>
                      <td className="p-4">{app.periodId?.title || "—"}</td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-600 uppercase">
                          {app.status}
                        </span>
                      </td>
                      <td className="p-4 font-extrabold text-blue-600">{app.totalScore || 0} ball</td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleOpenGradeModal(app)}
                          className="bg-slate-100 hover:bg-blue-600 hover:text-white px-3 py-1.5 rounded-lg font-bold"
                        >
                          Baholash
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div> );
}

export default StpApp;