/**
 * RKN Premium Theme — JS entry point.
 *
 * Responsibilities (Phase 2 foundation):
 *   - import the stylesheet so the build pipeline compiles it
 *   - boot Alpine.js with the focus + collapse plugins
 *   - expose a tiny registry so Phase 3 component islands can self-register
 *
 * Architecture: islands, not an app. Commerce truth stays in the Salla SDK.
 */
import '../styles/app.css';

import Alpine from 'alpinejs';
import focus from '@alpinejs/focus';
import collapse from '@alpinejs/collapse';

import { formatCurrency, formatNumber, discountPercent } from './core/formatters.js';
import { registerComponents } from './components/index.js';

/** Component islands register an init(root) here; booted on DOMContentLoaded. */
const islands = [];
export function registerIsland(selector, init) {
  islands.push({ selector, init });
}

function bootIslands(scope = document) {
  for (const { selector, init } of islands) {
    scope.querySelectorAll(selector).forEach((el) => {
      if (el.dataset.rknBound) return;
      el.dataset.rknBound = 'true';
      try {
        init(el);
      } catch (err) {
        // Fail soft: a broken island must never break the page.
        if (import.meta.env?.DEV) console.error('[rkn] island failed:', selector, err);
      }
    });
  }
}

// --- Alpine ----------------------------------------------------------------
Alpine.plugin(focus);
Alpine.plugin(collapse);

// Expose theme helpers to Alpine templates (formatting is centralized).
Alpine.magic('currency', () => (amount, currency) => formatCurrency(amount, currency));
Alpine.magic('number', () => (value, options) => formatNumber(value, options));

// Register all theme stores + components.
registerComponents(Alpine);

window.Alpine = Alpine;

// --- Boot ------------------------------------------------------------------
function boot() {
  bootIslands();
  Alpine.start();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}

// Re-scan after Salla re-renders parts of the page (e.g. AJAX product lists).
window.salla?.event?.on?.('theme::partial.loaded', (payload) => {
  bootIslands(payload?.target || document);
});

export { formatCurrency, formatNumber, discountPercent };
