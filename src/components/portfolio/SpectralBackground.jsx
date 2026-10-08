import SpectralRibbon from "../SpectralRibbon.jsx";

export default function SpectralBackground({ theme }) {
  if (theme === "light") {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-stone-100">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-amber-200/30 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-rose-200/30 rounded-full blur-[100px]" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-35 transition-opacity duration-700">
      <SpectralRibbon
        className="w-full h-full"
        intensity={0.65}
        thickness={0.035}
        grain={0.03}
        speed={0.7}
      />
      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#0a070a]/40 to-[#060306] pointer-events-none" />
    </div>
  );
}
