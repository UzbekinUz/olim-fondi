function StepThree({ state, setState }) {
  const handleContractChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Faqat raqamlarni qoldiramiz
    const formattedValue = value ? Number(value).toLocaleString("en-US") : ""; // Vergul bilan formatlash
    // Agar bo'shliq bilan formatlashni xohlasangiz 'fr-FR' dan foydalanishingiz mumkin

    setState({ ...state, contractAmount: formattedValue });
  };
  return (
    <div id="step-3" className="flex flex-col gap-4">
      <h3 className="text-xl font-bold text-blue-600 mb-2">
        3. Oliy ta'lim va Ilmiy faoliyat
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-600">
            Universitet nomi*
          </label>
          <input
            required
            type="text"
            className="w-full border border-gray-200 p-2.5 rounded-lg text-sm outline-none bg-gray-50/50 focus:bg-white"
            value={state.universityName}
            onChange={(e) =>
              setState({ ...state, universityName: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-600">
            Ta'lim shakli*
          </label>
          <input
            required
            type="text"
            className="w-full border border-gray-200 p-2.5 rounded-lg text-sm outline-none bg-gray-50/50 focus:bg-white"
            value={state.studyForm}
            onChange={(e) => setState({ ...state, studyForm: e.target.value })}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-600">
            Ta'lim yo'nalishi / Mutaxassislik*
          </label>
          <input
            required
            type="text"
            className="w-full border border-gray-200 p-2.5 rounded-lg text-sm outline-none bg-gray-50/50 focus:bg-white"
            value={state.studyField}
            onChange={(e) => setState({ ...state, studyField: e.target.value })}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-600">
            Bo'lg'usi bosqich / Kurs*
          </label>
          <input
            required
            type="text"
            placeholder="Masalan: 3-kurs"
            className="w-full border border-gray-200 p-2.5 rounded-lg text-sm outline-none bg-gray-50/50 focus:bg-white"
            value={state.currentCourse}
            onChange={(e) =>
              setState({ ...state, currentCourse: e.target.value })
            }
          />
        </div>
      </div>

      {/* Formatlangan Kontrakt Miqdori Inputi */}
      <div className="flex flex-col gap-1 md:w-1/2">
        <label className="text-xs font-semibold text-gray-600">
          Yillik kontrakt miqdori (so'mda)*
        </label>
        <input
          required
          type="text"
          placeholder="Masalan: 12,000,000"
          className="w-full border border-gray-200 p-2.5 rounded-lg text-sm outline-none bg-gray-50/50 focus:bg-white focus:border-blue-500"
          value={state.contractAmount}
          onChange={handleContractChange}
        />
      </div>

      <div className="w-full space-y-3 border-t pt-4 mt-2 text-sm text-gray-700">
        <label className="flex items-center gap-2 cursor-pointer font-medium">
          <input
            type="checkbox"
            checked={state.isDoingResearch}
            onChange={(e) =>
              setState({ ...state, isDoingResearch: e.target.checked })
            }
            className="w-4 h-4 cursor-pointer"
          />
          Ilmiy tadqiqot ishlari bilan shug'ullanasizmi?
        </label>
        <input
          type="text"
          placeholder="Agar shug'ullansangiz, mavzusini yozing"
          className="w-full border border-gray-200 p-2.5 rounded-lg text-sm outline-none bg-gray-50/50 focus:bg-white"
          value={state.researchDetails}
          onChange={(e) =>
            setState({ ...state, researchDetails: e.target.value })
          }
        />
        <label className="flex items-center gap-2 cursor-pointer font-medium">
          <input
            type="checkbox"
            checked={state.hasConferenceParticipation}
            onChange={(e) =>
              setState({
                ...state,
                hasConferenceParticipation: e.target.checked,
              })
            }
            className="w-4 h-4 cursor-pointer"
          />
          Konferensiyalarda ishtirok etganmisiz?
        </label>
        <label className="flex items-center gap-2 cursor-pointer font-medium">
          <input
            type="checkbox"
            checked={state.hasPublications}
            onChange={(e) =>
              setState({ ...state, hasPublications: e.target.checked })
            }
            className="w-4 h-4 cursor-pointer"
          />
          Ilmiy maqolalaringiz chop etilganmi?
        </label>
        <label className="flex items-center gap-2 cursor-pointer font-medium">
          <input
            type="checkbox"
            checked={state.usedPreviousGrants}
            onChange={(e) =>
              setState({
                ...state,
                usedPreviousGrants: e.target.checked,
              })
            }
            className="w-4 h-4 cursor-pointer"
          />
          Avval boshqa grantlardan foydalanganmisiz?
        </label>
        <input
          type="text"
          placeholder="Agar ha bo'lsa, grant tafsilotlarini yozing"
          className="w-full border border-gray-200 p-2.5 rounded-lg text-sm outline-none bg-gray-50/50 focus:bg-white"
          value={state.previousGrantDetails}
          onChange={(e) =>
            setState({ ...state, previousGrantDetails: e.target.value })
          }
        />
      </div>
    </div>
  );
}

export default StepThree;
