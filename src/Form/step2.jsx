function StepTwo({ state, setState }) {
  return (
    <div id="step-2" className="flex flex-col gap-4">
      <h3 className="text-xl font-bold text-blue-600 mb-2">
        2. Pasport / ID-karta ma'lumotlari
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-600">
            Pasport seriyasi (2 ta harf)*
          </label>
          <input
            required
            type="text"
            maxLength="2"
            placeholder="AA"
            className="w-full border border-gray-200 p-2.5 rounded-lg text-sm outline-none uppercase bg-gray-50/50 focus:bg-white"
            value={state.passportSeria}
            onChange={(e) =>
              setState({ ...state, passportSeria: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-600">
            Pasport raqami (7 ta raqam)*
          </label>
          <input
            required
            type="text"
            maxLength="7"
            placeholder="1234567"
            className="w-full border border-gray-200 p-2.5 rounded-lg text-sm outline-none bg-gray-50/50 focus:bg-white"
            value={state.passportNumber}
            onChange={(e) =>
              setState({ ...state, passportNumber: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col gap-1 md:col-span-2">
          <label className="text-xs font-semibold text-gray-600">
            JShShIR (PINFL - 14 ta raqam)*
          </label>
          <input
            required
            type="text"
            maxLength="14"
            className="w-full border border-gray-200 p-2.5 rounded-lg text-sm outline-none bg-gray-50/50 focus:bg-white"
            value={state.jshshir}
            onChange={(e) => setState({ ...state, jshshir: e.target.value })}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-600">
            Berilgan sana*
          </label>
          <input
            required
            type="date"
            className="w-full border border-gray-200 p-2.5 rounded-lg text-sm outline-none bg-gray-50/50 focus:bg-white"
            value={state.givenDate}
            onChange={(e) => setState({ ...state, givenDate: e.target.value })}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-600">
            Amal qilish muddati*
          </label>
          <input
            required
            type="date"
            className="w-full border border-gray-200 p-2.5 rounded-lg text-sm outline-none bg-gray-50/50 focus:bg-white"
            value={state.expiresDate}
            onChange={(e) =>
              setState({ ...state, expiresDate: e.target.value })
            }
          />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-gray-600">
          Kim tomonidan berilgan*
        </label>
        <input
          required
          type="text"
          className="w-full border border-gray-200 p-2.5 rounded-lg text-sm outline-none bg-gray-50/50 focus:bg-white"
          value={state.givenBy}
          onChange={(e) => setState({ ...state, givenBy: e.target.value })}
        />
      </div>
    </div>
  );
}

export default StepTwo;
