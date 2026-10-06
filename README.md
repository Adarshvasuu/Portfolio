# 🔄 ReverseMarket

> **Don't search for providers. Let them find you.**

ReverseMarket is a needs-first reverse marketplace for services. Buyers post a need once in plain language; AI structures it; providers send targeted offers; a transparent SmartMatch score explains exactly why one offer is better than another.

## 🚀 Live Demo

**Local:** `npm run dev` → http://localhost:5173

## ✨ Features

| # | Feature | Description |
|---|---|---|
| N1 | **Explainable AI Match Score** | Every offer scored 0–100 with a full breakdown (Relevance 35 + Budget 25 + Deadline 20 + Quality 10 + Location 10) |
| N2 | **Voice + Text Intake** | Type or speak your need; AI extracts structured fields |
| N3 | **Completeness Gauge** | Live % bar that improves offer quality |
| N4 | **Provider Score Simulator** | Live score preview while building an offer |
| N5 | **Winner Highlighting** | Best value in each column highlighted automatically |
| N6 | **Weight Sliders** | Re-rank offers live by dragging price/speed/quality sliders |
| N7 | **Fair Price Meter** | Below/Fair/Above market band per category |
| N8 | **"Why not me?" Tips** | Auto-generated improvement hints for lower-ranked providers |

## 🛠 Stack

- **React + Vite** (no backend, all client-side)
- **Vanilla CSS** (custom design system, dark mode)
- **localStorage** for state persistence
- **Web Speech API** for voice input (Chrome)
- **Regex-based** requirement extraction (Gemini API ready as drop-in)

## 📦 Getting Started

```bash
npm install
npm run dev
```

## 🏗 Project Structure

```
src/
  components/   # Navbar, ScoreRing, BreakdownPanel, OfferCard, ChatDrawer, WeightSliders, CompletenessGauge
  pages/        # Landing, BuyerFlow, ProviderFlow
  data/         # mockData.js (providers, offers, market bands)
  utils/        # scoring.js (SmartMatch engine, FPM, WhyNotMe)
```

## 📊 SmartMatch Formula

```
Score = R (relevance 35) + B (budget 25) + D (deadline 20) + Q (quality 10) + L (location 10)
```

Budget logic: within range = 25pts, ≤10% over = 15pts, ≤20% over = 8pts, >20% = 0
Deadline: early = 20pts, on time = 15pts, late = 0

## 💡 One-line Pitch

*"On Amazon you search for products. On ReverseMarket, products and services search for you — and tell you why they deserve your money."*
