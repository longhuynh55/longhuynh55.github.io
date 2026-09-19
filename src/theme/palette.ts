// Shared semantic palette — single source of truth for literal colors.
// DESIGN.md §4. Component/page styles MUST use CSS variables only;
// only Base.astro theme-color metadata may serialize these literals.
// Keep in sync with src/styles/global.css :root / html.dark.

export const palette = {
  light: {
    bg: '#F7F5EF',
    surface: '#FFFEFA',
    surfaceMuted: '#ECEEE7',
    text: '#202722',
    textMuted: '#59645C',
    accent: '#285640',
    accentHover: '#1B402E',
    accentInk: '#214A35',
    spot: '#C9E875',
    inkBlock: '#173B2C',
    border: '#D4DBD1',
    tagBg: '#E3EBDD',
    onInk: '#F3F5EC',
    onInkMuted: '#C2D1C4',
    onInkFaint: '#ACBFAF',
    onAccent: '#FFFEFA',
    onSpot: '#173B2C',
    focus: '#285640',
    focusOnInk: '#C9E875',
  },
  dark: {
    bg: '#151917',
    surface: '#1D2320',
    surfaceMuted: '#262E29',
    text: '#F3F4ED',
    textMuted: '#B1BDB3',
    accent: '#91C8A5',
    accentHover: '#B7DFBF',
    accentInk: '#B7DFBF',
    spot: '#C9E875',
    inkBlock: '#102B20',
    border: '#455349',
    tagBg: '#2A3B30',
    onInk: '#F3F5EC',
    onInkMuted: '#C2D1C4',
    onInkFaint: '#ACBFAF',
    onAccent: '#151917',
    onSpot: '#173B2C',
    focus: '#C9E875',
    focusOnInk: '#C9E875',
  },
} as const;

export type PaletteTheme = keyof typeof palette;
