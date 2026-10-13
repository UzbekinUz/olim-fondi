import News from "../components/news";
import AboutM from "../pages/aboutMain";
import Hero from "../pages/hero";
import Mission from "../pages/mission";
import Qadryat from "../pages/qadryat";

function Home({ scrollToSection, L , applyMode}) {
  return (
    <>
      <Hero scrollToSection={scrollToSection} L={L} applyMode={applyMode} />
      <News />
      <AboutM scrollToSection={scrollToSection} L={L} applyMode={applyMode} />
      <Qadryat L={L} />
      <Mission L={L} />
    </>
  );
}

export default Home;