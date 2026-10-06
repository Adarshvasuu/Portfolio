import { useState, useEffect } from 'react';
import { SAMPLE_REQUIREMENT, INITIAL_OFFERS, PROVIDERS } from './data/mockData.js';
import { scoreOffer } from './utils/scoring.js';
import Landing from './pages/Landing.jsx';
import BuyerFlow from './pages/BuyerFlow.jsx';
import ProviderFlow from './pages/ProviderFlow.jsx';
import Navbar from './components/Navbar.jsx';
import Toast from './components/Toast.jsx';

const STORAGE_KEY = 'reversemarket_state';

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return null;
}

export default function App() {
  const [page, setPage] = useState('landing'); // landing | buyer | provider
  const [requirement, setRequirement] = useState(null);
  const [offers, setOffers] = useState([]);
  const [offerStatuses, setOfferStatuses] = useState({}); // { offerId: 'submitted' | 'shortlisted' | 'rejected' | 'accepted' }
  const [weights, setWeights] = useState({ R: 35, B: 25, D: 20, Q: 10, L: 10 });
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [toast, setToast] = useState(null);

  // Rehydrate from localStorage
  useEffect(() => {
    const saved = loadState();
    if (saved) {
      if (saved.requirement) setRequirement(saved.requirement);
      if (saved.offers?.length) setOffers(saved.offers);
      if (saved.offerStatuses) setOfferStatuses(saved.offerStatuses);
      if (saved.weights) setWeights(saved.weights);
    }
  }, []);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ requirement, offers, offerStatuses, weights }));
  }, [requirement, offers, offerStatuses, weights]);

  const showToast = (msg, icon = '✅') => {
    setToast({ msg, icon });
    setTimeout(() => setToast(null), 3000);
  };

  // Compute scored offers
  const scoredOffers = offers.map(offer => {
    const provider = PROVIDERS.find(p => p.id === offer.providerId);
    if (!provider || !requirement) return { ...offer, score: null };
    const score = scoreOffer(offer, requirement, weights, provider);
    return { ...offer, score, provider, status: offerStatuses[offer.id] || offer.status };
  });

  const publishRequirement = (req) => {
    setRequirement(req);
    setOffers(INITIAL_OFFERS);
    setOfferStatuses({});
    setPage('buyer');
    showToast('Requirement published! Providers are sending offers.', '🚀');
  };

  const addOffer = (offer) => {
    setOffers(prev => [...prev, offer]);
    showToast('Your offer has been submitted!', '📬');
  };

  const updateOfferStatus = (offerId, status) => {
    setOfferStatuses(prev => ({ ...prev, [offerId]: status }));
    if (status === 'accepted') {
      const offer = scoredOffers.find(o => o.id === offerId);
      setSelectedOffer(offer);
      setPage('selected');
      showToast('Provider selected! They\'ve been notified.', '🎉');
    }
  };

  const resetAll = () => {
    setRequirement(null);
    setOffers([]);
    setOfferStatuses({});
    setSelectedOffer(null);
    setPage('landing');
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <div className="app">
      <Navbar
        page={page}
        onBuyer={() => setPage(requirement ? 'buyer' : 'post')}
        onProvider={() => setPage('provider')}
        onLogo={() => setPage('landing')}
        onReset={resetAll}
      />
      {page === 'landing' && (
        <Landing
          onBuyer={() => setPage('post')}
          onProvider={() => setPage('provider')}
        />
      )}
      {(page === 'buyer' || page === 'post' || page === 'selected') && (
        <BuyerFlow
          page={page}
          requirement={requirement}
          scoredOffers={scoredOffers}
          weights={weights}
          onWeightsChange={setWeights}
          onPublish={publishRequirement}
          onUpdateStatus={updateOfferStatus}
          selectedOffer={selectedOffer}
          onNewNeed={() => setPage('post')}
          onReset={resetAll}
          showToast={showToast}
        />
      )}
      {page === 'provider' && (
        <ProviderFlow
          requirement={requirement}
          offers={scoredOffers}
          weights={weights}
          onAddOffer={addOffer}
          onGoToBuyer={() => setPage(requirement ? 'buyer' : 'post')}
          showToast={showToast}
        />
      )}
      {toast && <Toast msg={toast.msg} icon={toast.icon} />}
    </div>
  );
}
