// CodeDen Design Tokens — use these throughout slide components
export const t = {
  // Colors
  accent: '#f8a01a',
  accentDark: '#c47d00',
  navy: '#0e004e',
  ink: '#1a1600',
  gray100: '#f4f1e8',
  gray300: '#d6d0be',
  gray700: '#5c5646',
  orange400: '#f8a01a',
  white: '#ffffff',

  // Typography
  fontDisplay: "'Figtree', sans-serif",
  fontBody: "'Open Sans', sans-serif",
  fontMono: "'Roboto Mono', monospace",

  // Spacing & Shape
  radiusMd: '12px',
  radiusLg: '20px',
  radiusPill: '999px',

  // Slide dimensions (16:9 at 1920×1080)
  slideW: 1920,
  slideH: 1080,

  // Shadows
  shadowMd: '0 8px 24px rgba(25,22,0,.18)',
  shadowLg: '0 20px 50px rgba(25,22,0,.28)',
};

// Helpers for common repeated patterns
export const slideBase = {
  width: t.slideW, height: t.slideH,
  position: 'relative', overflow: 'hidden',
  fontFamily: t.fontBody,
};
export const topBar = (color = t.accent) => ({
  position: 'absolute', top: 0, left: 0, right: 0, height: 10, background: color,
});
export const logoPos = { height: 44, position: 'absolute', top: 44, left: 64 };
export const logoPosLight = { ...logoPos, height: 36, top: 40 };
