# Changelog

All notable changes to the RKN Premium Theme are documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/) and this project
adheres to [Semantic Versioning](https://semver.org/).

## [1.0.0] — 2026-07-01

First production release.

### Added

- **Salla Twilight theme** built on Twig, the Twilight JS SDK, Salla Web Components,
  Alpine.js, and Tailwind CSS — RTL-first, Arabic-first, mobile-first.
- **Design system** — token-driven colors, typography, spacing, radius, shadows, and
  motion (`src/assets/styles/tokens.css`), with a dark-mode foundation (off by default).
- **Layout** — `master.twig` document shell with SEO meta, Open Graph/Twitter, and
  Organization + WebSite (SearchAction) JSON-LD.
- **28 components** — header, mega menu, footer, hero slider, product card, category card,
  product gallery, product info, product tabs, reviews (summary + list), related products,
  recently viewed, filters, sort, pagination, breadcrumb, quantity, trust badges, FAQ,
  CTA, blog card, brand card, account sidebar, section title, empty state, rating stars,
  and an SVG icon sprite.
- **26 pages** — home, category/listing, product, search, cart, checkout, customer
  (dashboard, orders, profile, addresses, wishlist), compare, brands (index + single),
  blog (index + single), contact, about, FAQ, warranty, installation booking, business
  solutions, auth (login/register), CMS page, and a 404 error page.
- **Commerce** — cart drawer, wishlist, compare, smart search with live suggestions, and
  quick add-to-cart wired to Salla Web Components and `salla.event.*`.
- **Merchant customization** (`twilight.json`) — brand colors, dark-mode toggle, numerals,
  top bar, hero slides, homepage category collections, reviews provider, and lazy-load;
  brand colors regenerate the full palette at runtime.
- **SEO & structured data** — BreadcrumbList, Product + Offer + AggregateRating, Article,
  FAQPage, and LocalBusiness JSON-LD; canonical, `noindex` on empty search.
- **Performance** — lazy-loaded images with explicit dimensions, `fetchpriority` on the
  hero, `content-visibility` for off-screen homepage sections, async image decoding,
  scroll-snap carousels, and per-island JavaScript.
- **Accessibility (WCAG AA)** — semantic landmarks, skip link, visible focus, focus traps,
  ARIA for menus/tabs/combobox/live regions, and reduced-motion support.
- **Localization** — full `ar` (primary) and `en` parity across all UI strings.

[1.0.0]: https://github.com/rukn9940-cpu/-/releases/tag/v1.0.0
