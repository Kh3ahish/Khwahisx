import { usePassport } from "../context/PassportContext"

export default function SkipLink() {
  const { t } = usePassport()

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-[var(--brand-teal)] focus:text-white focus:rounded-lg focus:shadow-xl focus:ring-2 focus:ring-offset-2 focus:ring-[var(--focus-ring)] text-sm font-medium"
    >
      {t("nav.skipToContent")}
    </a>
  )
}
