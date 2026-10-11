import { createContext, useContext, useState, useEffect, ReactNode } from "react"

export type Language = "en" | "de"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  toggleLanguage: () => void
  t: (key: string) => string
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.work": "Projects",
    "nav.thinking": "Thinking",
    "nav.about": "About",
    "nav.research": "Research",
    "nav.projects": "Projects",
    "nav.contact": "Contact",

    // Hero
    "hero.role1": "UX Designer",
    "hero.role2": "Product Designer",
    "hero.role3": "UX Engineer",
    "hero.sub": "Designing digital products through research, structure, interaction and technology.",
    "hero.workBtn": "PROJECTS",
    "hero.connectBtn": "CONTACT",
    "hero.scroll": "SCROLL ↓",

    // Work
    "work.heading": "Projects.",
    "work.subtitle": "Selected digital products and interfaces built with rigorous precision.",
    "work.viewAll": "VIEW ALL PROJECTS",
    "work.caseStudy": "CASE STUDY",

    // Thinking
    "thinking.heading": "How I Think.",
    "thinking.step1": "OBSERVE",
    "thinking.step1Desc": "Deep user observation and behavioral research. Finding latent needs before writing a single line or drawing a frame.",
    "thinking.step2": "STRUCTURE",
    "thinking.step2Desc": "Information architecture, wireframes, and mental models. Defining relationships, hierarchies, and system boundaries.",
    "thinking.step3": "DESIGN",
    "thinking.step3Desc": "High-fidelity design systems, interaction patterns, and production-ready interfaces built for real humans.",

    // Projects Page
    "projects.heading": "Projects.",
    "projects.subtitle": "Digital products, interfaces and experiences shaped through research, interaction and design.",
    "projects.searchPlaceholder": "Search projects...",
    "projects.all": "ALL",
    "projects.ux": "UX",
    "projects.product": "PRODUCT",
    "projects.noResults": "No results found for the",

    // About Page
    "about.heading": "About",
    "about.experience": "Experience",
    "about.education": "Education",
    "about.skills": "Skills & Expertise",
    "about.certificates": "Certificates",

    // General / Footer
    "contact.letsTalk": "LET'S TALK",
    "contact.available": "Available for select product design and UX engineering opportunities.",
    "contact.clickToSend": "Click to send me a query",
    "contact.letsConnect": "Let's Connect.",
    "contact.name": "NAME",
    "contact.yourName": "Your name",
    "contact.email": "EMAIL",
    "contact.yourEmail": "your@email.com",
    "contact.message": "MESSAGE",
    "contact.queryPlaceholder": "Your query...",
    "contact.send": "SEND",
    "contact.sending": "SENDING",
    "contact.querySent": "Query Sent",
    "contact.thankYou": "Thank you for reaching out. I'll get back to you shortly.",
    "contact.close": "CLOSE",
    "footer.letBuild": "Let’s build.",
    "footer.aboutHeading": "Interface with the mind.",
    "footer.projectsHeading": "Logic, made visible.",
    "footer.designedInBerlin": "Designed and Developed in Berlin",
    "footer.legal": "Legal",
    "toolbox.heading": "My Tools.",
    "toolbox.sub": "The languages, frameworks, design environments, and databases I operate within to transform strategic user insights into interactive, production-grade applications.",
  },
  de: {
    // Navigation
    "nav.home": "Startseite",
    "nav.work": "Projekte",
    "nav.thinking": "Denkweise",
    "nav.about": "Über mich",
    "nav.research": "Forschung",
    "nav.projects": "Projekte",
    "nav.contact": "Kontakt",

    // Hero
    "hero.role1": "UX-Designer",
    "hero.role2": "Produktdesigner",
    "hero.role3": "UX-Entwickler",
    "hero.sub": "Digitale Produkte gestalten durch Forschung, Struktur, Interaktion und Technologie.",
    "hero.workBtn": "PROJEKTE",
    "hero.connectBtn": "KONTAKT",
    "hero.scroll": "SCROLLEN ↓",

    // Work
    "work.heading": "Projekte.",
    "work.subtitle": "Ausgewählte digitale Produkte und Interfaces mit kompromissloser Präzision.",
    "work.viewAll": "ALLE PROJEKTE ANSEHEN",
    "work.caseStudy": "FALLSTUDIE",

    // Thinking
    "thinking.heading": "Wie ich denke.",
    "thinking.step1": "BEOBACHTEN",
    "thinking.step1Desc": "Tiefgehende Nutzerbeobachtung und Verhaltensforschung. Latente Bedürfnisse aufdecken, bevor eine Zeile Code geschrieben oder ein Frame gezeichnet wird.",
    "thinking.step2": "STRUKTURIEREN",
    "thinking.step2Desc": "Informationsarchitektur, Wireframes und mentale Modelle. Beziehungen, Hierarchien und Systemgrenzen definieren.",
    "thinking.step3": "GESTALTEN",
    "thinking.step3Desc": "Hochwertige Design-Systeme, Interaktionsmuster und produktionsreife Interfaces für echte Menschen.",

    // Projects Page
    "projects.heading": "Projekte.",
    "projects.subtitle": "Digitale Produkte, Interfaces und Erlebnisse, geformt durch Forschung, Interaktion und Design.",
    "projects.searchPlaceholder": "Projekte suchen...",
    "projects.all": "ALLE",
    "projects.ux": "UX",
    "projects.product": "PRODUKT",
    "projects.noResults": "Keine Projekte gefunden für",

    // About Page
    "about.heading": "Über mich",
    "about.experience": "Erfahrung",
    "about.education": "Ausbildung",
    "about.skills": "Fähigkeiten & Expertise",
    "about.certificates": "Zertifikate",

    // General / Footer
    "contact.letsTalk": "LASS UNS SPRECHEN",
    "contact.available": "Verfügbar für ausgewählte Produktdesign- und UX-Engineering-Projekte.",
    "contact.clickToSend": "Klicken, um mir eine Anfrage zu senden",
    "contact.letsConnect": "Lass uns verbinden.",
    "contact.name": "NAME",
    "contact.yourName": "Dein Name",
    "contact.email": "E-MAIL",
    "contact.yourEmail": "deine@email.com",
    "contact.message": "NACHRICHT",
    "contact.queryPlaceholder": "Deine Anfrage...",
    "contact.send": "SENDEN",
    "contact.sending": "WIRD GESENDET",
    "contact.querySent": "Anfrage gesendet",
    "contact.thankYou": "Vielen Dank für Ihre Nachricht. Ich melde mich in Kürze.",
    "contact.close": "SCHLIESSEN",
    "footer.letBuild": "Lass uns bauen.",
    "footer.aboutHeading": "Schnittstelle mit dem Geist.",
    "footer.projectsHeading": "Logik, sichtbar gemacht.",
    "footer.designedInBerlin": "Entworfen und entwickelt in Berlin",
    "footer.legal": "Rechtliches",
    "toolbox.heading": "Meine Tools.",
    "toolbox.sub": "Die Sprachen, Frameworks, Designumgebungen und Datenbanken, die ich nutze, um strategische Nutzererkenntnisse in interaktive, produktionsreife Anwendungen zu verwandeln.",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem("kk_portfolio_language")
      if (saved === "de" || saved === "en") return saved
      
      // Initial inline detection for synchronous render (fallback to English)
      if (typeof navigator !== "undefined") {
        const browserLangs = navigator.languages || [navigator.language]
        const prefersGerman = browserLangs.some(lang => lang.toLowerCase().startsWith("de"))
        if (prefersGerman) return "de"
      }
    } catch {
      // ignore
    }
    return "en"
  })

  const [showToast, setShowToast] = useState(false)
  const [toastType, setToastType] = useState<"to-en" | "to-de" | null>(null)

  useEffect(() => {
    try {
      localStorage.setItem("kk_portfolio_language", language)
      document.documentElement.lang = language
    } catch {
      // ignore
    }
  }, [language])

  // Perform elegant detection and show switcher toast if secondary preferences are present
  useEffect(() => {
    try {
      const hasManualPref = localStorage.getItem("kk_portfolio_language") !== null
      const hasDismissed = sessionStorage.getItem("kk_language_toast_dismissed") === "true"

      if (hasManualPref || hasDismissed) return

      const browserLangs = navigator.languages || [navigator.language]
      const prefersGerman = browserLangs.some(lang => lang.toLowerCase().startsWith("de"))
      const prefersEnglish = browserLangs.some(lang => lang.toLowerCase().startsWith("en"))

      if (prefersGerman && prefersEnglish) {
        // User has both languages in browser preferences
        if (language === "de") {
          setToastType("to-en")
        } else {
          setToastType("to-de")
        }
        const timer = setTimeout(() => setShowToast(true), 2500)
        return () => clearTimeout(timer)
      }
    } catch (e) {
      console.warn("Language auto-detection notification error:", e)
    }
  }, [language])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    try {
      localStorage.setItem("kk_portfolio_language", lang)
    } catch {}
  }

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === "en" ? "de" : "en"))
  }

  const handleDismissToast = () => {
    setShowToast(false)
    try {
      sessionStorage.setItem("kk_language_toast_dismissed", "true")
    } catch {}
  }

  const handleToastSwitch = () => {
    if (toastType === "to-en") {
      setLanguage("en")
    } else if (toastType === "to-de") {
      setLanguage("de")
    }
    handleDismissToast()
  }

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.en[key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
      
      {/* Elegant minimalist auto-detect language notification */}
      {showToast && toastType && (
        <div className="fixed bottom-6 right-6 z-[99999] max-w-[340px] w-[calc(100vw-3rem)] animate-fade-in pointer-events-auto">
          <div className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-black/[0.06] dark:border-white/[0.08] shadow-[0_12px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_12px_32px_rgba(0,0,0,0.4)] rounded-2xl p-4 flex flex-col gap-3 select-none">
            <div className="flex items-start justify-between gap-2">
              <div className="flex flex-col gap-0.5">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--gold)] font-bold">
                  {toastType === "to-en" ? "Sprache / Language" : "Sprache / Language"}
                </span>
                <p className="font-sans text-xs font-normal leading-relaxed text-zinc-700 dark:text-zinc-300">
                  {toastType === "to-en" 
                    ? "In Deutsch geladen. Switch layout to English for full portfolio experience?" 
                    : "In Englisch geladen. Auf Deutsch umschalten für das beste Erlebnis?"}
                </p>
              </div>
              <button
                onClick={handleDismissToast}
                className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors p-1 cursor-pointer rounded-full hover:bg-black/[0.04] dark:hover:bg-white/[0.04]"
                aria-label="Dismiss language notification"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M1 1L11 11M11 1L1 11" />
                </svg>
              </button>
            </div>
            
            <div className="flex items-center gap-2 self-end">
              <button
                onClick={handleDismissToast}
                className="px-3 py-1.5 font-mono text-[10px] tracking-wider uppercase text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                {toastType === "to-en" ? "Behalten" : "Keep English"}
              </button>
              <button
                onClick={handleToastSwitch}
                className="px-3.5 py-1.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-mono text-[10px] tracking-wider uppercase font-semibold rounded-full hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors cursor-pointer shadow-sm"
              >
                {toastType === "to-en" ? "Switch" : "Wechseln"}
              </button>
            </div>
          </div>
        </div>
      )}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return ctx
}
