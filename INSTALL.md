# Installation Guide — RKN Premium Theme

This guide explains how to install, preview, build, and upload the **RKN Premium**
theme to a Salla store using the Salla Twilight framework.

---

## 1. Requirements

- **Node.js** ≥ 18 and npm
- A **Salla Partners** account with access to the target store
- The **Salla CLI**

```bash
npm install -g @salla.sa/cli
```

## 2. Authenticate

```bash
salla login
```

This opens a browser to authorize the CLI with your Salla Partners account.

## 3. Install theme dependencies

From the theme root (the folder containing `twilight.json`):

```bash
npm install
```

## 4. Preview locally

```bash
npm run serve        # → salla theme serve
```

The CLI compiles Tailwind + JavaScript and serves a live preview with hot reload against
your store's data.

Other scripts:

```bash
npm run watch        # rebuild assets on change
npm run build        # production build of assets
npm run lint:css     # stylelint the CSS
npm run format       # prettier formatting
```

## 5. Link the theme to a store (first time)

```bash
salla theme link
```

Select the store you want to attach this theme to when prompted.

## 6. Upload / publish

### Option A — Publish with the CLI (recommended)

```bash
npm run publish      # → salla theme publish
```

The CLI builds the production assets and uploads a new theme version to Salla. After it
finishes, open **Salla Dashboard → Appearance (المظهر) → Themes** and activate/preview the
new version.

### Option B — Upload a ZIP

If you are distributing the theme as an archive:

1. Build the theme: `npm run build`
2. Create the package (excludes VCS/build/deps):

   ```bash
   zip -r rkn-premium-theme.zip . \
     -x ".git/*" "node_modules/*" "dist/*" "*.zip"
   ```

3. In the Salla theme tooling, upload `rkn-premium-theme.zip`.

> The ZIP must contain `twilight.json`, `package.json`, and the `src/` directory at its
> root (not nested inside an extra folder).

## 7. Configure theme settings

In **Salla Dashboard → Appearance → Themes → Customize (تخصيص)**, set:

- **Brand** — primary / secondary / accent colors
- **Appearance** — dark mode toggle, numerals (Western by default)
- **Header** — top-bar text/link, show compare
- **Homepage** — hero slides, homepage categories, and the category collections
  (Offers, IP, Solar, 4G, WiFi, NVR/DVR, Accessories)
- **Reviews** — provider (Salla native by default)
- **Performance** — lazy-load images

## 8. Verify before going live

- Preview on mobile and desktop, and in both RTL (Arabic) and LTR (English).
- Confirm add-to-cart, wishlist, compare, search, and checkout flows.
- Confirm the homepage collections render (they require category IDs set in settings).

---

## Directory reference

```
twilight.json           Theme manifest + merchant settings
package.json            Dependencies and scripts
tailwind.config.js      Tailwind (tokens-driven)
postcss.config.js       PostCSS pipeline
src/views/              Twig layouts, components, pages
src/assets/             app.js, app.css, tokens.css, images
src/locales/            ar.json (primary), en.json
```

## Troubleshooting

- **CLI not found** — reinstall globally: `npm install -g @salla.sa/cli`.
- **Not authorized** — run `salla login` again.
- **Assets not updating** — stop `serve`, run `npm run build`, then `serve` again.
- **Colors not applied** — set them under theme settings → Brand; the palette is generated
  from those values at runtime.
