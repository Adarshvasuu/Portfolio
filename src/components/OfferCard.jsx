import { useState } from 'react';
import ScoreRing from './ScoreRing.jsx';
import BreakdownPanel from './BreakdownPanel.jsx';
import ChatDrawer from './ChatDrawer.jsx';
import { getFairPriceMeter, getWhyNotMe } from '../utils/scoring.js';

function FairPriceMeter({ price, category }) {
  const fpm = getFairPriceMeter(price, category);
  const cls = { below: 'fpm-below', fair: 'fpm-fair', above: 'fpm-above' }[fpm.status];
  const barColor = { below: '#00d4aa', fair: '#6c63ff', above: '#ff6b6b' }[fpm.status];
  return (
    <div className="fpm-wrap">
      <div className="fpm-label">Fair Price Meter</div>
      <div className="fpm-bar">
        <div className="fpm-fill" style={{ width: `${Math.min(100, fpm.pct)}%`, background: `${barColor}33` }}>
          <div className="fpm-indicator" style={{ left: `${Math.min(98, fpm.pct)}%`, background: barColor }} />
        </div>
      </div>
      <span className={`fpm-tag ${cls}`}>{fpm.label}</span>
    </div>
  );
}

export default function OfferCard({ offer, isBest, requirement, onShortlist, onReject, onSelect }) {
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const { provider, score, status } = offer;
  if (!provider || !score) return null;

  const isShortlisted = status === 'shortlisted';
  const isRejected = status === 'rejected';
  const isAccepted = status === 'accepted';
  const priceColor = offer.price <= (requirement?.budgetMax || Infinity) ? 'highlight' : 'warn';

  const whyNot = !isBest && !isRejected ? getWhyNotMe(offer, requirement, score, provider) : null;

  return (
    <>
      <div
        className={`offer-card card-glow ${isBest ? 'best' : ''} ${isShortlisted ? 'shortlisted' : ''} ${isRejected ? 'rejected' : ''}`}
        id={`offer-card-${offer.id}`}
      >
        {isBest && <div className="best-badge">⭐ BEST MATCH</div>}

        <div className="offer-header">
          <div
            className="provider-avatar"
            style={{ background: provider.avatarColor }}
          >
            {provider.avatar}
          </div>
          <div className="provider-info">
            <div className="provider-name">{provider.name}</div>
            <div className="provider-loc">📍 {provider.city}</div>
            <div className="badges-row">
              {provider.badges.map(b => (
                <span key={b} className={`badge ${b === 'Verified' ? 'badge-verified' : b === 'Fast responder' ? 'badge-fast' : 'badge-top'}`}>
                  {b === 'Verified' ? '✓' : b === 'Fast responder' ? '⚡' : '🏆'} {b}
                </span>
              ))}
            </div>
          </div>
          <ScoreRing
            score={score.total}
            size={68}
            onClick={() => setShowBreakdown(p => !p)}
          />
        </div>

        <div className="offer-metrics">
          <div className="metric-item">
            <div className="metric-label">Price</div>
            <div className={`metric-value ${priceColor}`}>
              ₹{offer.price.toLocaleString('en-IN')}
            </div>
          </div>
          <div className="metric-item">
            <div className="metric-label">Delivery</div>
            <div className={`metric-value ${offer.deliveryDays <= (requirement?.deliveryDays || 5) ? 'highlight' : 'warn'}`}>
              {offer.deliveryDays} days
            </div>
          </div>
          <div className="metric-item">
            <div className="metric-label">Rating</div>
            <div className="metric-value">
              <span className="stars">{'★'.repeat(Math.round(provider.rating))}</span>{' '}
              <span style={{ fontSize: '0.85rem', color: 'var(--clr-text-muted)' }}>{provider.rating}</span>
            </div>
          </div>
          <div className="metric-item">
            <div className="metric-label">Completion</div>
            <div className="metric-value highlight">{Math.round(provider.completionRate * 100)}%</div>
          </div>
        </div>

        <p className="offer-pitch">{offer.message}</p>

        {requirement && (
          <FairPriceMeter price={offer.price} category={requirement.category} />
        )}

        {showBreakdown && <BreakdownPanel score={score} />}

        {whyNot && !showBreakdown && (
          <div className="why-not-box">
            <div className="why-not-title">💡 How to rank higher:</div>
            <div className="why-not-text">{whyNot}</div>
          </div>
        )}

        <div className="offer-actions" style={{ marginTop: 14 }}>
          {!isAccepted && !isRejected && (
            <>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => onSelect(offer.id)}
                id={`select-btn-${offer.id}`}
              >
                ✅ Select
              </button>
              <button
                className={`btn btn-sm ${isShortlisted ? 'btn-accent' : 'btn-ghost'}`}
                onClick={() => onShortlist(offer.id)}
                id={`shortlist-btn-${offer.id}`}
              >
                {isShortlisted ? '★ Shortlisted' : '☆ Shortlist'}
              </button>
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => setShowChat(true)}
                id={`chat-btn-${offer.id}`}
              >
                💬 Message
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => onReject(offer.id)}
                id={`reject-btn-${offer.id}`}
              >
                ✕ Reject
              </button>
            </>
          )}
          {isAccepted && (
            <span style={{ color: 'var(--clr-accent)', fontWeight: 700, fontSize: '0.9rem' }}>✅ Selected</span>
          )}
          {isRejected && (
            <button className="btn btn-ghost btn-sm" onClick={() => onShortlist(offer.id)}>↩ Undo</button>
          )}
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => setShowBreakdown(p => !p)}
            id={`breakdown-btn-${offer.id}`}
          >
            {showBreakdown ? '▲ Hide Score' : '📊 Score Detail'}
          </button>
        </div>
      </div>
      {showChat && <ChatDrawer offer={offer} onClose={() => setShowChat(false)} />}
    </>
  );
}
