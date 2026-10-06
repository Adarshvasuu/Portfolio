const COLORS = { relevance:'#C41E3A', budget:'#3DAA6E', deadline:'#D4AF37', quality:'#E02245', location:'#a78bfa' };
const LABELS = { relevance:'🎯 Relevance', budget:'💰 Budget', deadline:'⏱ Deadline', quality:'⭐ Quality', location:'📍 Location' };

export default function BreakdownPanel({ score }) {
  if (!score) return null;
  const { breakdown, explanation, maxBreakdown } = score;
  return (
    <div className="breakdown-panel">
      <div className="breakdown-title">📊 Score Breakdown <span style={{fontWeight:400,color:'var(--text-muted)',fontSize:'0.78rem'}}>— nothing is hidden</span></div>
      {Object.entries(breakdown).map(([k,v]) => {
        const max = maxBreakdown?.[k] || 35;
        return (
          <div className="bd-row" key={k}>
            <div className="bd-meta">
              <span className="bd-name">{LABELS[k]}</span>
              <span className="bd-score" style={{color:COLORS[k]}}>{v} / {max}</span>
            </div>
            <div className="bd-track"><div className="bd-fill" style={{width:`${(v/max)*100}%`,background:COLORS[k]}}/></div>
          </div>
        );
      })}
      <div className="explanation-box">💬 <strong>Why this score:</strong> {explanation}</div>
    </div>
  );
}
