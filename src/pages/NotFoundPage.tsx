import { Link } from "react-router-dom"
import { usePassport } from "../context/PassportContext"
import { AlertCircle, ArrowRight, Home, Battery } from "lucide-react"

export default function NotFoundPage() {
  const { t } = usePassport()

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-16 sm:py-24 text-center">
      <div className="w-16 h-16 rounded-2xl bg-[var(--brand-teal-light)] text-[var(--brand-teal-text)] flex items-center justify-center mx-auto mb-6">
        <AlertCircle className="w-8 h-8" />
      </div>

      <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-faint)]">
        Status 404
      </span>

      <h1 className="text-2xl sm:text-3xl font-bold font-display text-[var(--text-main)] mt-1 mb-3">
        {t("notFound.title")}
      </h1>

      <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-8 max-w-md mx-auto">
        {t("notFound.subtitle")} {t("notFound.explanation")}
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          to="/"
          className="w-full sm:w-auto px-5 py-3 rounded-xl border border-[var(--border-light)] bg-[var(--bg-surface)] hover:bg-[var(--bg-subtle)] text-[var(--text-main)] text-sm font-medium transition-colors flex items-center justify-center gap-2 min-h-[44px]"
        >
          <Home className="w-4 h-4" />
          <span>{t("notFound.actionHome")}</span>
        </Link>

        <Link
          to="/passport"
          className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[var(--brand-teal)] text-white text-sm font-medium hover:opacity-95 transition-opacity flex items-center justify-center gap-2 shadow-sm min-h-[44px]"
        >
          <Battery className="w-4 h-4" />
          <span>{t("notFound.actionDemo")}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}
