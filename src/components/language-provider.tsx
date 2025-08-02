
"use client"

import * as React from "react"

export type Language = "en" | "ar";

type LanguageProviderProps = {
  children: React.ReactNode
  defaultLanguage?: Language
  storageKey?: string
}

type LanguageProviderState = {
  language: Language
  setLanguage: (language: Language) => void
}

const initialState: LanguageProviderState = {
  language: "en",
  setLanguage: () => null,
}

const LanguageProviderContext = React.createContext<LanguageProviderState>(initialState)

export function LanguageProvider({
  children,
  defaultLanguage = "en",
  storageKey = "sirasense-language",
  ...props
}: LanguageProviderProps) {
  const [language, setLanguage] = React.useState<Language>(
    () => (typeof window !== 'undefined' ? (localStorage.getItem(storageKey) as Language) : undefined) || defaultLanguage
  )

  React.useEffect(() => {
    const root = window.document.documentElement
    root.lang = language
    root.dir = language === 'ar' ? 'rtl' : 'ltr'
    localStorage.setItem(storageKey, language)
  }, [language, storageKey])

  const value = {
    language,
    setLanguage,
  }

  return (
    <LanguageProviderContext.Provider {...props} value={value}>
      {children}
    </LanguageProviderContext.Provider>
  )
}

export const useLanguage = () => {
  const context = React.useContext(LanguageProviderContext)

  if (context === undefined)
    throw new Error("useLanguage must be used within a LanguageProvider")

  return context
}
