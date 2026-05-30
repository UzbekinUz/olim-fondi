import { useState, useEffect, useRef } from "react";
import "./App.css";
import { Menu, X } from "lucide-react";
import Hero from "./pages/hero";
import Navbar from "./components/nav";
import Latest from "./pages/latest";
import About from "./pages/about";
import Stats from "./pages/stat";
import Process from "./pages/process";
import Footer from "./components/footer";
function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <About />
      <Process />
      <Latest />
      {/* <Apply /> */}
      <Footer />
    </>
  );
}

export default App;
