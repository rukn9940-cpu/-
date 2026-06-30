/**
 * Header-family Alpine components: sticky header, announcement bar, mega menu,
 * smart search, mobile navigation.
 */
import { storage } from '../core/storage.js';
import { debounce } from '../utils/dom.js';

/** Sticky header: condenses on scroll, hides on scroll-down, shows on scroll-up. */
export function rknStickyHeader() {
  return {
    scrolled: false,
    hidden: false,
    _last: 0,
    init() {
      const onScroll = () => {
        const y = window.scrollY;
        this.scrolled = y > 8;
        // Hide when scrolling down past the header; reveal on scroll up.
        this.hidden = y > 160 && y > this._last;
        this._last = y;
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    },
  };
}

/** Dismissible announcement bar (remembers dismissal for the session). */
export function rknAnnouncementBar(id = 'default') {
  return {
    visible: storage.get(`announcement:${id}`, true),
    dismiss() {
      this.visible = false;
      storage.set(`announcement:${id}`, false);
    },
  };
}

/** Mega menu: hover (pointer) + keyboard accessible, one panel open at a time. */
export function rknMegaMenu() {
  return {
    active: null,
    _closeTimer: null,
    openPanel(id) {
      clearTimeout(this._closeTimer);
      this.active = id;
    },
    scheduleClose() {
      this._closeTimer = setTimeout(() => (this.active = null), 150);
    },
    close() {
      clearTimeout(this._closeTimer);
      this.active = null;
    },
    isOpen(id) {
      return this.active === id;
    },
    onKey(e, id) {
      if (e.key === 'Escape') return this.close();
      if (['Enter', ' ', 'ArrowDown'].includes(e.key)) {
        e.preventDefault();
        this.openPanel(id);
      }
    },
  };
}

/** Smart search with debounced suggestions via the Salla SDK. */
export function rknSmartSearch() {
  return {
    q: '',
    open: false,
    loading: false,
    results: { products: [], suggestions: [] },
    recent: storage.get('recent-searches', []),

    init() {
      this.search = debounce(this._run.bind(this), 250);
    },

    onInput() {
      this.open = true;
      if (this.q.trim().length < 2) {
        this.results = { products: [], suggestions: [] };
        return;
      }
      this.loading = true;
      this.search();
    },

    async _run() {
      const term = this.q.trim();
      try {
        // Salla SDK quick-search; falls back gracefully if unavailable.
        const res = (await window.salla?.product?.quickSearch?.(term)) || {};
        this.results = {
          products: res.products || res.data || [],
          suggestions: res.keywords || [],
        };
      } catch {
        this.results = { products: [], suggestions: [] };
      } finally {
        this.loading = false;
      }
    },

    submit() {
      const term = this.q.trim();
      if (!term) return;
      this.recent = [term, ...this.recent.filter((r) => r !== term)].slice(0, 6);
      storage.set('recent-searches', this.recent);
      const base = window.salla?.url?.get?.('/') || '/';
      window.location.href = `${base}?s=${encodeURIComponent(term)}`;
    },

    pick(term) {
      this.q = term;
      this.submit();
    },

    clearRecent() {
      this.recent = [];
      storage.set('recent-searches', []);
    },
  };
}

/** Mobile navigation accordion state. */
export function rknMobileNav() {
  return {
    expanded: null,
    toggle(id) {
      this.expanded = this.expanded === id ? null : id;
    },
  };
}
