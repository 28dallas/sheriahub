import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import theme from "./theme";
import { LanguageProvider } from "./contexts/LanguageContext";
import Navbar from "./components/Navbar";
import EnvTest from "./components/EnvTest"; // Importing the EnvTest component
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Cases from "./pages/Cases";
import Mediations from "./pages/Mediations";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Education from "./pages/Education"; // Import the Education component

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
    <LanguageProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Navbar />
          <div style={{ padding: "0", margin: "0" }}> {/* Adjusted padding and margin */}
            <Home scrollToSection={scrollToSection} />
            <Dashboard />
            <AboutUs />
            <Cases />
            <Mediations />
            <Profile />
            <Education /> {/* Add the Education component */}
          </div>
          <Footer scrollToSection={scrollToSection} />
        </Router>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
