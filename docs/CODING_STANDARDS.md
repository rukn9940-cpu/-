# Coding Standards — RKN Premium Theme

**Phase 1 deliverable.** The rules all code follows from Phase 2 onward. Standards lead;
code conforms.

---

## 1. General

- **Clarity over cleverness.** Code reads like the surrounding code.
- **One responsibility per file.** Components and modules stay small and focused.
- **No dead/commented-out code** committed. No `console.log` in production paths.
- **Docs lead code.** If behavior changes, update the relevant `docs/` file in the same
  change.
- **Small, descriptive commits.** Imperative subject; explain _why_ when non-obvious.

## 2. Twig

- Components are **contract-driven**: declared inputs at the top of the file as a comment
  block; defaults via `default()`. Never read globals a component wasn't given.

  ```twig
  {# product-card.twig
     @param product  object  required — Salla product object
     @param size     string  'md' | 'lg'  (default 'md')
     @param showRating bool   default true
  #}
  ```

- Include with explicit data: `{% include 'components/product/product-card.twig' with { product: item, size: 'lg' } only %}`.
  Prefer `only` to prevent context leakage.
- **Auto-escape on.** Never `|raw` untrusted/dynamic data. Sanitize before any raw use.
- No business logic in pages — pages compose components and map Salla data.
- Keep nesting shallow; extract partials when a block exceeds ~one screen.
- All user-facing text via `trans('namespaced.key')` — never hard-coded strings.
- Use Salla Web Components for commerce actions instead of hand-rolled forms.

## 3. CSS / Tailwind

- **Tokens first.** Colors, spacing, radius, shadows, type come from design tokens. No
  magic numbers, no raw hex in markup/components.
- **Logical properties only** for direction-aware styles: `margin-inline`,
  `padding-inline-start`, `inset-inline-end`, `text-align: start`. No bare
  `left/right/ml/mr` for layout flow.
- Tailwind utilities for the common case; a `@layer components` class when a pattern
  repeats or exceeds reasonable utility length.
- Class custom names: `rkn-block__element--modifier` (BEM-ish) when not pure utility.
- Respect `prefers-reduced-motion` for every transition/animation.
- Dark mode via token variables (`data-theme`), never duplicated color rules.

## 4. JavaScript

- ES modules, `const`/`let` (no `var`), strict equality, early returns.
- One interactive component → one module exporting `init(rootEl)`; bind only inside root.
- **Never POST to commerce endpoints directly** — go through `salla.*` SDK / Web
  Components so business rules stay authoritative.
- Subscribe to `salla.event.*` for cart/wishlist/auth sync; clean up listeners on teardown.
- No global mutable state beyond the Salla SDK. Persisted client state goes through the
  `core/storage` wrapper, namespaced (`rkn:*`).
- Debounce/throttle expensive handlers (search, scroll, resize).
- Guard for missing DOM/SDK; fail soft (the page must work without the island).
- Keep bundles lean: lazy-init features (wizards/calculators) on demand.

## 5. Accessibility (AA — non-negotiable)

- Semantic HTML first; ARIA only to fill genuine gaps (menu, dialog, tabs, live regions).
- Every interactive element is keyboard operable with a **visible** focus style.
- Dialogs/drawers: focus trap, `Esc` to close, focus restored on close.
- Live commerce updates announced via `aria-live` (cart count, add-to-cart result).
- Images: meaningful `alt`; decorative images `alt=""`.
- Forms: associated `<label>`, error text linked via `aria-describedby`, `aria-invalid`.
- Color contrast ≥ 4.5:1 (text), ≥ 3:1 (large text & UI), validated against tokens.

## 6. RTL / i18n

- Author for **RTL by default**; LTR is the adaptation. Verify both directions.
- Mirror directional icons (arrows, chevrons) and directional motion under RTL.
- Numerals, currency (SAR / ر.س), and dates via the shared locale formatter.
- No string concatenation to build sentences — use full translation keys with params.

## 7. Performance

- Images: responsive `srcset`/`sizes`, explicit `width`/`height`, `loading="lazy"` below
  the fold, modern formats where Salla supports them.
- No layout shift: reserve space for media, ads, async content (skeletons).
- Defer non-critical JS; per-route islands, not a monolith bundle.
- Preconnect to required origins; limit font families/weights; `font-display: swap`.
- Audit with Lighthouse (mobile) against the budgets in `ARCHITECTURE.md §10`.

## 8. SEO

- One `<h1>` per page; logical heading order; landmark elements.
- JSON-LD per page type (see `ARCHITECTURE.md §9`); validate before shipping.
- Canonical + Open Graph + Twitter + hreflang (ar/en) in `master.twig` head.

## 9. Naming (summary)

| Thing | Style | Example |
|---|---|---|
| Twig component file | kebab-case | `mega-menu.twig` |
| JS module | kebab-case | `cart-drawer.js` |
| CSS class (custom) | BEM-ish | `rkn-menu__panel--open` |
| Token | `--rkn-{group}-{name}` | `--rkn-radius-lg` |
| Translation key | dot.namespaced | `product.add_to_cart` |
| Storage key | `rkn:` namespaced | `rkn:recently-viewed` |
| JS variable/fn | camelCase | `formatCurrency()` |

## 10. Quality Gate (run before declaring a phase done)

1. Lint clean (Twig/JS/CSS).
2. `salla theme build` succeeds; no console errors at runtime.
3. Lighthouse mobile within budgets on affected templates.
4. Keyboard + screen-reader smoke test on new interactive components.
5. RTL **and** LTR visual verification.
6. Commerce components verified against `salla.event.*`.
7. Docs updated to match the change.

## 11. Git

- Branch: `claude/optimistic-ride-7rfcfk` (designated). Never push elsewhere without
  explicit permission.
- Commit subject ≤ ~72 chars, imperative mood. Reference the phase where useful
  (e.g. `Phase 1: add architecture docs`).
- Keep the working tree clean; no build artifacts committed (see `.gitignore`).
