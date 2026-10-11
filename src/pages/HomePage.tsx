import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { usePassport } from "../context/PassportContext"
import { QrCode, ArrowRight, ShieldCheck, EyeOff, WifiOff, CheckCircle2, Battery, AlertCircle } from "lucide-react"

interface HomePageProps {
  onOpenScanner: () => void
}

export default function HomePage({ onOpenScanner }: HomePageProps) {
  const navigate = useNavigate()
  const { t, product } = usePassport()
  const [manualCode, setManualCode] = useState("")
  const [codeError, setCodeError] = useState(false)

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const cleaned = manualCode.trim().toUpperCase()
    if (!cleaned) {
      setCodeError(true)
      return
    }
    // Allow the demo code or any valid code prefix
    if (cleaned === product.id.toUpperCase() || cleaned.includes("VOLTRA") || cleaned.includes("BAT")) {
      setCodeError(false)
      navigate("/passport")
    } else {
      setCodeError(true)
    }
  }

  const handleFillSample = () => {
    setManualCode(product.id)
    setCodeError(false)
  }

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-12 sm:py-16 lg:py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Regulatory Context Stamp */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--brand-teal-light)] text-[var(--brand-teal-text)] text-xs font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-[var(--brand-teal)]" />
            <span>{t("home.badge")}</span>
          </div>

          <h1 className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl text-[var(--text-main)] tracking-tight leading-[1.1] mb-6 text-balance">
            {t("home.heroTitle")}
          </h1>

          <p className="text-base sm:text-xl text-[var(--text-muted)] leading-relaxed mb-8 max-w-2xl">
            {t("home.heroSubtitle")}
          </p>

          {/* Primary Action Buttons - Full-width on mobile (<640px), inline on tablet & desktop */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-10">
            <button
              onClick={onOpenScanner}
              type="button"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[var(--brand-teal)] text-white font-medium text-base hover:opacity-95 transition-opacity shadow-sm flex items-center justify-center gap-2.5 min-h-[48px]"
            >
              <QrCode className="w-5 h-5" />
              <span>{t("home.scanButton")}</span>
            </button>

            <button
              onClick={() => navigate("/passport")}
              type="button"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--text-main)] font-medium text-base hover:bg-[var(--bg-subtle)] transition-colors flex items-center justify-center gap-2 min-h-[48px]"
            >
              <span>{t("home.tryDemoButton")}</span>
              <ArrowRight className="w-4 h-4 text-[var(--brand-teal-text)]" />
            </button>
          </div>

          {/* Manual Code Entry Form */}
          <div className="pt-6 border-t border-[var(--border-light)] max-w-xl">
            <label
              htmlFor="manual-code-input"
              className="block text-xs font-medium text-[var(--text-muted)] mb-2"
            >
              {t("home.orManual")}
            </label>
            <form onSubmit={handleManualSubmit} className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <input
                  id="manual-code-input"
                  type="text"
                  value={manualCode}
                  onChange={(e) => {
                    setManualCode(e.target.value)
                    if (codeError) setCodeError(false)
                  }}
                  placeholder={t("home.codePlaceholder")}
                  className={`w-full px-4 py-2.5 rounded-xl border bg-[var(--bg-surface)] text-[var(--text-main)] font-mono text-xs sm:text-sm placeholder:text-[var(--text-faint)] focus:ring-2 focus:ring-[var(--focus-ring)] transition-all ${
                    codeError
                      ? "border-red-500 focus:border-red-500"
                      : "border-[var(--border-light)] focus:border-[var(--brand-teal)]"
                  }`}
                  aria-invalid={codeError}
                  aria-describedby={codeError ? "code-error-msg" : undefined}
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[var(--text-main)] text-[var(--bg-page)] text-xs sm:text-sm font-medium hover:opacity-90 transition-opacity whitespace-nowrap min-h-[44px]"
              >
                {t("home.viewPassport")}
              </button>
            </form>

            {codeError ? (
              <p id="code-error-msg" className="mt-2 text-xs text-red-600 dark:text-red-400 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                Unrecognized code. Click below to load demo passport.
              </p>
            ) : null}

            <div className="mt-2 flex items-center gap-2">
              <button
                type="button"
                onClick={handleFillSample}
                className="text-xs text-[var(--brand-teal-text)] hover:underline"
              >
                {t("home.sampleCode")} ({product.id.slice(0, 20)}...)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Trust Points Section */}
      <section className="py-12 bg-[var(--bg-surface)] border-y border-[var(--border-light)] transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-faint)]">
              Digital Rights & Safeguards
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[var(--text-main)] mt-1">
              {t("home.trust.title")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Trust Point 1: No Account */}
            <div className="rounded-2xl border border-[var(--border-light)] p-6 bg-[var(--bg-page)]/60 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[var(--brand-teal-light)] text-[var(--brand-teal-text)] flex items-center justify-center mb-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-display font-semibold text-base sm:text-lg text-[var(--text-main)] mb-2">
                  {t("home.trust.noAccount")}
                </h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  {t("home.trust.noAccountDesc")}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[var(--border-light)] text-xs text-[var(--text-faint)]">
                Guaranteed by European Ecodesign Directive (ESPR)
              </div>
            </div>

            {/* Trust Point 2: No Tracking */}
            <div className="rounded-2xl border border-[var(--border-light)] p-6 bg-[var(--bg-page)]/60 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[var(--brand-teal-light)] text-[var(--brand-teal-text)] flex items-center justify-center mb-4">
                  <EyeOff className="w-5 h-5" />
                </div>
                <h3 className="font-display font-semibold text-base sm:text-lg text-[var(--text-main)] mb-2">
                  {t("home.trust.noTracking")}
                </h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  {t("home.trust.noTrackingDesc")}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[var(--border-light)] text-xs text-[var(--text-faint)]">
                No third-party analytics · No advertising identifiers
              </div>
            </div>

            {/* Trust Point 3: Works Offline */}
            <div className="rounded-2xl border border-[var(--border-light)] p-6 bg-[var(--bg-page)]/60 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[var(--brand-teal-light)] text-[var(--brand-teal-text)] flex items-center justify-center mb-4">
                  <WifiOff className="w-5 h-5" />
                </div>
                <h3 className="font-display font-semibold text-base sm:text-lg text-[var(--text-main)] mb-2">
                  {t("home.trust.worksOffline")}
                </h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  {t("home.trust.worksOfflineDesc")}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[var(--border-light)] text-xs text-[var(--text-faint)]">
                Cached locally in client storage for offline repairs
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Plain Language Educational Section */}
      <section className="py-12 sm:py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-[var(--border-light)] bg-[var(--bg-subtle)] p-6 sm:p-10 lg:p-12">
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-faint)]">
              Consumer Guide
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-[var(--text-main)] mt-1 mb-4">
              {t("home.plainLanguage.title")}
            </h2>
            <p className="text-base text-[var(--text-muted)] leading-relaxed mb-6">
              {t("home.plainLanguage.whatIsIt")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-[var(--border-light)]">
            <div className="space-y-2">
              <h3 className="font-semibold text-sm text-[var(--text-main)]">
                Why batteries first?
              </h3>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                {t("home.plainLanguage.whyMatters")}
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-sm text-[var(--text-main)]">
                What are your legal rights?
              </h3>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                {t("home.plainLanguage.rights")}
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[var(--border-light)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
              <Battery className="w-4 h-4 text-[var(--brand-teal-text)]" />
              <span>Explore live passport data for the Voltra Range 500 (36V 13.8Ah)</span>
            </div>
            <button
              onClick={() => navigate("/passport")}
              type="button"
              className="text-xs font-semibold text-[var(--brand-teal-text)] hover:underline inline-flex items-center gap-1"
            >
              <span>{t("home.tryDemoButton")}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
