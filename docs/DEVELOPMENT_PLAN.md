# Development Plan — RKN Premium Theme

**Phase 1 deliverable.** The phased delivery plan and task breakdown. Each phase is a
governed gate: **complete → stop → await approval → continue.**

---

## Phase 1 — Architecture *(current)*

**Goal:** A complete, approved blueprint before any UI is written.

- [x] Repository scaffold (folders + `.gitkeep`)
- [x] `README.md` — project front door
- [x] `docs/ARCHITECTURE.md`
- [x] `docs/FOLDER_STRUCTURE.md`
- [x] `docs/DEVELOPMENT_PLAN.md`
- [x] `docs/ROADMAP.md`
- [x] `docs/CODING_STANDARDS.md`
- [x] `docs/COMPONENT_LIBRARY.md`
- [x] `TODO.md`
- [x] `.gitignore`

**Exit criteria:** Architecture, standards, structure, and component plan reviewed and
approved. No UI code exists.

---

## Phase 2 — Design System

**Goal:** A token-driven foundation every component will consume.

- [ ] Design tokens: color, typography, spacing, radius, shadow, z-index, motion
- [ ] `tokens.css` (CSS variables) + dark-mode variable set
- [ ] `tailwind.config.js` wired to tokens
- [ ] Typography scale (Arabic + Latin pairing) and base text styles
- [ ] Grid system & responsive breakpoints (RTL logical)
- [ ] Primitive specs + base styles: buttons, inputs, cards, badges, modals, alerts,
      forms, tables, navigation
- [ ] Icon system (set, sizing, RTL mirroring rules)
- [ ] Animation/motion guidelines (durations, easings, reduced-motion)
- [ ] `twilight.json` manifest + theme settings schema scaffold
- [ ] `master.twig` document shell (head, dir/lang, slots, SEO meta base)
- [ ] `app.js` / `app.css` entry wiring + build pipeline (`salla theme serve` works)
- [ ] `ar.json` / `en.json` bootstrapped
- [ ] `docs/DESIGN_SYSTEM.md`

**Exit criteria:** Tokens render, build runs locally, primitives documented, a sample
page renders with the design system. AA contrast verified.

---

## Phase 3 — Core Components

**Goal:** The reusable component layer the pages will compose.

- [ ] Header: top-bar, logo, primary nav
- [ ] Mega menu (security-category aware, RTL, keyboard accessible)
- [ ] Search (suggestions, recent, category scope)
- [ ] Cart drawer + header badge (SDK-wired)
- [ ] Wishlist + Compare entry points (SDK-wired)
- [ ] Footer (links, contact, payment/shipping marks)
- [ ] Newsletter block + popup
- [ ] Breadcrumb
- [ ] Product card (price, rating, badges, quick actions)
- [ ] Category card
- [ ] Buttons set, Pagination, Loading skeletons
- [ ] Sidebar (filters shell)
- [ ] Trust components (warranty, authenticity, support, reviews badge)

**Exit criteria:** Each component renders in isolation, passes a11y + RTL/LTR checks,
SDK-bound components stay in sync via events.

---

## Phase 4 — Pages

**Goal:** Every customer-facing route, composed from Phase 3 components.

- [ ] Homepage (hero, categories, flash deals, featured, trust, reviews)
- [ ] Category (filters, sort, grid, pagination)
- [ ] Product (gallery, options, price, stock, specs, related, reviews, JSON-LD)
- [ ] Cart
- [ ] Checkout (Salla flow integration points)
- [ ] Login / Register
- [ ] Dashboard / Orders
- [ ] Wishlist / Compare
- [ ] Brands
- [ ] Blog (list + single)
- [ ] About / Contact
- [ ] Business Solutions
- [ ] Installation Booking
- [ ] Support / Warranty / FAQ
- [ ] Privacy / Terms

**Exit criteria:** All routes render with real Salla data shapes, SEO/structured data in
place, CWV budgets met on key templates (home, category, product).

---

## Phase 5 — Advanced Features

**Goal:** Conversion and domain-specific differentiation.

- [ ] Camera Recommendation Wizard
- [ ] Storage Calculator (cameras × resolution × retention → required TB)
- [ ] Camera Quantity Calculator (area/coverage → recommended count)
- [ ] Business Quote Builder
- [ ] Installation Booking flow
- [ ] Recently Viewed
- [ ] Bundles / Upsells / Cross-sell
- [ ] Flash Deals + Countdown
- [ ] Google Reviews module
- [ ] Notifications (toasts/inline)
- [ ] SEO hardening, Performance pass, Analytics events

**Exit criteria:** Features work end-to-end, instrumented, within performance budgets,
and documented.

---

## Working Agreement

- One phase at a time. Do not start the next phase without approval.
- Every change keeps the build green and the docs in sync (docs lead code).
- Commit in small, descriptive units; push to `claude/optimistic-ride-7rfcfk`.
- Quality gates (CODING_STANDARDS §Quality) run before a phase is declared done.
