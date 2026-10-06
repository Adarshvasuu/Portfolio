import { useRef, useCallback } from 'react';

const DOCK_ITEMS = [
  { id: 'landing', icon: '🏠', label: 'Home', iconCls: 'dock-icon-home' },
  { id: 'post', icon: '✏️', label: 'Post Need', iconCls: 'dock-icon-post' },
  { id: 'buyer', icon: '🛒', label: 'Dashboard', iconCls: 'dock-icon-buy' },
  { id: 'sep1', sep: true },
  { id: 'provider', icon: '🏪', label: 'Sell', iconCls: 'dock-icon-sell' },
  { id: 'chat', icon: '💬', label: 'Chat', iconCls: 'dock-icon-chat' },
  { id: 'sep2', sep: true },
  { id: 'reset', icon: '🔄', label: 'Reset', iconCls: 'dock-icon-reset' },
];

export default function Navbar({ page, onBuyer, onProvider, onLogo, onReset, onPost }) {
  const dockRef = useRef(null);

  const handleClick = (id) => {
    switch (id) {
      case 'landing': onLogo(); break;
      case 'post': if (onPost) onPost(); else onBuyer(); break;
      case 'buyer': onBuyer(); break;
      case 'provider': onProvider(); break;
      case 'reset': onReset(); break;
      default: break;
    }
  };

  const handleMouseMove = useCallback((e) => {
    if (!dockRef.current) return;
    const items = dockRef.current.querySelectorAll('.dock-item');
    items.forEach(item => {
      const rect = item.getBoundingClientRect();
      const center = rect.left + rect.width / 2;
      const dist = Math.abs(e.clientX - center);
      const maxDist = 120;
      const scale = Math.max(1, 1.45 - (dist / maxDist) * 0.45);
      item.style.setProperty('--scale', scale.toFixed(3));
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!dockRef.current) return;
    const items = dockRef.current.querySelectorAll('.dock-item');
    items.forEach(item => item.style.setProperty('--scale', '1'));
  }, []);

  const isActive = (id) => {
    if (id === 'landing' && page === 'landing') return true;
    if (id === 'buyer' && (page === 'buyer' || page === 'selected')) return true;
    if (id === 'post' && page === 'post') return true;
    if (id === 'provider' && page === 'provider') return true;
    return false;
  };

  return (
    <div className="dock-wrapper">
      <div
        className="dock"
        ref={dockRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {DOCK_ITEMS.map(item => {
          if (item.sep) return <div key={item.id} className="dock-separator" />;
          return (
            <button
              key={item.id}
              className={`dock-item ${isActive(item.id) ? 'active' : ''}`}
              onClick={() => handleClick(item.id)}
              aria-label={item.label}
              id={`dock-${item.id}`}
            >
              <div className={`dock-item-icon ${item.iconCls}`}
                style={{ transform: `scale(var(--scale, 1))` }}
              >
                {item.icon}
              </div>
              <span className="dock-item-label">{item.label}</span>
              <span className="dock-dot" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
