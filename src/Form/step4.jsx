function StepFour({
  state,
  setState,
  siblings,
  setSiblings
}) {
  const addSibling = () =>
    setSiblings([...siblings, { name: "", role: "", birth: "" }]);
  const removeSibling = (index) =>
    setSiblings(siblings.filter((_, i) => i !== index));
  const handleSiblingChange = (index, field, value) => {
    const updated = [...siblings];
    updated[index][field] = value;
    setSiblings(updated);
  };
  return (
    <div id="step-4" className="flex flex-col gap-4">
      <h3 className="text-xl font-bold text-blue-600 mb-2">
        4. Oila a'zolari haqida ma'lumot
      </h3>
      <div className="flex flex-col gap-1 md:w-1/2">
        <label className="text-xs font-semibold text-gray-600">
          Oila a'zolaringiz soni*
        </label>
        <input
          required
          type="number"
          className="w-full border border-gray-200 p-2.5 rounded-lg text-sm outline-none bg-gray-50/50 focus:bg-white"
          value={state.familyMembersCount}
          onChange={(e) =>
            setState({ ...state, familyMembersCount: e.target.value })
          }
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        <div className="border border-gray-100 p-4 rounded-xl bg-gray-50/50 space-y-2">
          <p className="text-xs font-bold text-gray-700 uppercase">
            Ota haqida ma'lumot:
          </p>
          <input
            type="text"
            placeholder="F.I.SH"
            className="w-full border p-2 rounded-md text-sm outline-none bg-white"
            value={state.fatherFullName}
            onChange={(e) =>
              setState({ ...state, fatherFullName: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Ish joyi"
            className="w-full border p-2 rounded-md text-sm outline-none bg-white"
            value={state.fatherWorkPlace}
            onChange={(e) =>
              setState({ ...state, fatherWorkPlace: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Lavozimi"
            className="w-full border p-2 rounded-md text-sm outline-none bg-white"
            value={state.fatherPosition}
            onChange={(e) =>
              setState({ ...state, fatherPosition: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Tug'ilgan yili"
            className="w-full border p-2 rounded-md text-sm outline-none bg-white"
            value={state.fatherBirthDate}
            onChange={(e) =>
              setState({ ...state, fatherBirthDate: e.target.value })
            }
          />
        </div>
        <div className="border border-gray-100 p-4 rounded-xl bg-gray-50/50 space-y-2">
          <p className="text-xs font-bold text-gray-700 uppercase">
            Ona haqida ma'lumot:
          </p>
          <input
            type="text"
            placeholder="F.I.SH"
            className="w-full border p-2 rounded-md text-sm outline-none bg-white"
            value={state.motherFullName}
            onChange={(e) =>
              setState({ ...state, motherFullName: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Ish joyi"
            className="w-full border p-2 rounded-md text-sm outline-none bg-white"
            value={state.motherWorkPlace}
            onChange={(e) =>
              setState({ ...state, motherWorkPlace: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Lavozimi"
            className="w-full border p-2 rounded-md text-sm outline-none bg-white"
            value={state.motherPosition}
            onChange={(e) =>
              setState({ ...state, motherPosition: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Tug'ilgan yili"
            className="w-full border p-2 rounded-md text-sm outline-none bg-white"
            value={state.motherBirthDate}
            onChange={(e) =>
              setState({ ...state, motherBirthDate: e.target.value })
            }
          />
        </div>
      </div>
      <div className="w-full border-t pt-4 mt-2 space-y-3">
        <div className="flex justify-between items-center w-full">
          <span className="text-sm font-bold text-gray-700">
            Aka-uka / opa-singillar:
          </span>
          <button
            type="button"
            onClick={addSibling}
            className="bg-blue-600 text-white text-xs px-3 py-1.5 rounded-md font-medium hover:bg-blue-700 transition"
          >
            + A'zo qo'shish
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {siblings.map((sibling, index) => (
            <div
              key={index}
              className="p-3 border rounded-[10px] bg-slate-50 flex flex-col gap-2 relative"
            >
              <input
                required
                type="text"
                placeholder="Ismi*"
                value={sibling.name}
                onChange={(e) =>
                  handleSiblingChange(index, "name", e.target.value)
                }
                className="w-full border p-2 rounded-md text-sm outline-none bg-white"
              />
              <div className="flex gap-2">
                <input
                  required
                  type="text"
                  placeholder="Kimligi (Aka/Opa)*"
                  value={sibling.role}
                  onChange={(e) =>
                    handleSiblingChange(index, "role", e.target.value)
                  }
                  className="w-1/2 border p-2 rounded-md text-sm outline-none bg-white"
                />
                <input
                  required
                  type="text"
                  placeholder="Tug'ilgan yili*"
                  value={sibling.birth}
                  onChange={(e) =>
                    handleSiblingChange(index, "birth", e.target.value)
                  }
                  className="w-1/2 border p-2 rounded-md text-sm outline-none bg-white"
                />
              </div>
              <button
                type="button"
                onClick={() => removeSibling(index)}
                className="text-xs text-red-600 text-right hover:underline font-semibold mt-1"
              >
                O'chirish
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StepFour;
