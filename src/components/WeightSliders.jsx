const SLIDER_CONFIG = [
  { key: 'R', label: 'Relevance', icon: '🎯', color: '#6c63ff' },
  { key: 'B', label: 'Budget Fit', icon: '💰', color: '#00d4aa' },
  { key: 'D', label: 'Speed', icon: '⚡', color: '#f5a623' },
  { key: 'Q', label: 'Quality', icon: '⭐', color: '#ff6b6b' },
  { key: 'L', label: 'Location', icon: '📍', color: '#a78bfa' },
];

export default function WeightSliders({ weights, onChange }) {
  const total = Object.values(weights).reduce((a, b) => a + b, 0);

  const handleChange = (key, val) => {
    onChange({ ...weights, [key]: parseInt(val) });
  };

  return (
    <div className="sliders-panel">
      <div className="sliders-title">
        🎚 What matters most to you?
        <span style={{ fontWeight: 400, fontSize: '0.8rem', color: 'var(--clr-text-muted)' }}>
          (drag to re-rank offers live)
        </span>
      </div>
      {SLIDER_CONFIG.map(({ key, label, icon, color }) => (
        <div className="slider-row" key={key}>
          <div className="slider-header">
            <span className="slider-name">{icon} {label}</span>
            <span className="slider-val" style={{ color }}>{weights[key]}</span>
          </div>
          <input
            type="range" min={0} max={50}
            value={weights[key]}
            onChange={e => handleChange(key, e.target.value)}
            style={{ accentColor: color }}
            id={`slider-${key}`}
            aria-label={`Weight for ${label}`}
          />
        </div>
      ))}
      <div className={`total-weight ${total > 100 ? 'over' : ''}`}>
        Total weight: <strong>{total}</strong> / 100
        {total !== 100 && <span style={{ marginLeft: 6, fontSize: '0.72rem' }}>
          {total > 100 ? '(too high — reduce some sliders)' : '(scores will still rank correctly)'}
        </span>}
      </div>
    </div>
  );
}
