export default function ScoreRing({ score, size = 72, onClick }) {
  const radius = (size - 8) / 2;
  const circ = 2 * Math.PI * radius;
  const filled = (score / 100) * circ;
  const color = score >= 75 ? '#3DAA6E' : score >= 50 ? '#D4AF37' : '#C41E3A';
  const glow = score >= 75 ? 'rgba(61,170,110,0.4)' : score >= 50 ? 'rgba(212,175,55,0.4)' : 'rgba(196,30,58,0.4)';

  return (
    <div className="score-ring-wrap" onClick={onClick} style={{ width: size, height: size }} title="Click for score breakdown">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={5} />
        <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke={color} strokeWidth={5}
          strokeDasharray={`${filled} ${circ - filled}`} strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 0.8s cubic-bezier(0.4,0,0.2,1)', filter: `drop-shadow(0 0 4px ${glow})` }}
        />
      </svg>
      <div className="score-ring-text" style={{ color }}>
        {score}<span className="score-ring-label">/ 100</span>
      </div>
    </div>
  );
}
