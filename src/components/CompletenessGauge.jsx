export default function CompletenessGauge({ fields }) {
  // fields = { title, category, budgetMin, budgetMax, deliveryDays, eventDate, city }
  const checks = [
    { key: 'title', label: 'Title', weight: 15 },
    { key: 'category', label: 'Category', weight: 15 },
    { key: 'budgetMin', label: 'Budget Min', weight: 15 },
    { key: 'budgetMax', label: 'Budget Max', weight: 15 },
    { key: 'deliveryDays', label: 'Delivery Days', weight: 15 },
    { key: 'eventDate', label: 'Event Date', weight: 15 },
    { key: 'city', label: 'City', weight: 10 },
  ];

  let total = 0;
  checks.forEach(c => {
    const val = fields[c.key];
    if (val && val !== '' && val !== 0) total += c.weight;
  });
  const pct = Math.min(100, total);
  const color = pct >= 80 ? '#00d4aa' : pct >= 50 ? '#f5a623' : '#ff6b6b';

  return (
    <div className="gauge-wrap">
      <div className="gauge-header">
        <span className="gauge-label">Completeness</span>
        <span className="gauge-pct" style={{ color }}>{pct}%</span>
      </div>
      <div className="gauge-bar-bg">
        <div
          className="gauge-bar-fill"
          style={{
            width: `${pct}%`,
            background: pct >= 80
              ? 'linear-gradient(90deg, #00d4aa, #00b894)'
              : pct >= 50
              ? 'linear-gradient(90deg, #f5a623, #e67e22)'
              : 'linear-gradient(90deg, #ff6b6b, #e55353)',
          }}
        />
      </div>
      {pct < 60 && (
        <p style={{ fontSize: '0.75rem', color: 'var(--clr-text-muted)', marginTop: 6 }}>
          💡 Fill more fields to get higher-quality offers
        </p>
      )}
      {pct === 100 && (
        <p style={{ fontSize: '0.75rem', color: 'var(--clr-accent)', marginTop: 6 }}>
          ✅ All fields complete — you'll get the best offers!
        </p>
      )}
    </div>
  );
}
