/**
 * Registers every Alpine store and data component for the theme.
 * Imported by app.js and called with the Alpine instance before Alpine.start().
 */
import { registerStores } from './stores.js';
import { rknCarousel } from './carousel.js';
import {
  rknStickyHeader,
  rknAnnouncementBar,
  rknMegaMenu,
  rknSmartSearch,
  rknMobileNav,
} from './header.js';
import {
  rknGallery,
  rknTabs,
  rknQuantity,
  rknCountdown,
  rknTrackView,
} from './product.js';
import { rknFilters, rknSortMenu } from './catalog.js';
import { rknCartDrawer } from './cart.js';

export function registerComponents(Alpine) {
  registerStores(Alpine);

  Alpine.data('rknCarousel', rknCarousel);
  Alpine.data('rknStickyHeader', rknStickyHeader);
  Alpine.data('rknAnnouncementBar', rknAnnouncementBar);
  Alpine.data('rknMegaMenu', rknMegaMenu);
  Alpine.data('rknSmartSearch', rknSmartSearch);
  Alpine.data('rknMobileNav', rknMobileNav);
  Alpine.data('rknGallery', rknGallery);
  Alpine.data('rknTabs', rknTabs);
  Alpine.data('rknQuantity', rknQuantity);
  Alpine.data('rknCountdown', rknCountdown);
  Alpine.data('rknTrackView', rknTrackView);
  Alpine.data('rknFilters', rknFilters);
  Alpine.data('rknSortMenu', rknSortMenu);
  Alpine.data('rknCartDrawer', rknCartDrawer);
}
