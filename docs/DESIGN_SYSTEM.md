# Design System — RKN Premium Theme

**Phase 2 deliverable.** The token-driven foundation every component consumes. Identity:
**premium security technology**, enterprise-grade, RTL/Arabic-first, mobile-first, WCAG AA.

Single source of truth: [`src/assets/styles/tokens.css`](../src/assets/styles/tokens.css).
Tailwind maps these tokens in [`tailwind.config.js`](../tailwind.config.js). **No
component hard-codes a value.**

---

## 1. Brand & Identity

| Role | Value | Token |
|---|---|---|
| Primary | `#0057FF` | `--rkn-primary-500` |
| Secondary | `#FFC107` | `--rkn-secondary-500` |
| Background | `#F8FAFC` | `--rkn-color-bg` |
| Surface | `#FFFFFF` | `--rkn-color-surface` |
| Text | `#111827` | `--rkn-color-text` |
| Accent | `#0F172A` | `--rkn-color-accent` |

A confident electric blue (trust + technology) anchored by deep slate (enterprise,
premium) with an amber secondary reserved for emphasis, deals, and ratings.

## 2. Color System

Colors are stored as **raw RGB triplets** so Tailwind's `<alpha-value>` opacity works
(`bg-primary-600/80`) and **dark mode is a variable swap**, not a duplicated palette.

### Palette scales (50→950)
`primary`, `secondary`, `slate` (neutral), plus semantic `success`, `warning`, `danger`,
`info`. Use scale steps for surfaces/borders; use **semantic tokens** for intent.

### Semantic tokens (mode-aware) → Tailwind utility
| Token | Utility | Meaning |
|---|---|---|
| `--rkn-color-bg` | `bg-bg` | Page background |
| `--rkn-color-surface` | `bg-surface` | Cards, panels |
| `--rkn-color-surface-raised` | `bg-surface-raised` | Elevated surfaces |
| `--rkn-color-surface-sunken` | `bg-surface-sunken` | Wells, table headers |
| `--rkn-color-text` | `text-content` | Body text |
| `--rkn-color-text-muted` | `text-content-muted` | Secondary text |
| `--rkn-color-text-subtle` | `text-content-subtle` | Hints, placeholders |
| `--rkn-color-text-inverse` | `text-content-inverse` | Text on dark/primary |
| `--rkn-color-primary` | `text/bg-primary` | Brand actions |
| `--rkn-color-accent` | `text/bg-accent` | Premium dark sections |
| `--rkn-color-border` | `border-border` | Default borders |
| `--rkn-color-ring` | `ring`/focus | Focus ring |

### Contrast (WCAG AA verified intent)
- Body text `#111827` on `#F8FAFC` / `#FFFFFF` → ≈ 16:1 (AAA).
- White on `primary-600 #0049D6` → ≈ 6.7:1 (AA, incl. normal text).
- **Amber rule:** secondary `#FFC107` always pairs with **dark** text
  (`--rkn-color-on-secondary` = `#111827`), never white — white on amber fails AA.
- Muted text `slate-600` on surface → ≈ 7:1.

## 3. Dark Mode (built, disabled by default)

Activated only via `<html data-theme="dark">` (merchant toggle
`appearance.enable_dark_mode`, default **false** for first release). Only semantic tokens
change; the palette is unchanged. Primary brightens to `primary-400` for contrast on dark
surfaces; shadows deepen. Every component built on semantic tokens is **dark-ready for
free** — no per-component dark rules allowed.

## 4. Typography

| Family | Use | Token |
|---|---|---|
| **Inter** | Latin text, **Western numerals**, UI | `--rkn-font-sans` |
| **IBM Plex Sans Arabic** | Arabic text | (in the same stack) |

Inter leads the stack so Western digits and Latin render in Inter; Arabic glyphs fall
through to IBM Plex Sans Arabic. `font-display: swap`; both subset to needed weights.

### Type scale (mobile-first, rem)
`xs .75` · `sm .875` · `base 1` · `lg 1.125` · `xl 1.25` · `2xl 1.5` · `3xl 1.875` ·
`4xl 2.25` · `5xl 3` · `6xl 3.75`. Display sizes carry tighter line-height + negative
tracking for a premium feel (configured in `tailwind.config.js`). Headings use weight
700–800; body 400–500; `text-wrap: balance` on headings.

### Numerals
Western (0–9) everywhere, enforced via `font-variant-numeric: lining-nums` and the JS
formatters (`numberingSystem: 'latn'`). `data-numerals` on `<html>` records the choice.

## 5. Spacing & Layout

- **Base unit 4px** (Tailwind default scale retained).
- **Container:** centered, max `1320px`, responsive padding (`1rem → 2.5rem`). Use
  `.rkn-container`.
- **Section rhythm:** `.rkn-section` = `py-10 md:py-16`.
- **Grid:** CSS Grid / Tailwind 12-col; gaps from the spacing scale.
- **Breakpoints (mobile-first):** `sm 640 · md 768 · lg 1024 · xl 1280 · 2xl 1536`.

## 6. Radius

`sm 6 · md 12 (default) · lg 16 · xl 20 · 2xl 28 · 3xl 36 · full`. Soft, modern, premium.
Cards use `xl`; buttons/inputs `lg`; pills/badges `full`.

## 7. Elevation (shadows)

`xs · sm · md · lg · xl · 2xl` — soft, layered, slate-tinted; deepen in dark mode.
`--rkn-shadow-focus` is the standard focus ring (`3px` primary @ 35%). Elevation signals
hierarchy, not decoration: cards `sm` → hover `lg`; drawers/modals `2xl`.

## 8. Motion

| Token | Value |
|---|---|
| `--rkn-duration-fast` | 150ms (hovers, color) |
| `--rkn-duration-base` | 200ms (default) |
| `--rkn-duration-slow` | 300ms (drawers, accordions) |
| `--rkn-duration-slower` | 500ms (page-level) |
| `--rkn-ease-standard` | `cubic-bezier(0.4,0,0.2,1)` |
| `--rkn-ease-entrance` | `cubic-bezier(0,0,0.2,1)` |
| `--rkn-ease-exit` | `cubic-bezier(0.4,0,1,1)` |
| `--rkn-ease-emphasized` | `cubic-bezier(0.2,0,0,1)` |

Keyframes: `fade-in`, `slide-up`, `shimmer` (skeletons; **RTL-aware** — travels the
correct direction via `--rkn-shimmer-end`). All motion is disabled under
`prefers-reduced-motion` globally.

## 9. Z-index Scale

`dropdown 1000 · sticky 1020 · header 1030 · drawer 1040 · overlay 1050 · modal 1060 ·
popover 1070 · toast 1080 · tooltip 1090`. Never invent ad-hoc z-values.

## 10. Iconography

- **Line icons**, 1.5–2px stroke, `currentColor` (inherit text color → theme-aware).
- Sizes: 16 / 20 / 24 (default) / 32. Square; centered optical alignment.
- **RTL mirroring:** directional icons (arrows, chevrons, carousel controls) flip with
  `.rkn-flip-rtl`. Non-directional icons (cart, user, search) never flip.
- Icon-only controls **must** carry an `aria-label`.

## 11. Component Primitives (base styles)

Base CSS classes live in [`app.css`](../src/assets/styles/app.css) under
`@layer components`. Phase 3 wraps each in a Twig partial with an input contract.

| Primitive | Class(es) | Notes |
|---|---|---|
| Button | `.rkn-btn` + `--primary/secondary/outline/ghost/danger`, `--sm/lg/block/icon` | Logical padding; secondary = amber + dark text |
| Field | `.rkn-field` `.rkn-label` `.rkn-input` `.rkn-select` `.rkn-textarea` `.rkn-hint` `.rkn-error` | `aria-invalid` styling; required marker |
| Card | `.rkn-card` `--interactive` `.rkn-card__body` | Hover lift for interactive |
| Badge | `.rkn-badge` + `--primary/success/warning/danger/neutral/sale` | Sale = amber |
| Chip | `.rkn-chip` | Filters, compare |
| Alert | `.rkn-alert` + `--info/success/warning/danger` | `aria-live` added per use |
| Table | `.rkn-table` | `text-start`, sunken header |
| Nav link | `.rkn-navlink` `--active` | |
| Overlay/Dialog | `.rkn-overlay` `.rkn-dialog` | Behavior (focus trap) in Phase 3 |
| Skeleton | `.rkn-skeleton` | RTL-aware shimmer, CLS-safe |
| Container/Section | `.rkn-container` `.rkn-section` | Layout rhythm |
| Skip link | `.rkn-skip-link` | A11y landmark jump |

## 12. RTL Strategy

- Authored **RTL-first**; LTR is the adaptation. `dir`/`lang` set on `<html>`.
- **Logical properties only** (`tailwindcss-logical`): `ms-/me-`, `ps-/pe-`,
  `inline-start/end`, `text-start`. No bare `left/right`/`ml/mr` for flow.
- Directional icons and motion mirror; shimmer/carousels honor direction.

## 13. Accessibility (AA) baked into the foundation

- `:focus-visible` → token focus ring on every interactive element (keyboard only).
- Color intent always paired for contrast (esp. the amber-needs-dark-text rule).
- Reduced-motion respected globally.
- Skip link + single `<main>` landmark in the shell.
- Form primitives ship label/hint/error structure and `aria-invalid` styling.

## 14. Build Pipeline

- **Tailwind v3** + PostCSS (`postcss-import`, `autoprefixer`) + `tailwindcss-logical`.
- Entry: `app.js` imports `app.css`; Alpine + plugins boot; island registry ready.
- Salla CLI compiles & injects assets: `salla theme serve` (dev) / `build` / `publish`.
- Content scanning covers `src/views/**/*.twig`, `src/assets/js/**/*.js`, `twilight.json`.

## 15. Reviews Architecture (provider-agnostic)

`twilight.json → reviews.reviews_provider` selects `salla` (default) or `google`. Phase 3+
review components consume a **normalized review shape**; switching the provider later does
**not** change the UI components — only the data adapter. Salla native reviews ship first.

## 16. What Phase 3 builds on this

Header system, footer, product/category cards, trust badges, and all UI primitives as
**Twig partials with documented contracts**, each verified RTL/LTR, keyboard-accessible,
and dark-ready by construction.
