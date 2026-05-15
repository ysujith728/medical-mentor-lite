import tailwindcssAnimate from "tailwindcss-animate";
import containerQueries from "@tailwindcss/container-queries";
import tailwindForms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // ============================================
        // ORIGINAL Material Design Tokens (Neural Medix)
        // Preserved for Dashboard, Quiz, Anatomy, etc.
        // ============================================
        "on-tertiary-container": "#ffffff",
        "on-surface-variant": "#aca7cc",
        "secondary-dim": "#ff50fc",
        "surface-container": "#181538",
        "error-dim": "#d7383b",
        "surface-container-highest": "#24204a",
        "tertiary-dim": "#9c42f4",
        "surface-variant": "#24204a",
        "primary-dim": "#27e5e8",
        "on-background": "#e7e2ff",
        "surface-tint": "#43f3f6",
        "outline-variant": "#474464",
        "on-primary": "#005859",
        "surface-container-lowest": "#000000",
        "on-error-container": "#ffa8a3",
        "background": "#0d0a27",
        "surface": "#0d0a27",
        "on-secondary-fixed-variant": "#910093",
        "primary-fixed-dim": "#27e5e8",
        "on-error": "#490006",
        "surface-bright": "#2a2653",
        "error-container": "#9f0519",
        "surface-container-high": "#1e1a41",
        "primary": "#43f3f6",
        "secondary-fixed-dim": "#ffa6f5",
        "primary-fixed": "#43f3f6",
        "tertiary-fixed": "#cc9bff",
        "outline": "#757294",
        "error": "#ff716c",
        "secondary": "#ff50fc",
        "on-secondary": "#3f0040",
        "surface-container-low": "#120f2f",
        "tertiary-fixed-dim": "#c389ff",
        "surface-dim": "#0d0a27",
        "secondary-container": "#a800aa",
        "on-secondary-container": "#fff5f9",
        "tertiary": "#bf81ff",
        "on-surface": "#e7e2ff",
        "on-primary-fixed": "#004344",
        "primary-container": "#16dfe2",
        "on-tertiary-fixed-variant": "#550096",
        "secondary-fixed": "#ffbdf5",
        "inverse-on-surface": "#555172",
        "on-primary-fixed-variant": "#006264",
        "on-tertiary-fixed": "#260049",
        "inverse-primary": "#006a6c",
        "on-tertiary": "#32005c",
        "on-primary-container": "#004a4b",
        "inverse-surface": "#fcf8ff",
        "tertiary-container": "#9c42f4",
        "on-secondary-fixed": "#610062",

        // ============================================
        // NEW Nexora Tokens (for Landing Page only)
        // Using hsl(var(--nx-*)) pattern
        // ============================================
        "nx-background": "hsl(var(--nx-background))",
        "nx-foreground": "hsl(var(--nx-foreground))",
        "nx-primary": "hsl(var(--nx-primary))",
        "nx-primary-foreground": "hsl(var(--nx-primary-foreground))",
        "nx-secondary": "hsl(var(--nx-secondary))",
        "nx-secondary-foreground": "hsl(var(--nx-secondary-foreground))",
        "nx-muted": "hsl(var(--nx-muted))",
        "nx-muted-foreground": "hsl(var(--nx-muted-foreground))",
        "nx-accent": "hsl(var(--nx-accent))",
        "nx-accent-foreground": "hsl(var(--nx-accent-foreground))",
        "nx-border": "hsl(var(--nx-border))",
        "nx-ring": "hsl(var(--nx-ring))",
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      fontFamily: {
        "headline": ["Space Grotesk", "sans-serif"],
        "body": ["Manrope", "sans-serif"],
        "label": ["Manrope", "sans-serif"],
        // New fonts for landing page
        "display": ["'Instrument Serif'", "serif"],
        "inter": ["'Inter'", "sans-serif"],
      }
    },
  },
  plugins: [
    tailwindForms,
    containerQueries,
    tailwindcssAnimate,
  ],
};
