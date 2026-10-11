import { useState } from "react"
import { Link } from "react-router-dom"
import { usePassport, Language, Theme, TextSize } from "../context/PassportContext"
import {
  Globe,
  Sun,
  Moon,
  Laptop,
  Type,
  Download,
  CheckCircle2,
  FileCode,
  ShieldCheck
} from "lucide-react"

export default function SettingsPage() {
  const {
    t,
    language,
    setLanguage,
    theme,
    setTheme,
    textSize,
    setTextSize,
    downloadPassportJson,
  } = usePassport()

  const [downloaded, setDownloaded] = useState(false)

  const handleDownload = () => {
    downloadPassportJson()
    setDownloaded(true)
    setTimeout(() => setDownloaded(false), 3000)
  }

  const languages: { code: Language; name: string; native: string }[] = [
    { code: "en", name: "English", native: "English (EN)" },
    { code: "de", name: "German", native: "Deutsch (DE)" },
    { code: "fr", name: "French", native: "Français (FR)" },
  ]

  const themes: { code: Theme; label: string; icon: any }[] = [
    { code: "light", label: t("settings.themeLight"), icon: Sun },
    { code: "dark", label: t("settings.themeDark"), icon: Moon },
    { code: "system", label: t("settings.themeSystem"), icon: Laptop },
  ]

  const textSizes: { code: TextSize; label: string; preview: string }[] = [
    { code: "normal", label: t("settings.textNormal"), preview: "Aa" },
    { code: "large", label: t("settings.textLarge"), preview: "Aa+" },
    { code: "xl", label: t("settings.textExtraLarge"), preview: "Aa++" },
  ]

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-[var(--text-faint)] mb-4">
        <Link to="/" className="hover:text-[var(--text-main)] transition-colors">
          {t("nav.home")}
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-[var(--text-muted)] font-medium">{t("nav.settings")}</span>
      </div>

      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-2xl sm:text-4xl font-bold font-display text-[var(--text-main)]">
          {t("settings.title")}
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-muted)] mt-2 leading-relaxed">
          {t("settings.subtitle")}
        </p>
      </div>

      <div className="space-y-8">
        {/* 1. Language Setting */}
        <section className="rounded-2xl border border-[var(--border-light)] bg-[var(--bg-surface)] p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-2.5 mb-2">
            <Globe className="w-5 h-5 text-[var(--brand-teal-text)]" />
            <h2 className="text-lg font-bold font-display text-[var(--text-main)]">
              {t("settings.languageTitle")}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] mb-6">
            {t("settings.languageDesc")}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {languages.map((l) => (
              <button
                key={l.code}
                type="button"
                onClick={() => setLanguage(l.code)}
                className={`p-4 rounded-xl border text-left transition-all min-h-[48px] flex flex-col justify-between ${
                  language === l.code
                    ? "border-[var(--brand-teal)] bg-teal-500/5 text-[var(--brand-teal-text)] font-semibold ring-1 ring-[var(--brand-teal)]"
                    : "border-[var(--border-light)] bg-[var(--bg-subtle)] text-[var(--text-main)] hover:border-[var(--border-strong)]"
                }`}
                aria-pressed={language === l.code}
              >
                <span className="text-sm">{l.native}</span>
                <span className="text-xs text-[var(--text-faint)] font-normal mt-1">
                  {l.name}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* 2. Theme Setting (Light, Dark, System) */}
        <section className="rounded-2xl border border-[var(--border-light)] bg-[var(--bg-surface)] p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-2.5 mb-2">
            <Sun className="w-5 h-5 text-[var(--brand-teal-text)]" />
            <h2 className="text-lg font-bold font-display text-[var(--text-main)]">
              {t("settings.themeTitle")}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] mb-6">
            {t("settings.themeDesc")}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {themes.map((th) => {
              const Icon = th.icon
              const isSelected = theme === th.code
              return (
                <button
                  key={th.code}
                  type="button"
                  onClick={() => setTheme(th.code)}
                  className={`p-4 rounded-xl border text-left transition-all min-h-[48px] flex items-center justify-between ${
                    isSelected
                      ? "border-[var(--brand-teal)] bg-teal-500/5 text-[var(--brand-teal-text)] font-semibold ring-1 ring-[var(--brand-teal)]"
                      : "border-[var(--border-light)] bg-[var(--bg-subtle)] text-[var(--text-main)] hover:border-[var(--border-strong)]"
                  }`}
                  aria-pressed={isSelected}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{th.label}</span>
                  </div>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-[var(--brand-teal)]" />
                  )}
                </button>
              )
            })}
          </div>
        </section>

        {/* 3. Text Size Setting (Normal, Large, Extra Large) */}
        <section className="rounded-2xl border border-[var(--border-light)] bg-[var(--bg-surface)] p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-2.5 mb-2">
            <Type className="w-5 h-5 text-[var(--brand-teal-text)]" />
            <h2 className="text-lg font-bold font-display text-[var(--text-main)]">
              {t("settings.textSizeTitle")}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] mb-6">
            {t("settings.textSizeDesc")}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {textSizes.map((sz) => {
              const isSelected = textSize === sz.code
              return (
                <button
                  key={sz.code}
                  type="button"
                  onClick={() => setTextSize(sz.code)}
                  className={`p-4 rounded-xl border text-left transition-all min-h-[48px] flex items-center justify-between ${
                    isSelected
                      ? "border-[var(--brand-teal)] bg-teal-500/5 text-[var(--brand-teal-text)] font-semibold ring-1 ring-[var(--brand-teal)]"
                      : "border-[var(--border-light)] bg-[var(--bg-subtle)] text-[var(--text-main)] hover:border-[var(--border-strong)]"
                  }`}
                  aria-pressed={isSelected}
                >
                  <span className="text-sm">{sz.label}</span>
                  <span className="font-mono text-xs text-[var(--text-faint)]">
                    {sz.preview}
                  </span>
                </button>
              )
            })}
          </div>
        </section>

        {/* 4. Download My Data (Open JSON Export) */}
        <section className="rounded-2xl border border-[var(--border-light)] bg-[var(--bg-surface)] p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-2.5 mb-2">
            <Download className="w-5 h-5 text-[var(--brand-teal-text)]" />
            <h2 className="text-lg font-bold font-display text-[var(--text-main)]">
              {t("settings.downloadTitle")}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] mb-6 leading-relaxed">
            {t("settings.downloadDesc")}
          </p>

          <div className="p-4 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-light)] mb-6 flex items-start gap-3">
            <FileCode className="w-5 h-5 text-[var(--text-faint)] shrink-0 mt-0.5" />
            <div className="text-xs text-[var(--text-muted)]">
              <span className="font-semibold text-[var(--text-main)] block mb-0.5">
                Standardized European Schema v1.0
              </span>
              Includes raw material percentages, carbon footprint audit, supply chain geolocation records, and SHA-256 cryptographic proof.
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={handleDownload}
              type="button"
              className="py-3 px-6 rounded-xl bg-[var(--brand-teal)] text-white text-sm font-semibold hover:opacity-95 transition-opacity flex items-center justify-center gap-2 min-h-[48px]"
            >
              <Download className="w-4 h-4" />
              <span>{t("settings.downloadButton")}</span>
            </button>

            {downloaded && (
              <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                {t("settings.downloadSuccess")}
              </span>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
