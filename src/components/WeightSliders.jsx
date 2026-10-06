const CFG = [
  { key:'R', label:'Relevance', icon:'🎯', color:'#C41E3A' },
  { key:'B', label:'Budget Fit', icon:'💰', color:'#3DAA6E' },
  { key:'D', label:'Speed', icon:'⚡', color:'#D4AF37' },
  { key:'Q', label:'Quality', icon:'⭐', color:'#E02245' },
  { key:'L', label:'Location', icon:'📍', color:'#a78bfa' },
];

export default function WeightSliders({ weights, onChange }) {
  const total = Object.values(weights).reduce((a,b) => a + b, 0);
  return (
    <div className="sliders-card" style={{position:'relative'}}>
      <div className="sliders-title">🎚 What matters most to you? <span style={{fontWeight:400,fontSize:'0.78rem',color:'var(--text-muted)'}}>drag to re-rank live</span></div>
      {CFG.map(({key,label,icon,color}) => (
        <div className="slider-row" key={key}>
          <div className="slider-head">
            <span className="slider-name">{icon} {label}</span>
            <span className="slider-val" style={{color}}>{weights[key]}</span>
          </div>
          <input type="range" min={0} max={50} value={weights[key]} onChange={e => onChange({...weights,[key]:parseInt(e.target.value)})}
            style={{background:`linear-gradient(90deg, ${color} ${(weights[key]/50)*100}%, var(--bg-float) ${(weights[key]/50)*100}%)`}}
            id={`slider-${key}`} aria-label={`Weight for ${label}`}
          />
        </div>
      ))}
      <div className={`weight-total ${total > 100 ? 'over' : ''}`}>
        Total: <strong>{total}</strong>/100
        {total !== 100 && <span style={{marginLeft:6,fontSize:'0.7rem'}}>{total > 100 ? ' — reduce some' : ''}</span>}
      </div>
    </div>
  );
}
