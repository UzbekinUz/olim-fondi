import Activities from "../pages/activeness";
import FounderAppeal from "../pages/founder";
import About from "../pages/about";
function AboutPage({ L }) {
  return (
    <>
      <Activities L={L} />
      <FounderAppeal L={L} />
    </>
  );
}

export default AboutPage;
