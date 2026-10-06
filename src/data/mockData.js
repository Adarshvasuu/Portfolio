// ==============================
// REVERSEMARKET — Mock Data v2
// ==============================

export const CATEGORIES = [
  'Photography', 'Web Development', 'Graphic Design', 'Tutoring',
  'Catering', 'Home Repairs', 'Video Editing', 'Writing & Content',
  'Music & Audio', 'Event Planning', 'Interior Design', 'Legal Services',
];

export const MARKET_BANDS = {
  Photography: { low: 12000, mid: 18000, high: 25000 },
  'Web Development': { low: 25000, mid: 50000, high: 120000 },
  'Graphic Design': { low: 5000, mid: 12000, high: 30000 },
  Tutoring: { low: 800, mid: 1500, high: 3000 },
  Catering: { low: 20000, mid: 40000, high: 80000 },
  'Home Repairs': { low: 2000, mid: 6000, high: 15000 },
  'Video Editing': { low: 5000, mid: 12000, high: 25000 },
  'Writing & Content': { low: 3000, mid: 8000, high: 20000 },
  'Music & Audio': { low: 8000, mid: 20000, high: 45000 },
  'Event Planning': { low: 15000, mid: 35000, high: 70000 },
  'Interior Design': { low: 30000, mid: 80000, high: 200000 },
  'Legal Services': { low: 10000, mid: 30000, high: 100000 },
};

export const SAMPLE_REQUIREMENT = {
  id: 'req_101',
  buyerId: 'usr_buyer_01',
  title: 'Event Photographer · 8 hrs · Tirunelveli',
  description: 'Need an experienced event photographer for 8 hours on 20 November for a corporate conference in Tirunelveli. Must deliver 100+ colour-graded photos within 5 days. Budget is ₹15,000–₹20,000.',
  category: 'Photography',
  budgetMin: 15000,
  budgetMax: 20000,
  deliveryDays: 5,
  eventDate: '2026-11-20',
  location: { isRemote: false, city: 'Tirunelveli' },
  weights: { R: 35, B: 25, D: 20, Q: 10, L: 10 },
  status: 'open',
  createdAt: '2026-10-06T07:29:00Z',
};

export const PROVIDERS = [
  {
    id: 'prov_01', name: 'Lens & Light Studio',
    avatar: '📷', avatarColor: '#C41E3A',
    city: 'Tirunelveli', rating: 4.8,
    completionRate: 0.96, responseRate: 0.95,
    badges: ['Verified', 'Fast responder', 'Top Rated'],
    relevanceScore: 33,
  },
  {
    id: 'prov_02', name: 'PixelPerfect Pro',
    avatar: '🎞', avatarColor: '#3DAA6E',
    city: 'Tirunelveli', rating: 4.5,
    completionRate: 0.88, responseRate: 0.80,
    badges: ['Verified'],
    relevanceScore: 28,
  },
  {
    id: 'prov_03', name: 'ShutterCraft Media',
    avatar: '✨', avatarColor: '#D4AF37',
    city: 'Chennai', rating: 4.9,
    completionRate: 0.99, responseRate: 0.97,
    badges: ['Verified', 'Top Rated'],
    relevanceScore: 30,
  },
  {
    id: 'prov_04', name: 'Vivid Frames',
    avatar: '🖼', avatarColor: '#8B1628',
    city: 'Madurai', rating: 3.9,
    completionRate: 0.72, responseRate: 0.65,
    badges: [],
    relevanceScore: 20,
  },
  {
    id: 'prov_05', name: 'AuraShots Studio',
    avatar: '🌟', avatarColor: '#2E6ECC',
    city: 'Tirunelveli', rating: 4.6,
    completionRate: 0.91, responseRate: 0.88,
    badges: ['Verified', 'Fast responder'],
    relevanceScore: 31,
  },
  {
    id: 'prov_06', name: 'NexFrame Visuals',
    avatar: '🎬', avatarColor: '#CC6B2E',
    city: 'Coimbatore', rating: 4.3,
    completionRate: 0.85, responseRate: 0.78,
    badges: ['Verified'],
    relevanceScore: 24,
  },
];

export const INITIAL_OFFERS = [
  {
    id: 'off_501', requirementId: 'req_101', providerId: 'prov_01',
    price: 18000, deliveryDays: 3,
    message: 'Full 8-hour event coverage + 120 colour-graded RAW photos. Expert in corporate events. Based right in Tirunelveli — no travel surcharge.',
    status: 'submitted',
  },
  {
    id: 'off_502', requirementId: 'req_101', providerId: 'prov_02',
    price: 19500, deliveryDays: 5,
    message: '8-hour coverage, 100 edited photos, online gallery delivery. Experienced in corporate and product shoots.',
    status: 'submitted',
  },
  {
    id: 'off_503', requirementId: 'req_101', providerId: 'prov_03',
    price: 16500, deliveryDays: 7,
    message: 'Award-winning studio. 150 high-res images + short 60-sec teaser reel included. Based in Chennai but travel included.',
    status: 'submitted',
  },
  {
    id: 'off_504', requirementId: 'req_101', providerId: 'prov_04',
    price: 14000, deliveryDays: 10,
    message: 'Budget-friendly option. 80 edited photos. Starting out but enthusiastic!',
    status: 'submitted',
  },
  {
    id: 'off_505', requirementId: 'req_101', providerId: 'prov_05',
    price: 17500, deliveryDays: 4,
    message: 'Full-day coverage with drone shots, candid moments, and a photo book preview. 130+ photos delivered.',
    status: 'submitted',
  },
  {
    id: 'off_506', requirementId: 'req_101', providerId: 'prov_06',
    price: 21000, deliveryDays: 2,
    message: 'Premium express service: same-day preview gallery, 200+ photos in 48 hours. Includes a highlight reel.',
    status: 'submitted',
  },
];

export const SAMPLE_CHAT_MESSAGES = [
  { id: 1, sender: 'buyer', text: 'Hi! Can you confirm if the package includes a drone shot?', time: '10:02 AM' },
  { id: 2, sender: 'provider', text: 'Yes! We have a DJI Mini 4 Pro — we can do 15 minutes of aerial coverage at no extra charge. Would you like a sample reel?', time: '10:05 AM' },
  { id: 3, sender: 'buyer', text: 'That would be great, please share it!', time: '10:06 AM' },
  { id: 4, sender: 'provider', text: 'Here you go — https://example.com/drone-reel. Let me know if you need anything else!', time: '10:08 AM' },
];

export const NOVELTY_FEATURES = [
  { id: 'N1', icon: '📊', title: 'Explainable AI Match Score', desc: 'Every offer scored 0–100 with a breakdown you can trace. No hidden ranking.', tag: 'Core' },
  { id: 'N2', icon: '🗣', title: 'Voice + Text Intake', desc: 'Type or speak your need in plain language. AI extracts structured fields.', tag: 'Core' },
  { id: 'N3', icon: '📈', title: 'Completeness Gauge', desc: 'Live % bar that warns when key details are missing. Better questions = better offers.', tag: 'Core' },
  { id: 'N4', icon: '🎯', title: 'Provider Score Simulator', desc: 'Providers see their likely match score live while building an offer.', tag: 'Core' },
  { id: 'N5', icon: '⚡', title: 'Winner Highlighting', desc: 'Best value in each metric row highlighted automatically in the comparison table.', tag: 'Core' },
  { id: 'N6', icon: '🎚', title: '"What Matters Most?" Sliders', desc: 'Drag price/speed/quality sliders to re-weight and re-rank offers live.', tag: 'Novelty' },
  { id: 'N7', icon: '💎', title: 'Fair Price Meter', desc: 'Shows each quote as Below / Fair / Above the typical market band.', tag: 'Novelty' },
  { id: 'N8', icon: '💡', title: '"Why Not Me?" Feedback', desc: 'Lower-ranked providers get a tip on how to improve their score.', tag: 'Novelty' },
];

export const ALL_FEATURES = [
  { icon: '🤖', name: 'AI Requirement Intake', desc: 'Natural language + voice → structured JSON' },
  { icon: '📊', name: 'SmartMatch 0–100 Score', desc: 'Weighted formula: R35 + B25 + D20 + Q10 + L10' },
  { icon: '🔍', name: 'Explainable Breakdown', desc: 'Tap any score to see exactly why it earned each point' },
  { icon: '⚖️', name: 'Side-by-Side Comparison', desc: 'Table view with best-in-column highlighting' },
  { icon: '🎚', name: 'Weight Sliders', desc: 'Personalize ranking: drag price vs speed vs quality' },
  { icon: '💎', name: 'Fair Price Meter', desc: 'Below / Fair / Above market band per category' },
  { icon: '💡', name: 'Why Not Me? Tips', desc: 'Auto-generated improvement hints for providers' },
  { icon: '🗣', name: 'Voice Input', desc: 'Speak your need, Web Speech API transcribes it' },
  { icon: '📈', name: 'Completeness Gauge', desc: 'Live % bar with field-by-field chips' },
  { icon: '🎯', name: 'Live Score Preview', desc: 'Providers see score update as they type' },
  { icon: '💬', name: 'In-App Chat', desc: 'Negotiate and clarify before selecting' },
  { icon: '⭐', name: 'Shortlist & Reject', desc: 'Manage offers with one-click actions' },
  { icon: '🏷', name: 'Trust Badges', desc: 'Verified, Fast Responder, Top Rated' },
  { icon: '💾', name: 'Persistent State', desc: 'localStorage — survives page refresh' },
  { icon: '📱', name: 'Responsive Design', desc: 'Looks great on mobile, tablet, and desktop' },
];
