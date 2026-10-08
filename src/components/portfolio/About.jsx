import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Trophy, Code, CheckCircle, Sparkles } from "lucide-react";
import { portfolioData } from "../../data/portfolioData.js";

export default function About() {
  const { personal } = portfolioData;

  const pillars = [
    {
      icon: Briefcase,
      title: "Real Client Delivery",
      description: "Authored and launched the live corporate web platform for Entice HR Solutions (enticehr.com) with React, TypeScript, Tailwind, and automated Google Sheets lead capture.",
      color: "text-rose-400",
      border: "border-rose-500/20",
      bg: "bg-rose-500/5",
    },
    {
      icon: Trophy,
      title: "Hackathon Leadership",
      description: "Spearheaded a multidisciplinary team as Team Lead at Smart India Hackathon 2026 for the Vyabar Mitr problem, driving solution architecture and final jury presentation.",
      color: "text-amber-400",
      border: "border-amber-500/20",
      bg: "bg-amber-500/5",
    },
    {
      icon: GraduationCap,
      title: "Academic Rigor",
      description: "Second-year B.Tech in Artificial Intelligence & Data Science at J.N.N Institute of Engineering with Semester 1 GPA 9.37 and Semester 2 GPA 8.71.",
      color: "text-emerald-400",
      border: "border-emerald-500/20",
      bg: "bg-emerald-500/5",
    },
    {
      icon: Code,
      title: "Full Stack & AI Craft",
      description: "Deep hands-on execution across Python, Java, React, TypeScript, Framer Motion, and WebGL, bridging rigorous algorithmic logic with fluid user interaction.",
      color: "text-sky-400",
      border: "border-sky-500/20",
      bg: "bg-sky-500/5",
    },
  ];

  return (
    <section id="about" className="py-24 px-4 md:px-8 relative">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-amber-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>01 // ABOUT ADARSH</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-100 tracking-tight">
            Bridging High-Craft Web Engineering with Practical AI.
          </h2>
        </div>

        {/* Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Narrative text */}
          <div className="lg:col-span-7 space-y-6 text-neutral-300 leading-relaxed text-sm sm:text-base">
            <p>
              I am an AI & Data Science undergraduate at <span className="text-white font-medium">J.N.N Institute of Engineering (2025–2029)</span> with a passion for building production-ready, interactive software that delivers tangible impact.
            </p>
            <p>
              During my full-stack developer internship at <span className="text-rose-300 font-medium">Entice Innovations</span>, I had the privilege of architecting and launching the official corporate platform for <span className="text-amber-300 font-medium">Entice HR Solutions</span>. I engineered five responsive pages using React, TypeScript, and Tailwind CSS, hooked contact queries to a spreadsheet automation pipeline, polished search engine visibility, and successfully delivered the repository to production.
            </p>
            <p>
              Beyond the browser, I lead technical teams under high pressure. Leading our delegation at the <span className="text-white font-medium">Smart India Hackathon 2026</span> for the <span className="text-rose-300 font-medium">Vyabar Mitr</span> project sharpened my capacity to translate vague real-world problems into robust, working prototypes.
            </p>

            {/* Quick bullets */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Production-tested React & TypeScript",
                "Certified GitHub Copilot pair programmer",
                "Strong Python & algorithmic fundamentals",
                "58-hour deep dive in AI & ML principles",
              ].map((bullet, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-neutral-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{bullet}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Metric cards */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {personal.metrics.map((m, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                className="p-5 rounded-2xl bg-neutral-900/60 border border-white/10 backdrop-blur-md flex flex-col justify-between space-y-3"
              >
                <span className="text-xs font-mono uppercase text-neutral-400">{m.label}</span>
                <span className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-tr from-rose-400 via-amber-300 to-white bg-clip-text text-transparent">
                  {m.value}
                </span>
                <span className="text-xs text-neutral-400">{m.sub}</span>
              </motion.div>
            ))}
          </div>

        </div>

        {/* 4 Pillars of Excellence */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={i}
                className={`p-6 rounded-2xl ${p.bg} border ${p.border} backdrop-blur-md space-y-3 hover:-translate-y-1 transition-transform`}
              >
                <div className={`p-2.5 rounded-xl bg-neutral-950/70 inline-block ${p.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-neutral-100">{p.title}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">{p.description}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
