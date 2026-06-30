/**
 * Locale-aware formatters.
 * Brand decision: Western numerals (0-9) across the storefront, in both ar/en.
 * Currency defaults to SAR; the symbol/format follow the active locale but the
 * digit system stays 'latn'.
 */

const NUMBER_LOCALE = 'en'; // forces Western numerals regardless of UI language

/** Format a number with Western digits and grouping. */
export function formatNumber(value, options = {}) {
  const n = Number(value);
  if (!Number.isFinite(n)) return '';
  return new Intl.NumberFormat(NUMBER_LOCALE, { numberingSystem: 'latn', ...options }).format(n);
}

/** Format a monetary amount. Defaults to SAR with 2 fraction digits. */
export function formatCurrency(amount, currency = 'SAR') {
  const n = Number(amount);
  if (!Number.isFinite(n)) return '';
  return new Intl.NumberFormat(NUMBER_LOCALE, {
    style: 'currency',
    currency,
    numberingSystem: 'latn',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}

/** Compute a discount percentage (rounded) from a base and sale price. */
export function discountPercent(was, now) {
  const a = Number(was);
  const b = Number(now);
  if (!a || a <= b) return 0;
  return Math.round(((a - b) / a) * 100);
}
