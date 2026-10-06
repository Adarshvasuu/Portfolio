import { useState } from 'react';
import ScoreRing from './ScoreRing.jsx';
import BreakdownPanel from './BreakdownPanel.jsx';
import ChatDrawer from './ChatDrawer.jsx';
import { getFairPriceMeter, getWhyNotMe } from '../utils/scoring.js';

function FPM({ price, category }) {
  const f = getFairPriceMeter(price, category);
  const c = { below:'#3DAA6E', fair:'#D4AF37', above:'#C41E3A' }[f.status];
  const cls = { below:'fpm-below', fair:'fpm-fair', above:'fpm-above' }[f.status];
  return (
    <div className="fpm">
      <div className="fpm-label">
        <span>Fair Price Meter</span>
        <span className={`fpm-tag ${cls}`}>{f.label}</span>
      </div>
      <div className="fpm-track">
        <div className="fpm-fill" style={{width:`${Math.min(100,f.pct)}%`,background:`${c}33`}}>
          <div className="fpm-pin" style={{left:`${Math.min(98,f.pct)}%`,background:c}} />
        </div>
      </div>
    </div>
  );
}

export default function OfferCard({ offer, isBest, requirement, onShortlist, onReject, onSelect }) {
  const [showBD, setShowBD] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const { provider, score, status } = offer;
  if (!provider || !score) return null;

  const rejected = status === 'rejected';
  const shortlisted = status === 'shortlisted';
  const accepted = status === 'accepted';
  const priceOk = offer.price <= (requirement?.budgetMax || Infinity);
  const daysOk = offer.deliveryDays <= (requirement?.deliveryDays || 5);
  const whyNot = !isBest && !rejected ? getWhyNotMe(offer, requirement, score, provider) : null;

  return (
    <>
      <div className={`offer-card ${isBest?'best':''} ${shortlisted?'shortlisted':''} ${rejected?'rejected':''}`} id={`offer-${offer.id}`}>
        {isBest && <div className="best-badge">★ BEST MATCH</div>}
        <div className="offer-header">
          <div className="provider-avatar" style={{background:provider.avatarColor}}>{provider.avatar}</div>
          <div className="provider-info">
            <div className="provider-name">{provider.name}</div>
            <div className="provider-city">📍 {provider.city} · <span className="stars">{'★'.repeat(Math.round(provider.rating))}</span> {provider.rating}</div>
            <div className="badges-row">
              {provider.badges.map(b => <span key={b} className={`badge ${b==='Verified'?'badge-v':b==='Fast responder'?'badge-f':'badge-t'}`}>{b==='Verified'?'✓':b==='Fast responder'?'⚡':'🏆'} {b}</span>)}
            </div>
          </div>
          <ScoreRing score={score.total} size={68} onClick={() => setShowBD(p => !p)} />
        </div>
        <div className="metrics-grid">
          <div className="metric-box"><div className="metric-label">Price</div><div className={`metric-val ${priceOk?'good':'warn'}`}>₹{offer.price.toLocaleString('en-IN')}</div></div>
          <div className="metric-box"><div className="metric-label">Delivery</div><div className={`metric-val ${daysOk?'good':'warn'}`}>{offer.deliveryDays} days</div></div>
          <div className="metric-box"><div className="metric-label">Rating</div><div className="metric-val gold">{provider.rating}/5</div></div>
          <div className="metric-box"><div className="metric-label">Completed</div><div className="metric-val good">{Math.round(provider.completionRate*100)}%</div></div>
        </div>
        <p className="offer-pitch">{offer.message}</p>
        {requirement && <FPM price={offer.price} category={requirement.category} />}
        {showBD && <BreakdownPanel score={score} />}
        {whyNot && !showBD && (
          <div className="why-not"><div className="why-not-title">💡 How to rank higher</div><div className="why-not-text">{whyNot}</div></div>
        )}
        <div className="offer-actions">
          {!accepted && !rejected && (
            <>
              <button className="btn btn-crimson btn-sm" onClick={() => onSelect(offer.id)} id={`sel-${offer.id}`}>✅ Select</button>
              <button className={`btn btn-sm ${shortlisted?'btn-emerald':'btn-ghost'}`} onClick={() => onShortlist(offer.id)} id={`sl-${offer.id}`}>{shortlisted?'★ Listed':'☆ Shortlist'}</button>
              <button className="btn btn-ghost btn-sm" onClick={() => setShowChat(true)} id={`ch-${offer.id}`}>💬 Chat</button>
              <button className="btn btn-outline-crimson btn-sm" onClick={() => onReject(offer.id)} id={`rj-${offer.id}`}>✕</button>
            </>
          )}
          {accepted && <span style={{color:'var(--emerald)',fontWeight:800}}>✅ Selected</span>}
          {rejected && <button className="btn btn-ghost btn-xs" onClick={() => onShortlist(offer.id)}>↩ Undo</button>}
          <button className="btn btn-ghost btn-xs" onClick={() => setShowBD(p => !p)} style={{marginLeft:'auto'}} id={`bd-${offer.id}`}>
            {showBD ? '▲ Hide' : '📊 Detail'}
          </button>
        </div>
      </div>
      {showChat && <ChatDrawer offer={offer} onClose={() => setShowChat(false)} />}
    </>
  );
}
