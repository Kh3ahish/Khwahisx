export type LanguageCode = "EN" | "DE" | "IT" | "en" | "de" | "it";

export interface TranslationDictionary {
  nav: {
    work: string;
    about: string;
    research: string;
    contact: string;
    projects: string;
  };
  research: {
    badge: string;
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    resetFilters: string;
    all: string;
    readPaper: string;
    caseStudy: string;
    emptyMessage: string;
  };
}

export const translations: Record<string, TranslationDictionary> = {
  EN: {
    nav: {
      work: "Work",
      about: "About",
      research: "Research",
      contact: "Contact",
      projects: "Projects",
    },
    research: {
      badge: "Behavioral Science & Cognitive Ergonomics",
      title: "Research & Methodologies",
      subtitle:
        "Empirical investigations, psychological frameworks, and cognitive usability experiments grounding digital products in verified human behavior.",
      searchPlaceholder: "Search frameworks, metrics...",
      resetFilters: "Reset Filters",
      all: "All",
      readPaper: "Read Paper",
      caseStudy: "Case Study",
      emptyMessage: "No research studies found matching",
    },
  },
  DE: {
    nav: {
      work: "Arbeiten",
      about: "Über mich",
      research: "Forschung",
      contact: "Kontakt",
      projects: "Projekte",
    },
    research: {
      badge: "Verhaltenswissenschaft & Kognitive Ergonomie",
      title: "Forschung & Methodik",
      subtitle:
        "Empirische Untersuchungen, psychologische Modelle und kognitive Usability-Experimente für nutzerzentrierte digitale Produkte.",
      searchPlaceholder: "Frameworks, Metriken suchen...",
      resetFilters: "Filter zurücksetzen",
      all: "Alle",
      readPaper: "Paper lesen",
      caseStudy: "Fallstudie",
      emptyMessage: "Keine Forschungsstudien gefunden für",
    },
  },
  IT: {
    nav: {
      work: "Lavori",
      about: "Chi sono",
      research: "Ricerca",
      contact: "Contatto",
      projects: "Progetti",
    },
    research: {
      badge: "Scienze Comportamentali ed Ergonomia Cognitiva",
      title: "Ricerca & Metodologie",
      subtitle:
        "Indagini empiriche, modelli psicologici ed esperimenti di usabilità cognitiva che fondano i prodotti digitali sul comportamento umano verificato.",
      searchPlaceholder: "Cerca framework, metriche...",
      resetFilters: "Ripristina filtri",
      all: "Tutti",
      readPaper: "Leggi il paper",
      caseStudy: "Caso studio",
      emptyMessage: "Nessuno studio di ricerca trovato per",
    },
  },
};

// Aliases for lowercase codes
translations.en = translations.EN;
translations.de = translations.DE;
translations.it = translations.IT;
