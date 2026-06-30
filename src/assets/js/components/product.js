/**
 * Product-family Alpine components: gallery, tabs, quantity selector,
 * flash-sale countdown, recently-viewed tracker.
 */
import { isRTL } from '../utils/dom.js';

/** Product gallery: thumbnail ↔ main image, keyboard + RTL swipe friendly. */
export function rknGallery(images = []) {
  return {
    images,
    active: 0,
    zoom: false,
    select(i) {
      this.active = Math.max(0, Math.min(i, this.images.length - 1));
    },
    next() {
      this.select((this.active + 1) % this.images.length);
    },
    prev() {
      this.select((this.active - 1 + this.images.length) % this.images.length);
    },
    onKey(e) {
      if (e.key === 'ArrowRight') isRTL() ? this.prev() : this.next();
      if (e.key === 'ArrowLeft') isRTL() ? this.next() : this.prev();
    },
  };
}

/** Accessible tabs (product description / specs / reviews). */
export function rknTabs(initial = 0) {
  return {
    active: initial,
    select(i) {
      this.active = i;
    },
    isActive(i) {
      return this.active === i;
    },
    onKey(e, i, total) {
      if (e.key === 'ArrowRight') this.active = isRTL() ? (i - 1 + total) % total : (i + 1) % total;
      if (e.key === 'ArrowLeft') this.active = isRTL() ? (i + 1) % total : (i - 1 + total) % total;
      if (e.key === 'Home') this.active = 0;
      if (e.key === 'End') this.active = total - 1;
    },
  };
}

/** Quantity selector with min/max clamping. Emits input for Salla components. */
export function rknQuantity(opts = {}) {
  const { value = 1, min = 1, max = 99 } = opts;
  return {
    qty: value,
    min,
    max,
    inc() {
      this.qty = Math.min(this.max, this.qty + 1);
      this._emit();
    },
    dec() {
      this.qty = Math.max(this.min, this.qty - 1);
      this._emit();
    },
    onInput(e) {
      const n = parseInt(e.target.value, 10);
      this.qty = Number.isFinite(n) ? Math.max(this.min, Math.min(this.max, n)) : this.min;
      this._emit();
    },
    _emit() {
      this.$dispatch('rkn:quantity', { value: this.qty });
    },
  };
}

/** Flash-sale countdown. `end` is an ISO string or epoch ms. */
export function rknCountdown(end) {
  return {
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
    ended: false,
    _timer: null,
    init() {
      const target = typeof end === 'number' ? end : Date.parse(end);
      const tick = () => {
        const diff = target - Date.now();
        if (diff <= 0) {
          this.ended = true;
          this.days = this.hours = this.minutes = this.seconds = '00';
          clearInterval(this._timer);
          return;
        }
        const s = Math.floor(diff / 1000);
        this.days = String(Math.floor(s / 86400)).padStart(2, '0');
        this.hours = String(Math.floor((s % 86400) / 3600)).padStart(2, '0');
        this.minutes = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
        this.seconds = String(s % 60).padStart(2, '0');
      };
      tick();
      this._timer = setInterval(tick, 1000);
    },
  };
}

/** Records the current product into the recently-viewed store. */
export function rknTrackView(id) {
  return {
    init() {
      if (id) this.$store.recentlyViewed.track(id);
    },
  };
}
