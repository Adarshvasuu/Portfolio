import { motion } from "framer-motion";
import { Briefcase, Calendar, Building2, ChevronRight, Award, GraduationCap } from "lucide-react";
import { portfolioData } from "../../data/portfolioData.js";

export default function Experience() {
  const { experience } = portfolioData;

  return (
    <section id="experience" className="py-24 px-4 md:px-8 relative">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-amber-400">
            <Briefcase className="w-3.5 h-3.5" />
            <span>04 // CAREER & TRAJECTORY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-100 tracking-tight">
            Experience, Leadership & Education.
          </h2>
        </div>

        {/* Vertical Timeline */}
        <div className="relative border-l border-white/10 ml-3 md:ml-6 pl-6 md:pl-10 space-y-12">
          {experience.map((item, idx) => {
            const isEducation = item.role.includes("B.Tech");
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="relative group"
              >
                {/* Timeline node icon */}
                <div className="absolute -left-[35px] md:-left-[51px] top-1.5 w-6 h-6 rounded-full bg-neutral-900 border-2 border-rose-500 group-hover:border-amber-400 group-hover:scale-125 transition-all flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-rose-400 group-hover:bg-amber-300" />
                </div>

                {/* Content Box */}
                <div className="p-6 md:p-8 rounded-3xl bg-neutral-900/50 hover:bg-neutral-900/80 border border-white/10 hover:border-white/20 backdrop-blur-md transition-all space-y-4">
                  
                  {/* Top metadata row */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-300 border border-rose-500/20">
                      <Calendar className="w-3 h-3" />
                      {item.period}
                    </span>
                    <span className="text-xs font-mono text-neutral-400">
                      {item.type}
                    </span>
                  </div>

                  {/* Title & Organization */}
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-neutral-100 group-hover:text-amber-300 transition-colors">
                      {item.role}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-neutral-400 font-medium mt-1">
                      {isEducation ? (
                        <GraduationCap className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Building2 className="w-4 h-4 text-rose-400" />
                      )}
                      <span>{item.organization}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Achievements List */}
                  <ul className="space-y-2 pt-2 border-t border-white/5">
                    {item.achievements.map((ach, aIdx) => (
                      <li key={aIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-400">
                        <ChevronRight className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
