// src/hooks/useTheme.ts
'use client';

import { useState, useEffect } from 'react';

export type Theme = 'light' | 'dark' | 'system';

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    
    const initialTheme = storedTheme || 'system';
    setThemeState(initialTheme);

    applyTheme(initialTheme, systemTheme);
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
    
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    applyTheme(newTheme, systemTheme);
  };

  const applyTheme = (theme: Theme, systemTheme: 'light' | 'dark') => {
    const root = document.documentElement;
    
    if (theme === 'system') {
      root.classList.toggle('dark', systemTheme === 'dark');
    } else {
      root.classList.toggle('dark', theme === 'dark');
    }
  };

  return {
    theme,
    setTheme,
    mounted,
  };
}