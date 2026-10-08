import { motion } from "framer-motion";
import { Award, ShieldCheck, CheckCircle2, Sparkles } from "lucide-react";
import { portfolioData } from "../../data/portfolioData.js";

export default function Certifications() {
  const { certifications } = portfolioData;

  return (
    <section id="certifications" className="py-20 px-4 md:px-8 relative">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>05 // CREDENTIALS & MASTERY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-100 tracking-tight">
            Verified Certifications.
          </h2>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {certifications.map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
              className="p-6 rounded-2xl bg-neutral-900/40 hover:bg-neutral-900/70 border border-white/5 hover:border-emerald-500/30 backdrop-blur-md transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:scale-105 transition-transform">
                    <Award className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-full bg-white/5 text-neutral-400">
                    {cert.date}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-neutral-100 group-hover:text-emerald-300 transition-colors leading-snug">
                  {cert.title}
                </h3>
              </div>

              <div className="space-y-2 pt-2 border-t border-white/5">
                <p className="text-xs text-neutral-400 font-medium">
                  {cert.issuer}
                </p>
                <div className="inline-flex items-center gap-1.5 text-[11px] text-emerald-400 font-mono">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{cert.badge}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
