import { useState, useRef } from 'react';
import { CATEGORIES } from '../data/mockData.js';
import { extractRequirementRegex } from '../utils/scoring.js';
import CompletenessGauge from '../components/CompletenessGauge.jsx';
import OfferCard from '../components/OfferCard.jsx';
import WeightSliders from '../components/WeightSliders.jsx';

const EXAMPLE = `Need an experienced event photographer for 8 hours on 20 November for a corporate conference in Tirunelveli. Must deliver 100+ colour-graded photos within 5 days. Budget is ₹15,000–₹20,000.`;
const SORTS = [
  { key:'score', label:'⭐ Best Match' },
  { key:'price', label:'💰 Lowest Price' },
  { key:'days',  label:'⚡ Fastest' },
  { key:'rating',label:'🏆 Top Rated' },
];

function PostNeed({ onPublish }) {
  const [raw, setRaw] = useState('');
  const [f, setF] = useState({ title:'', category:'Photography', budgetMin:'', budgetMax:'', deliveryDays:'', eventDate:'', city:'' });
  const [busy, setBusy] = useState(false);
  const [rec, setRec] = useState(false);
  const recRef = useRef(null);

  const gauge = { title:f.title, category:f.category, budgetMin:f.budgetMin?parseInt(f.budgetMin):0, budgetMax:f.budgetMax?parseInt(f.budgetMax):0, deliveryDays:f.deliveryDays?parseInt(f.deliveryDays):0, eventDate:f.eventDate, city:f.city };

  const extract = async () => {
    if (!raw.trim()) return;
    setBusy(true);
    await new Promise(r => setTimeout(r, 600));
    const x = extractRequirementRegex(raw);
    setF({ title:x.title, category:x.category, budgetMin:x.budgetMin, budgetMax:x.budgetMax, deliveryDays:x.deliveryDays, eventDate:x.eventDate, city:x.location?.city||'' });
    setBusy(false);
  };

  const toggleVoice = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) { alert('Use Chrome for voice input.'); return; }
    if (rec) { recRef.current?.stop(); setRec(false); return; }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const r = new SR(); r.continuous=true; r.interimResults=true; r.lang='en-IN';
    r.onresult = e => { let t=''; for(let i=0;i<e.results.length;i++) t+=e.results[i][0].transcript; setRaw(t); };
    r.onend = () => setRec(false);
    r.start(); recRef.current=r; setRec(true);
  };

  const publish = () => {
    if (!f.title || !f.budgetMax) { alert('Fill at least title and max budget.'); return; }
    onPublish({
      id:`req_${Date.now()}`, buyerId:'usr_buyer_01', title:f.title, description:raw||f.title,
      category:f.category, budgetMin:parseInt(f.budgetMin)||0, budgetMax:parseInt(f.budgetMax)||0,
      deliveryDays:parseInt(f.deliveryDays)||5, eventDate:f.eventDate,
      location:{city:f.city,isRemote:!f.city}, weights:{R:35,B:25,D:20,Q:10,L:10},
      status:'open', createdAt:new Date().toISOString(),
    });
  };

  const up = (k,v) => setF(p => ({...p,[k]:v}));

  return (
    <div className="main-content" style={{maxWidth:720}}>
      <div className="section-header">
        <div className="section-eyebrow"><span>Step 1</span></div>
        <h1 className="section-title">Post a Need</h1>
        <p className="section-sub">Describe what you need. AI extracts the details automatically.</p>
      </div>
      <div className="card card-crimson-glow mb-6">
        <div className="form-group mb-4">
          <label className="form-label">Describe your need</label>
          <div style={{display:'flex',gap:8}}>
            <textarea className="form-textarea" placeholder="e.g. Need an event photographer for 8 hours on 20 November in Tirunelveli…" value={raw} onChange={e => setRaw(e.target.value)} style={{minHeight:110}} id="need-text" />
            <button className={`voice-btn ${rec?'recording':''}`} onClick={toggleVoice} title={rec?'Stop':'Record'} id="voice-btn">{rec?'⏹':'🎤'}</button>
          </div>
        </div>
        <div style={{display:'flex',gap:10,marginBottom:20,flexWrap:'wrap'}}>
          <button className="btn btn-crimson" onClick={extract} disabled={!raw.trim()||busy} id="extract-btn">{busy?'⏳ Extracting…':'✨ Fill details for me'}</button>
          <button className="btn btn-ghost btn-sm" onClick={() => setRaw(EXAMPLE)} id="example-btn">Try example</button>
        </div>
        <div className="form-grid mb-4">
          <div className="form-group" style={{gridColumn:'1/-1'}}><label className="form-label">Title</label><input className="form-input" value={f.title} onChange={e => up('title',e.target.value)} placeholder="Brief title" id="f-title" /></div>
          <div className="form-group"><label className="form-label">Category</label><select className="form-select" value={f.category} onChange={e => up('category',e.target.value)} id="f-cat">{CATEGORIES.map(c => <option key={c}>{c}</option>)}</select></div>
          <div className="form-group"><label className="form-label">City</label><input className="form-input" value={f.city} onChange={e => up('city',e.target.value)} placeholder="Tirunelveli" id="f-city" /></div>
          <div className="form-group"><label className="form-label">Min Budget (₹)</label><input className="form-input" type="number" value={f.budgetMin} onChange={e => up('budgetMin',e.target.value)} placeholder="15000" id="f-bmin" /></div>
          <div className="form-group"><label className="form-label">Max Budget (₹)</label><input className="form-input" type="number" value={f.budgetMax} onChange={e => up('budgetMax',e.target.value)} placeholder="20000" id="f-bmax" /></div>
          <div className="form-group"><label className="form-label">Deliver Within (days)</label><input className="form-input" type="number" value={f.deliveryDays} onChange={e => up('deliveryDays',e.target.value)} placeholder="5" id="f-days" /></div>
          <div className="form-group"><label className="form-label">Event Date</label><input className="form-input" type="date" value={f.eventDate} onChange={e => up('eventDate',e.target.value)} id="f-date" /></div>
        </div>
        <CompletenessGauge fields={gauge} />
        <div style={{marginTop:20}}>
          <button className="btn btn-crimson" onClick={publish} disabled={!f.title} id="publish-btn" style={{padding:'14px 40px',fontSize:'1rem'}}>🚀 Publish Requirement</button>
        </div>
      </div>
    </div>
  );
}

function Dashboard({ scoredOffers, requirement, weights, onWeightsChange, onUpdateStatus, showToast }) {
  const [sort, setSort] = useState('score');
  const [table, setTable] = useState(false);

  const active = scoredOffers.filter(o => o.score);
  const sorted = [...active].sort((a,b) => {
    if(sort==='score') return b.score.total-a.score.total;
    if(sort==='price') return a.price-b.price;
    if(sort==='days') return a.deliveryDays-b.deliveryDays;
    if(sort==='rating') return b.provider.rating-a.provider.rating;
    return 0;
  });
  const best = sorted.find(o => o.status !== 'rejected')?.id;
  const lowP = Math.min(...active.map(o=>o.price));
  const fastD = Math.min(...active.map(o=>o.deliveryDays));
  const highR = Math.max(...active.map(o=>o.provider.rating));
  const highS = Math.max(...active.map(o=>o.score?.total||0));

  const sl = id => { const o=scoredOffers.find(x=>x.id===id); const ns=o?.status==='shortlisted'?'submitted':'shortlisted'; onUpdateStatus(id,ns); if(ns==='shortlisted') showToast('Shortlisted!','★'); };

  return (
    <div className="main-content">
      <div className="section-header">
        <div className="section-eyebrow"><span>Step 2</span></div>
        <h1 className="section-title">Comparison Dashboard</h1>
        <p className="section-sub">{active.length} offers for <strong>{requirement?.title}</strong> · ₹{requirement?.budgetMin?.toLocaleString('en-IN')} – ₹{requirement?.budgetMax?.toLocaleString('en-IN')}</p>
      </div>
      <WeightSliders weights={weights} onChange={onWeightsChange} />
      <div className="sort-bar">
        {SORTS.map(s => <button key={s.key} className={`sort-pill ${sort===s.key?'active':''}`} onClick={() => setSort(s.key)} id={`sort-${s.key}`}>{s.label}</button>)}
        <button className={`sort-pill ${table?'active':''}`} onClick={() => setTable(p=>!p)} id="tbl-btn" style={{marginLeft:'auto'}}>📋 Table</button>
      </div>
      <div style={{display:'grid',gap:14,marginBottom:32}}>
        {sorted.map(o => <OfferCard key={o.id} offer={o} isBest={o.id===best&&o.status!=='rejected'} requirement={requirement} onShortlist={sl} onReject={id=>{onUpdateStatus(id,'rejected');showToast('Rejected','✕');}} onSelect={id=>onUpdateStatus(id,'accepted')} />)}
      </div>
      {table && (
        <div className="table-wrap">
          <table className="comp-table">
            <thead><tr><th>Provider</th><th>Score</th><th>Price</th><th>Days</th><th>Rating</th><th>City</th></tr></thead>
            <tbody>
              {sorted.map(o => (
                <tr key={o.id} className={o.id===best&&o.status!=='rejected'?'tr-top':''}>
                  <td><strong>{o.provider.avatar} {o.provider.name}</strong></td>
                  <td className={o.score?.total===highS?'td-best':''}>{o.score?.total}/100</td>
                  <td className={o.price===lowP?'td-best':''}>₹{o.price.toLocaleString('en-IN')}</td>
                  <td className={o.deliveryDays===fastD?'td-best':''}>{o.deliveryDays}d</td>
                  <td className={o.provider.rating===highR?'td-best':''}>{o.provider.rating}</td>
                  <td>{o.provider.city}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function Selected({ selectedOffer, onNewNeed, onReset }) {
  const p = selectedOffer?.provider;
  const s = selectedOffer?.score;
  return (
    <div className="confirm-screen">
      <div className="confirm-icon">🎉</div>
      <h1 className="confirm-title gradient-text">Provider Selected!</h1>
      <p className="confirm-sub">You've chosen <strong>{p?.name}</strong>. They've been notified.</p>
      <div className="confirm-card">
        {[['Provider',p?.name],['Score',`${s?.total}/100`],['Price',`₹${selectedOffer?.price?.toLocaleString('en-IN')}`],['Delivery',`${selectedOffer?.deliveryDays} days`],['Rating',`${p?.rating}/5`]].map(([l,v]) => (
          <div className="confirm-row" key={l}><span className="confirm-row-lbl">{l}</span><span className="confirm-row-val">{v}</span></div>
        ))}
      </div>
      <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
        <button className="btn btn-crimson" onClick={onNewNeed}>+ New Need</button>
        <button className="btn btn-ghost" onClick={onReset}>🏠 Home</button>
      </div>
    </div>
  );
}

export default function BuyerFlow({ page, requirement, scoredOffers, weights, onWeightsChange, onPublish, onUpdateStatus, selectedOffer, onNewNeed, onReset, showToast }) {
  if (page==='post'||!requirement) return <PostNeed onPublish={onPublish} />;
  if (page==='selected'&&selectedOffer) return <Selected selectedOffer={selectedOffer} onNewNeed={onNewNeed} onReset={onReset} />;
  return <Dashboard scoredOffers={scoredOffers} requirement={requirement} weights={weights} onWeightsChange={onWeightsChange} onUpdateStatus={onUpdateStatus} showToast={showToast} />;
}
