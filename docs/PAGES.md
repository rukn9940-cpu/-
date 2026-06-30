# Pages (as-built) — Phase 4

**Phase 4 deliverable.** Customer-facing routes, composed from Phase 3 components.
All extend `layouts/master.twig` (which provides announcement bar, header, mega nav,
footer, newsletter, bottom-nav, and cart drawer). RTL/Arabic-first, mobile-first, WCAG AA,
SEO-aware, Salla Twilight compatible.

---

## Routes

| Page | File | Notes |
|---|---|---|
| Homepage | `pages/index.twig` | Sections 4–21 (1–3 & 22–23 come from layout/footer) |
| Category / Listing | `pages/product/index.twig` | Breadcrumb, filters (sidebar↔drawer), sort, grid, pagination |
| Product details | `pages/product/single.twig` | Gallery + info + tabs + related + recently-viewed; Product JSON-LD |
| Search results | `pages/search.twig` | Listing grid + sort + pagination, headed by the query |
| Cart | `pages/cart/index.twig` | Salla cart summary, coupon, totals, trust, cross-sell, empty state |
| Checkout | `pages/checkout/index.twig` | Slim focused layout, progress steps, sticky summary |
| Dashboard | `pages/customer/dashboard.twig` | Account sidebar, stats, recent orders |
| Wishlist | `pages/customer/wishlist.twig` | Saved products grid + empty state |
| Compare | `pages/compare/index.twig` | Side-by-side comparison table + empty state |
| Contact | `pages/contact.twig` | Form (Salla contacts) + store details + map slot |
| About | `pages/about.twig` | Story, mission, stats, values, CTA |
| Warranty | `pages/warranty.twig` | Coverage cards, terms, warranty FAQ |
| Business Solutions | `pages/business.twig` | B2B landing: services, process, quote form |
| Installation Booking | `pages/installation.twig` | Booking form, how-it-works, trust |

## Homepage section map (in order)

1–3 Announcement / Header / Mega nav → **layout** ·
4 Hero slider · 5 Shop by category · 6 Featured categories · 7 Flash deals ·
8 Best sellers · 9 IP · 10 Solar · 11 4G · 12 WiFi · 13 NVR & DVR · 14 Accessories ·
15 Business banner · 16 Installation banner · 17 Why choose RKN · 18 Brand logos ·
19 Customer reviews · 20 Educational blog · 21 FAQ preview ·
22 Newsletter + 23 Footer → **footer component**.

Product collections (7–14) render via `products-section`: our own product-card carousel
when a `products` array is supplied, otherwise Salla's `products-slider` by `source`
(category IDs read from `theme.settings.collection_*`).

## New components added this phase

- `product/products-section.twig` — titled collection (cards or Salla slider)
- `common/blog-card.twig` — article teaser
- `common/faq.twig` — accessible accordion + FAQPage JSON-LD
- `account/sidebar.twig` — dashboard navigation

## SEO

- Homepage: section landmarks; FAQ emits **FAQPage** JSON-LD.
- Product: single `<h1>`, **Product + Offer + AggregateRating** JSON-LD.
- Listing/Product/Content: **BreadcrumbList**-ready breadcrumbs.
- Organization + WebSite + SearchAction come from the layout (`master.twig`).
- Search page flagged for `noindex` on zero results in the Phase 5 SEO pass.

## i18n note

Every user-facing string uses `trans('key')|default('عربي')`, so all pages render
correctly in **Arabic** today even before locale keys are populated. The Phase 5 SEO/
content pass will migrate defaults into `ar.json`/`en.json` for full ar/en parity.

## Conversion features

Sticky add-to-cart context, cross-sell on cart, trust badges on cart/checkout/product,
slim checkout chrome, quick add from cards, recently-viewed, and prominent CTAs.

## Verification

All 59 Twig files pass the tag-balance + include/extends-resolution check. Live
`salla theme serve` render-testing against real store data requires the Salla CLI
(unavailable in this environment) and is part of the pre-launch pass.

## Salla route-name mapping (deployment note)

This repo groups pages logically under `pages/`. When wiring to Salla Twilight, map them
to the platform's expected page identifiers (e.g. `product.single`, `product.index`,
`cart`, `customer.*`). The include/extends path style here is slash + `.twig`, applied
consistently; if the deployed Twilight loader expects dot-notation without extension, it
is a mechanical, project-wide rename.
