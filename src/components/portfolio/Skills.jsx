import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Code2, FileCode, Braces, Terminal, Cpu, 
  Palette, Sparkles, Layout, Layers, Brain, 
  GitBranch, Bot, Wrench, Zap, Check, Star
} from "lucide-react";
import { portfolioData } from "../../data/portfolioData.js";

const ICON_MAP = {
  Code2, FileCode, Braces, Terminal, Cpu,
  Palette, Sparkles, Layout, Layers, Brain,
  GitBranch, Bot, Wrench, Zap
};

export default function Skills() {
  const { categories, items } = portfolioData.skills;
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredItems = activeCategory === "all"
    ? items
    : items.filter((item) => item.category === activeCategory);

  return (
    <section id="skills" className="py-24 px-4 md:px-8 relative">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-amber-400">
            <Star className="w-3.5 h-3.5" />
            <span>02 // TECHNICAL MATRIX</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-100 tracking-tight">
              Skills, Toolchains & Architecture.
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-md">
              From low-level data structures in Java & Python to reactive component lifecycles in React & TypeScript.
            </p>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-4">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative px-4 py-2 text-xs font-medium rounded-xl transition-all cursor-pointer ${
                  isActive
                    ? "text-neutral-100 bg-white/10 border border-white/15 shadow-sm"
                    : "text-neutral-400 hover:text-neutral-200 hover:bg-white/5 border border-transparent"
                }`}
              >
                {cat.name}
                {isActive && (
                  <motion.div
                    layoutId="skills-tab-indicator"
                    className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-rose-500 to-amber-400"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          <AnimatePresence>
            {filteredItems.map((skill) => {
              const Icon = ICON_MAP[skill.icon] || Code2;
              return (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -4 }}
                  className="p-5 rounded-2xl bg-neutral-900/50 hover:bg-neutral-900/80 border border-white/5 hover:border-amber-400/30 backdrop-blur-md transition-all group relative overflow-hidden"
                >
                  {/* Subtle top edge glow on hover */}
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-amber-300 group-hover:text-rose-400 group-hover:scale-105 transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono font-semibold text-neutral-400 group-hover:text-amber-300 transition-colors">
                      {skill.level}%
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-neutral-200 group-hover:text-white transition-colors">
                    {skill.name}
                  </h3>

                  <p className="text-[11px] text-neutral-400 line-clamp-1 mt-1">
                    {skill.highlight}
                  </p>

                  {/* Proficiency Meter */}
                  <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mt-3">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-rose-500 to-amber-400 rounded-full"
                    />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
