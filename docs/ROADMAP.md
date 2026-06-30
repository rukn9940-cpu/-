# Roadmap — RKN Premium Theme

**Phase 1 deliverable.** Milestones, indicative timeline, and scope per phase. Timeline
is an estimate; phase gates (approval) govern actual progression, not dates.

---

## Milestone Overview

| # | Milestone | Scope | Est. effort | Gate |
|---|---|---|---|---|
| M1 | **Architecture** | Docs, structure, standards, plans | ~1 unit | Approval |
| M2 | **Design System** | Tokens, primitives, build, shell | ~2 units | Approval |
| M3 | **Core Components** | Header→Footer reusable layer | ~2 units | Approval |
| M4 | **Pages** | All customer routes | ~3 units | Approval |
| M5 | **Advanced Features** | Wizards, calculators, perf/SEO | ~2–3 units | Approval |

> "unit" = a self-contained, reviewable delivery increment, not a fixed calendar period.

## Timeline (indicative)

```
M1 Architecture      ████
M2 Design System         ████████
M3 Core Components               ████████
M4 Pages                                 ████████████
M5 Advanced Features                                 ██████████
                     └─ gate ─┘└─ gate ─┘└─ gate ─┘└─ gate ─┘
```

Each gate is a hard stop for review/approval.

## Scope Detail per Milestone

### M1 — Architecture *(current)*
System architecture, folder structure, coding standards, component library plan,
development plan, roadmap, README, TODO. **No UI code.**

### M2 — Design System
The token foundation (color/type/space/radius/shadow/motion), Tailwind + token wiring,
primitive specs, document shell, build pipeline, i18n bootstrap, dark-mode-ready
variables. Output is a documented, buildable foundation.

### M3 — Core Components
Header system (top-bar, mega menu, search), cart/wishlist/compare entry points, footer +
newsletter, breadcrumb, product & category cards, pagination, skeletons, trust badges.
All accessible, RTL/LTR verified, SDK-synced.

### M4 — Pages
Homepage, category, product, cart, checkout integration, account suite (login/register/
dashboard/orders/wishlist/compare), brands, blog, content pages (about/contact/faq/
privacy/terms/support/warranty), business solutions, installation booking. SEO +
structured data + CWV on key templates.

### M5 — Advanced Features
Camera recommendation wizard, storage calculator, quantity calculator, business quote
builder, installation booking flow, recently viewed, bundles/upsell/cross-sell, flash
deals + countdown, Google reviews, notifications, analytics, final SEO & performance pass.

## Success Metrics (project-level)

- **Performance:** LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1 on home/category/product (mobile).
- **Accessibility:** WCAG 2.1 AA across all shipped components and pages.
- **Quality:** Zero console errors; all commerce actions verified via SDK events.
- **Design:** Premium, original, RTL-first; exceeds local competitor benchmarks.
- **SEO:** Valid structured data; clean semantics; hreflang ar/en.

## Risks & Mitigations

| Risk | Mitigation |
|---|---|
| Brand assets/colors not finalized | Token layer abstracts brand; swap is one place |
| Salla SDK/event behavior nuances | Compose Web Components; verify via event bus early |
| Performance regressions as features grow | Per-route JS islands; budgets enforced each gate |
| RTL/LTR drift | Logical properties + dual-direction checks in quality gate |
| Scope creep across phases | Hard approval gates; TODO/plan kept authoritative |
