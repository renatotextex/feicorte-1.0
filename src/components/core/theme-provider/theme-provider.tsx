'use client';

import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import {  createTheme, ThemeProvider as MUIThemeProvider  } from '@mui/material/styles';
import { colorSchemes } from '@/styles/theme/color-schemes';
import { Saira } from 'next/font/google';
import EmotionCache from './emotion-cache';

const saira = Saira({
  weight: ['400', '500', '600'], // Defina os pesos que você deseja usar
  subsets: ['latin'],
});

export interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps): React.JSX.Element {
  const theme = createTheme({
    ...colorSchemes.light,
    typography: {
      fontFamily: saira.style.fontFamily,
    },
  });

  return (
    <EmotionCache options={{ key: 'mui' }}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider >
    </EmotionCache>
  );
}
