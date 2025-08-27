import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import EnvTest from "./components/EnvTest"; // Importing the EnvTest component
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Cases from "./pages/Cases";
import Mediations from "./pages/Mediations";

function App() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <Router>
      <Navbar />
      <div style={{ padding: "0", margin: "0" }}> {/* Adjusted padding and margin */}
        <Home scrollToSection={scrollToSection} />
        <AboutUs />
        <Cases />
        <Mediations />
      </div>
      <Footer scrollToSection={scrollToSection} />
    </Router>
  );
}

export default App;