"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes/dist/types"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false)

  // Ensure we're only rendering the theme provider on the client
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <>{children}</>
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

// Custom hook to use theme
export const useTheme = () => {
  const context = useContext(createContext(null))
  const { theme, setTheme } = useContext(createContext({ theme: "", setTheme: (theme: string) => {} }))

  return {
    theme,
    setTheme,
    toggleTheme: () => setTheme(theme === "dark" ? "light" : "dark"),
    isDark: theme === "dark",
    isLight: theme === "light",
  }
}

