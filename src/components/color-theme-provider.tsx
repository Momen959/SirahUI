
"use client"

import * as React from "react"

type ColorTheme = "theme-green" | "theme-brown" | "theme-blue" | "theme-purple";

type ColorThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: ColorTheme
  storageKey?: string
}

type ColorThemeProviderState = {
  theme: ColorTheme
  setTheme: (theme: ColorTheme) => void
}

const initialState: ColorThemeProviderState = {
  theme: "theme-green",
  setTheme: () => null,
}

const ColorThemeProviderContext = React.createContext<ColorThemeProviderState>(initialState)

export function ColorThemeProvider({
  children,
  defaultTheme = "theme-green",
  storageKey = "sirasense-ui-theme",
  ...props
}: ColorThemeProviderProps) {
  const [theme, setTheme] = React.useState<ColorTheme>(
    () => (typeof window !== 'undefined' ? (localStorage.getItem(storageKey) as ColorTheme) : undefined) || defaultTheme
  )

  React.useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("theme-green", "theme-brown", "theme-blue", "theme-purple")
    root.classList.add(theme)
    localStorage.setItem(storageKey, theme)
  }, [theme, storageKey])

  const value = {
    theme,
    setTheme,
  }

  return (
    <ColorThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ColorThemeProviderContext.Provider>
  )
}

export const useColorTheme = () => {
  const context = React.useContext(ColorThemeProviderContext)

  if (context === undefined)
    throw new Error("useColorTheme must be used within a ColorThemeProvider")

  return context
}
