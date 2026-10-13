function StepOne({state, setState}) {
    const handlePhoneChange = (e) => {
    let input = e.target.value.replace(/\D/g, "");

    if (!input.startsWith("998")) {
      input = "998" + input;
    }

    let formatted = "+998";
    if (input.length > 3) {
      formatted += " (" + input.substring(3, 5);
    }
    if (input.length > 5) {
      formatted += ") " + input.substring(5, 8);
    }
    if (input.length > 8) {
      formatted += "-" + input.substring(8, 10);
    }
    if (input.length > 10) {
      formatted += "-" + input.substring(10, 12);
    }

    if (input.length === 12 && formatted.length === 19) {
      e.target.setCustomValidity("");
    } else {

      e.target.setCustomValidity(
        "Telefon raqamini to'liq kiriting (masalan: +998 (90) 123-45-67)",
      );
    }
    setState({ ...state, phoneNumber: formatted });
  };
  return (
    <div id="step-1" className="flex flex-col gap-4">
      <h3 className="text-xl font-bold text-blue-600 mb-2">
        1. Shaxsiy ma'lumotlar
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-600">
            Talabaning F.I.SH (To'liq)*
          </label>
          <input
            required
            type="text"
            className="w-full border border-gray-200 p-2.5 rounded-lg text-sm outline-none bg-gray-50/50 focus:bg-white focus:border-blue-500"
            value={state.studentFullName}
            onChange={(e) =>
              setState({ ...state, studentFullName: e.target.value })
            }
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-600">
            Tug'ilgan sana*
          </label>
          <input
            required
            type="date"
            className="w-full border border-gray-200 p-2.5 rounded-lg text-sm outline-none bg-gray-50/50 focus:bg-white focus:border-blue-500"
            value={state.birthDate}
            onChange={(e) => setState({ ...state, birthDate: e.target.value })}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-600">
            Fuqaroligi*
          </label>
          <input
            required
            type="text"
            className="w-full border border-gray-200 p-2.5 rounded-lg text-sm outline-none bg-gray-50/50 focus:bg-white focus:border-blue-500"
            value={state.nationality}
            onChange={(e) =>
              setState({ ...state, nationality: e.target.value })
            }
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-600">
            Telefon raqam*
          </label>
          <input
            required
            type="tel"
            placeholder="+998 (90) 123-45-67"
            className="w-full border border-gray-200 p-2.5 rounded-lg text-sm outline-none bg-gray-50/50 focus:bg-white focus:border-blue-500"
            value={state.phoneNumber}
            onChange={handlePhoneChange}
            maxLength={19} // Eng ko'pida 19 ta belgi kiritishga ruxsat beradi
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-gray-600">
          Email manzil*
        </label>
        <input
          required
          type="email"
          className="w-full md:w-1/2 border border-gray-200 p-2.5 rounded-lg text-sm outline-none bg-gray-50/50 focus:bg-white focus:border-blue-500"
          value={state.emailAddress}
          onChange={(e) => setState({ ...state, emailAddress: e.target.value })}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-gray-600">
          Doimiy yashash manzili*
        </label>
        <textarea
          required
          rows="2"
          className="w-full border border-gray-200 p-2.5 rounded-lg text-sm outline-none bg-gray-50/50 focus:bg-white focus:border-blue-500 resize-none"
          value={state.permanentAddress}
          onChange={(e) =>
            setState({ ...state, permanentAddress: e.target.value })
          }
        ></textarea>
      </div>
    </div>
  );
}

export default StepOne;
