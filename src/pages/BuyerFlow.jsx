import { useState, useRef } from 'react';
import { CATEGORIES } from '../data/mockData.js';
import { extractRequirementRegex } from '../utils/scoring.js';
import CompletenessGauge from '../components/CompletenessGauge.jsx';
import OfferCard from '../components/OfferCard.jsx';
import WeightSliders from '../components/WeightSliders.jsx';

const EXAMPLE_TEXT = `Need an experienced event photographer for 8 hours on 20 November for a corporate conference in Tirunelveli. Must deliver 100+ colour-graded photos within 5 days. Budget is ₹15,000–₹20,000.`;

const SORT_OPTIONS = [
  { key: 'score', label: '⭐ Best Match' },
  { key: 'price', label: '💰 Lowest Price' },
  { key: 'days', label: '⚡ Fastest' },
  { key: 'rating', label: '🏆 Top Rated' },
];

// Post Need sub-view
function PostNeed({ onPublish }) {
  const [rawText, setRawText] = useState('');
  const [fields, setFields] = useState({ title: '', category: 'Photography', budgetMin: '', budgetMax: '', deliveryDays: '', eventDate: '', city: '' });
  const [isExtracting, setIsExtracting] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef(null);

  const gaugeFields = {
    title: fields.title,
    category: fields.category,
    budgetMin: fields.budgetMin ? parseInt(fields.budgetMin) : 0,
    budgetMax: fields.budgetMax ? parseInt(fields.budgetMax) : 0,
    deliveryDays: fields.deliveryDays ? parseInt(fields.deliveryDays) : 0,
    eventDate: fields.eventDate,
    city: fields.city,
  };

  const extract = async () => {
    if (!rawText.trim()) return;
    setIsExtracting(true);
    await new Promise(r => setTimeout(r, 600));
    const extracted = extractRequirementRegex(rawText);
    setFields({
      title: extracted.title,
      category: extracted.category,
      budgetMin: extracted.budgetMin,
      budgetMax: extracted.budgetMax,
      deliveryDays: extracted.deliveryDays,
      eventDate: extracted.eventDate,
      city: extracted.location?.city || '',
    });
    setIsExtracting(false);
  };

  const toggleVoice = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Speech recognition not supported in this browser. Try Chrome.');
      return;
    }
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
      return;
    }
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    const rec = new SpeechRec();
    rec.continuous = true; rec.interimResults = true; rec.lang = 'en-IN';
    rec.onresult = (e) => {
      let transcript = '';
      for (let i = 0; i < e.results.length; i++) transcript += e.results[i][0].transcript;
      setRawText(transcript);
    };
    rec.onend = () => setIsRecording(false);
    rec.start();
    recognitionRef.current = rec;
    setIsRecording(true);
  };

  const handlePublish = () => {
    if (!fields.title || !fields.budgetMax) { alert('Please fill in at least a title and max budget.'); return; }
    onPublish({
      id: `req_${Date.now()}`,
      buyerId: 'usr_buyer_01',
      title: fields.title,
      description: rawText || fields.title,
      category: fields.category,
      budgetMin: parseInt(fields.budgetMin) || 0,
      budgetMax: parseInt(fields.budgetMax) || 0,
      deliveryDays: parseInt(fields.deliveryDays) || 5,
      eventDate: fields.eventDate,
      location: { city: fields.city, isRemote: !fields.city },
      weights: { R: 35, B: 25, D: 20, Q: 10, L: 10 },
      status: 'open',
      createdAt: new Date().toISOString(),
    });
  };

  return (
    <div className="main-content" style={{ maxWidth: 700 }}>
      <div className="section-header">
        <h1 className="section-title">Post a Need</h1>
        <p className="section-sub">Describe what you need in plain language. AI will structure it for you.</p>
      </div>

      <div className="card mb-6" style={{ position: 'relative' }}>
        <div className="form-group mb-4">
          <label className="form-label">Describe your need</label>
          <div style={{ display: 'flex', gap: 8 }}>
            <textarea
              className="form-textarea"
              placeholder="e.g. Need an event photographer for 8 hours on 20 November in Tirunelveli, budget ₹15,000–₹20,000, deliver photos in 5 days…"
              value={rawText}
              onChange={e => setRawText(e.target.value)}
              style={{ minHeight: 110 }}
              id="need-textarea"
            />
            <button
              className={`voice-btn ${isRecording ? 'recording' : ''}`}
              onClick={toggleVoice}
              title={isRecording ? 'Stop recording' : 'Use voice input'}
              id="voice-btn"
            >
              {isRecording ? '⏹' : '🎤'}
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
          <button
            className="btn btn-primary"
            onClick={extract}
            disabled={!rawText.trim() || isExtracting}
            id="extract-btn"
          >
            {isExtracting ? '⏳ Extracting…' : '✨ Fill details for me'}
          </button>
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => setRawText(EXAMPLE_TEXT)}
            id="example-btn"
          >
            Try example
          </button>
        </div>

        <div className="form-grid mb-4">
          <div className="form-group" style={{ gridColumn: '1/-1' }}>
            <label className="form-label" htmlFor="field-title">Title</label>
            <input className="form-input" id="field-title" placeholder="Brief title for your requirement" value={fields.title} onChange={e => setFields(p => ({ ...p, title: e.target.value }))} />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="field-category">Category</label>
            <select className="form-select" id="field-category" value={fields.category} onChange={e => setFields(p => ({ ...p, category: e.target.value }))}>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="field-city">City</label>
            <input className="form-input" id="field-city" placeholder="e.g. Tirunelveli" value={fields.city} onChange={e => setFields(p => ({ ...p, city: e.target.value }))} />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="field-budget-min">Min Budget (₹)</label>
            <input className="form-input" id="field-budget-min" type="number" placeholder="15000" value={fields.budgetMin} onChange={e => setFields(p => ({ ...p, budgetMin: e.target.value }))} />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="field-budget-max">Max Budget (₹)</label>
            <input className="form-input" id="field-budget-max" type="number" placeholder="20000" value={fields.budgetMax} onChange={e => setFields(p => ({ ...p, budgetMax: e.target.value }))} />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="field-days">Deliver Within (days)</label>
            <input className="form-input" id="field-days" type="number" placeholder="5" value={fields.deliveryDays} onChange={e => setFields(p => ({ ...p, deliveryDays: e.target.value }))} />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="field-date">Event Date</label>
            <input className="form-input" id="field-date" type="date" value={fields.eventDate} onChange={e => setFields(p => ({ ...p, eventDate: e.target.value }))} />
          </div>
        </div>

        <CompletenessGauge fields={gaugeFields} />

        <div style={{ marginTop: 20 }}>
          <button
            className="btn btn-primary"
            onClick={handlePublish}
            disabled={!fields.title}
            id="publish-btn"
            style={{ padding: '13px 36px', fontSize: '1rem' }}
          >
            🚀 Publish Requirement
          </button>
        </div>
      </div>
    </div>
  );
}

// Comparison dashboard
function Dashboard({ scoredOffers, requirement, weights, onWeightsChange, onUpdateStatus, showToast }) {
  const [sortKey, setSortKey] = useState('score');
  const [showTable, setShowTable] = useState(false);

  const activeOffers = scoredOffers.filter(o => o.score);
  const sorted = [...activeOffers].sort((a, b) => {
    if (sortKey === 'score') return b.score.total - a.score.total;
    if (sortKey === 'price') return a.price - b.price;
    if (sortKey === 'days') return a.deliveryDays - b.deliveryDays;
    if (sortKey === 'rating') return b.provider.rating - a.provider.rating;
    return 0;
  });

  const best = sorted.find(o => o.status !== 'rejected')?.id;

  // Compute best values for table highlighting
  const lowestPrice = Math.min(...activeOffers.map(o => o.price));
  const fastestDays = Math.min(...activeOffers.map(o => o.deliveryDays));
  const highestRating = Math.max(...activeOffers.map(o => o.provider.rating));
  const highestScore = Math.max(...activeOffers.map(o => o.score?.total || 0));

  const handleShortlist = (id) => {
    const offer = scoredOffers.find(o => o.id === id);
    const nextStatus = offer?.status === 'shortlisted' ? 'submitted' : 'shortlisted';
    onUpdateStatus(id, nextStatus);
    if (nextStatus === 'shortlisted') showToast('Added to shortlist!', '★');
  };

  return (
    <div className="main-content">
      <div className="section-header">
        <h1 className="section-title">Comparison Dashboard</h1>
        <p className="section-sub">
          {activeOffers.length} offers for: <strong>{requirement?.title}</strong>
          {' · '}Budget: ₹{requirement?.budgetMin?.toLocaleString('en-IN')} – ₹{requirement?.budgetMax?.toLocaleString('en-IN')}
        </p>
      </div>

      <WeightSliders weights={weights} onChange={onWeightsChange} />

      <div className="sort-bar">
        {SORT_OPTIONS.map(s => (
          <button
            key={s.key}
            className={`sort-pill ${sortKey === s.key ? 'active' : ''}`}
            onClick={() => setSortKey(s.key)}
            id={`sort-${s.key}`}
          >
            {s.label}
          </button>
        ))}
        <button
          className={`sort-pill ${showTable ? 'active' : ''}`}
          onClick={() => setShowTable(p => !p)}
          id="toggle-table-btn"
          style={{ marginLeft: 'auto' }}
        >
          📋 Table View
        </button>
      </div>

      {/* Cards */}
      <div style={{ display: 'grid', gap: 16, marginBottom: 32 }}>
        {sorted.map(offer => (
          <OfferCard
            key={offer.id}
            offer={offer}
            isBest={offer.id === best && offer.status !== 'rejected'}
            requirement={requirement}
            onShortlist={handleShortlist}
            onReject={(id) => { onUpdateStatus(id, 'rejected'); showToast('Offer rejected.', '✕'); }}
            onSelect={(id) => onUpdateStatus(id, 'accepted')}
          />
        ))}
      </div>

      {/* Comparison Table */}
      {showTable && (
        <div style={{ overflowX: 'auto', marginBottom: 32 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: 14, fontSize: '1.1rem' }}>Side-by-Side Comparison</h2>
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Provider</th>
                <th>Match Score</th>
                <th>Price</th>
                <th>Delivery</th>
                <th>Rating</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map(offer => (
                <tr key={offer.id} className={offer.id === best && offer.status !== 'rejected' ? 'table-highlight' : ''}>
                  <td>
                    <span>{offer.provider.avatar} </span>
                    <strong>{offer.provider.name}</strong>
                  </td>
                  <td className={offer.score?.total === highestScore ? 'table-best' : ''}>
                    {offer.score?.total}/100
                  </td>
                  <td className={offer.price === lowestPrice ? 'table-best' : ''}>
                    ₹{offer.price.toLocaleString('en-IN')}
                  </td>
                  <td className={offer.deliveryDays === fastestDays ? 'table-best' : ''}>
                    {offer.deliveryDays} days
                  </td>
                  <td className={offer.provider.rating === highestRating ? 'table-best' : ''}>
                    {offer.provider.rating}
                  </td>
                  <td>{offer.provider.city}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// Selected confirmation
function SelectedScreen({ selectedOffer, onNewNeed, onReset }) {
  const provider = selectedOffer?.provider;
  const score = selectedOffer?.score;
  return (
    <div className="confirm-screen">
      <div className="confirm-icon">🎉</div>
      <h1 className="confirm-title">Provider Selected!</h1>
      <p className="confirm-sub">You've chosen <strong>{provider?.name}</strong>. They've been notified and will reach out shortly.</p>
      <div className="confirm-summary">
        {[
          ['Provider', provider?.name],
          ['Match Score', `${score?.total}/100`],
          ['Price', `₹${selectedOffer?.price?.toLocaleString('en-IN')}`],
          ['Delivery', `${selectedOffer?.deliveryDays} days`],
          ['Rating', `${provider?.rating}/5`],
        ].map(([label, val]) => (
          <div className="confirm-row" key={label}>
            <span className="confirm-row-label">{label}</span>
            <span className="confirm-row-val">{val}</span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        <button className="btn btn-primary" onClick={onNewNeed} id="new-need-btn">+ Post Another Need</button>
        <button className="btn btn-ghost" onClick={onReset} id="reset-btn">🏠 Home</button>
      </div>
    </div>
  );
}

export default function BuyerFlow({ page, requirement, scoredOffers, weights, onWeightsChange, onPublish, onUpdateStatus, selectedOffer, onNewNeed, onReset, showToast }) {
  if (page === 'post' || !requirement) return <PostNeed onPublish={onPublish} />;
  if (page === 'selected' && selectedOffer) return <SelectedScreen selectedOffer={selectedOffer} onNewNeed={onNewNeed} onReset={onReset} />;
  return (
    <Dashboard
      scoredOffers={scoredOffers}
      requirement={requirement}
      weights={weights}
      onWeightsChange={onWeightsChange}
      onUpdateStatus={onUpdateStatus}
      showToast={showToast}
    />
  );
}
