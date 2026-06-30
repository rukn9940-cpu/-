/**
 * RKN Premium Theme — Tailwind configuration
 *
 * Single source of truth for design tokens is `src/assets/styles/tokens.css`.
 * Colors here reference CSS variables (raw RGB triplets) so that:
 *   - opacity utilities work  (bg-primary/80)
 *   - dark mode is a variable swap, not a duplicated palette
 * RTL is handled with logical properties (tailwindcss-logical plugin).
 */

import tailwindcssLogical from 'tailwindcss-logical';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['selector', '[data-theme="dark"]'],
  content: [
    './src/views/**/*.twig',
    './src/assets/js/**/*.js',
    './twilight.json',
  ],
  theme: {
    // Mobile-first breakpoints
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
        xl: '2.5rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1200px',
        '2xl': '1320px',
      },
    },
    extend: {
      colors: {
        // Brand palette (scales) — values are RGB triplets in tokens.css
        primary: rgbVar('--rkn-primary'),
        secondary: rgbVar('--rkn-secondary'),
        slate: rgbVar('--rkn-slate'),
        success: rgbVar('--rkn-success'),
        warning: rgbVar('--rkn-warning'),
        danger: rgbVar('--rkn-danger'),
        info: rgbVar('--rkn-info'),

        // Semantic tokens (mode-aware)
        bg: 'rgb(var(--rkn-color-bg) / <alpha-value>)',
        surface: 'rgb(var(--rkn-color-surface) / <alpha-value>)',
        'surface-raised': 'rgb(var(--rkn-color-surface-raised) / <alpha-value>)',
        'surface-sunken': 'rgb(var(--rkn-color-surface-sunken) / <alpha-value>)',
        content: 'rgb(var(--rkn-color-text) / <alpha-value>)',
        'content-muted': 'rgb(var(--rkn-color-text-muted) / <alpha-value>)',
        'content-subtle': 'rgb(var(--rkn-color-text-subtle) / <alpha-value>)',
        'content-inverse': 'rgb(var(--rkn-color-text-inverse) / <alpha-value>)',
        accent: 'rgb(var(--rkn-color-accent) / <alpha-value>)',
        border: 'rgb(var(--rkn-color-border) / <alpha-value>)',
        'border-strong': 'rgb(var(--rkn-color-border-strong) / <alpha-value>)',
        ring: 'rgb(var(--rkn-color-ring) / <alpha-value>)',
      },
      fontFamily: {
        sans: 'var(--rkn-font-sans)',
        heading: 'var(--rkn-font-heading)',
        mono: 'var(--rkn-font-mono)',
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.65rem' }],
        xl: ['1.25rem', { lineHeight: '1.6rem' }],
        '2xl': ['1.5rem', { lineHeight: '1.95rem', letterSpacing: '-0.01em' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '-0.015em' }],
        '4xl': ['2.25rem', { lineHeight: '2.6rem', letterSpacing: '-0.02em' }],
        '5xl': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.022em' }],
        '6xl': ['3.75rem', { lineHeight: '1.05', letterSpacing: '-0.025em' }],
      },
      borderRadius: {
        sm: 'var(--rkn-radius-sm)',
        DEFAULT: 'var(--rkn-radius-md)',
        md: 'var(--rkn-radius-md)',
        lg: 'var(--rkn-radius-lg)',
        xl: 'var(--rkn-radius-xl)',
        '2xl': 'var(--rkn-radius-2xl)',
        '3xl': 'var(--rkn-radius-3xl)',
        full: '9999px',
      },
      boxShadow: {
        xs: 'var(--rkn-shadow-xs)',
        sm: 'var(--rkn-shadow-sm)',
        DEFAULT: 'var(--rkn-shadow-md)',
        md: 'var(--rkn-shadow-md)',
        lg: 'var(--rkn-shadow-lg)',
        xl: 'var(--rkn-shadow-xl)',
        '2xl': 'var(--rkn-shadow-2xl)',
        focus: 'var(--rkn-shadow-focus)',
        none: 'none',
      },
      zIndex: {
        dropdown: '1000',
        sticky: '1020',
        header: '1030',
        drawer: '1040',
        overlay: '1050',
        modal: '1060',
        popover: '1070',
        toast: '1080',
        tooltip: '1090',
      },
      transitionTimingFunction: {
        standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
        entrance: 'cubic-bezier(0, 0, 0.2, 1)',
        exit: 'cubic-bezier(0.4, 0, 1, 1)',
        emphasized: 'cubic-bezier(0.2, 0, 0, 1)',
      },
      transitionDuration: {
        fast: '150ms',
        DEFAULT: '200ms',
        slow: '300ms',
        slower: '500ms',
      },
      maxWidth: {
        prose: '68ch',
        container: '1320px',
      },
      keyframes: {
        'fade-in': { from: { opacity: '0' }, to: { opacity: '1' } },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(var(--rkn-shimmer-end, 100%))' },
        },
      },
      animation: {
        'fade-in': 'fade-in 200ms var(--rkn-ease-entrance, ease-out)',
        'slide-up': 'slide-up 250ms var(--rkn-ease-entrance, ease-out)',
        shimmer: 'shimmer 1.4s infinite',
      },
    },
  },
  plugins: [
    tailwindcssLogical,
  ],
};

/**
 * Build a Tailwind color scale that maps every step to a CSS variable
 * carrying an RGB triplet, with <alpha-value> support.
 */
function rgbVar(prefix) {
  const steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
  const scale = { DEFAULT: `rgb(var(${prefix}-500) / <alpha-value>)` };
  for (const s of steps) {
    scale[s] = `rgb(var(${prefix}-${s}) / <alpha-value>)`;
  }
  return scale;
}
