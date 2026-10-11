import { Link } from "react-router-dom"
import { usePassport, Language } from "../context/PassportContext"

export default function Footer() {
  const { t, language, setLanguage } = usePassport()

  const languages: { code: Language; label: string }[] = [
    { code: "en", label: "English" },
    { code: "de", label: "Deutsch" },
    { code: "fr", label: "Français" },
  ]

  return (
    <footer className="border-t border-[var(--border-light)] bg-[var(--bg-surface)] text-[var(--text-muted)] text-sm transition-colors mt-16 sm:mt-24 pb-20 sm:pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Brand & Purpose */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[var(--brand-teal)] text-white text-xs flex items-center justify-center font-bold">
                ⟳
              </span>
              <span className="font-display font-bold text-base text-[var(--text-main)]">
                Loop
              </span>
              <span className="text-xs text-[var(--text-faint)]">
                EU Digital Product Passport
              </span>
            </div>
            <p className="text-sm text-[var(--text-muted)] max-w-md leading-relaxed">
              {t("site.description")}
            </p>
            <div className="pt-2 text-xs text-[var(--text-faint)]">
              Regulation (EU) 2023/1542 · Battery Life Cycle & Due Diligence Standard
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <div className="font-semibold text-xs uppercase tracking-wider text-[var(--text-main)]">
              Passport Sections
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/passport"
                  className="hover:text-[var(--text-main)] transition-colors"
                >
                  {t("nav.overview")}
                </Link>
              </li>
              <li>
                <Link
                  to="/passport/materials"
                  className="hover:text-[var(--text-main)] transition-colors"
                >
                  {t("nav.materials")}
                </Link>
              </li>
              <li>
                <Link
                  to="/passport/repair"
                  className="hover:text-[var(--text-main)] transition-colors"
                >
                  {t("nav.repair")}
                </Link>
              </li>
              <li>
                <Link
                  to="/passport/recycling"
                  className="hover:text-[var(--text-main)] transition-colors"
                >
                  {t("nav.recycling")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: System & Legal */}
          <div className="space-y-3">
            <div className="font-semibold text-xs uppercase tracking-wider text-[var(--text-main)]">
              Citizen Rights
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/privacy"
                  className="hover:text-[var(--text-main)] transition-colors"
                >
                  {t("nav.privacy")}
                </Link>
              </li>
              <li>
                <Link
                  to="/settings"
                  className="hover:text-[var(--text-main)] transition-colors"
                >
                  {t("nav.settings")}
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="hover:text-[var(--text-main)] transition-colors"
                >
                  {t("nav.home")}
                </Link>
              </li>
            </ul>

            {/* Language Quick Switcher */}
            <div className="pt-2">
              <span className="text-xs text-[var(--text-faint)] block mb-1.5">
                Language
              </span>
              <div className="inline-flex rounded-md border border-[var(--border-light)] p-0.5 bg-[var(--bg-subtle)]">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => setLanguage(l.code)}
                    className={`px-2 py-1 text-xs rounded transition-colors ${
                      language === l.code
                        ? "bg-[var(--bg-surface)] text-[var(--text-main)] font-semibold shadow-xs"
                        : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
                    }`}
                  >
                    {l.code.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Required Quiet Note */}
        <div className="pt-8 border-t border-[var(--border-light)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-faint)]">
          <p>© {new Date().getFullYear()} Loop Consumer Initiative.</p>
          <p className="text-center sm:text-right italic">
            {t("site.fictionalNote")}
          </p>
        </div>
      </div>
    </footer>
  )
}
