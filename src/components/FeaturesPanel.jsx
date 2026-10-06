import { useState } from 'react';
import { ALL_FEATURES } from '../data/mockData.js';

export default function FeaturesPanel() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="features-fab">
        <button className={`fab-btn ${open ? 'active' : ''}`} onClick={() => setOpen(p => !p)} title="Features" id="fab-features">
          {open ? '✕' : '⚡'}
        </button>
      </div>
      {open && (
        <div className="features-panel">
          <div style={{fontWeight:800,fontSize:'0.95rem',marginBottom:14,display:'flex',alignItems:'center',gap:8}}>
            ⚡ All Features <span style={{fontSize:'0.7rem',fontWeight:600,color:'var(--text-muted)'}}>({ALL_FEATURES.length})</span>
          </div>
          {ALL_FEATURES.map((f,i) => (
            <div className="feat-item" key={i}>
              <span className="feat-icon">{f.icon}</span>
              <div>
                <div className="feat-name">{f.name}</div>
                <div className="feat-desc">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
