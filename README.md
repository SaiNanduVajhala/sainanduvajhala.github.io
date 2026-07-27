# Sai Nandu Vajhala — AI & Machine Learning Portfolio

> **Live Site:** [https://sainandu.is-a.dev](https://sainandu.is-a.dev)  
> Specializing in low-latency AI agents, real-time audio assistants, and graph-based cognitive memory loops.

---

## 🌟 Overview & Engineering Highlights

This repository contains the source code for the personal portfolio of **Sai Nandu Vajhala**, an AI & Machine Learning Engineer from Hyderabad, India. Built with **React**, **TypeScript**, **Vite**, and **Framer Motion**, the site features production-grade architectural showcases, accessibility standards (WCAG AA/AAA), motion safety, and recruiter-focused project breakdowns.

---

## 🚀 Key Architectural Systems Showcased

1. **Oneiros — Cognitive Agent Memory OS**
   - Three-tier memory architecture (Working Memory, Long-Term Semantic Knowledge Graph via Cognee Cloud, and Infrastructure Caching with SQLite).
   - Automated Sleep-Stage Consolidation Daemon (N1 Replay, N2 DBSCAN Clustering, N3 Pruning, and REM Abstraction).
   - Sub-millisecond recall latency and interactive 3D WebGL force-directed visualizations.

2. **GPT-2 Autoregressive Code Completion Fine-Tuning**
   - Fine-tuned transformer on CodeXGLUE (13k+ code samples) with custom AST-aware tokenization.
   - Flash Attention & Mixed Precision (FP16) training achieving 1.19 validation loss and 3.28 perplexity.

3. **Emotion-Aware Real-Time Voice Assistant**
   - Full-duplex WebSocket architecture integrating MediaPipe landmark detection (468 facial points @ 30fps) and DeepFace 7-emotion classification.
   - Low-latency bi-directional speech pipeline (<600ms end-to-end latency) with ElevenLabs voice cloning and audio interrupt handling.

4. **Sales Forecasting & Demand Intelligence Engine**
   - Multi-source time series model benchmarking (SARIMA vs. Prophet vs. XGBoost).
   - Anomaly detection (Isolation Forest vs. Z-Score) and demand segmentation (K-Means + PCA).

---

## ♿ Accessibility, UI/UX, Performance & SEO Enhancements

The codebase adheres strictly to modern web standards, WCAG accessibility, and SEO best practices:

- **WCAG AA/AAA Contrast & Focus Rings**: High-contrast text tokens and dedicated `--focus-ring` design tokens (`3px solid var(--focus-ring)`) providing 14.8:1 contrast in Light mode and 14.2:1 contrast in Dark mode.
- **Motion Safety (`prefers-reduced-motion`)**: Comprehensive `@media (prefers-reduced-motion: reduce)` rules to disable heavy SVG turbulence filters and non-essential continuous animations.
- **Skip-to-Content & FOUC Prevention**: Hidden keyboard skip link targeting `<main id="main-content">` with critical inline styles in `<head>` to prevent Flash of Unstyled Content (FOUC) on hard refresh.
- **Semantic HTML & ARIA Landmarks**: `<nav role="navigation" aria-label="Main Navigation">` landmark, dynamic `aria-expanded` and `aria-controls` attributes on mobile navigation toggles and expandable project drawers.
- **Technical SEO & JSON-LD**: Embedded `Person`, `WebSite`, and `SoftwareApplication` JSON-LD schemas alongside preloaded Google Fonts (`&display=swap`).
- **External Link Security**: Strict `rel="noopener noreferrer"` attributes across all external profile, GitHub, and demo links.
- **Theme Persistence**: Dark/Light mode preferences persisted via `localStorage` and applied synchronously on first paint.

---

## 🛠️ Tech Stack & Tooling

- **Core**: React 19, TypeScript, Vite
- **Styling**: Modern Vanilla CSS Custom Properties, Responsive Glassmorphism, CSS Grid & Flexbox
- **Animations**: Framer Motion, Lucide Icons, Canvas/WebGL Shaders
- **Build Tooling**: Vite 8, TypeScript `tsc -b`

---

## 💻 Local Development & Build

### Prerequisites
- Node.js (v18+ recommended)
- npm or pnpm

### Installation & Run Dev Server
```bash
# Clone repository
git clone https://github.com/SaiNanduVajhala/sainanduvajhala.github.io.git
cd sainanduvajhala.github.io

# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build & Type Checking
```bash
# Run TypeScript compilation & Vite production build
npm run build

# Preview production build locally
npm run preview
```

---

## 📜 License & Copyright

© 2026 Sai Nandu Vajhala. Engineered with precision.
