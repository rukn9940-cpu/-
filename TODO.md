# TODO — RKN Premium Theme

Live task tracker across all phases. Governance: **complete a phase → stop → await
approval → continue.** Detail lives in `docs/DEVELOPMENT_PLAN.md`.

Legend: `[x]` done · `[~]` in progress · `[ ]` pending · 🔒 blocked on approval

---

## Phase 1 — Architecture *(current)*

- [x] Repository scaffold (`src/` tree + `.gitkeep`)
- [x] README.md
- [x] docs/ARCHITECTURE.md
- [x] docs/FOLDER_STRUCTURE.md
- [x] docs/DEVELOPMENT_PLAN.md
- [x] docs/ROADMAP.md
- [x] docs/CODING_STANDARDS.md
- [x] docs/COMPONENT_LIBRARY.md
- [x] TODO.md
- [x] .gitignore
- [x] **Phase 1 approved**

## Phase 2 — Design System *(current)*

- [x] Design tokens (color, type, spacing, radius, shadow, z, motion)
- [x] tokens.css + dark-mode variables
- [x] tailwind.config.js wired to tokens
- [x] Typography scale (Arabic + Latin) — Inter + IBM Plex Sans Arabic
- [x] Grid & responsive breakpoints (RTL logical)
- [x] Primitive base styles (buttons, inputs, cards, badges, modals, alerts, forms, tables, nav, skeleton)
- [x] Icon system + RTL mirroring rules (documented)
- [x] Motion/animation guidelines + keyframes
- [x] twilight.json + merchant settings schema (brand, appearance, header, reviews)
- [x] master.twig shell + SEO base + JSON-LD
- [x] app.js / app.css + build pipeline (package.json, postcss, tailwind)
- [x] core JS (events, storage, formatters) + utils
- [x] ar.json / en.json bootstrap
- [x] docs/DESIGN_SYSTEM.md
- [x] **Phase 2 approved**

## Phase 3 — Core Components *(current)*

- [x] Announcement bar, sticky header, mega navigation/menu
- [x] Smart search + suggestions + recent searches
- [x] Hero banner, hero slider
- [x] Category cards, product cards, product labels, product badges
- [x] Flash sale cards (countdown + stock bar)
- [x] Trust badges, brand slider, testimonial cards, CTA sections
- [x] Newsletter, footer
- [x] Mobile navigation (off-canvas), bottom navigation
- [x] Breadcrumb, pagination, filters, sort menu
- [x] Product gallery, product information, product tabs
- [x] Review components (summary + list, provider-agnostic)
- [x] Related products, recently viewed
- [x] Wishlist, compare, cart drawer (SDK-wired)
- [x] Quantity selector, loading skeletons, empty states, error states
- [x] Alpine behavior layer (stores + data) wired into app.js
- [x] Shell wiring (icon sprite + header + footer) in master.twig
- [x] docs/COMPONENTS.md
- [x] **Phase 3 approved**

## Phase 4 — Pages *(current)*

- [x] Homepage (all 23 sections in order)
- [x] Category / listing page
- [x] Product details (+ Product/Offer/AggregateRating JSON-LD)
- [x] Search results
- [x] Cart
- [x] Checkout layout
- [x] Customer dashboard
- [x] Wishlist
- [x] Compare
- [x] Contact
- [x] About
- [x] Warranty
- [x] Business Solutions
- [x] Installation Booking
- [x] Helpers: products-section, blog-card, faq, account sidebar
- [x] docs/PAGES.md
- [~] **Awaiting Phase 4 approval to proceed**

> Login/Register, Orders detail, Brands, Blog list/single, Support, Privacy, Terms
> are Salla-provided or thin content routes — slated for the Phase 5 content/SEO pass
> (not requested in the Phase 4 page list).

## Phase 5 — Advanced Features 🔒

- [ ] Camera Recommendation Wizard
- [ ] Storage Calculator
- [ ] Camera Quantity Calculator
- [ ] Business Quote Builder
- [ ] Installation Booking flow
- [ ] Recently Viewed
- [ ] Bundles / Upsells / Cross-sell
- [ ] Flash Deals + Countdown
- [ ] Google Reviews
- [ ] Notifications
- [ ] SEO / Performance / Analytics pass
