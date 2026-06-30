/**
 * Global Alpine stores — small, shared UI/commerce-adjacent state.
 *
 * Rules:
 *  - `ui`  holds ephemeral overlay state (which drawer/menu is open).
 *  - `compare` / `recentlyViewed` are PERSISTED client lists (not commerce truth).
 *    Cart & wishlist truth stays in the Salla SDK; these stores only mirror counts.
 */
import { storage } from '../core/storage.js';
import { onSalla, SallaEvents } from '../core/events.js';

export function registerStores(Alpine) {
  // --- UI overlays ---------------------------------------------------------
  Alpine.store('ui', {
    mobileNav: false,
    search: false,
    cart: false,
    megaMenu: null, // id of the open mega-menu column, or null

    open(name) {
      this.closeAll();
      if (name === 'megaMenu') return; // handled per-item
      this[name] = true;
      document.documentElement.classList.add('overflow-hidden');
    },
    close(name) {
      this[name] = false;
      if (!this.anyOpen) document.documentElement.classList.remove('overflow-hidden');
    },
    toggle(name) {
      this[name] ? this.close(name) : this.open(name);
    },
    closeAll() {
      this.mobileNav = this.search = this.cart = false;
      this.megaMenu = null;
      document.documentElement.classList.remove('overflow-hidden');
    },
    get anyOpen() {
      return this.mobileNav || this.search || this.cart;
    },
  });

  // --- Compare list (persisted) -------------------------------------------
  Alpine.store('compare', {
    items: storage.get('compare', []),
    has(id) {
      return this.items.includes(id);
    },
    toggle(id) {
      id = String(id);
      this.items = this.has(id) ? this.items.filter((i) => i !== id) : [...this.items, id].slice(-4);
      storage.set('compare', this.items);
    },
    clear() {
      this.items = [];
      storage.set('compare', this.items);
    },
    get count() {
      return this.items.length;
    },
  });

  // --- Recently viewed (persisted, ids only) ------------------------------
  Alpine.store('recentlyViewed', {
    items: storage.get('recently-viewed', []),
    track(id) {
      id = String(id);
      this.items = [id, ...this.items.filter((i) => i !== id)].slice(0, 12);
      storage.set('recently-viewed', this.items);
    },
    get count() {
      return this.items.length;
    },
  });

  // --- Live commerce counters (mirror SDK events) -------------------------
  Alpine.store('badges', {
    cart: window.salla?.cart?.summary?.count ?? 0,
    wishlist: window.salla?.wishlist?.count ?? 0,
    init() {
      onSalla(SallaEvents.cartUpdated, (summary) => {
        this.cart = summary?.count ?? this.cart;
      });
      onSalla(SallaEvents.wishlistAdded, () => (this.wishlist += 1));
      onSalla(SallaEvents.wishlistRemoved, () => (this.wishlist = Math.max(0, this.wishlist - 1)));
    },
  });
}
