import { Link, useLocation } from "react-router-dom"
import { usePassport } from "../context/PassportContext"
import { QrCode, Settings, ArrowLeft } from "lucide-react"

interface HeaderProps {
  onOpenScanner?: () => void
}

export default function Header({ onOpenScanner }: HeaderProps) {
  const { t, language } = usePassport()
  const location = useLocation()
  const isHome = location.pathname === "/"
  const isPassportRoute = location.pathname.startsWith("/passport")

  const navItems = [
    { href: "/passport", label: t("nav.overview") },
    { href: "/passport/materials", label: t("nav.materials") },
    { href: "/passport/repair", label: t("nav.repair") },
    { href: "/passport/recycling", label: t("nav.recycling") },
  ]

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--border-light)] bg-[var(--bg-surface)]/95 backdrop-blur-sm transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          {!isHome && (
            <Link
              to="/"
              className="sm:hidden p-2 -ml-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-subtle)] transition-colors"
              aria-label={t("common.back")}
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
          )}
          <Link
            to="/"
            className="group flex items-center gap-2.5 text-lg font-bold tracking-tight text-[var(--text-main)] whitespace-nowrap"
            aria-label="Loop EU Digital Product Passport Home"
          >
            <span className="w-7 h-7 rounded-full bg-[var(--brand-teal)] text-white flex items-center justify-center font-display text-sm font-semibold shadow-sm transition-transform group-hover:scale-105">
              ⟳
            </span>
            <span className="font-display font-bold text-xl tracking-tight text-[var(--text-main)]">
              Loop
            </span>
            <span className="hidden sm:inline-block text-xs font-normal text-[var(--text-faint)] border-l border-[var(--border-light)] pl-2.5">
              EU DPP
            </span>
          </Link>
        </div>

        {/* Zone 2: Navigation Links (Tablet and Desktop) */}
        <nav
          className="hidden md:flex items-center gap-1 sm:gap-2 text-sm font-medium"
          aria-label="Primary Navigation"
        >
          {navItems.map((item) => {
            const isActive =
              item.href === "/passport"
                ? location.pathname === "/passport"
                : location.pathname === item.href

            return (
              <Link
                key={item.href}
                to={item.href}
                className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap text-sm ${
                  isActive
                    ? "text-[var(--brand-teal-text)] bg-[var(--brand-teal-light)] font-semibold"
                    : "text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-subtle)]"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {onOpenScanner && (
            <button
              onClick={onOpenScanner}
              type="button"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium border border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--text-main)] hover:bg-[var(--bg-subtle)] transition-colors whitespace-nowrap"
              aria-label={t("home.scanButton")}
            >
              <QrCode className="w-4 h-4 text-[var(--brand-teal-text)]" />
              <span className="hidden sm:inline">{t("home.scanButton")}</span>
            </button>
          )}

          <Link
            to="/settings"
            className={`p-2 rounded-lg border border-[var(--border-light)] transition-colors flex items-center justify-center ${
              location.pathname === "/settings"
                ? "bg-[var(--brand-teal-light)] text-[var(--brand-teal-text)]"
                : "bg-[var(--bg-surface)] text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-subtle)]"
            }`}
            aria-label={t("nav.settings")}
          >
            <Settings className="w-4 h-4" />
            <span className="sr-only">{t("nav.settings")}</span>
          </Link>
        </div>
      </div>
    </header>
  )
}
