import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Download, Menu, X, ArrowUpRight } from "lucide-react";
import { portfolioData } from "../../data/portfolioData.js";

const NAV_ITEMS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export default function Navbar({ theme, toggleTheme }) {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Section scrollspy
      const sections = NAV_ITEMS.map((item) => document.getElementById(item.id));
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec && sec.offsetTop <= scrollPos) {
          setActiveSection(NAV_ITEMS[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 md:pt-6 pointer-events-none">
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`pointer-events-auto flex items-center justify-between gap-3 md:gap-6 px-4 md:px-6 py-2.5 rounded-full transition-all duration-300 ${
          scrolled
            ? "bg-stone-900/85 dark:bg-[#0d090d]/85 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            : "bg-stone-900/60 dark:bg-[#120a10]/60 backdrop-blur-md border border-white/5"
        }`}
      >
        {/* Brand Mark */}
        <button
          onClick={() => scrollToSection("hero")}
          className="flex items-center gap-2 group cursor-pointer text-left"
          aria-label="Adarsh S Home"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-600 via-amber-500 to-rose-400 p-[1px] shadow-sm shadow-rose-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full rounded-full bg-neutral-950 flex items-center justify-center">
              <span className="text-xs font-bold tracking-wider text-rose-300 font-mono">AS</span>
            </div>
          </div>
          <span className="hidden sm:inline font-medium text-xs tracking-wider uppercase text-neutral-200 group-hover:text-amber-300 transition-colors">
            Adarsh S.
          </span>
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1 bg-white/5 dark:bg-black/20 p-1 rounded-full border border-white/5">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-3.5 py-1 text-xs font-medium rounded-full transition-colors cursor-pointer ${
                  isActive
                    ? "text-neutral-100"
                    : "text-neutral-400 hover:text-neutral-200"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="navbar-active-pill"
                    className="absolute inset-0 bg-gradient-to-r from-rose-500/20 to-amber-500/20 rounded-full border border-rose-500/30"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Action Buttons: CV + Theme + Mobile Menu */}
        <div className="flex items-center gap-2">
          {/* Download CV */}
          <a
            href={portfolioData.personal.resumeUrl}
            download="Adarsh_S_CV.docx"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-rose-600/15 hover:bg-rose-600/25 border border-rose-500/30 text-rose-200 hover:text-white transition-all shadow-sm hover:shadow-rose-600/20 group"
            title="Download CV"
          >
            <Download className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform text-rose-400" />
            <span className="hidden sm:inline">CV</span>
            <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
          </a>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-amber-300 transition-colors cursor-pointer"
            aria-label="Toggle dark/light theme"
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-amber-300" />
            ) : (
              <Moon className="w-4 h-4 text-rose-300" />
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto md:hidden fixed top-20 left-4 right-4 bg-stone-950/95 border border-white/15 rounded-2xl p-4 backdrop-blur-2xl shadow-2xl z-50"
          >
            <div className="flex flex-col gap-2">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    activeSection === item.id
                      ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                      : "text-neutral-300 hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-2 border-t border-white/10 flex justify-between items-center">
                <a
                  href={portfolioData.personal.resumeUrl}
                  download="Adarsh_S_CV.docx"
                  className="flex items-center gap-2 text-xs text-rose-400 font-medium px-3 py-2 rounded-lg bg-rose-500/10"
                >
                  <Download className="w-3.5 h-3.5" /> Download Full CV
                </a>
                <span className="text-xs text-neutral-400">Adarsh S. 2026</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
