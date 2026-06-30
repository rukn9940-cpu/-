import '../styles/app.css';

import Alpine from 'alpinejs';
import focus from '@alpinejs/focus';
import collapse from '@alpinejs/collapse';

/* ---------------------------------------------------------------------------
 * Helpers
 * ------------------------------------------------------------------------- */
const NS = 'rkn:';
const store = {
  get(k, f = null) { try { const v = localStorage.getItem(NS + k); return v === null ? f : JSON.parse(v); } catch { return f; } },
  set(k, v) { try { localStorage.setItem(NS + k, JSON.stringify(v)); } catch { /* quota */ } },
};
const debounce = (fn, w = 250) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), w); }; };
const isRTL = () => document.documentElement.getAttribute('dir') === 'rtl';
const money = (v) => (window.salla?.money ? window.salla.money(v) : new Intl.NumberFormat('en', { style: 'currency', currency: window.salla?.config?.get?.('store.currency') || 'SAR', numberingSystem: 'latn' }).format(Number(v) || 0));
const lockScroll = (on) => document.documentElement.classList.toggle('overflow-hidden', on);

/* Merchant color customization: regenerate the brand palette from theme settings
 * (set as data-* on <html>) so a merchant's chosen colors drive every token. */
function hexToRgb(hex) { hex = String(hex).replace('#', ''); if (hex.length === 3) hex = hex.split('').map((c) => c + c).join(''); const n = parseInt(hex, 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; }
function mix(a, b, t) { return a.map((v, i) => Math.round(v + (b[i] - v) * t)); }
function applyBrand() {
  const root = document.documentElement, white = [255, 255, 255], ink = [15, 23, 42];
  const p = root.dataset.primary;
  if (p) {
    const base = hexToRgb(p);
    const steps = { 50: mix(base, white, 0.92), 100: mix(base, white, 0.84), 200: mix(base, white, 0.68), 300: mix(base, white, 0.5), 400: mix(base, white, 0.28), 500: base, 600: mix(base, ink, 0.16), 700: mix(base, ink, 0.32), 800: mix(base, ink, 0.48), 900: mix(base, ink, 0.62), 950: mix(base, ink, 0.78) };
    for (const k in steps) root.style.setProperty(`--rkn-primary-${k}`, steps[k].join(' '));
    root.style.setProperty('--rkn-color-primary', base.join(' '));
    root.style.setProperty('--rkn-color-ring', base.join(' '));
  }
  if (root.dataset.secondary) root.style.setProperty('--rkn-color-secondary', hexToRgb(root.dataset.secondary).join(' '));
  if (root.dataset.accent) root.style.setProperty('--rkn-color-accent', hexToRgb(root.dataset.accent).join(' '));
}
applyBrand();

/* ---------------------------------------------------------------------------
 * Stores
 * ------------------------------------------------------------------------- */
Alpine.store('ui', {
  mobileNav: false, search: false,
  open(n) { this.closeAll(); this[n] = true; lockScroll(true); },
  close(n) { this[n] = false; if (!this.anyOpen) lockScroll(false); },
  toggle(n) { this[n] ? this.close(n) : this.open(n); },
  closeAll() { this.mobileNav = this.search = false; lockScroll(false); },
  get anyOpen() { return this.mobileNav || this.search; },
});

Alpine.store('badges', {
  cart: 0, wishlist: 0,
  init() {
    const salla = window.salla;
    this.cart = salla?.cart?.summary?.count ?? salla?.config?.get?.('user.cart.count') ?? 0;
    this.wishlist = salla?.config?.get?.('user.wishlist_count') ?? 0;
    salla?.event?.on?.('cart::updated', (s) => { this.cart = s?.count ?? this.cart; });
    salla?.event?.on?.('cart::item.added', (s) => { if (s?.count != null) this.cart = s.count; });
    salla?.event?.on?.('wishlist::added', () => { this.wishlist += 1; });
    salla?.event?.on?.('wishlist::removed', () => { this.wishlist = Math.max(0, this.wishlist - 1); });
  },
});

Alpine.store('compare', {
  items: store.get('compare', []),
  has(id) { return this.items.includes(String(id)); },
  toggle(id) { id = String(id); this.items = this.has(id) ? this.items.filter((i) => i !== id) : [...this.items, id].slice(-4); store.set('compare', this.items); },
  clear() { this.items = []; store.set('compare', this.items); },
  get count() { return this.items.length; },
});

/* ---------------------------------------------------------------------------
 * Components
 * ------------------------------------------------------------------------- */
Alpine.data('rknAnnouncement', () => ({
  visible: store.get('announcement', true),
  dismiss() { this.visible = false; store.set('announcement', false); },
}));

Alpine.data('rknHeader', () => ({
  scrolled: false, hidden: false, _last: 0,
  init() {
    const onScroll = () => {
      const y = window.scrollY;
      this.scrolled = y > 8;
      this.hidden = y > 160 && y > this._last;
      this._last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  },
}));

Alpine.data('rknMegaMenu', () => ({
  active: null, _t: null,
  open(id) { clearTimeout(this._t); this.active = id; },
  scheduleClose() { this._t = setTimeout(() => (this.active = null), 150); },
  close() { clearTimeout(this._t); this.active = null; },
  isOpen(id) { return this.active === id; },
}));

Alpine.data('rknMobileNav', () => ({
  expanded: null,
  toggle(id) { this.expanded = this.expanded === id ? null : id; },
}));

Alpine.data('rknSearch', () => ({
  q: '', open: false, loading: false, results: [],
  init() { this._run = debounce(this._search.bind(this), 250); },
  onInput() {
    this.open = true;
    if (this.q.trim().length < 2) { this.results = []; this.loading = false; return; }
    this.loading = true; this._run();
  },
  async _search() {
    const term = this.q.trim();
    try {
      const res = (await window.salla?.product?.quickSearch?.(term)) || {};
      const list = res.products || res.data || [];
      this.results = list.map((p) => ({
        id: p.id,
        name: p.name,
        url: p.url || p.urls?.customer,
        image: p.image?.url || p.image || p.thumbnail,
        price: money(p.price?.amount ?? p.price),
      }));
    } catch { this.results = []; }
    finally { this.loading = false; }
  },
  submit() {
    const term = this.q.trim();
    if (!term) return;
    const base = window.salla?.url?.get?.('/') || '/';
    window.location.href = `${base}?s=${encodeURIComponent(term)}`;
  },
}));

Alpine.data('rknHeroSlider', (count = 1) => ({
  active: 0, _timer: null, _autoplay: 6000,
  init() {
    this.$refs.track?.addEventListener('scroll', debounce(() => this._sync(), 80), { passive: true });
    if (count > 1 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const io = new IntersectionObserver(([e]) => (e.isIntersecting ? this.play() : this.pause()));
      io.observe(this.$el);
    }
  },
  _slideWidth() { return this.$refs.track?.firstElementChild?.getBoundingClientRect().width || 0; },
  go(i) {
    this.active = (i + count) % count;
    this.$refs.track?.scrollTo({ left: this._slideWidth() * this.active * (isRTL() ? -1 : 1), behavior: 'smooth' });
  },
  next() { this.go(this.active + 1); },
  prev() { this.go(this.active - 1); },
  _sync() {
    const w = this._slideWidth();
    if (w) this.active = Math.round(Math.abs(this.$refs.track.scrollLeft) / w);
  },
  play() { this.pause(); if (count > 1) this._timer = setInterval(() => this.next(), this._autoplay); },
  pause() { if (this._timer) clearInterval(this._timer); this._timer = null; },
}));

Alpine.data('rknCartDrawer', () => ({
  open: false,
  init() {
    window.salla?.event?.on?.('cart::item.added', () => this.show());
    window.addEventListener('rkn:open-cart', () => this.show());
  },
  show() { this.open = true; lockScroll(true); },
  hide() { this.open = false; lockScroll(false); },
}));

Alpine.data('rknNewsletter', () => ({
  email: '', state: 'idle', msg: '',
  async subscribe() {
    this.state = 'loading'; this.msg = '';
    try {
      await (window.salla?.newsletter?.subscribe?.({ email: this.email }) ?? Promise.reject());
      this.state = 'success'; this.msg = window.salla?.lang?.get?.('blocks.newsletter.subscribed') || 'تم الاشتراك بنجاح!'; this.email = '';
    } catch {
      this.state = 'error'; this.msg = 'حدث خطأ، يرجى المحاولة مرة أخرى.';
    }
  },
}));

Alpine.store('recentlyViewed', {
  items: store.get('recently-viewed', []),
  track(id) { id = String(id); this.items = [id, ...this.items.filter((i) => i !== id)].slice(0, 12); store.set('recently-viewed', this.items); },
  get count() { return this.items.length; },
});

Alpine.data('rknTrackView', (id) => ({ init() { if (id) this.$store.recentlyViewed.track(id); } }));

/* Generic RTL-aware scroll-snap carousel (brand slider, content rows). */
Alpine.data('rknCarousel', (opts = {}) => ({
  atStart: true, atEnd: false,
  init() { this.$nextTick(() => this._edges()); this.$refs.track?.addEventListener('scroll', () => this._edges(), { passive: true }); },
  _step() { const t = this.$refs.track, c = t?.firstElementChild; if (!c) return t?.clientWidth || 0; return c.getBoundingClientRect().width + parseFloat(getComputedStyle(t).columnGap || '16'); },
  next() { this.$refs.track?.scrollBy({ left: this._step() * (isRTL() ? -1 : 1), behavior: 'smooth' }); },
  prev() { this.$refs.track?.scrollBy({ left: -this._step() * (isRTL() ? -1 : 1), behavior: 'smooth' }); },
  _edges() { const t = this.$refs.track; if (!t) return; const max = t.scrollWidth - t.clientWidth, x = Math.abs(t.scrollLeft); this.atStart = x <= 1; this.atEnd = x >= max - 1; },
}));

/* Product gallery: thumbnail <-> main image, keyboard + RTL arrows. */
Alpine.data('rknGallery', (images = []) => ({
  images, active: 0, zoom: false,
  select(i) { this.active = Math.max(0, Math.min(i, this.images.length - 1)); },
  next() { this.select((this.active + 1) % this.images.length); },
  prev() { this.select((this.active - 1 + this.images.length) % this.images.length); },
  onKey(e) { if (e.key === 'ArrowRight') isRTL() ? this.prev() : this.next(); if (e.key === 'ArrowLeft') isRTL() ? this.next() : this.prev(); },
}));

/* Accessible tabs (description / specs / reviews). */
Alpine.data('rknTabs', (initial = 0) => ({
  active: initial,
  select(i) { this.active = i; },
  isActive(i) { return this.active === i; },
  onKey(e, i, total) {
    if (e.key === 'ArrowRight') this.active = isRTL() ? (i - 1 + total) % total : (i + 1) % total;
    if (e.key === 'ArrowLeft') this.active = isRTL() ? (i + 1) % total : (i - 1 + total) % total;
    if (e.key === 'Home') this.active = 0;
    if (e.key === 'End') this.active = total - 1;
  },
}));

/* Quantity stepper. */
Alpine.data('rknQuantity', (opts = {}) => ({
  qty: opts.value || 1, min: opts.min || 1, max: opts.max || 99,
  inc() { this.qty = Math.min(this.max, this.qty + 1); this._emit(); },
  dec() { this.qty = Math.max(this.min, this.qty - 1); this._emit(); },
  onInput(e) { const n = parseInt(e.target.value, 10); this.qty = Number.isFinite(n) ? Math.max(this.min, Math.min(this.max, n)) : this.min; this._emit(); },
  _emit() { this.$dispatch('rkn:quantity', { value: this.qty }); },
}));

/* Flash-sale countdown. */
Alpine.data('rknCountdown', (end) => ({
  days: '00', hours: '00', minutes: '00', seconds: '00', ended: false, _t: null,
  init() {
    const target = typeof end === 'number' ? end : Date.parse(end);
    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) { this.ended = true; this.days = this.hours = this.minutes = this.seconds = '00'; clearInterval(this._t); return; }
      const s = Math.floor(diff / 1000);
      this.days = String(Math.floor(s / 86400)).padStart(2, '0');
      this.hours = String(Math.floor((s % 86400) / 3600)).padStart(2, '0');
      this.minutes = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
      this.seconds = String(s % 60).padStart(2, '0');
    };
    tick(); this._t = setInterval(tick, 1000);
  },
}));

/* Filters: collapsible groups + mobile drawer. */
Alpine.data('rknFilters', () => ({
  drawer: false, groups: {}, applied: 0,
  toggleGroup(id) { this.groups[id] = !this.groups[id]; },
  isCollapsed(id) { return !!this.groups[id]; },
  openDrawer() { this.drawer = true; lockScroll(true); },
  closeDrawer() { this.drawer = false; lockScroll(false); },
  count() { this.applied = this.$root.querySelectorAll('input:checked').length; },
  reset() { this.$root.querySelectorAll('input:checked').forEach((i) => (i.checked = false)); this.applied = 0; this.$dispatch('rkn:filters-reset'); },
}));

/* Sort dropdown — updates the URL query and reloads. */
Alpine.data('rknSort', (current = '') => ({
  open: false, current,
  select(value, label) {
    this.current = label || value; this.open = false;
    const u = new URL(window.location.href); u.searchParams.set('sort', value); u.searchParams.delete('page');
    window.location.href = u.toString();
  },
}));

/* FAQ accordion. */
Alpine.data('rknFaq', (initial = 0) => ({ open: initial, toggle(i) { this.open = this.open === i ? null : i; } }));

/* Generic Salla form (contact / quote / booking) with inline feedback. */
Alpine.data('rknForm', () => ({
  state: 'idle', msg: '',
  async submit(form) {
    this.state = 'loading'; this.msg = '';
    const data = Object.fromEntries(new FormData(form));
    try {
      await (window.salla?.contacts?.send?.(data) ?? Promise.reject());
      this.state = 'success'; this.msg = form.dataset.success || 'تم الإرسال بنجاح، سنتواصل معك قريبًا.'; form.reset();
    } catch {
      this.state = 'error'; this.msg = 'حدث خطأ، يرجى المحاولة مرة أخرى.';
    }
  },
}));

/* ---------------------------------------------------------------------------
 * Boot
 * ------------------------------------------------------------------------- */
Alpine.plugin(focus);
Alpine.plugin(collapse);
window.Alpine = Alpine;
Alpine.start();
