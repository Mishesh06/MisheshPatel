/**
 * ThemeContext — provides dark / light theme state to the whole app.
 *
 * Rules:
 *  - Default is 'dark'.
 *  - The chosen theme is stored in sessionStorage so it survives page refreshes
 *    within the session but resets on a new tab/session.
 *  - The 'dark' class is toggled on <html> so Tailwind's class-based dark mode
 *    works and so CSS [data-theme] variables resolve correctly.
 *
 * Usage:
 *   const { theme, toggle } = useTheme()
 */

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

type Theme = 'dark' | 'light'

interface ThemeContextValue {
  theme: Theme
  toggle: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'dark'
    return (sessionStorage.getItem('theme') as Theme | null) ?? 'dark'
  })

  // Apply the theme to <html> whenever it changes
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark')
      root.classList.add('dark')
    } else {
      root.setAttribute('data-theme', 'light')
      root.classList.remove('dark')
    }
    sessionStorage.setItem('theme', theme)
  }, [theme])

  const toggle = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>')
  return ctx
}

