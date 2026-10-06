const CHECKS = [
  { key: 'title', label: 'Title', weight: 15 },
  { key: 'category', label: 'Category', weight: 15 },
  { key: 'budgetMin', label: 'Min Budget', weight: 15 },
  { key: 'budgetMax', label: 'Max Budget', weight: 15 },
  { key: 'deliveryDays', label: 'Delivery', weight: 15 },
  { key: 'eventDate', label: 'Date', weight: 15 },
  { key: 'city', label: 'City', weight: 10 },
];

export default function CompletenessGauge({ fields }) {
  let total = 0;
  const filled = {};
  CHECKS.forEach(c => {
    const v = fields[c.key];
    const ok = v && v !== '' && v !== 0;
    filled[c.key] = ok;
    if (ok) total += c.weight;
  });
  const pct = Math.min(100, total);
  const color = pct >= 80 ? '#3DAA6E' : pct >= 50 ? '#D4AF37' : '#C41E3A';
  const bg = pct >= 80 ? 'linear-gradient(90deg,#1E4D35,#3DAA6E)' : pct >= 50 ? 'linear-gradient(90deg,#9A7E24,#D4AF37)' : 'linear-gradient(90deg,#8B1628,#C41E3A)';

  return (
    <div className="gauge-wrap">
      <div className="gauge-row">
        <span className="gauge-label">Completeness</span>
        <span className="gauge-pct" style={{ color }}>{pct}%</span>
      </div>
      <div className="gauge-track">
        <div className="gauge-fill" style={{ width: `${pct}%`, background: bg, color }} />
      </div>
      <div className="gauge-fields">
        {CHECKS.map(c => (
          <span key={c.key} className={`gauge-field-chip ${filled[c.key] ? 'done' : 'missing'}`}>
            {filled[c.key] ? '✓' : '○'} {c.label}
          </span>
        ))}
      </div>
    </div>
  );
}
