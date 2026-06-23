import Chart from "../pages/chart";
import Winners from "../pages/winners";

function MainWinners({L, lang}) {
    return ( 
        <><Winners L={L} lang={lang} />
      <Chart L={L} /></>
     );
}

export default MainWinners;