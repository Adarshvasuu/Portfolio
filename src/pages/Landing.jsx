import { NOVELTY_FEATURES } from '../data/mockData.js';
import TextRepel from '../components/TextRepel.jsx';

export default function Landing({ onBuyer, onProvider }) {
  return (
    <div style={{ flex: 1, position: 'relative' }}>
      {/* ── HERO ── */}
      <section style={{
        padding: '84px 24px 60px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'visible',
      }}>
        {/* Subtle Ambient Orbs */}
        <div style={{
          position: 'absolute', width: 500, height: 500,
          background: 'radial-gradient(circle, rgba(196,30,58,0.18), transparent 70%)',
          borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none',
          top: -200, left: '50%', transform: 'translateX(-50%)', zIndex: 0,
        }} />
        <div style={{
          position: 'absolute', width: 320, height: 320,
          background: 'radial-gradient(circle, rgba(212,175,55,0.14), transparent 70%)',
          borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none',
          top: 0, right: '10%', zIndex: 0,
        }} />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 28, flexWrap: 'wrap', justifyContent: 'center' }}>
            <div className="hero-eyebrow" style={{ marginBottom: 0 }}>✦ NEEDS-FIRST MARKETPLACE ✦</div>
            <span style={{
              background: 'rgba(22,9,13,0.75)',
              border: '1px solid rgba(212,175,55,0.35)',
              borderRadius: '9999px',
              padding: '5px 14px',
              color: 'var(--gold)',
              fontSize: '0.72rem',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 14px rgba(0,0,0,0.4)',
            }}>
              <span style={{
                display: 'inline-block',
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: '#3DAA6E',
                boxShadow: '0 0 8px #3DAA6E',
              }} />
              🌈 Spectral Atmosphere Active
            </span>
          </div>

          <h1 className="hero-title" style={{ userSelect: 'none' }}>
            <span className="hero-title-line1">
              <TextRepel
                text="Stop searching."
                radius={130}
                strength={50}
                letterClassName="hero-repel-line1"
              />
            </span>
            <span className="hero-title-line2">
              <TextRepel
                text="Let them find you."
                radius={130}
                strength={50}
                letterClassName="hero-repel-line2"
              />
            </span>
            <span className="hero-title-line3">
              <TextRepel
                text="Every score shows its working."
                radius={110}
                strength={40}
                letterClassName="hero-repel-line3"
              />
            </span>
          </h1>

          <div style={{ maxWidth: 640, margin: '0 auto 40px' }}>
            <p className="hero-sub hero-sub-glass">
              Post your need once in plain language. AI structures it. Providers compete on fit.
              A transparent SmartMatch score explains exactly why one offer deserves your money.
            </p>
          </div>

          <div className="hero-actions">
            <button
              className="btn btn-crimson"
              onClick={onBuyer}
              id="hero-buy"
              style={{
                fontSize: '1rem',
                padding: '14px 40px',
                boxShadow: '0 8px 30px rgba(196,30,58,0.5), 0 0 0 1px rgba(255,255,255,0.15)',
              }}
            >
              🛒 Post a Need
            </button>
            <button
              className="btn btn-gold"
              onClick={onProvider}
              id="hero-sell"
              style={{
                fontSize: '1rem',
                padding: '14px 40px',
                boxShadow: '0 8px 30px rgba(212,175,55,0.4), 0 0 0 1px rgba(255,255,255,0.15)',
              }}
            >
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
          background: 'linear-gradient(145deg, rgba(196,30,58,0.12), rgba(212,175,55,0.08))',
          border: '1px solid rgba(196,30,58,0.25)', textAlign: 'center', padding: '44px 32px',
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
