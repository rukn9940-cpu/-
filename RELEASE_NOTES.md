# Release Notes — RKN Premium Theme v1.0.0

**Release date:** 2026-07-01
**Platform:** Salla Twilight
**Status:** Production-ready

---

## Summary

RKN Premium is a bespoke, production-ready Salla storefront theme for ركن الاحتراف, a
Saudi security-systems retailer. It delivers a premium, enterprise-grade shopping
experience — RTL-first, Arabic-first, mobile-first, WCAG AA, and optimized for Core Web
Vitals — built natively on Salla Twilight with Alpine.js and Tailwind CSS.

## What's included

- **26 customer-facing pages** covering the full store journey: home, catalog, product,
  search, cart, checkout, the complete customer account area, compare, brands, blog,
  and all content/service pages (contact, about, FAQ, warranty, installation booking,
  business solutions), plus auth, CMS pages, and a 404 page.
- **28 reusable Twig components** composing every page.
- **Commerce wired to Salla** — cart drawer, wishlist, compare, smart search, quick
  add-to-cart, and reviews via Salla Web Components and the Twilight SDK event bus.
- **Merchant customization** through the theme settings: brand colors (which regenerate
  the whole palette at runtime), hero slides, homepage category collections, top bar,
  reviews provider, dark-mode toggle, numerals, and lazy-load.
- **SEO & structured data** across the theme (Organization, WebSite, Breadcrumb, Product,
  Article, FAQPage, LocalBusiness).

## Highlights

- Token-driven design system with a built-in (default-off) dark mode.
- App-like mobile experience with sticky header, bottom navigation, and off-canvas menu.
- Performance-focused: lazy images, hero `fetchpriority`, `content-visibility`,
  scroll-snap carousels, and per-island JavaScript.
- Complete `ar` / `en` localization with matching keys.

## Compatibility

- Salla Twilight (`^2.0.0`)
- Node.js ≥ 18 for local development

## Installation

See **[INSTALL.md](INSTALL.md)** for full installation, preview, build, and upload steps.

## Notes for merchants

- Set the homepage category collections in theme settings so the home product sliders
  populate (they read category IDs from settings).
- Dark mode is fully built but disabled by default for the first release; enable it from
  theme settings when desired.
- Numerals default to Western (0–9); switchable to Arabic-Indic in settings.

## Verification

- All Twig templates: tags balanced; every `include`/`extends` path resolves.
- `twilight.json`, `package.json`, and both locale files are valid JSON with matching
  `ar` / `en` keys.
- `app.js` passes syntax checks; `tailwind.config.js` and `postcss.config.js` load.
