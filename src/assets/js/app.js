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

/* ---------------------------------------------------------------------------
 * Boot
 * ------------------------------------------------------------------------- */
Alpine.plugin(focus);
Alpine.plugin(collapse);
window.Alpine = Alpine;
Alpine.start();
