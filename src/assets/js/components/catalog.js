/**
 * Catalog-family Alpine components: filters sidebar/drawer, sort menu.
 * These manage UI state and build a query; Salla handles the actual listing.
 */

/** Filters: collapsible groups, mobile drawer, applied-count, price range. */
export function rknFilters() {
  return {
    drawer: false, // mobile filters drawer
    groups: {}, // { groupId: collapsed:boolean }
    applied: 0,

    toggleGroup(id) {
      this.groups[id] = !this.groups[id];
    },
    isCollapsed(id) {
      return !!this.groups[id];
    },
    openDrawer() {
      this.drawer = true;
      document.documentElement.classList.add('overflow-hidden');
    },
    closeDrawer() {
      this.drawer = false;
      document.documentElement.classList.remove('overflow-hidden');
    },
    countApplied() {
      this.applied = this.$root.querySelectorAll('input:checked, [data-active="true"]').length;
    },
    reset() {
      this.$root.querySelectorAll('input:checked').forEach((i) => (i.checked = false));
      this.applied = 0;
      this.$dispatch('rkn:filters-reset');
    },
  };
}

/** Sort menu dropdown. */
export function rknSortMenu(current = '') {
  return {
    open: false,
    current,
    select(value, label) {
      this.current = label || value;
      this.open = false;
      this.$dispatch('rkn:sort', { value });
    },
  };
}
