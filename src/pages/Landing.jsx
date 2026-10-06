export default function Landing({ onBuyer, onProvider }) {
  const features = [
    { icon: '🗣', title: 'Post in Plain Language', desc: 'Type or speak your need. AI extracts all the details automatically.' },
    { icon: '📊', title: 'SmartMatch Score', desc: 'Every offer scored 0–100 with a full breakdown. No hidden ranking.' },
    { icon: '⚡', title: 'Providers Come to You', desc: 'Stop searching. Qualified providers send you targeted offers.' },
    { icon: '🎯', title: 'Compare Side-by-Side', desc: 'Best price, fastest, best match — highlighted automatically.' },
  ];

  return (
    <div style={{ flex: 1 }}>
      <section className="hero">
        <div className="hero-badge">✨ Needs-First Marketplace</div>
        <h1 className="hero-title">
          Don't search<br />for providers.<br />
          <span style={{ color: 'var(--clr-accent)', WebkitTextFillColor: 'var(--clr-accent)' }}>Let them find you.</span>
        </h1>
        <p className="hero-sub">
          Post your need once in plain language. AI structures it. Providers send targeted offers.
          A transparent score tells you exactly why one is better than another.
        </p>
        <div className="hero-actions">
          <button className="btn btn-primary" onClick={onBuyer} id="hero-buy-btn" style={{ fontSize: '1rem', padding: '14px 36px' }}>
            🛒 Post a Need
          </button>
          <button className="btn btn-outline" onClick={onProvider} id="hero-sell-btn" style={{ fontSize: '1rem', padding: '14px 36px' }}>
            🏪 I'm a Provider
          </button>
        </div>

        <div className="stats-row">
          {[['4.2k+', 'Needs posted'], ['12k+', 'Offers sent'], ['94%', 'Match satisfaction'], ['₹0', 'To post a need']].map(([num, lbl]) => (
            <div className="stat-item" key={lbl}>
              <div className="stat-num">{num}</div>
              <div className="stat-label">{lbl}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="features-grid">
        {features.map(f => (
          <div className="feature-card" key={f.title}>
            <div className="feature-icon">{f.icon}</div>
            <div className="feature-title">{f.title}</div>
            <div className="feature-desc">{f.desc}</div>
          </div>
        ))}
      </div>

      <div style={{ padding: '0 24px 60px', maxWidth: 860, margin: '0 auto' }}>
        <div className="card card-glow" style={{ background: 'linear-gradient(135deg, rgba(108,99,255,0.08), rgba(0,212,170,0.05))', border: '1px solid rgba(108,99,255,0.2)', textAlign: 'center', padding: '40px 32px' }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.1rem, 3vw, 1.5rem)', fontWeight: 700, lineHeight: 1.5, color: 'var(--clr-text)' }}>
            "On Amazon you search for products.<br />
            On ReverseMarket, <span style={{ color: 'var(--clr-primary)' }}>products and services search for you</span> —<br />
            and tell you why they deserve your money."
          </p>
        </div>
      </div>
    </div>
  );
}
