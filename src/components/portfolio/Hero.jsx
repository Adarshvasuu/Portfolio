import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowDown, Download, Sparkles, Send, MapPin, Award } from "lucide-react";
import { portfolioData } from "../../data/portfolioData.js";

export default function Hero() {
  const { personal } = portfolioData;

  // 3D Parallax Tilt calculation for Adarsh's photo portrait
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["14deg", "-14deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-14deg", "14deg"]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 px-4 md:px-8 overflow-hidden"
    >
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-rose-600/15 via-amber-500/10 to-transparent rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Left Column: Split-Text Typography & Introduction */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7 flex flex-col items-start space-y-6"
        >
          {/* Eyebrow badge: Status */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium tracking-wide">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>AVAILABLE FOR WORK • 2026</span>
          </div>

          {/* Heading with Split Typography */}
          <div className="space-y-1">
            <p className="text-sm md:text-base font-mono uppercase tracking-[0.2em] text-neutral-400">
              HELLO! I AM
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-neutral-100">
              ADARSH <span className="bg-gradient-to-r from-rose-500 via-amber-400 to-rose-400 bg-clip-text text-transparent">S.</span>
            </h1>
            <p className="text-lg sm:text-xl font-medium text-amber-300/90 pt-1">
              AI & Data Science Undergrad <span className="text-neutral-500">•</span> Full Stack Web Developer
            </p>
          </div>

          {/* Narrative Lead */}
          <p className="text-sm sm:text-base text-neutral-300 max-w-xl leading-relaxed">
            Second-year student at <span className="text-white font-medium">J.N.N Institute of Engineering</span>. 
            Proven track record delivering client corporate platforms (<span className="text-amber-300">enticehr.com</span>), 
            leading teams at <span className="text-rose-300">Smart India Hackathon 2026</span>, and crafting responsive, 
            motion-driven web applications with React, TypeScript, and modern UI engineering.
          </p>

          {/* Quick Stats Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-lg pt-2">
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 backdrop-blur-sm">
              <span className="text-xs text-neutral-400 block font-mono">SEMESTER 1 GPA</span>
              <span className="text-lg font-bold text-amber-300">9.37</span>
              <span className="text-[11px] text-neutral-400 block">J.N.N Engineering</span>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 backdrop-blur-sm">
              <span className="text-xs text-neutral-400 block font-mono">SEMESTER 2 GPA</span>
              <span className="text-lg font-bold text-rose-300">8.71</span>
              <span className="text-[11px] text-neutral-400 block">B.Tech AI & DS</span>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 backdrop-blur-sm col-span-2 sm:col-span-1">
              <span className="text-xs text-neutral-400 block font-mono">CLIENT DEPLOYMENT</span>
              <span className="text-lg font-bold text-emerald-400">100%</span>
              <span className="text-[11px] text-neutral-400 block">Live Production</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-4">
            <button
              onClick={() => scrollTo("projects")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-medium text-sm shadow-lg shadow-rose-600/25 hover:shadow-rose-600/40 hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              <span>Explore Selected Works</span>
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </button>

            <a
              href={personal.resumeUrl}
              download="Adarsh_S_CV.docx"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-400/40 text-neutral-200 hover:text-white font-medium text-sm transition-all shadow-sm group"
            >
              <Download className="w-4 h-4 text-amber-400 group-hover:-translate-y-0.5 transition-transform" />
              <span>Download CV</span>
            </a>

            <button
              onClick={() => scrollTo("contact")}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white font-medium text-sm transition-all"
            >
              <Send className="w-3.5 h-3.5 text-neutral-400" />
              <span>Contact</span>
            </button>
          </div>
        </motion.div>

        {/* Right Column: 3D Parallax Photo Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 flex justify-center items-center"
        >
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: 1000 }}
            className="relative cursor-pointer select-none group"
          >
            {/* Ambient Halo & Tokyo Sun Ring */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-rose-600/30 via-amber-500/30 to-purple-600/20 rounded-full blur-2xl opacity-60 group-hover:opacity-90 transition-opacity duration-500 animate-pulse" />
            
            {/* 3D Motion Wrapper */}
            <motion.div
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-92 md:h-92 rounded-full p-2 bg-gradient-to-tr from-neutral-800 via-neutral-900 to-neutral-700/80 border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
            >
              {/* Inner Glowing Ring */}
              <div className="absolute inset-1 rounded-full border border-amber-400/30 shadow-[inset_0_0_20px_rgba(224,169,109,0.2)] pointer-events-none" />

              {/* Photo Mask */}
              <div className="w-full h-full rounded-full overflow-hidden bg-neutral-950 relative">
                <img
                  src={personal.avatar}
                  alt={personal.name}
                  loading="eager"
                  className="w-full h-full object-cover object-top scale-105 group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                
                {/* Subtle Glassmorphic Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-neutral-950/10 pointer-events-none" />
              </div>

              {/* Floating Chip 1: SIH 2026 Lead */}
              <motion.div
                style={{ transform: "translateZ(40px)" }}
                className="absolute -top-3 -right-2 bg-neutral-900/90 border border-rose-500/40 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-2"
              >
                <Award className="w-3.5 h-3.5 text-rose-400" />
                <span className="text-xs font-semibold text-rose-200">SIH '26 Team Lead</span>
              </motion.div>

              {/* Floating Chip 2: Tech Tag */}
              <motion.div
                style={{ transform: "translateZ(30px)" }}
                className="absolute -bottom-2 -left-2 bg-neutral-900/90 border border-amber-500/40 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-xs font-semibold text-amber-200">React • TypeScript • AI</span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
