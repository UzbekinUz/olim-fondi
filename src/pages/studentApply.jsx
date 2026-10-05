import StipendiatCabinet from "../stpPanel/stpCabinet";

function StpApplicationForm({ stp, stpinfo, stpCheck }) {


  if (stp?.hasActivePeriod) {
    return (
      <StipendiatCabinet stpinfo={stpinfo} stp={stp} stpCheck={stpCheck} />
    );
  }
  return (
    <div className="max-w-5xl mx-auto my-8 p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
      {/* Sarlavha paneli */}
     <StipendiatCabinet stpinfo={stpinfo} stp={stp} stpCheck={stpCheck} />
    </div>
  );
}

export default StpApplicationForm;
