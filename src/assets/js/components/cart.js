/**
 * Cart drawer. UI state only — cart truth lives in the Salla SDK and is read
 * via salla.event.cart.updated. The drawer never mutates totals directly.
 */
import { onSalla, SallaEvents } from '../core/events.js';

export function rknCartDrawer() {
  return {
    open: false,
    loading: false,

    init() {
      // Open the drawer automatically when an item is added.
      onSalla(SallaEvents.cartItemAdded, () => this.show());
      // Let other UI request opening via a DOM event.
      window.addEventListener('rkn:open-cart', () => this.show());
    },

    show() {
      this.open = true;
      document.documentElement.classList.add('overflow-hidden');
    },
    hide() {
      this.open = false;
      document.documentElement.classList.remove('overflow-hidden');
    },

    async removeItem(id) {
      this.loading = true;
      try {
        await window.salla?.cart?.deleteItem?.(id);
      } finally {
        this.loading = false;
      }
    },
  };
}
