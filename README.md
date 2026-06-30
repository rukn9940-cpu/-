# RKN Premium Theme — ركن الاحتراف

> A production-ready, premium custom **Salla** ecommerce theme for **ركن الاحتراف**
> (RKN — Security Systems & Solutions), Saudi Arabia.

**Version:** 1.0 · **Status:** Phase 1 — Architecture (awaiting approval)
**Platform:** [Salla](https://salla.dev) Twilight Theme Framework
**Direction:** RTL-first · Arabic-first · Accessibility AA · Core Web Vitals optimized

---

## 1. About

RKN Premium Theme is a bespoke storefront experience for a Saudi security-systems
retailer specializing in IP cameras, WiFi/Solar/4G cameras, NVR/DVR systems, access
control, intercom, networking, storage, and professional installation services.

The goal is to deliver the **best security-systems ecommerce experience in Saudi
Arabia** — minimal, modern, luxury, elegant, fast, and trustworthy — exceeding local
competitors in design quality and conversion-focused UX.

This is **original work** inspired by premium ecommerce experiences (Apple Store, Noon,
Amazon, Golden Technology). No layouts or assets are copied.

## 2. Business Domain

| Category | Examples |
|---|---|
| Security Systems | Surveillance kits, bundles |
| IP / WiFi / Solar / 4G Cameras | Indoor, outdoor, PTZ, bullet, dome |
| Recording | NVR, DVR, Hard Drives |
| Access & Entry | Access Control, Intercom |
| Infrastructure | Networking (switches, PoE, routers) |
| Services | Installation Services, Business Solutions |

## 3. Tech Stack

- **Salla Twilight** — official theme engine (Twig templating)
- **Twilight JS SDK + Web Components** — cart, wishlist, auth, product logic
- **Alpine.js** — lightweight interactivity
- **Tailwind CSS** — utility-first styling with a custom design-token layer
- **Vite** (via Twilight CLI) — asset build pipeline
- **Salla CLI** — local dev, preview, and publishing

## 4. Repository Layout (high level)

```
.
├── docs/                 # Architecture & engineering documentation (Phase 1)
├── src/
│   ├── assets/           # js, styles, images
│   ├── views/            # Twig: layouts, pages, components
│   └── locales/          # ar.json (primary), en.json
├── twilight.json         # Theme manifest (added in Phase 2)
├── README.md
└── TODO.md
```

See [`docs/FOLDER_STRUCTURE.md`](docs/FOLDER_STRUCTURE.md) for the full tree.

## 5. Documentation Index

| Document | Purpose |
|---|---|
| [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) | System architecture, rendering model, data flow |
| [`docs/FOLDER_STRUCTURE.md`](docs/FOLDER_STRUCTURE.md) | Full directory tree and conventions |
| [`docs/DEVELOPMENT_PLAN.md`](docs/DEVELOPMENT_PLAN.md) | Phased delivery plan & task breakdown |
| [`docs/ROADMAP.md`](docs/ROADMAP.md) | Milestones, timeline, scope per phase |
| [`docs/CODING_STANDARDS.md`](docs/CODING_STANDARDS.md) | Twig/JS/CSS standards, naming, a11y, RTL rules |
| [`docs/COMPONENT_LIBRARY.md`](docs/COMPONENT_LIBRARY.md) | Component catalog & API contracts |
| [`TODO.md`](TODO.md) | Live task tracker across all phases |

## 6. Phased Delivery

The project ships in **5 governed phases**. Each phase completes, stops, and **waits
for approval** before the next begins.

1. **Phase 1 — Architecture** *(current)* — structure, docs, standards, plans.
2. **Phase 2 — Design System** — tokens, typography, components primitives.
3. **Phase 3 — Core Components** — header, mega menu, footer, product card, etc.
4. **Phase 4 — Pages** — home, category, product, cart, checkout, account, content.
5. **Phase 5 — Advanced Features** — wizards, calculators, quote builder, performance.

> **Governance rule:** Never continue automatically. Complete a phase, stop, await
> approval, then continue.

## 7. Local Development (reference — used from Phase 2 onward)

```bash
# Install Salla CLI
npm i -g @salla.sa/cli

# Authenticate
salla login

# Serve the theme locally with hot reload
salla theme serve

# Build for production
salla theme build

# Publish a new version
salla theme publish
```

## 8. License & Ownership

Proprietary — © ركن الاحتراف (RKN). All rights reserved.
