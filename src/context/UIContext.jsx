import { createContext, useContext, useMemo, useState } from 'react'

const UIContext = createContext(null)

export const UIProvider = ({ children }) => {
  const [theme, setTheme] = useState('light')

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
      isDark: theme === 'dark',
    }),
    [theme],
  )

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>
}

export const useUI = () => {
  const ctx = useContext(UIContext)
  if (!ctx) {
    throw new Error('useUI must be used within UIProvider')
  }
  return ctx
}

