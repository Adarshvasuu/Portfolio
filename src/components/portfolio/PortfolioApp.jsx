import { useState, useEffect } from "react";
import Navbar from "./Navbar.jsx";
import Hero from "./Hero.jsx";
import About from "./About.jsx";
import Skills from "./Skills.jsx";
import Projects from "./Projects.jsx";
import Experience from "./Experience.jsx";
import Certifications from "./Certifications.jsx";
import Contact from "./Contact.jsx";
import Footer from "./Footer.jsx";
import CustomCursor from "./CustomCursor.jsx";
import SpectralBackground from "./SpectralBackground.jsx";

export default function PortfolioApp() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("portfolio_theme") || "dark";
  });

  useEffect(() => {
    localStorage.setItem("portfolio_theme", theme);
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.style.colorScheme = "dark";
    } else {
      root.classList.remove("dark");
      root.style.colorScheme = "light";
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div className={`min-h-screen relative font-sans transition-colors duration-500 ${
      theme === "dark" 
        ? "bg-[#080508] text-neutral-100" 
        : "bg-stone-50 text-neutral-900"
    }`}>
      {/* Interactive Custom Cursor */}
      <CustomCursor />

      {/* Componentry WebGL Ambient Atmosphere */}
      <SpectralBackground theme={theme} />

      {/* Floating Pill Navigation */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Certifications />
        <Contact />
      </main>

      {/* Luxury Minimalist Footer */}
      <Footer />
    </div>
  );
}
