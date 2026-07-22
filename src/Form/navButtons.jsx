import axios from "axios";
import { API_LINK } from "../cfg";

function NavButtons({
  loading,
  setLoading,
  currentStep,
  formRef,
  setCurrentStep,
  usernameId,
  state,
  setState,
  files,
  siblings,
  setFiles,
  setSiblings,
  bor,
  setBor,
  applyCheck,
}) {
  const validateCurrentStep = () => {
    if (!formRef.current) return false;

    const stepContainer = formRef.current.querySelector(`#step-${currentStep}`);
    if (stepContainer) {
      const inputs = stepContainer.querySelectorAll(
        "input[required], textarea[required], select[required]",
      );
      for (let input of inputs) {
        if (!input.reportValidity()) {
          return false;
        }
      }
    }
    return true;
  };
  const nextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, 6));
    }
  };

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));
  // console.log(bor)

  // Ariza yuborish
  const postApplication = (e) => {
    if (e) e.preventDefault();

    if (!validateCurrentStep()) return;

    setLoading(true);
    const form = new FormData();

    form.append("usernameId", usernameId || "");

    const textFields = [
      "studentFullName",
      "birthDate",
      "nationality",
      "permanentAddress",
      "phoneNumber",
      "emailAddress",
      "universityName",
      "studyForm",
      "studyField",
      "currentCourse",
      "isDoingResearch",
      "researchDetails",
      "hasConferenceParticipation",
      "hasPublications",
      "usedPreviousGrants",
      "previousGrantDetails",
      "familyMembersCount",
      "fatherFullName",
      "fatherWorkPlace",
      "fatherPosition",
      "fatherBirthDate",
      "motherFullName",
      "motherWorkPlace",
      "motherPosition",
      "motherBirthDate",
      "hasPrivilege",
    ];

    textFields.forEach((field) => {
      form.append(field, state[field]);
    });

    // Kontrakt miqdorini serverga toza raqam ko'rinishida yuborish
    const cleanContractAmount = state.contractAmount.replace(/,/g, "");
    form.append("contractAmount", cleanContractAmount);

    const passportObj = {
      passportSeria: state.passportSeria.toUpperCase(),
      passportNumber: state.passportNumber,
      jshshir: state.jshshir,
      givenDate: state.givenDate,
      expiresDate: state.expiresDate,
      givenBy: state.givenBy,
    };
    form.append("passportDetails", JSON.stringify(passportObj));
    form.append("siblings", JSON.stringify(siblings));

    form.append("cvFile", files.cvFile);
    form.append("gpaFile", files.gpaFile);
    form.append("universityCertificate", files.universityCertificate);
    form.append("passportFile", files.passportFile);
    form.append("motivationLetter", files.motivationLetter);

    if (state.hasPrivilege && files.privilegeFile) {
      form.append("privilegeFile", files.privilegeFile);
    }
    const pathh =
      bor === "false"
        ? `${API_LINK}/apply/add`
        : bor === "resend"
          ? `${API_LINK}/apply/resend`
          : null;
    axios
      .post(pathh, form, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-admin-token": `${localStorage.getItem("access_token")}`,
        },
      })
      .then((result) => {
        const { ok, msg } = result.data;
        if (!ok) {
          alert(msg);
        } else {
          alert(msg || "Ariza muvaffaqiyatli qabul qilindi!");
          setState({
            studentFullName: "",
            birthDate: "",
            nationality: "O'zbekiston",
            permanentAddress: "",
            phoneNumber: "+998",
            emailAddress: "",
            passportSeria: "",
            passportNumber: "",
            jshshir: "",
            givenDate: "",
            expiresDate: "",
            givenBy: "",
            universityName: "",
            studyForm: "Kunduzgi",
            studyField: "",
            currentCourse: "",
            contractAmount: "",
            isDoingResearch: false,
            researchDetails: "",
            hasConferenceParticipation: false,
            hasPublications: false,
            usedPreviousGrants: false,
            previousGrantDetails: "",
            familyMembersCount: "",
            fatherFullName: "",
            fatherWorkPlace: "",
            fatherPosition: "",
            fatherBirthDate: "",
            motherFullName: "",
            motherWorkPlace: "",
            motherPosition: "",
            motherBirthDate: "",
            hasPrivilege: false,
          });
          setBor("true");
          applyCheck();
          setFiles({
            cvFile: null,
            gpaFile: null,
            universityCertificate: null,
            passportFile: null,
            privilegeFile: null,
            motivationLetter: null,
          });
          setSiblings([]);
          setCurrentStep(1);
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err.response?.data?.msg || "Tizimda xatolik yuz berdi!");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="flex items-center justify-between border-t pt-4 mt-2">
      <button
        type="button"
        onClick={prevStep}
        disabled={currentStep === 1 || loading}
        className="text-gray-400 font-medium text-sm px-5 py-2 rounded-lg hover:bg-gray-100 hover:text-gray-700 transition disabled:opacity-20 cursor-pointer"
      >
        ← Orqaga
      </button>

      {currentStep < 5 ? (
        <button
          type="button"
          onClick={nextStep}
          disabled={loading}
          className="bg-blue-600 text-white text-sm font-bold px-6 py-2.5 rounded-lg shadow-md hover:bg-blue-700 transition cursor-pointer"
        >
          Keyingisi →
        </button>
      ) : (
        <button
          type="button"
          onClick={postApplication}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-8 py-2.5 rounded-lg shadow-md transition disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Yuborilmoqda..." : "Yuborish 🚀"}
        </button>
      )}
    </div>
  );
}

export default NavButtons;
