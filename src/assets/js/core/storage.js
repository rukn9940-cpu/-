/**
 * Namespaced, fail-soft localStorage wrapper.
 * All persisted client state lives under the `rkn:` namespace.
 * Commerce truth (cart/wishlist) is NEVER stored here — that belongs to the SDK.
 */
const NS = 'rkn:';

export const storage = {
  get(key, fallback = null) {
    try {
      const raw = window.localStorage.getItem(NS + key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch {
      return fallback;
    }
  },

  set(key, value) {
    try {
      window.localStorage.setItem(NS + key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  },

  remove(key) {
    try {
      window.localStorage.removeItem(NS + key);
    } catch {
      /* ignore */
    }
  },
};
