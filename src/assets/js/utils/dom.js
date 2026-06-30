/** Small DOM/timing helpers shared across component islands. */

export function debounce(fn, wait = 200) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}

export function prefersReducedMotion() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
}

/** True when the document is laid out right-to-left. */
export function isRTL() {
  return document.documentElement.getAttribute('dir') === 'rtl';
}
