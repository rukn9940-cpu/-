# Components (as-built) — Phase 3

**Phase 3 deliverable.** The reusable component layer. Each is a Twig partial with a
documented input contract (header comment) consuming design-system tokens, RTL-first,
mobile-first, WCAG AA, and progressively enhanced with Alpine.js. Commerce truth stays in
the Salla SDK (Web Components + events).

Plan & contracts: [`COMPONENT_LIBRARY.md`](COMPONENT_LIBRARY.md) · Tokens: [`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md)

---

## Behavior layer (Alpine) — `src/assets/js/components/`

| Module | Provides |
|---|---|
| `stores.js` | `$store.ui` (overlays), `$store.compare`, `$store.recentlyViewed`, `$store.badges` (live cart/wishlist counts via SDK events) |
| `carousel.js` | `rknCarousel` — RTL-aware scroll-snap carousel (autoplay, edges, reduced-motion) |
| `header.js` | `rknStickyHeader`, `rknAnnouncementBar`, `rknMegaMenu`, `rknSmartSearch`, `rknMobileNav` |
| `product.js` | `rknGallery`, `rknTabs`, `rknQuantity`, `rknCountdown`, `rknTrackView` |
| `catalog.js` | `rknFilters`, `rknSortMenu` |
| `cart.js` | `rknCartDrawer` |
| `index.js` | registers all stores + data on Alpine (called from `app.js`) |

## UI primitives — `components/ui/`

`button`, `badge` (product badges), `product-label` (corner ribbons), `rating-stars`,
`quantity-selector`, `pagination`, `skeleton` (loading states), `empty-state`,
`error-state`, `icon-sprite`.

## Header family — `components/header/`

`announcement-bar`, `header` (sticky, condensing, hide-on-scroll), `mega-menu` (desktop
mega navigation), `search` (smart search + suggestions + recent), `mobile-nav` (off-canvas
drawer), `bottom-nav` (app-like mobile tab bar).

## Footer — `components/footer/`

`footer` (columns, contact, social, payment marks; mounts bottom-nav + cart drawer),
`newsletter` (SDK subscribe with inline feedback).

## Product — `components/product/`

`product-card`, `flash-sale-card` (countdown + stock bar), `product-gallery` (thumbs,
zoom, RTL swipe), `product-info` (purchase panel), `product-tabs` (description/specs/
reviews), `related-products` (carousel), `recently-viewed` (store-driven).

## Category — `components/category/`

`category-card` (tile/overlay), `filters` (faceted; sidebar↔drawer), `sort-menu`.

## Commerce — `components/commerce/`

`wishlist-button`, `compare-button`, `cart-drawer` (slide-in mini cart).

## Reviews — `components/reviews/`

`review-summary` (aggregate + distribution), `review-list` (items + empty state).
**Provider-agnostic**: components consume a normalized review shape; switching
`theme.settings.reviews_provider` from `salla` → `google` changes only the data adapter.

## Common — `components/common/`

`breadcrumb`, `hero-banner`, `hero-slider`, `brand-slider`, `testimonial-card`,
`cta-section`.

## Trust — `components/trust/`

`trust-badges` (warranty / authenticity / secure checkout / installation) — strip, inline,
and grid layouts.

---

## Cross-cutting guarantees

- **RTL-first:** logical properties throughout; directional icons flip via `.rkn-flip-rtl`;
  carousels/drawers/transitions honor direction.
- **Mobile-first & responsive:** every component designed at small screens up.
- **Accessibility (AA):** semantic landmarks, labelled icon buttons, focus-visible rings,
  focus traps on dialogs/drawers (`x-trap`), ARIA for menus/tabs/combobox/live regions,
  reduced-motion respected.
- **Performance:** lazy images with explicit dimensions (CLS-safe), `fetchpriority` on the
  hero, debounced search, scroll-snap carousels (no JS layout thrash), `x-cloak` to avoid
  flashes, per-island JS.
- **Salla compatibility:** `<salla-add-product-button>`, `<salla-wishlist>`,
  `<salla-cart-summary>`, `<salla-product-options>`, `<salla-product-rating>`,
  `<salla-products-slider>`, the `| money` filter, and `salla.event.*` for live state.

## Wiring

`master.twig` now includes the icon sprite, the header (`menu`), and the footer
(`footer_columns`, `social_links`); the footer mounts the bottom navigation and cart
drawer globally. Pages (Phase 4) compose the product/category/common/reviews components.

## Verification note

JS modules pass `node --check`; Twig tag balance and include paths validated by script. A
full `salla theme serve` render-test requires the Salla CLI (not installable in this
environment) and is part of the Phase 4 page-integration pass.
