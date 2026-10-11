import { useState, useEffect } from 'react';

export type Theme = 'light' | 'dark';

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'light';
    const saved = localStorage.getItem('khwahish-theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('khwahish-theme', theme);
  }, [theme]);

  const toggle = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    
    if (
      typeof document !== 'undefined' &&
      'startViewTransition' in document &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      try {
        (document as any).startViewTransition(() => {
          setThemeState(nextTheme);
        });
        return;
      } catch {
        // Fallback
      }
    }

    setThemeState(nextTheme);
  };

  return {
    dark: theme === 'dark',
    toggle,
    theme,
    toggleTheme: toggle,
    setTheme: setThemeState,
    isDark: theme === 'dark',
  };
}
