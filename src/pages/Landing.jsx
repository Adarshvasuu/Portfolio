import { useState } from 'react';
import { NOVELTY_FEATURES } from '../data/mockData.js';
import SpectralRibbon from '../components/SpectralRibbon.jsx';

export default function Landing({ onBuyer, onProvider }) {
  const [ribbonSpeed, setRibbonSpeed] = useState(0.85);

  return (
    <div style={{ flex: 1, position: 'relative' }}>
      {/* ── HERO WITH SPECTRAL RIBBON ── */}
      <SpectralRibbon
        speed={ribbonSpeed}
        intensity={1.2}
        thickness={1.15}
        grain={0.35}
        style={{
          borderBottom: '1px solid rgba(196,30,58,0.2)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
        }}
      >
        <section style={{
          padding: '84px 24px 60px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'visible',
        }}>
          {/* Orbs */}
          <div style={{
            position: 'absolute', width: 500, height: 500,
            background: 'radial-gradient(circle, rgba(196,30,58,0.2), transparent 70%)',
            borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none',
            top: -200, left: '50%', transform: 'translateX(-50%)', zIndex: 0,
          }} />
          <div style={{
            position: 'absolute', width: 300, height: 300,
            background: 'radial-gradient(circle, rgba(212,175,55,0.1), transparent 70%)',
            borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none',
            top: 0, right: '10%', zIndex: 0,
          }} />

          {/* Content */}
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 28, flexWrap: 'wrap', justifyContent: 'center' }}>
              <div className="hero-eyebrow" style={{ marginBottom: 0 }}>✦ NEEDS-FIRST MARKETPLACE ✦</div>
              <button
                onClick={() => setRibbonSpeed(s => (s > 0 ? 0 : 0.85))}
                title="Toggle Spectral Ribbon Animation"
                style={{
                  background: 'rgba(22,9,13,0.7)',
                  border: '1px solid rgba(212,175,55,0.3)',
                  borderRadius: '9999px',
                  padding: '5px 14px',
                  color: 'var(--text-secondary)',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  backdropFilter: 'blur(8px)',
                  transition: 'all 0.2s ease',
                }}
              >
                <span style={{
                  display: 'inline-block',
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: ribbonSpeed > 0 ? '#3DAA6E' : '#7D6B72',
                  boxShadow: ribbonSpeed > 0 ? '0 0 8px #3DAA6E' : 'none',
                }} />
                🌈 Spectral Ribbon: {ribbonSpeed > 0 ? 'Active' : 'Paused'}
              </button>
            </div>

            <h1 className="hero-title">
              <span className="hero-title-line1">Stop searching.</span>
              <span className="hero-title-line2">Let them find you.</span>
              <span className="hero-title-line3">Every score shows its working.</span>
            </h1>
            <p className="hero-sub">
              Post your need once in plain language. AI structures it. Providers compete on fit.
              A transparent SmartMatch score explains exactly why one offer deserves your money.
            </p>
            <div className="hero-actions">
              <button className="btn btn-crimson" onClick={onBuyer} id="hero-buy" style={{ fontSize: '1rem', padding: '14px 40px' }}>
                🛒 Post a Need
              </button>
              <button className="btn btn-gold" onClick={onProvider} id="hero-sell" style={{ fontSize: '1rem', padding: '14px 40px' }}>
                🏪 I'm a Provider
              </button>
            </div>

            {/* Stats */}
            <div className="stats-strip" style={{ marginTop: 56 }}>
              {[['4.2k+', 'Needs Posted'], ['12k+', 'Offers Sent'], ['94%', 'Match Rate'], ['₹0', 'To Post']].map(([n, l]) => (
                <div className="stat-cell" key={l}>
                  <span className="stat-num">{n}</span>
                  <span className="stat-lbl">{l}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </SpectralRibbon>

      {/* ── HOW IT WORKS ── */}
      <div className="flow-steps">
        {[
          ['1', '📝', 'Describe Your Need', 'Type or speak in plain language — AI extracts budget, deadline, category, location.'],
          ['2', '📬', 'Providers Send Offers', 'Matched providers see your need and send targeted, structured offers.'],
          ['3', '📊', 'SmartMatch Scores', 'Every offer scored 0–100 with a full explanation. Sort, compare, shortlist.'],
          ['4', '✅', 'Select & Connect', 'Chat, negotiate, and select the best provider. They get notified instantly.'],
        ].map(([num, ico, title, desc]) => (
          <div className="flow-step" key={num}>
            <div className="flow-num">{ico}</div>
            <div className="flow-title">{title}</div>
            <div className="flow-desc">{desc}</div>
          </div>
        ))}
      </div>

      {/* ── NOVELTY FEATURES ── */}
      <div className="novelty-section" style={{ marginTop: 64 }}>
        <div className="novelty-header">
          <div className="section-eyebrow"><span>What makes us different</span></div>
          <div className="novelty-title">Novelty Features</div>
          <div className="novelty-sub">The innovations that set ReverseMarket apart from every other marketplace.</div>
        </div>
        <div className="novelty-grid">
          {NOVELTY_FEATURES.map(f => (
            <div className="novelty-card" key={f.id}>
              <span className="novelty-card-num">{f.id}</span>
              <span className="novelty-card-icon">{f.icon}</span>
              <div className="novelty-card-title">{f.title}</div>
              <div className="novelty-card-desc">{f.desc}</div>
              <span className="novelty-card-tag">{f.tag === 'Core' ? '🔒' : '✨'} {f.tag}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── QUOTE ── */}
      <div style={{ padding: '0 24px 100px', maxWidth: 860, margin: '40px auto 0' }}>
        <div className="card card-crimson-glow" style={{
          background: 'linear-gradient(145deg, rgba(196,30,58,0.06), rgba(212,175,55,0.04))',
          border: '1px solid rgba(196,30,58,0.2)', textAlign: 'center', padding: '44px 32px',
        }}>
          <p style={{
            fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.1rem, 3vw, 1.6rem)',
            fontWeight: 700, lineHeight: 1.6, color: 'var(--text-primary)', fontStyle: 'italic',
          }}>
            "On Amazon you search for products.<br />
            On ReverseMarket, <span className="gradient-text" style={{ fontStyle: 'normal' }}>products and services search for you</span> —<br />
            and tell you why they deserve your money."
          </p>
        </div>
      </div>
    </div>
  );
}
