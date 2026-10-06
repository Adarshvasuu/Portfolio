// ==============================
// REVERSEMARKET — SmartMatch Scoring Engine
// ==============================
import { MARKET_BANDS } from '../data/mockData.js';

/**
 * Score a single offer against a requirement.
 * @param {Object} offer
 * @param {Object} requirement
 * @param {Object} weights - { R, B, D, Q, L } summing to 100
 * @param {Object} provider
 * @returns {Object} { total, breakdown, explanation }
 */
export function scoreOffer(offer, requirement, weights, provider) {
  const w = weights || { R: 35, B: 25, D: 20, Q: 10, L: 10 };

  // --- Relevance (R) ---
  const R_raw = (provider.relevanceScore / 35); // normalize to 0-1
  const R = Math.round(R_raw * w.R);

  // --- Budget (B) ---
  const { budgetMin, budgetMax } = requirement;
  const price = offer.price;
  let B_raw = 0;
  if (price <= budgetMax) {
    B_raw = 1; // within range
  } else {
    const over = (price - budgetMax) / budgetMax;
    if (over <= 0.10) B_raw = 0.6;
    else if (over <= 0.20) B_raw = 0.32;
    else B_raw = 0;
  }
  const B = Math.round(B_raw * w.B);

  // --- Deadline (D) ---
  const needed = requirement.deliveryDays;
  const offered = offer.deliveryDays;
  let D_raw = 0;
  if (offered < needed) D_raw = 1;
  else if (offered === needed) D_raw = 0.75;
  else D_raw = 0;
  const D = Math.round(D_raw * w.D);

  // --- Quality (Q) ---
  const q = provider.rating / 5 * 0.5 + provider.completionRate * 0.25 + provider.responseRate * 0.25;
  const Q = Math.round(q * w.Q);

  // --- Location (L) ---
  const buyerCity = requirement.location?.city?.toLowerCase() || '';
  const provCity = provider.city?.toLowerCase() || '';
  let L_raw = 0;
  if (requirement.location?.isRemote) L_raw = 1;
  else if (provCity === buyerCity) L_raw = 1;
  else if (provCity.includes('tirunelveli') || buyerCity.includes('tirunelveli')) L_raw = 0.5;
  else L_raw = 0.5; // same region
  const L = Math.round(L_raw * w.L);

  const total = Math.min(100, R + B + D + Q + L);

  // --- Explanation ---
  const parts = [];
  if (price <= budgetMax) parts.push('within budget');
  else parts.push(`${Math.round(((price - budgetMax) / budgetMax) * 100)}% over budget`);
  if (offered < needed) parts.push(`delivers ${needed - offered} day${needed - offered > 1 ? 's' : ''} early`);
  else if (offered === needed) parts.push('delivers on time');
  else parts.push(`misses deadline by ${offered - needed} day${offered - needed > 1 ? 's' : ''}`);
  if (provider.rating >= 4.5) parts.push('strong reviews');
  if (provCity === buyerCity) parts.push('local provider');
  const explanation = parts.map((p, i) => i === 0 ? p.charAt(0).toUpperCase() + p.slice(1) : p).join(', ') + '.';

  return {
    total,
    breakdown: { relevance: R, budget: B, deadline: D, quality: Q, location: L },
    explanation,
    maxBreakdown: { relevance: w.R, budget: w.B, deadline: w.D, quality: w.Q, location: w.L },
  };
}

/**
 * Get Fair Price Meter status for an offer
 */
export function getFairPriceMeter(price, category) {
  const band = MARKET_BANDS[category] || { low: 10000, mid: 20000, high: 40000 };
  if (price < band.low) return { status: 'below', label: '↓ Below Market', pct: (price / band.high) * 100 };
  if (price <= band.high) return { status: 'fair', label: '✓ Fair Price', pct: (price / band.high) * 100 };
  return { status: 'above', label: '↑ Above Market', pct: Math.min(100, (price / band.high) * 100) };
}

/**
 * Generate "Why not me?" tip for a lower-scoring offer
 */
export function getWhyNotMe(offer, requirement, score, provider) {
  const tips = [];
  const { budgetMax, deliveryDays } = requirement;

  if (offer.price > budgetMax) {
    const overAmt = offer.price - budgetMax;
    const suggestPrice = Math.round(budgetMax * 0.95);
    tips.push(`Your price is ₹${overAmt.toLocaleString('en-IN')} over budget. Dropping to ₹${suggestPrice.toLocaleString('en-IN')} would push you within range and boost your score significantly.`);
  }
  if (offer.deliveryDays > deliveryDays) {
    const late = offer.deliveryDays - deliveryDays;
    tips.push(`You're ${late} day${late > 1 ? 's' : ''} past the requested deadline. Delivering by day ${deliveryDays} would earn you the full deadline score.`);
  }
  if (provider.rating < 4.5) {
    tips.push(`Your average rating is ${provider.rating}/5. Completing more projects and earning reviews would improve your Quality score.`);
  }
  if (tips.length === 0) {
    tips.push('You scored competitively! Try highlighting more unique portfolio work in your pitch to stand out.');
  }
  return tips[0];
}

/**
 * Regex-based requirement extractor (fallback)
 */
export function extractRequirementRegex(text) {
  const result = {
    title: '',
    category: 'Photography',
    budgetMin: 15000,
    budgetMax: 20000,
    deliveryDays: 5,
    eventDate: '',
    location: { city: '', isRemote: false },
  };

  // Budget: ₹15,000–₹20,000 or 15k-20k or Rs.15000
  const budgetMatch = text.match(/(?:₹|rs\.?|inr)?\s*(\d+(?:[,.]?\d+)*)\s*k?\s*[-–to]+\s*(?:₹|rs\.?|inr)?\s*(\d+(?:[,.]?\d+)*)\s*k?/i);
  if (budgetMatch) {
    let min = parseFloat(budgetMatch[1].replace(/,/g, ''));
    let max = parseFloat(budgetMatch[2].replace(/,/g, ''));
    if (min < 1000) min *= 1000;
    if (max < 1000) max *= 1000;
    result.budgetMin = Math.round(min);
    result.budgetMax = Math.round(max);
  }

  // Single budget ₹20,000
  if (!budgetMatch) {
    const singleBudget = text.match(/(?:₹|rs\.?|inr)\s*(\d+(?:[,.]?\d+)*)\s*k?/i);
    if (singleBudget) {
      let val = parseFloat(singleBudget[1].replace(/,/g, ''));
      if (val < 1000) val *= 1000;
      result.budgetMin = Math.round(val * 0.8);
      result.budgetMax = Math.round(val);
    }
  }

  // Delivery days
  const daysMatch = text.match(/(\d+)\s*(?:days?|business\s*days?)/i);
  if (daysMatch) result.deliveryDays = parseInt(daysMatch[1]);

  // Date
  const dateMatch = text.match(/(\d{1,2})\s*(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\w*/i);
  if (dateMatch) {
    const months = { jan:1,feb:2,mar:3,apr:4,may:5,jun:6,jul:7,aug:8,sep:9,oct:10,nov:11,dec:12 };
    const m = months[dateMatch[2].toLowerCase().slice(0,3)];
    result.eventDate = `2026-${String(m).padStart(2,'0')}-${String(dateMatch[1]).padStart(2,'0')}`;
  }

  // City
  const cities = ['tirunelveli', 'chennai', 'bangalore', 'mumbai', 'delhi', 'hyderabad', 'coimbatore', 'madurai', 'pune', 'kolkata'];
  for (const city of cities) {
    if (text.toLowerCase().includes(city)) {
      result.location.city = city.charAt(0).toUpperCase() + city.slice(1);
      break;
    }
  }
  if (text.toLowerCase().includes('remote') || text.toLowerCase().includes('online')) {
    result.location.isRemote = true;
  }

  // Category
  const catMap = {
    'photo': 'Photography', 'videograph': 'Photography', 'shoot': 'Photography',
    'web': 'Web Development', 'website': 'Web Development', 'app': 'Web Development',
    'design': 'Graphic Design', 'logo': 'Graphic Design', 'brand': 'Graphic Design',
    'tutor': 'Tutoring', 'teach': 'Tutoring', 'class': 'Tutoring',
    'cater': 'Catering', 'food': 'Catering', 'cook': 'Catering',
    'repair': 'Home Repairs', 'fix': 'Home Repairs', 'plumb': 'Home Repairs',
    'video edit': 'Video Editing', 'edit': 'Video Editing',
    'writ': 'Writing & Content', 'content': 'Writing & Content', 'blog': 'Writing & Content',
    'music': 'Music & Audio', 'audio': 'Music & Audio', 'record': 'Music & Audio',
    'event': 'Event Planning', 'wedding': 'Event Planning', 'party': 'Event Planning',
  };
  for (const [kw, cat] of Object.entries(catMap)) {
    if (text.toLowerCase().includes(kw)) { result.category = cat; break; }
  }

  // Title (first meaningful line or auto-generated)
  const firstLine = text.split('\n')[0].trim().slice(0, 60);
  result.title = firstLine || `${result.category} service needed`;

  return result;
}
