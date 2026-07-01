# RKN Premium Theme — ركن الاحتراف

A premium, production-ready **Salla Twilight** storefront theme for **ركن الاحتراف**
(RKN — Security Systems & Solutions), Saudi Arabia.

**Version 1.0.0** · RTL-first · Arabic-first · Mobile-first · WCAG AA · Core Web Vitals optimized

---

## Overview

RKN Premium Theme is a bespoke storefront for a Saudi security-systems retailer
(IP / WiFi / Solar / 4G cameras, NVR/DVR, access control, intercom, networking, storage,
and installation services). It is built natively on Salla's **Twilight** theme engine
using Twig, the Twilight JS SDK, Salla Web Components, Alpine.js, and Tailwind CSS.

## Highlights

- **RTL & Arabic first** — authored for right-to-left with logical properties throughout; full `ar` / `en` localization.
- **Mobile first & responsive** — designed from small screens up, with an app-like bottom navigation.
- **Premium design system** — token-driven colors, typography, spacing, radius, shadows and motion (`src/assets/styles/tokens.css`); dark-mode foundation built in (off by default).
- **Conversion-focused** — sticky header, smart search, mega menu, quick add-to-cart, cart drawer, wishlist, compare, cross-sell, trust signals.
- **Merchant customization** — brand colors, hero slides, homepage category collections, top bar, reviews provider and more via the theme settings (`twilight.json`); brand colors regenerate the full palette at runtime.
- **SEO & structured data** — Organization, WebSite + SearchAction, BreadcrumbList, Product + Offer + AggregateRating, Article, FAQPage and LocalBusiness JSON-LD; canonical, Open Graph and Twitter tags.
- **Performance** — lazy-loaded images with explicit dimensions, `fetchpriority` on the hero, `content-visibility` for off-screen sections, async image decoding, scroll-snap carousels, and per-island JavaScript.
- **Accessibility (WCAG AA)** — semantic landmarks, skip link, visible focus, focus traps, ARIA for menus/tabs/combobox/live regions, and reduced-motion support.

## Tech stack

| Layer | Technology |
|---|---|
| Templating | Salla Twilight (Twig) |
| Commerce | Twilight JS SDK + Salla Web Components |
| Interactivity | Alpine.js (+ focus & collapse plugins) |
| Styling | Tailwind CSS with a custom design-token layer |
| Build | Salla CLI |

## Project structure

```
.
├── src/
│   ├── assets/
│   │   ├── js/app.js              # entry: Alpine stores/components, SDK wiring, brand palette
│   │   ├── styles/app.css         # Tailwind layers + component classes
│   │   ├── styles/tokens.css      # design tokens (single source of truth)
│   │   └── images/
│   ├── views/
│   │   ├── layouts/master.twig    # document shell (head, SEO, JSON-LD, header/footer)
│   │   ├── components/            # 28 reusable Twig partials
│   │   └── pages/                 # 26 customer-facing page templates
│   └── locales/                   # ar.json (primary) + en.json
├── twilight.json                  # theme manifest + merchant settings
├── tailwind.config.js
├── postcss.config.js
├── package.json
├── INSTALL.md                     # installation & build guide
├── CHANGELOG.md
├── RELEASE_NOTES.md
└── LICENSE
```

## Quick start

```bash
npm install -g @salla.sa/cli   # install the Salla CLI
salla login                    # authenticate
npm install                    # install theme dependencies
npm run serve                  # local preview with hot reload
```

See **[INSTALL.md](INSTALL.md)** for full installation, build, and publishing instructions.

## Pages

Home, Category/Listing, Product, Search, Cart, Checkout, Customer (Dashboard, Orders,
Profile, Addresses, Wishlist), Compare, Brands (index + single), Blog (index + single),
Contact, About, FAQ, Warranty, Installation Booking, Business Solutions, Auth
(Login/Register), CMS Page, and a 404 error page.

## License

Proprietary — © ركن الاحتراف (RKN). All rights reserved. See [LICENSE](LICENSE).
