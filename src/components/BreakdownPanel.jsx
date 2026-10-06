const COLORS = {
  relevance: '#6c63ff',
  budget: '#00d4aa',
  deadline: '#f5a623',
  quality: '#ff6b6b',
  location: '#a78bfa',
};
const LABELS = {
  relevance: '🎯 Relevance',
  budget: '💰 Budget',
  deadline: '⏱ Deadline',
  quality: '⭐ Quality',
  location: '📍 Location',
};

export default function BreakdownPanel({ score }) {
  if (!score) return null;
  const { breakdown, explanation, maxBreakdown } = score;

  return (
    <div className="breakdown-panel">
      <div className="breakdown-title">
        📊 Score Breakdown
        <span style={{ fontWeight: 400, color: 'var(--clr-text-muted)', fontSize: '0.8rem' }}>
          — nothing is hidden
        </span>
      </div>
      {Object.entries(breakdown).map(([key, val]) => {
        const max = maxBreakdown?.[key] || 35;
        const pct = (val / max) * 100;
        return (
          <div className="breakdown-row" key={key}>
            <div className="breakdown-meta">
              <span className="breakdown-name">{LABELS[key]}</span>
              <span className="breakdown-score" style={{ color: COLORS[key] }}>
                {val} / {max}
              </span>
            </div>
            <div className="breakdown-bar-bg">
              <div
                className="breakdown-bar-fill"
                style={{ width: `${pct}%`, background: COLORS[key] }}
              />
            </div>
          </div>
        );
      })}
      <div className="explanation-box">
        💬 <strong>Why this score:</strong> {explanation}
      </div>
    </div>
  );
}
