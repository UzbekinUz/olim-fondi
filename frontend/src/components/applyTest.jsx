import { useState, useRef } from "react";
import StepOne from "../Form/step1";
import StepTwo from "../Form/step2";
import StepThree from "../Form/step3";
import StepFour from "../Form/step4";
import StepSix from "../Form/step6";
import NavButtons from "../Form/navButtons";

const ApplicationForm = ({ usernameId, setBor, applyCheck, bor }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);
  const [state, setState] = useState({
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
    contractAmount: "", // Formatlangan ko'rinishda saqlanadi
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
  const [files, setFiles] = useState({
    cvFile: null,
    gpaFile: null,
    universityCertificate: null,
    passportFile: null,
    privilegeFile: null,
    motivationLetter:null
  });
  const [siblings, setSiblings] = useState([]);
  const stepsHeader = [
    "1. Shaxsiy",
    "2. Pasport",
    "3. Ta'lim",
    "4. Oila",
    "5. Hujjatlar",
  ];

  return (
    <section
      id="apply"
      className="w-full min-h-screen flex items-center justify-center md:justify-center px-4 py-8 bg-[#ebf4ff]"
    >
      <form
        ref={formRef}
        onSubmit={(e) => e.preventDefault()}
        data-aos="fade-up"
        data-aos-duration="600"
        className="w-full max-w-212.5 bg-white rounded-[20px] shadow-lg p-8 flex flex-col gap-6"
      >
        <div className="w-full flex flex-col gap-2">
          <div className="flex justify-center flex-col items-start text-xs font-semibold text-gray-400 border-b pb-3">
            <p className="text-slate-600 text-xl mb-6 font-bold">
              {bor === "resend" ? "Qayta yuborish" : ""}
            </p>
            {stepsHeader.map((stepName, index) => (
              <span
                key={index}
                className={`pb-1 transition-all duration-200 ${currentStep === index + 1 ? "text-blue-600 font-bold border-b-2 border-blue-600" : "hidden"}`}
              >
                {stepName}
              </span>
            ))}
          </div>
        </div>
        <div
          key={currentStep}
          data-aos="fade-in"
          data-aos-duration="400"
          className="w-full min-h-87.5"
        >
          {currentStep === 1 && <StepOne state={state} setState={setState} />}
          {currentStep === 2 && <StepTwo state={state} setState={setState} />}
          {currentStep === 3 && <StepThree state={state} setState={setState} />}
          {currentStep === 4 && (
            <StepFour
              state={state}
              setState={setState}
              siblings={siblings}
              setSiblings={setSiblings}
            />
          )}
          {currentStep === 5 && <StepSix
              state={state}
              setState={setState}
              setFiles={setFiles}
              files={files}
            />}
        </div>
        <NavButtons
          loading={loading}
          setLoading={setLoading}
          currentStep={currentStep}
          formRef={formRef}
          setCurrentStep={setCurrentStep}
          usernameId={usernameId}
          state={state}
          setState={setState}
          files={files}
          siblings={siblings}
          setFiles={setFiles}
          setSiblings={setSiblings}
          bor={bor}
          setBor={setBor}
          applyCheck={applyCheck}
        />
      </form>
    </section>
  );
};

export default ApplicationForm;