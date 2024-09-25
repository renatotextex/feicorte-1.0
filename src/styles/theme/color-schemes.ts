import type { ColorSystemOptions } from '@mui/material/styles';

import { california, kepple, neonBlue, nevada, redOrange, shakespeare, stormGrey } from './colors';
import type { ColorScheme } from './types';

export const colorSchemes = {
  dark: {
    palette: {
      action: { disabledBackground: 'rgba(0, 0, 0, 0.12)' },
      background: {
        default: 'var(--mui-palette-neutral-950)',
        defaultChannel: '9 10 11',
        paper: '#00000f',
        paperChannel: '19 78 72',
        level1: 'var(--mui-palette-neutral-800)',
        level2: 'var(--mui-palette-neutral-700)',
        level3: 'var(--mui-palette-neutral-600)',
        levelButton: '#4f0100',
      },
      common: { black: '#000000', white: '#ffffff' },
      divider: 'var(--mui-palette-neutral-700)',
      dividerChannel: '50 56 62',
      error: {
        ...redOrange,
        light: redOrange[300],
        main: redOrange[400],
        dark: redOrange[500],
        contrastText: '#000000',
      },
      info: {
        ...shakespeare,
        light: shakespeare[300],
        main: shakespeare[400],
        dark: shakespeare[500],
        contrastText: '#000000',
      },
      neutral: { ...nevada },
      primary: {
        ...neonBlue,
        light: neonBlue[300],
        main: neonBlue[400],
        dark: neonBlue[500],
        contrastText: '#000000',
      },
      secondary: {
        ...nevada,
        light: nevada[100],
        main: nevada[200],
        dark: nevada[300],
        contrastText: '#000000',
      },
      success: {
        ...kepple,
        light: kepple[300],
        main: kepple[400],
        dark: kepple[500],
        contrastText: '#000000',
      },
      text: {
        primary: 'var(--mui-palette-neutral-100)',
        primaryChannel: '240 244 248',
        secondary: 'var(--mui-palette-neutral-400)',
        secondaryChannel: '159 166 173',
        disabled: 'var(--mui-palette-neutral-600)',
      },
      warning: {
        ...california,
        light: california[300],
        main: california[400],
        dark: california[950],
        contrastText: '#000000',
      },
    },
  },
  light: {
    palette: {
      action: { disabledBackground: 'rgba(0, 0, 0, 0.06)' },
      background: {
        default: '#fff',
        defaultChannel: '255 255 255',
        paper: '#fff',
        paperChannel: '255 255 255',
        level1: 'var(--mui-palette-neutral-50)',
        level2: 'var(--mui-palette-neutral-100)',
        level3: '#00000f',
        levelButton: '#4f0403',
      },
      common: { black: '#000000', white: '#ffffff' },
      divider: '#00000f',
      dividerChannel: '220 223 228',
      error: {
        ...redOrange,
        light: redOrange[400],
        main: redOrange[500],
        dark: redOrange[600],
        contrastText: '#fff',
      },
      info: {
        ...shakespeare,
        light: shakespeare[400],
        main: shakespeare[500],
        dark: shakespeare[600],
        contrastText: '#fff',
      },
      neutral: { ...stormGrey },
      primary: {
        ...neonBlue,
        light: neonBlue[400],
        main: '#4f0100',
        dark: '#4F010083',
        contrastText: '#fff',
      },
      secondary: {
        ...nevada,
        light: nevada[600],
        main: nevada[700],
        dark: nevada[800],
        contrastText: '#fff',
      },
      success: {
        ...kepple,
        light: kepple[400],
        main: kepple[500],
        dark: kepple[600],
        contrastText: '#fff',
      },
      text: {
        primary: '#00000f',
        primaryChannel: '33 38 54',
        secondary: '#00000f',
        secondaryChannel: '102 112 133',
        disabled: '#00000f',
      },
      warning: {
        ...california,
        light: california[400],
        main: california[500],
        dark: california[600],
        contrastText: '#fff',
      },
    },
  },
} satisfies Partial<Record<ColorScheme, ColorSystemOptions>>;
