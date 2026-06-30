# Folder Structure — RKN Premium Theme

**Phase 1 deliverable.** The full directory tree and the conventions that govern it.
Files marked _(Phase N)_ are created when that phase is approved — they are **not**
present yet. Phase 1 ships only the scaffold (folders + `.gitkeep`) and the docs.

---

## 1. Full Tree

```
.
├── README.md
├── TODO.md
├── .gitignore
├── twilight.json                  # (Phase 2) Salla theme manifest + settings schema
├── package.json                   # (Phase 2) build deps & scripts
├── tailwind.config.js             # (Phase 2) Tailwind wired to design tokens
├── postcss.config.js              # (Phase 2)
│
├── docs/                          # Engineering documentation (Phase 1)
│   ├── ARCHITECTURE.md
│   ├── FOLDER_STRUCTURE.md
│   ├── DEVELOPMENT_PLAN.md
│   ├── ROADMAP.md
│   ├── CODING_STANDARDS.md
│   ├── COMPONENT_LIBRARY.md
│   └── DESIGN_SYSTEM.md           # (Phase 2)
│
└── src/
    ├── assets/
    │   ├── js/
    │   │   ├── app.js              # (Phase 2) entry point
    │   │   ├── core/               # events, storage, formatters
    │   │   ├── components/         # interactive component modules
    │   │   ├── features/           # (Phase 5) wizard, calculators, quote builder
    │   │   └── utils/              # pure helpers
    │   ├── styles/
    │   │   ├── app.css             # (Phase 2) Tailwind entry + layers
    │   │   ├── tokens.css          # (Phase 2) design-token CSS variables
    │   │   └── components/         # (Phase 2+) per-component style partials
    │   └── images/                 # theme-owned art (logos, icons, illustrations)
    │
    ├── views/
    │   ├── layouts/
    │   │   └── master.twig         # (Phase 2) document shell, head, header/footer slots
    │   │
    │   ├── components/             # reusable UI units (Phase 2–3)
    │   │   ├── ui/                 # primitives: button, input, badge, card, modal, alert…
    │   │   ├── header/             # top-bar, mega-menu, search, cart, wishlist, compare
    │   │   ├── footer/             # footer, newsletter
    │   │   ├── product/            # product-card, gallery, price, rating, options
    │   │   ├── category/           # category-card, filters, sort, toolbar
    │   │   ├── common/             # breadcrumb, pagination, skeleton, empty-state
    │   │   └── trust/              # warranty, authenticity, reviews, support badges
    │   │
    │   └── pages/                  # route-level templates (Phase 4)
    │       ├── index.twig          # homepage
    │       ├── product/
    │       ├── category/
    │       ├── cart/
    │       ├── checkout/
    │       ├── customer/           # login, register, dashboard, orders, wishlist
    │       ├── compare/
    │       ├── brands/
    │       ├── blog/
    │       ├── pages/              # about, contact, faq, privacy, terms, support, warranty
    │       └── services/           # business solutions, installation booking
    │
    └── locales/
        ├── ar.json                 # (Phase 2) primary — Arabic
        └── en.json                 # (Phase 2) English
```

> The actual `src/views/` path names follow Salla Twilight conventions. Where Salla
> mandates specific filenames for page routes (e.g. `product.single`, `category` index),
> those exact names are used during Phase 4; the grouping above is the logical map.

## 2. Naming Conventions

| Artifact | Convention | Example |
|---|---|---|
| Twig component file | `kebab-case.twig` | `product-card.twig` |
| Twig page file | Salla route name | `index.twig`, `product.single.twig` |
| Twig include alias | namespaced by folder | `components/product/product-card.twig` |
| JS module | `kebab-case.js`, one component each | `mega-menu.js` |
| CSS partial | mirrors component name | `product-card.css` |
| Design token | `--rkn-{group}-{name}` | `--rkn-color-primary` |
| Translation key | `dot.namespaced` | `cart.add_to_cart` |
| BEM-ish class (when needed) | `rkn-block__element--modifier` | `rkn-card__media--wide` |

## 3. Ownership Rules

- **`src/views/components/`** — reusable, contract-driven. A component never reaches
  into a page's data shape directly; it receives explicit parameters via `include ... with`.
- **`src/views/pages/`** — composition only. Pages map Salla page data onto components.
  Business/visual logic does not live inline in pages.
- **`src/assets/js/components/`** — exactly mirrors interactive Twig components by name.
- **`src/locales/`** — the only home for user-facing strings.
- **`docs/`** — the single source of truth for decisions; code follows docs.

## 4. What Belongs Where (quick guide)

| I want to… | Put it in… |
|---|---|
| Add a reusable card/badge/button | `src/views/components/ui/` (+ optional JS/CSS) |
| Add a new page | `src/views/pages/…` composing existing components |
| Add interactivity to a component | matching module in `src/assets/js/components/` |
| Add a color/space/radius value | a token in `tokens.css` (never inline) |
| Add user-facing text | `ar.json` (and `en.json`) via a `trans()` key |
| Add a calculator/wizard | `src/assets/js/features/` (Phase 5) |

## 5. Phase 1 Scaffold State

Created now: the `src/` tree above (with `.gitkeep` placeholders) and the `docs/` set.
No `.twig`, `.js`, `.css`, or `twilight.json` UI/build code is written until Phase 2 is
approved — per the project governance rule.
