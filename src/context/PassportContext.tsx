import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"
import productDataRaw from "../data/product.json"
import translationsRaw from "../data/translations.json"

export type Language = "en" | "de" | "fr"
export type Theme = "light" | "dark" | "system"
export type TextSize = "normal" | "large" | "xl"

export interface ProductData {
  id: string
  name: string
  category: string
  manufacturer: {
    name: string
    location: string
    registrationNumber: string
    facility: string
    contact: string
    website: string
  }
  compliance: {
    regulation: string
    standard: string
    ceCertified: boolean
    unTransportationTest: string
    rohsCompliant: boolean
  }
  specifications: {
    voltageNominal: string
    voltageMax: string
    capacityRated: string
    energyNominal: string
    cellChemistry: string
    cellCount: string
    weight: string
    dimensions: string
    ingressProtection: string
    manufactureDate: string
    batchNumber: string
    expectedLifetime: string
    estimatedCalendarLife: string
    warrantyPeriod: string
  }
  sustainability: {
    overallScore: number
    scoreScale: number
    carbonFootprintKgPerKwh: number
    carbonFootprintTotalKg: number
    recycledContentPercentage: number
    repairabilityIndex: number
    recyclabilityRate: number
    subScores: Array<{
      id: string
      score: number
      label: string
      value: string
      benchmark: string
      source: string
      sourceDate: string
    }>
  }
  materials: Array<{
    name: string
    percentage: number
    recycledShare: number
    purpose: string
    origin: string
    criticalRawMaterial: boolean
    source: string
    sourceDate: string
  }>
  supplyChain: Array<{
    step: number
    title: string
    location: string
    operator: string
    date: string
    certifications: string[]
    description: string
    source: string
    sourceDate: string
  }>
  repair: {
    score: number
    scale: number
    disassemblyEase: number
    fastenerType: string
    toolRequirements: string
    bmsDiagnosticsAvailable: string
    sparePartsGuaranteedYears: number
    safetyWarnings: Array<{
      level: "danger" | "warning" | "info"
      title: string
      description: string
    }>
    guides: Array<{
      id: string
      title: string
      difficulty: string
      estimatedMinutes: number
      consumerSafe: boolean
      tools: string[]
      steps: string[]
    }>
    spareParts: Array<{
      partNumber: string
      name: string
      priceEur: number
      availability: string
      warrantyMonths: number
      weightGrams: number
      consumerReplaceable: boolean
    }>
  }
  recycling: {
    euDirective: string
    consumerCost: string
    landfillBan: string
    recoveryRateTarget: string
    safetyChecklist: Array<{
      id: string
      label: string
      description: string
    }>
    collectionPoints: Array<{
      city: string
      name: string
      address: string
      type: string
      hours: string
      cost: string
      certified: boolean
    }>
    circularProcess: Array<{
      stage: number
      title: string
      description: string
    }>
  }
}

interface PassportContextType {
  product: ProductData
  language: Language
  setLanguage: (lang: Language) => void
  theme: Theme
  setTheme: (theme: Theme) => void
  textSize: TextSize
  setTextSize: (size: TextSize) => void
  t: (key: string) => string
  downloadPassportJson: () => void
  activeTheme: "light" | "dark"
}

const PassportContext = createContext<PassportContextType | null>(null)

export function PassportProvider({ children }: { children: ReactNode }) {
  const [product] = useState<ProductData>(productDataRaw as ProductData)

  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem("loop_language")
      if (saved === "en" || saved === "de" || saved === "fr") return saved
      if (typeof navigator !== "undefined") {
        const navLang = (navigator.languages?.[0] || navigator.language || "").toLowerCase()
        if (navLang.startsWith("de")) return "de"
        if (navLang.startsWith("fr")) return "fr"
      }
    } catch {}
    return "en"
  })

  const [theme, setThemeState] = useState<Theme>(() => {
    try {
      const saved = localStorage.getItem("loop_theme")
      if (saved === "light" || saved === "dark" || saved === "system") return saved
    } catch {}
    return "system"
  })

  const [textSize, setTextSizeState] = useState<TextSize>(() => {
    try {
      const saved = localStorage.getItem("loop_text_size")
      if (saved === "normal" || saved === "large" || saved === "xl") return saved
    } catch {}
    return "normal"
  })

  const [activeTheme, setActiveTheme] = useState<"light" | "dark">("light")

  // Sync theme
  useEffect(() => {
    const applyTheme = () => {
      let isDark = false
      if (theme === "dark") {
        isDark = true
      } else if (theme === "light") {
        isDark = false
      } else {
        // System preference
        isDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      }

      setActiveTheme(isDark ? "dark" : "light")
      if (isDark) {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
    }

    applyTheme()

    if (theme === "system") {
      const media = window.matchMedia("(prefers-color-scheme: dark)")
      const listener = () => applyTheme()
      media.addEventListener("change", listener)
      return () => media.removeEventListener("change", listener)
    }
  }, [theme])

  // Sync text size
  useEffect(() => {
    document.documentElement.setAttribute("data-text-size", textSize)
  }, [textSize])

  // Sync html lang attribute
  useEffect(() => {
    document.documentElement.setAttribute("lang", language)
  }, [language])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    try {
      localStorage.setItem("loop_language", lang)
    } catch {}
  }

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    try {
      localStorage.setItem("loop_theme", newTheme)
    } catch {}
  }

  const setTextSize = (size: TextSize) => {
    setTextSizeState(size)
    try {
      localStorage.setItem("loop_text_size", size)
    } catch {}
  }

  // Translation helper
  const t = (path: string): string => {
    try {
      const langTranslations = (translationsRaw as Record<string, any>)[language] || (translationsRaw as Record<string, any>).en
      const parts = path.split(".")
      let curr = langTranslations
      for (const part of parts) {
        if (curr && typeof curr === "object" && part in curr) {
          curr = curr[part]
        } else {
          // Fallback to English
          let fallback = (translationsRaw as Record<string, any>).en
          for (const fPart of parts) {
            if (fallback && typeof fallback === "object" && fPart in fallback) {
              fallback = fallback[fPart]
            } else {
              return path
            }
          }
          return typeof fallback === "string" ? fallback : path
        }
      }
      return typeof curr === "string" ? curr : path
    } catch {
      return path
    }
  }

  const downloadPassportJson = () => {
    const payload = {
      "@context": "https://ec.europa.eu/standards/dpp/battery/v1.0",
      type: "DigitalProductPassport",
      schemaVersion: "2026.1",
      dataIntegrityHash: "sha256-e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      exportedAt: new Date().toISOString(),
      passportRecord: product
    }

    const jsonString = JSON.stringify(payload, null, 2)
    const blob = new Blob([jsonString], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `voltra-range-500-dpp-${product.id}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <PassportContext.Provider
      value={{
        product,
        language,
        setLanguage,
        theme,
        setTheme,
        textSize,
        setTextSize,
        t,
        downloadPassportJson,
        activeTheme
      }}
    >
      {children}
    </PassportContext.Provider>
  )
}

export function usePassport() {
  const context = useContext(PassportContext)
  if (!context) {
    throw new Error("usePassport must be used within a PassportProvider")
  }
  return context
}
