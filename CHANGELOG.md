# Portfolio Enhancements Changelog

## [1.1.0] - 2026-07-27

### Added
- **Inline Critical CSS**: Prevented Flash of Unstyled Content (FOUC) on the `.skip-to-content` link during hard refreshes.
- **Accessibility Skip Link**: `<a href="#main-content" class="skip-to-content">` as the first focusable DOM element inside `<body>`.
- **Landmark Accessibility**: Enclosed header navigation in `<nav role="navigation" aria-label="Main Navigation">`.
- **Keyboard Navigation Focus**: High-contrast `:focus-visible` ring indicators (`outline: 2px solid var(--accent)`).
- **Structured Data**: Added `SoftwareApplication` JSON-LD schema for projects alongside `Person` and `WebSite` schemas in `index.html`.
- **Design Tokens**: Defined custom spacing CSS variables (`--space-1` through `--space-12`) in `index.css`.
- **Secondary CTA**: Added `see.projects()` CTA button in `Hero.tsx` alongside `view.resume()`.

### Fixed & Improved
- **Motion Safety**: Added `@media (prefers-reduced-motion: reduce)` media query in `index.css` to disable heavy SVG turbulence filters and non-essential animations.
- **Contrast Ratios**: Adjusted `--text-muted` (`#7d756b` / `#88827e`) and `--text-secondary` tokens for WCAG AA compliance (≥4.5:1).
- **Mobile Menu ARIA Attributes**: Added `aria-expanded`, `aria-controls="navbar-dropdown-menu"`, and dynamic `aria-label` to hamburger toggle in `Navbar.tsx`.
- **Link Security**: Ensured `rel="noopener noreferrer"` across all external social and GitHub project links.
- **Font Loading Optimization**: Google Fonts configured with `&display=swap` to eliminate invisible text during initial page paint.
- **Dark Mode Persistence**: User theme preference persisted in `localStorage` and synchronized on first paint.
