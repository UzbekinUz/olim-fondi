import Chart from "../pages/chart";
import Winners from "../pages/winners";

function MainWinners({L, lang,stpinfo}) {
    return ( 
        <><Winners L={L} lang={lang} stp={stpinfo} />
      <Chart L={L} /></>
     );
}

export default MainWinners;