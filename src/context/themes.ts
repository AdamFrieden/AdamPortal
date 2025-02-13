// context/themes.ts
import { createTheme } from '@mui/material';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#658e70', light: '#8fb997' },
    secondary: { main: '#5bc5bc' },
    background: { default: '#ffffff', paper: '#f4f6f8' },
    text: { primary: '#000000', secondary: '#2979ff' },
    error: { main: '#e2756d' },
  },
  typography: { fontFamily: 'Noto Sans' },
  // typography: { fontFamily: 'Orbitron' },
  shape: { borderRadius: 8 },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#658e70', light: '#363950' },
    secondary: { main: '#5bc5bc' },
    background: { default: '#121314', paper: '#161e29' },
    text: { primary: '#95c9fb', secondary: '#2979ff' },
    error: { main: '#e2756d' },
  },
  typography: { fontFamily: 'Silkscreen' },
  shape: { borderRadius: 8 },
});

export const celestialCircuitTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00adb5',  // electric teal
      light: '#33c9d1',
      dark: '#007d81',
    },
    secondary: {
      main: '#ff2e63',  // hot pink
      light: '#ff5a8b',
      dark: '#c0214b',
    },
    background: {
      default: '#222831', // charcoal with a digital glow
      paper: '#393e46',
    },
    text: {
      primary: '#eeeeee',
      secondary: '#d3d3d3',
    },
    error: { main: '#ff5252' },
  },
  typography: {
    fontFamily: '"Share Tech Mono", monospace', // monospaced for a techy feel
  },
  shape: { borderRadius: 8 },
});


export const mysticArenaTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6a0dad',  // deep, mystical purple
      light: '#8a3ebb',
      dark: '#4b0082',
    },
    secondary: {
      main: '#00b894',  // vibrant, enchanted green
      light: '#33d69a',
      dark: '#008f5b',
    },
    background: {
      default: '#0d0221',
      paper: '#1a0341',
    },
    text: {
      primary: '#f1f2f6',
      secondary: '#b2bec3',
    },
    error: { main: '#e17055' },
  },
  typography: {
    fontFamily: '"MedievalSharp", cursive', // playful yet evocative
  },
  shape: { borderRadius: 12 },
});

export const ancientTechTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#658e70',  // rich copper
      light: '#658e70',
      dark: '#658e70',
    },
    secondary: {
      main: '#5bc5bc',  // dark slate grey
      light: '#5bc5bc',
      dark: '#5bc5bc',
    },
    background: {
      default: '#1c1c1c',
      paper: '#2b2b2b',
    },
    text: {
      primary: '#a67c52', // parchment-like warmth
      secondary: '#b8a99e',
    },
    error: { main: '#ff5252' },
  },
  typography: {
    // fontFamily: '"Share Tech Mono", monospace', // monospaced for a techy feel
    fontFamily: 'Silkscreen'

  },
  shape: { borderRadius: 16 },
});

export const galacticGladiatorTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3b3b98',   // deep cosmic blue
      light: '#6b6bd9',
      dark: '#212149',
    },
    secondary: {
      main: '#ff6b81',   // vibrant coral-red
      light: '#ff8a9c',
      dark: '#c74b65',
    },
    background: {
      default: '#0b0c10', // near-black, starry void
      paper: '#1f2833',   // dark blue-grey
    },
    text: {
      primary: '#66fcf1', // neon turquoise highlights
      secondary: '#45a29e',
    },
    error: { main: '#ff6b6b' },
  },
  typography: {
    fontFamily: '"Orbitron", sans-serif', // futuristic digital vibe
  },
  shape: { borderRadius: 8 },
});
