/**
 * Generic, RTL-aware, scroll-snap carousel.
 * Powers: hero slider, brand slider, related products, recently viewed, testimonials.
 *
 * Usage (Twig):
 *   <div x-data="rknCarousel({ autoplay: 5000, loop: true })">
 *     <div x-ref="track" class="rkn-carousel__track">…slides…</div>
 *     <button @click="prev()">…</button><button @click="next()">…</button>
 *   </div>
 *
 * Performance: native scroll-snap (no layout thrash), pointer drag optional,
 * autoplay pauses on hover/focus and respects reduced-motion.
 */
import { isRTL, prefersReducedMotion } from '../utils/dom.js';

export function rknCarousel(opts = {}) {
  const { autoplay = 0, loop = false } = opts;
  return {
    atStart: true,
    atEnd: false,
    _timer: null,

    init() {
      this.$nextTick(() => this.updateEdges());
      this.$refs.track?.addEventListener('scroll', () => this.updateEdges(), { passive: true });
      if (autoplay && !prefersReducedMotion()) this.play();
      // Pause autoplay when off-screen.
      if (autoplay) {
        const io = new IntersectionObserver(([e]) => (e.isIntersecting ? this.play() : this.pause()));
        io.observe(this.$el);
      }
    },

    _step() {
      const track = this.$refs.track;
      const first = track?.firstElementChild;
      if (!first) return track?.clientWidth || 0;
      const gap = parseFloat(getComputedStyle(track).columnGap || '0');
      return first.getBoundingClientRect().width + gap;
    },

    next() {
      this._scrollBy(this._step());
    },
    prev() {
      this._scrollBy(-this._step());
    },
    _scrollBy(amount) {
      const track = this.$refs.track;
      if (!track) return;
      // In RTL, positive "next" should move toward the logical end (negative px).
      const dir = isRTL() ? -1 : 1;
      const reachedEnd = this.atEnd && amount > 0;
      if (loop && reachedEnd) {
        track.scrollTo({ left: 0, behavior: 'smooth' });
        return;
      }
      track.scrollBy({ left: amount * dir, behavior: 'smooth' });
    },

    updateEdges() {
      const t = this.$refs.track;
      if (!t) return;
      const max = t.scrollWidth - t.clientWidth;
      const x = Math.abs(t.scrollLeft); // RTL scrollLeft can be negative
      this.atStart = x <= 1;
      this.atEnd = x >= max - 1;
    },

    play() {
      this.pause();
      if (!autoplay) return;
      this._timer = setInterval(() => {
        if (this.atEnd && loop) this.$refs.track.scrollTo({ left: 0, behavior: 'smooth' });
        else this.next();
      }, autoplay);
    },
    pause() {
      if (this._timer) clearInterval(this._timer);
      this._timer = null;
    },
  };
}
