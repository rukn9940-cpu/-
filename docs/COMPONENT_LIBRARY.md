# Component Library Plan — RKN Premium Theme

**Phase 1 deliverable.** The catalog of components, their layers, input contracts, and
build order. This is the **plan** — no component code is written until its phase is
approved.

---

## 1. Layering Model

```
Primitives (ui/)  →  Patterns (header/footer/product/…)  →  Pages (composition)
```

- **Primitives** — atomic, domain-agnostic, token-driven (button, input, badge…).
- **Patterns** — domain-aware compositions of primitives (product-card, mega-menu…).
- **Pages** — route templates that compose patterns; no new visual logic.

Each component has: a Twig partial, an optional JS module (only if interactive), an
optional CSS partial (only beyond utilities), and a documented input contract.

## 2. Component Contract Template

Every component declares its inputs at the top of its Twig file:

```twig
{# <name>.twig
   @summary  one-line purpose
   @param    name  type  required|default — description
   @emits    (if interactive) salla/DOM events it reacts to or fires
   @a11y     key accessibility behaviors (roles, keyboard, focus)
#}
```

---

## 3. Primitives — `components/ui/` *(Phase 2 specs → Phase 3 build)*

| Component | Key inputs | Notes |
|---|---|---|
| `button` | `variant` (primary/secondary/ghost/danger), `size`, `icon`, `loading`, `href` | Token-driven; focus ring; loading state |
| `icon-button` | `icon`, `label` (required for a11y), `size` | `aria-label` mandatory |
| `input` / `field` | `type`, `name`, `label`, `error`, `hint`, `required` | Label + error association |
| `select` | `options`, `value`, `placeholder` | Native + styled |
| `checkbox` / `radio` / `switch` | `name`, `checked`, `label` | Keyboard + focus |
| `badge` | `variant`, `text` | Status/sale/new/stock |
| `tag` / `chip` | `text`, `removable` | Filters, compare list |
| `card` | `padding`, `elevation`, slots | Base surface |
| `modal` / `dialog` | `id`, `title`, slots | Focus trap, Esc, restore focus |
| `drawer` | `side` (inline-start/end), `id` | RTL-aware; cart/menu use it |
| `alert` / `toast` | `variant`, `message`, `dismissible` | `aria-live` for toasts |
| `tabs` | `items`, `active` | Roving tabindex |
| `accordion` | `items` | FAQ/spec usage |
| `tooltip` | `label`, `placement` | Non-essential info only |
| `rating-stars` | `value`, `count`, `readonly` | Product/review |
| `price` | `amount`, `was`, `currency` | SAR formatting, discount |
| `quantity-stepper` | `min`, `max`, `value` | Cart/product |
| `skeleton` | `variant` (text/card/media) | CLS-safe placeholders |
| `breadcrumb` | `items` | `BreadcrumbList` JSON-LD upstream |
| `pagination` | `current`, `total`, `base` | `rel` hints, RTL arrows |
| `empty-state` | `icon`, `title`, `action` | Carts/wishlist/search no-results |

## 4. Header System — `components/header/` *(Phase 3)*

| Component | Inputs | Interactive |
|---|---|---|
| `top-bar` | `phone`, `offers`, `lang/currency switch` | minor |
| `header` | `logo`, `nav`, `actions` | composition |
| `mega-menu` | `categories` (security-aware tree) | **JS** — keyboard, hover/focus, RTL panels |
| `search` | `placeholder`, `scopes` | **JS** — suggestions, recent, debounce |
| `cart-button` | (SDK) | **JS** — badge via `salla.event.cart.updated`, opens drawer |
| `cart-drawer` | (SDK) | **JS** — mini-cart, line items, totals |
| `wishlist-button` | (SDK) | **JS** — count via `salla.event.wishlist.*` |
| `compare-button` | `count` | **JS** — opens compare |

## 5. Footer — `components/footer/` *(Phase 3)*

| Component | Inputs |
|---|---|
| `footer` | `columns`, `contact`, `social`, `payment-marks`, `shipping-marks` |
| `newsletter` | `action` (Salla) — **JS** validation + success state |

## 6. Product — `components/product/` *(Phase 3, used heavily Phase 4)*

| Component | Inputs | Interactive |
|---|---|---|
| `product-card` | `product`, `size`, `showRating`, `showQuickAdd` | quick-add (SDK) |
| `product-gallery` | `images`, `video` | **JS** — zoom, thumbs, RTL swipe |
| `product-price` | `product` | discount/installment display |
| `product-options` | `options` | **JS** — variant selection, stock sync |
| `product-meta` | `sku`, `brand`, `availability` | |
| `product-specs` | `attributes` | accordion/table |
| `product-rating` | `value`, `count` | |
| `related-products` | `items` | carousel (RTL) |
| `add-to-cart` | (SDK Web Component wrapper) | **JS/SDK** |

## 7. Category — `components/category/` *(Phase 3–4)*

| Component | Inputs | Interactive |
|---|---|---|
| `category-card` | `category` | |
| `filters` | `facets` | **JS** — multi-select, price range, RTL slider |
| `sort` | `options`, `active` | **JS** |
| `toolbar` | `count`, `view` (grid/list) | **JS** |

## 8. Common — `components/common/` *(Phase 3)*

Breadcrumb (also primitive-backed), pagination, skeleton sets, empty-state variants,
section-header, carousel base (RTL-aware), back-to-top.

## 9. Trust — `components/trust/` *(Phase 3, surfaced across pages)*

Domain-critical for security retailing:

| Component | Purpose |
|---|---|
| `warranty-badge` | Warranty term & coverage |
| `authenticity-badge` | Genuine-product assurance |
| `secure-checkout` | Payment security marks |
| `support-badge` | Support hours / channels |
| `installation-badge` | Professional installation available |
| `reviews-summary` | Aggregate rating + Google reviews (Phase 5 data) |

## 10. Feature Modules — `assets/js/features/` *(Phase 5)*

These are **JS-led** experiences with thin Twig shells:

| Feature | Description |
|---|---|
| `camera-wizard` | Q&A → recommended camera/kit |
| `storage-calculator` | cameras × resolution × FPS × retention → required storage (TB) |
| `quantity-calculator` | area/coverage/angles → recommended camera count |
| `quote-builder` | B2B multi-item quote → request submission |
| `installation-booking` | date/area/scope → booking request |
| `recently-viewed` | localStorage-backed strip |
| `flash-deals` + `countdown` | time-boxed promotions |

Each feature: lazy-loaded, isolated state, persists drafts via `core/storage`, fully
keyboard accessible, RTL-correct, and instrumented for analytics.

## 11. Build Order (dependency-aware)

```
Phase 2: tokens → primitives specs → master shell
Phase 3: ui primitives → header system → footer → product/category/common → trust
Phase 4: pages compose the above
Phase 5: feature modules + cross-sell/upsell/reviews
```

## 12. Definition of Done (per component)

- Input contract documented in the Twig header.
- Renders correctly in **RTL and LTR**.
- Keyboard operable; visible focus; relevant ARIA.
- Token-driven styling; no magic values.
- Interactive components verified against `salla.event.*` where applicable.
- No console errors; degrades gracefully without JS.
- Listed/checked off in `TODO.md`.
