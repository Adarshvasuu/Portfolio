export default function Navbar({ page, onBuyer, onProvider, onLogo, onReset }) {
  return (
    <nav className="navbar">
      <a className="navbar-logo" onClick={onLogo} style={{ cursor: 'pointer' }}>
        <div className="navbar-logo-icon">🔄</div>
        ReverseMarket
      </a>
      <div className="role-toggle">
        <button
          className={`role-btn ${(page === 'buyer' || page === 'post' || page === 'selected') ? 'active' : ''}`}
          onClick={onBuyer}
          id="nav-buyer-btn"
        >
          🛒 I'm Buying
        </button>
        <button
          className={`role-btn ${page === 'provider' ? 'active' : ''}`}
          onClick={onProvider}
          id="nav-provider-btn"
        >
          🏪 I'm Selling
        </button>
      </div>
    </nav>
  );
}
