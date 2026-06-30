# Architecture — RKN Premium Theme

**Phase 1 deliverable.** Defines the system architecture, rendering model, data flow,
state management, and quality pillars for the RKN Salla theme.

---

## 1. Architectural Principles

1. **RTL-first, Arabic-first** — Arabic is the source language; LTR/English is the
   adaptation. Layout, icons, and motion are authored for RTL from the start.
2. **Server-rendered, progressively enhanced** — Twig renders meaningful HTML on the
   server; JavaScript enhances but is never required for core browsing/buying.
3. **Token-driven design** — every visual decision flows from design tokens (Phase 2),
   never hard-coded values.
4. **Component isolation** — each UI unit is a self-contained Twig partial with a
   documented input contract; no hidden global coupling.
5. **Performance as a feature** — Core Web Vitals budgets are enforced, not aspired to.
6. **Accessibility AA by default** — semantics, focus, contrast, and motion safety are
   built in, not retrofitted.
7. **Trust by design** — security retailing demands visible warranty, authenticity,
   support, and social-proof signals throughout the funnel.

## 2. Platform Model (Salla Twilight)

Salla themes run on the **Twilight** engine. Key facts that shape this architecture:

- **Templating:** Twig. Pages and components are `.twig` files under `src/views/`.
- **Data:** Salla injects page data objects (`product`, `category`, `cart`, `customer`,
  `store`, etc.) into the Twig context. The theme reads these — it does not own the DB.
- **Behavior:** The **Twilight JS SDK** (`salla.*`) and Salla **Web Components**
  (`<salla-add-product-button>`, `<salla-cart-summary>`, etc.) provide cart, wishlist,
  auth, and checkout logic. We compose these rather than reimplement commerce logic.
- **Events:** Salla emits a global event bus (`salla.event.*`) for cart/wishlist/auth
  changes. UI reacts to these events to stay in sync.
- **Build:** Twilight CLI compiles Tailwind + JS via Vite into hashed production assets.
- **i18n:** `src/locales/{ar,en}.json` provide translation keys consumed via `trans()`.

```
┌──────────────────────────────────────────────────────────────┐
│                        Salla Backend                          │
│   Catalog · Orders · Customers · Cart · Checkout · Payments   │
└───────────────────────────┬──────────────────────────────────┘
                            │  injects page data + SDK
                            ▼
┌──────────────────────────────────────────────────────────────┐
│                     Twilight Theme Engine                     │
│   Twig (views) → HTML   +   salla.* SDK / Web Components       │
└───────────────────────────┬──────────────────────────────────┘
                            │  rendered HTML + hydrated islands
                            ▼
┌──────────────────────────────────────────────────────────────┐
│                       RKN Premium Theme                       │
│   Layouts · Pages · Components · Tokens · Alpine islands       │
└──────────────────────────────────────────────────────────────┘
```

## 3. Rendering Model

| Layer | Responsibility | Tech |
|---|---|---|
| **Layout** | Document shell, `<head>`, RTL/dir, header/footer slots, SEO meta | `views/layouts/master.twig` |
| **Page** | Route-level composition; reads Salla page data | `views/pages/**` |
| **Component** | Reusable UI unit with an input contract | `views/components/**` |
| **Island** | Client interactivity attached to rendered HTML | Alpine.js + Twilight SDK |
| **Style** | Visual presentation from tokens | Tailwind + token CSS layer |

**Hydration strategy — "islands, not apps":** the page is static HTML. Only interactive
regions (mega menu, search, cart drawer, wizards, calculators) carry JS. There is no
SPA; navigation is native and fast.

## 4. State Management

State is **layered and minimal**:

1. **Server state** (catalog, prices, stock, customer) — owned by Salla, rendered into
   HTML. Never duplicated client-side.
2. **Commerce state** (cart, wishlist, compare, auth) — owned by the Twilight SDK; UI
   subscribes to `salla.event.cart.*`, `salla.event.wishlist.*`, etc.
3. **Ephemeral UI state** (menu open, drawer open, tab index, wizard step) — local
   Alpine component state, never persisted.
4. **Persisted client state** (recently viewed, compare list, wizard draft) —
   `localStorage` behind a small typed wrapper module (added Phase 5).

> Rule: a single source of truth per concern. Commerce truth lives in the SDK; UI
> mirrors it via events and never writes commerce data directly to storage.

## 5. Data Flow (example: Add to Cart)

```
User clicks "Add to cart"
   → <salla-add-product-button> (Web Component) calls SDK
      → Salla API mutates cart server-side
         → salla.event.cart.updated fires
            → Cart drawer + header badge + mini-cart re-render from event payload
```

The theme never POSTs to commerce endpoints directly; it always goes through SDK/Web
Components so business rules (stock, coupons, options) stay authoritative.

## 6. Module Boundaries (JS)

```
src/assets/js/
├── app.js              # entry: registers islands, boots Alpine, wires SDK events
├── core/               # cross-cutting: events, storage wrapper, formatters (SAR, ar-numerals)
├── components/         # one module per interactive component (mega-menu, search, drawer…)
├── features/           # Phase 5: wizard, storage-calc, qty-calc, quote-builder
└── utils/              # pure helpers (debounce, currency, dom)
```

- **No global mutable singletons** beyond the Salla SDK.
- Each component module exports an `init(rootEl)` and binds only within its root.
- Features depend on `core/` and `utils/`, never on each other.

## 7. Styling Architecture

- **Tailwind** as the utility engine, configured from **design tokens** (Phase 2).
- A thin **`@layer base/components/utilities`** CSS layer for primitives that exceed
  utility ergonomics (e.g. focus rings, RTL logical properties, skeletons).
- **Logical properties** (`margin-inline`, `padding-inline`, `inset-inline`) everywhere
  so RTL/LTR share one source.
- **Dark-mode-ready**: tokens are defined as CSS variables; a `data-theme` switch flips
  them. Dark mode is wired in Phase 2, surfaced when approved.

## 8. Internationalization & RTL

- `dir="rtl"` and `lang="ar"` set on `<html>` by default; `en` flips both.
- All copy goes through `trans('keys')` → `locales/ar.json` / `en.json`. No hard-coded
  user-facing strings in markup.
- Numerals, currency (SAR / ر.س), and dates formatted via a shared formatter honoring
  locale (Arabic-Indic numerals optional, configurable).
- Iconography and directional motion mirror under RTL.

## 9. SEO Architecture

- Semantic landmark structure (`header/nav/main/aside/footer`), one `<h1>` per page.
- **Structured data (JSON-LD):** `Organization`, `WebSite` + `SearchAction`,
  `BreadcrumbList`, `Product` + `Offer` + `AggregateRating`, `FAQPage`, `LocalBusiness`.
- Canonical URLs, Open Graph + Twitter cards, hreflang for ar/en.
- Clean, crawlable category/product URLs from Salla; pagination with `rel` hints.
- Image `alt` from product data; descriptive, keyword-aware but honest.

## 10. Performance & Core Web Vitals

| Metric | Budget |
|---|---|
| LCP | ≤ 2.5s (mobile, 4G) |
| INP | ≤ 200ms |
| CLS | ≤ 0.1 |
| JS shipped (initial) | ≤ ~150KB gzipped |
| Fonts | ≤ 2 families, `font-display: swap`, subset |

Tactics: responsive `<img>`/`srcset` + lazy-loading below the fold, explicit media
dimensions (no CLS), critical-path CSS kept lean, deferred non-critical JS, skeletons
for async regions, preconnect to Salla CDN, and per-route JS islands (no monolith bundle).

## 11. Accessibility (AA)

- Full keyboard operability; visible focus; logical tab order (RTL-aware).
- ARIA only where semantics fall short (menus, dialogs, tabs, live cart updates).
- Contrast ≥ 4.5:1 text / 3:1 large & UI; verified against tokens in Phase 2.
- `prefers-reduced-motion` honored by all animations.
- Forms: labels, error association, `aria-live` validation, descriptive submit states.

## 12. Security & Trust

- No secrets in the theme; all privileged actions go through Salla.
- Escape/auto-escape all dynamic output in Twig; never `|raw` untrusted data.
- Trust signals as first-class UI: warranty badges, authenticity, secure-checkout marks,
  support availability, verified Google reviews, return/installation guarantees.

## 13. Quality Gates (per phase)

- Lint passes (Twig/JS/CSS).
- Lighthouse (mobile) within budgets.
- Keyboard + screen-reader smoke test on new components.
- RTL **and** LTR visual check.
- No console errors; SDK events verified for commerce components.

## 14. Open Decisions (to confirm before Phase 2)

- Arabic-Indic vs Western numerals as default display.
- Primary brand color & accent (pending brand assets) — see Design System plan.
- Dark mode: launch-on or built-but-hidden.
- Google Reviews source (Places API vs Salla reviews) for the reviews module (Phase 5).
