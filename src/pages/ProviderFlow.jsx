import { useState } from 'react';
import { SAMPLE_REQUIREMENT, PROVIDERS } from '../data/mockData.js';
import { scoreOffer } from '../utils/scoring.js';

const DEMO = PROVIDERS[0];

function LivePreview({ price, days, requirement, weights }) {
  if (!requirement) return null;
  const s = scoreOffer({ price:parseInt(price)||0, deliveryDays:parseInt(days)||5 }, requirement, weights, DEMO);
  const c = s.total >= 75 ? '#3DAA6E' : s.total >= 50 ? '#D4AF37' : '#C41E3A';
  return (
    <div className="live-preview">
      <div>
        <div className="live-info-label">Estimated Score</div>
        <div className="live-num gradient-text">{s.total}</div>
      </div>
      <div style={{flex:1}}>
        <div className="live-breakdown">{Object.entries(s.breakdown).map(([k,v]) => <span key={k}>{k}: <strong>{v}</strong></span>)}</div>
        <div className="live-tip">{s.explanation}</div>
      </div>
    </div>
  );
}

function Builder({ requirement, weights, onSubmit }) {
  const [fm, setFm] = useState({ price:'', days:'', message:'', portfolio:'' });
  const [done, setDone] = useState(false);
  const up = (k,v) => setFm(p => ({...p,[k]:v}));

  const submit = () => {
    if (!fm.price || !fm.days || !fm.message) { alert('Fill price, days, and pitch.'); return; }
    onSubmit({ id:`off_${Date.now()}`, requirementId:requirement?.id||'req_101', providerId:DEMO.id, price:parseInt(fm.price), deliveryDays:parseInt(fm.days), message:fm.message, status:'submitted' });
    setDone(true);
  };

  if (done) return (
    <div className="text-center" style={{padding:'48px 0'}}>
      <div style={{fontSize:'3rem',marginBottom:16}}>📬</div>
      <h2 style={{fontFamily:'var(--font-display)',marginBottom:8}}>Offer Submitted!</h2>
      <p className="text-muted mb-4">The buyer can see your offer ranked in their dashboard.</p>
      <button className="btn btn-ghost" onClick={() => setDone(false)}>Submit Another</button>
    </div>
  );

  return (
    <div className="card card-gold-glow">
      <h2 style={{fontFamily:'var(--font-display)',marginBottom:4,fontSize:'1.2rem'}}>💼 Submit Your Offer</h2>
      <p style={{color:'var(--text-muted)',fontSize:'0.82rem',marginBottom:20}}>
        As: <strong style={{color:'var(--text-primary)'}}>{DEMO.name}</strong> · Adjust price & days to see your score change live.
      </p>
      <LivePreview price={fm.price} days={fm.days} requirement={requirement} weights={weights} />
      <div className="form-grid mb-4">
        <div className="form-group">
          <label className="form-label">Price (₹)</label>
          <input className="form-input" type="number" placeholder="18000" value={fm.price} onChange={e => up('price',e.target.value)} id="o-price" />
          {requirement && fm.price && <span className={`form-hint ${parseInt(fm.price)<=requirement.budgetMax?'good':'bad'}`}>{parseInt(fm.price)<=requirement.budgetMax?'✓ Within budget':`⚠ ₹${(parseInt(fm.price)-requirement.budgetMax).toLocaleString('en-IN')} over`}</span>}
        </div>
        <div className="form-group">
          <label className="form-label">Delivery Days</label>
          <input className="form-input" type="number" placeholder="3" value={fm.days} onChange={e => up('days',e.target.value)} id="o-days" />
          {requirement && fm.days && <span className={`form-hint ${parseInt(fm.days)<=requirement.deliveryDays?'good':'bad'}`}>{parseInt(fm.days)<=requirement.deliveryDays?'✓ On time or early':`⚠ ${parseInt(fm.days)-requirement.deliveryDays}d late`}</span>}
        </div>
      </div>
      <div className="form-group mb-4"><label className="form-label">Your Pitch</label><textarea className="form-textarea" placeholder="Describe what you'll deliver…" value={fm.message} onChange={e => up('message',e.target.value)} id="o-pitch" /></div>
      <button className="btn btn-crimson" onClick={submit} id="submit-offer" style={{padding:'14px 40px',fontSize:'1rem'}}>📤 Submit Offer</button>
    </div>
  );
}

export default function ProviderFlow({ requirement, offers, weights, onAddOffer, onGoToBuyer, showToast }) {
  const [tab, setTab] = useState('feed');
  const req = requirement || SAMPLE_REQUIREMENT;

  return (
    <div className="main-content">
      <div className="section-header">
        <div className="section-eyebrow"><span>Provider</span></div>
        <h1 className="section-title">Provider Dashboard</h1>
        <p className="section-sub">Find relevant needs and send targeted offers. Compete on fit, not spam.</p>
      </div>
      <div className="tabs">
        <button className={`tab ${tab==='feed'?'active':''}`} onClick={() => setTab('feed')} id="tab-feed">📋 Requirement Feed</button>
        <button className={`tab ${tab==='offer'?'active':''}`} onClick={() => setTab('offer')} id="tab-offer">💼 Submit Offer</button>
      </div>
      {tab==='feed' && (
        <div style={{display:'grid',gap:14}}>
          <div className="req-card">
            <div className="req-cat">📷 {req.category}</div>
            <div className="req-title">{req.title}</div>
            <div className="req-desc">{req.description}</div>
            <div className="req-meta">
              <div className="req-meta-item">💰 <strong>₹{req.budgetMin?.toLocaleString('en-IN')} – ₹{req.budgetMax?.toLocaleString('en-IN')}</strong></div>
              <div className="req-meta-item">⏱ <strong>{req.deliveryDays} days</strong></div>
              <div className="req-meta-item">📍 <strong>{req.location?.city||'Remote'}</strong></div>
              <div className="req-meta-item">📅 <strong>{req.eventDate||'Flexible'}</strong></div>
            </div>
            <div style={{display:'flex',gap:10}}>
              <button className="btn btn-crimson btn-sm" onClick={() => setTab('offer')} id="apply-btn">Apply Now →</button>
              <button className="btn btn-ghost btn-sm" onClick={onGoToBuyer} id="view-buyer">👁 View as Buyer</button>
            </div>
          </div>
          <div className="card" style={{borderStyle:'dashed',opacity:0.45,textAlign:'center',padding:32}}>
            <div style={{fontSize:'1.5rem',marginBottom:8}}>🔍</div>
            <div style={{fontWeight:700,marginBottom:4}}>More matching needs coming soon</div>
            <div className="text-sm text-muted">Set up your provider profile to see more matches</div>
          </div>
        </div>
      )}
      {tab==='offer' && <Builder requirement={req} weights={weights} onSubmit={o => { onAddOffer(o); showToast('Offer submitted! Switch to buyer view to see it.','📬'); }} />}
    </div>
  );
}
