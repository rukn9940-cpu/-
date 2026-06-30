/**
 * Thin event layer.
 * - Bridges the Salla SDK event bus (commerce truth) to the UI.
 * - Provides a small DOM CustomEvent helper for theme-internal signals.
 *
 * UI components subscribe here; they never mutate commerce state directly.
 */

/** Subscribe to a Salla SDK event if the SDK is present. Returns an unsubscribe fn. */
export function onSalla(eventName, handler) {
  if (typeof window === 'undefined' || !window.salla?.event) return () => {};
  window.salla.event.on(eventName, handler);
  return () => window.salla.event.off?.(eventName, handler);
}

/** Emit a theme-internal DOM event (namespaced rkn:*). */
export function emit(name, detail = {}, target = document) {
  target.dispatchEvent(new CustomEvent(`rkn:${name}`, { detail, bubbles: true }));
}

/** Listen for a theme-internal DOM event. Returns an unsubscribe fn. */
export function on(name, handler, target = document) {
  const wrapped = (e) => handler(e.detail, e);
  target.addEventListener(`rkn:${name}`, wrapped);
  return () => target.removeEventListener(`rkn:${name}`, wrapped);
}

/** Commerce event names we rely on (kept in one place for consistency). */
export const SallaEvents = {
  cartUpdated: 'cart::updated',
  cartItemAdded: 'cart::item.added',
  wishlistAdded: 'wishlist::added',
  wishlistRemoved: 'wishlist::removed',
  authLogin: 'auth::login',
  authLogout: 'auth::logout',
};
