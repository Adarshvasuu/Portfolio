import { useState } from 'react';
import { SAMPLE_REQUIREMENT, PROVIDERS } from '../data/mockData.js';
import { scoreOffer } from '../utils/scoring.js';

const DEMO_PROVIDER = PROVIDERS[0];

function LiveScorePreview({ price, days, requirement, weights }) {
  if (!requirement) return null;
  const mockOffer = { price: parseInt(price) || 0, deliveryDays: parseInt(days) || 5 };
  const score = scoreOffer(mockOffer, requirement, weights, DEMO_PROVIDER);
  const color = score.total >= 75 ? '#00d4aa' : score.total >= 50 ? '#f5a623' : '#ff6b6b';

  return (
    <div className="live-score-preview">
      <div>
        <div className="live-score-label">Your estimated match score</div>
        <div className="live-score-num" style={{ background: `linear-gradient(135deg, ${color}, #6c63ff)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          {score.total}
        </div>
      </div>
      <div className="live-score-info">
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 6 }}>
          {Object.entries(score.breakdown).map(([k, v]) => (
            <span key={k} style={{ fontSize: '0.75rem', color: 'var(--clr-text-muted)' }}>
              {k}: <strong style={{ color: 'var(--clr-text)' }}>{v}</strong>
            </span>
          ))}
        </div>
        <div className="live-score-sub">{score.explanation}</div>
      </div>
    </div>
  );
}

function OfferBuilder({ requirement, weights, onSubmit }) {
  const [form, setForm] = useState({ price: '', days: '', message: '', portfolio: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!form.price || !form.days || !form.message) {
      alert('Please fill in price, delivery days, and your pitch.');
      return;
    }
    onSubmit({
      id: `off_${Date.now()}`,
      requirementId: requirement?.id || 'req_101',
      providerId: DEMO_PROVIDER.id,
      price: parseInt(form.price),
      deliveryDays: parseInt(form.days),
      message: form.message,
      portfolioUrl: form.portfolio,
      status: 'submitted',
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 0' }}>
        <div style={{ fontSize: '3rem', marginBottom: 16 }}>📬</div>
        <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: 8 }}>Offer Submitted!</h2>
        <p style={{ color: 'var(--clr-text-muted)', marginBottom: 24 }}>The buyer can see your offer ranked in their dashboard.</p>
        <button className="btn btn-ghost" onClick={() => setSubmitted(false)} id="submit-another-btn">Submit Another</button>
      </div>
    );
  }

  return (
    <div className="offer-builder">
      <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: 6, fontSize: '1.2rem' }}>
        💼 Submit Your Offer
      </h2>
      <p style={{ color: 'var(--clr-text-muted)', fontSize: '0.85rem', marginBottom: 20 }}>
        Submitting as: <strong style={{ color: 'var(--clr-text)' }}>{DEMO_PROVIDER.name}</strong>
        {' · '}Adjust your price and days to improve your live score.
      </p>

      <LiveScorePreview price={form.price} days={form.days} requirement={requirement} weights={weights} />

      <div className="form-grid mb-4">
        <div className="form-group">
          <label className="form-label" htmlFor="offer-price">Your Price (₹)</label>
          <input className="form-input" id="offer-price" type="number" placeholder="18000" value={form.price} onChange={e => setForm(p => ({ ...p, price: e.target.value }))} />
          {requirement && form.price && (
            <span style={{ fontSize: '0.75rem', color: parseInt(form.price) <= requirement.budgetMax ? 'var(--clr-accent)' : 'var(--clr-accent2)', marginTop: 4 }}>
              {parseInt(form.price) <= requirement.budgetMax ? '✓ Within budget' : `⚠ ₹${(parseInt(form.price) - requirement.budgetMax).toLocaleString('en-IN')} over budget`}
            </span>
          )}
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="offer-days">Delivery Days</label>
          <input className="form-input" id="offer-days" type="number" placeholder="3" value={form.days} onChange={e => setForm(p => ({ ...p, days: e.target.value }))} />
          {requirement && form.days && (
            <span style={{ fontSize: '0.75rem', color: parseInt(form.days) <= requirement.deliveryDays ? 'var(--clr-accent)' : 'var(--clr-accent2)', marginTop: 4 }}>
              {parseInt(form.days) <= requirement.deliveryDays ? '✓ On time or early' : `⚠ ${parseInt(form.days) - requirement.deliveryDays} days late`}
            </span>
          )}
        </div>
      </div>

      <div className="form-group mb-4">
        <label className="form-label" htmlFor="offer-pitch">Your Pitch</label>
        <textarea className="form-textarea" id="offer-pitch" placeholder="Describe what you'll deliver, your experience, and why you're the right choice…" value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} />
      </div>

      <div className="form-group mb-4">
        <label className="form-label" htmlFor="offer-portfolio">Portfolio URL (optional)</label>
        <input className="form-input" id="offer-portfolio" placeholder="https://yourportfolio.com" value={form.portfolio} onChange={e => setForm(p => ({ ...p, portfolio: e.target.value }))} />
      </div>

      <button
        className="btn btn-primary"
        onClick={handleSubmit}
        id="submit-offer-btn"
        style={{ padding: '13px 36px', fontSize: '1rem' }}
      >
        📤 Submit Offer
      </button>
    </div>
  );
}

export default function ProviderFlow({ requirement, offers, weights, onAddOffer, onGoToBuyer, showToast }) {
  const [activeTab, setActiveTab] = useState('feed');
  const displayReq = requirement || SAMPLE_REQUIREMENT;

  const handleSubmit = (offer) => {
    onAddOffer(offer);
    showToast('Offer submitted! Switch to buyer view to see it ranked.', '📬');
  };

  return (
    <div className="main-content">
      <div className="section-header">
        <h1 className="section-title">Provider Dashboard</h1>
        <p className="section-sub">Find relevant needs and send targeted offers. Compete on fit, not spam.</p>
      </div>

      <div className="tabs">
        <button className={`tab ${activeTab === 'feed' ? 'active' : ''}`} onClick={() => setActiveTab('feed')} id="tab-feed">
          📋 Requirement Feed
        </button>
        <button className={`tab ${activeTab === 'offer' ? 'active' : ''}`} onClick={() => setActiveTab('offer')} id="tab-offer">
          💼 Submit Offer
        </button>
      </div>

      {activeTab === 'feed' && (
        <div className="feed-grid">
          <div className="req-card">
            <div className="req-cat">📷 {displayReq.category}</div>
            <div className="req-title">{displayReq.title}</div>
            <div className="req-desc">{displayReq.description}</div>
            <div className="req-meta">
              <div className="req-meta-item">💰 <strong>₹{displayReq.budgetMin?.toLocaleString('en-IN')} – ₹{displayReq.budgetMax?.toLocaleString('en-IN')}</strong></div>
              <div className="req-meta-item">⏱ Within <strong>{displayReq.deliveryDays} days</strong></div>
              <div className="req-meta-item">📍 <strong>{displayReq.location?.city || 'Remote'}</strong></div>
              <div className="req-meta-item">📅 <strong>{displayReq.eventDate || 'Flexible'}</strong></div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn btn-primary btn-sm" onClick={() => setActiveTab('offer')} id="apply-btn">
                Apply Now →
              </button>
              <button className="btn btn-ghost btn-sm" onClick={onGoToBuyer} id="view-buyer-btn">
                👁 View as Buyer
              </button>
            </div>
          </div>

          <div className="card" style={{ borderStyle: 'dashed', opacity: 0.5, textAlign: 'center', padding: '32px' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: 8 }}>🔍</div>
            <div style={{ fontWeight: 600, marginBottom: 4 }}>More needs matching your profile</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--clr-text-muted)' }}>Set up your provider profile to see more matched requirements</div>
          </div>
        </div>
      )}

      {activeTab === 'offer' && (
        <OfferBuilder requirement={displayReq} weights={weights} onSubmit={handleSubmit} />
      )}
    </div>
  );
}
