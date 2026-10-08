import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Sparkles, FolderGit2, CheckCircle2, Layers } from "lucide-react";
import { GithubIcon } from "./Icons.jsx";
import { portfolioData } from "../../data/portfolioData.js";

const FILTER_TABS = [
  { id: "all", label: "All Works" },
  { id: "featured", label: "Featured" },
  { id: "frontend", label: "Client & Web Apps" },
  { id: "ai_data", label: "AI & Hackathons" },
];

export default function Projects() {
  const { projects } = portfolioData;
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = projects.filter((p) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "featured") return p.featured;
    return p.category === activeFilter;
  });

  return (
    <section id="projects" className="py-24 px-4 md:px-8 relative">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-rose-400">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>03 // SELECTED PRODUCTIONS</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-100 tracking-tight">
              Real Impact, Code & Deployments.
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-md">
              From live client platforms servicing enterprise inquiries to national hackathon architectures.
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-4">
          {FILTER_TABS.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`relative px-4 py-2 text-xs font-medium rounded-xl transition-all cursor-pointer ${
                  isActive
                    ? "text-neutral-100 bg-white/10 border border-white/15"
                    : "text-neutral-400 hover:text-neutral-200 hover:bg-white/5 border border-transparent"
                }`}
              >
                {tab.label}
                {isActive && (
                  <motion.div
                    layoutId="projects-tab-indicator"
                    className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-rose-500 to-amber-400"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Project Cards Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project, idx) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="p-7 rounded-3xl bg-neutral-900/60 hover:bg-neutral-900/90 border border-white/10 hover:border-amber-400/30 backdrop-blur-md transition-all flex flex-col justify-between space-y-6 group relative overflow-hidden shadow-xl"
              >
                {/* Glow pill behind card */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-rose-500/5 group-hover:bg-amber-500/10 rounded-full blur-3xl pointer-events-none transition-colors" />

                <div className="space-y-4">
                  {/* Card Header: Category Badge + Links */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-rose-500/15 border border-rose-500/30 text-rose-300">
                      {project.badge}
                    </span>
                    <div className="flex items-center gap-2">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white transition-colors"
                          title="View Repository on GitHub"
                        >
                          <GithubIcon className="w-4 h-4" />
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 hover:text-white text-xs font-medium transition-colors"
                          title="Visit Live Application"
                        >
                          <span>Live Site</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-neutral-100 group-hover:text-amber-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-neutral-400 font-mono mt-0.5">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Key Highlights */}
                  <div className="space-y-2 pt-2 border-t border-white/5">
                    {project.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-neutral-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tags Footer */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-white/[0.04] border border-white/5 text-neutral-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
