import { useState, useEffect } from 'react';
import { INITIAL_OFFERS, PROVIDERS } from './data/mockData.js';
import { scoreOffer } from './utils/scoring.js';
import Landing from './pages/Landing.jsx';
import BuyerFlow from './pages/BuyerFlow.jsx';
import ProviderFlow from './pages/ProviderFlow.jsx';
import Navbar from './components/Navbar.jsx';
import Toast from './components/Toast.jsx';
import FeaturesPanel from './components/FeaturesPanel.jsx';

const KEY = 'reversemarket_v2';

export default function App() {
  const [page, setPage] = useState('landing');
  const [requirement, setRequirement] = useState(null);
  const [offers, setOffers] = useState([]);
  const [statuses, setStatuses] = useState({});
  const [weights, setWeights] = useState({ R:35, B:25, D:20, Q:10, L:10 });
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [toast, setToast] = useState(null);

  // Clear old v1 storage key
  useEffect(() => {
    localStorage.removeItem('reversemarket_state');
    try {
      const s = JSON.parse(localStorage.getItem(KEY));
      if (s && s.requirement) {
        setRequirement(s.requirement);
        setOffers(s.offers || []);
        setStatuses(s.statuses || {});
        if (s.weights) setWeights(s.weights);
      }
    } catch (e) {
      console.warn('Failed to load state:', e);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify({ requirement, offers, statuses, weights }));
  }, [requirement, offers, statuses, weights]);

  const flash = (msg, icon = '✅') => {
    setToast({ msg, icon });
    setTimeout(() => setToast(null), 3000);
  };

  const scored = offers.map(o => {
    const p = PROVIDERS.find(x => x.id === o.providerId);
    if (!p || !requirement) return { ...o, score: null, provider: p };
    return { ...o, score: scoreOffer(o, requirement, weights, p), provider: p, status: statuses[o.id] || o.status };
  });

  const publish = (req) => {
    setRequirement(req);
    setOffers(INITIAL_OFFERS);
    setStatuses({});
    setPage('buyer');
    flash('Published! Providers are responding.', '🚀');
  };

  const addOffer = (o) => {
    setOffers(prev => [...prev, o]);
    flash('Offer submitted!', '📬');
  };

  const updateStatus = (id, st) => {
    setStatuses(prev => ({ ...prev, [id]: st }));
    if (st === 'accepted') {
      const offer = scored.find(o => o.id === id);
      setSelectedOffer(offer);
      setPage('selected');
      flash('Provider selected!', '🎉');
    }
  };

  const reset = () => {
    setRequirement(null);
    setOffers([]);
    setStatuses({});
    setSelectedOffer(null);
    setPage('landing');
    localStorage.removeItem(KEY);
  };

  const renderPage = () => {
    switch (page) {
      case 'landing':
        return <Landing onBuyer={() => setPage('post')} onProvider={() => setPage('provider')} />;
      case 'provider':
        return (
          <ProviderFlow
            requirement={requirement} offers={scored} weights={weights}
            onAddOffer={addOffer} onGoToBuyer={() => setPage(requirement ? 'buyer' : 'post')}
            showToast={flash}
          />
        );
      default:
        return (
          <BuyerFlow
            page={page} requirement={requirement} scoredOffers={scored}
            weights={weights} onWeightsChange={setWeights} onPublish={publish}
            onUpdateStatus={updateStatus} selectedOffer={selectedOffer}
            onNewNeed={() => setPage('post')} onReset={reset} showToast={flash}
          />
        );
    }
  };

  return (
    <div className="app">
      {renderPage()}
      <FeaturesPanel />
      <Navbar
        page={page}
        onBuyer={() => setPage(requirement ? 'buyer' : 'post')}
        onProvider={() => setPage('provider')}
        onLogo={() => setPage('landing')}
        onReset={reset}
        onPost={() => setPage('post')}
      />
      {toast && <Toast msg={toast.msg} icon={toast.icon} />}
    </div>
  );
}
