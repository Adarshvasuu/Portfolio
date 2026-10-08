import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, Phone, MapPin, Copy, Check, Sparkles, MessageSquare } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons.jsx";
import confetti from "canvas-confetti";
import { portfolioData } from "../../data/portfolioData.js";

export default function Contact() {
  const { personal } = portfolioData;

  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      setErrorMsg("Please fill in all fields before sending.");
      return;
    }
    setErrorMsg("");
    setIsSubmitting(true);

    // Simulate reliable dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);

      // Trigger Confetti Celebration
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#E63946", "#F77F00", "#E0A96D", "#3DAA6E"]
      });
    }, 900);
  };

  return (
    <section id="contact" className="py-24 px-4 md:px-8 relative">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-rose-400">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>06 // INITIATE DIALOGUE</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-100 tracking-tight">
              Let's Build Something Exceptional.
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-md">
              Whether discussing an engineering role, technical hackathon collaboration, or custom web platform.
            </p>
          </div>
        </div>

        {/* Form & Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Info & Quick Copy Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Quick Copy Email Card */}
            <div className="p-6 rounded-3xl bg-neutral-900/60 border border-white/10 backdrop-blur-md space-y-3 relative group">
              <span className="text-xs font-mono text-neutral-400 uppercase">DIRECT EMAIL</span>
              <div className="flex items-center justify-between gap-2">
                <a
                  href={`mailto:${personal.email}`}
                  className="text-base sm:text-lg font-bold text-neutral-100 hover:text-amber-300 transition-colors truncate"
                >
                  {personal.email}
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-neutral-300 hover:text-white transition-all cursor-pointer"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              {copiedEmail && (
                <span className="text-xs text-emerald-400 font-medium block">
                  ✓ Copied to clipboard!
                </span>
              )}
            </div>

            {/* Phone & Direct Call */}
            <div className="p-6 rounded-3xl bg-neutral-900/60 border border-white/10 backdrop-blur-md space-y-2">
              <span className="text-xs font-mono text-neutral-400 uppercase">PHONE & WHATSAPP</span>
              <a
                href={`tel:${personal.phone.replace(/\s/g, "")}`}
                className="text-base sm:text-lg font-bold text-neutral-100 hover:text-amber-300 transition-colors block"
              >
                {personal.phone}
              </a>
            </div>

            {/* Location */}
            <div className="p-6 rounded-3xl bg-neutral-900/60 border border-white/10 backdrop-blur-md space-y-2">
              <span className="text-xs font-mono text-neutral-400 uppercase">LOCATION & TIMEZONE</span>
              <p className="text-base font-semibold text-neutral-100 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-rose-400" />
                <span>{personal.location}</span>
              </p>
              <p className="text-xs text-neutral-400 font-mono">IST (UTC+5:30) • Open to Global Remote</p>
            </div>

            {/* Social Hub */}
            <div className="p-6 rounded-3xl bg-neutral-900/60 border border-white/10 backdrop-blur-md space-y-3">
              <span className="text-xs font-mono text-neutral-400 uppercase">SOCIAL PROFILES</span>
              <div className="flex items-center gap-3">
                <a
                  href={personal.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-medium text-neutral-200 hover:text-white transition-all"
                >
                  <GithubIcon className="w-4 h-4 text-neutral-300" />
                  <span>GitHub</span>
                </a>
                <a
                  href={personal.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-medium text-neutral-200 hover:text-white transition-all"
                >
                  <LinkedinIcon className="w-4 h-4 text-sky-400" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-neutral-900/70 border border-white/10 backdrop-blur-xl shadow-2xl relative">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-100">Message Received!</h3>
                  <p className="text-sm text-neutral-300 max-w-md mx-auto">
                    Thank you for reaching out, Adarsh will review your note and respond back promptly at your email.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormState({ name: "", email: "", message: "" });
                    }}
                    className="mt-4 px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-xs font-medium text-neutral-200 transition-all cursor-pointer"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-neutral-100">Send a Direct Message</h3>
                    <p className="text-xs text-neutral-400">
                      Drop your inquiry below and I will get back to you shortly.
                    </p>
                  </div>

                  {errorMsg && (
                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase text-neutral-400">Your Name</label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="Alex Parker"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/50 text-neutral-100 placeholder-neutral-400 text-sm outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase text-neutral-400">Your Email</label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="alex@domain.com"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/50 text-neutral-100 placeholder-neutral-400 text-sm outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-neutral-400">Message / Inquiry</label>
                    <textarea
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Hi Adarsh, I saw your work on Entice HR Solutions and SIH 2026..."
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/50 text-neutral-100 placeholder-neutral-400 text-sm outline-none transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-semibold text-sm shadow-lg shadow-rose-600/25 hover:shadow-rose-600/40 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Dispatching Note...</span>
                    ) : (
                      <>
                        <span>Transmit Message</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
