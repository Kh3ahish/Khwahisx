import { Link, useLocation } from "react-router-dom"
import { usePassport } from "../context/PassportContext"
import { LayoutDashboard, Layers, Wrench, RefreshCw } from "lucide-react"

export default function BottomNav() {
  const { t } = usePassport()
  const location = useLocation()

  // Only show bottom nav when browsing passport routes or site-wide on mobile
  const navItems = [
    {
      href: "/passport",
      label: t("nav.overview"),
      icon: LayoutDashboard,
      isActive: location.pathname === "/passport",
    },
    {
      href: "/passport/materials",
      label: t("nav.materials"),
      icon: Layers,
      isActive: location.pathname === "/passport/materials",
    },
    {
      href: "/passport/repair",
      label: t("nav.repair"),
      icon: Wrench,
      isActive: location.pathname === "/passport/repair",
    },
    {
      href: "/passport/recycling",
      label: t("nav.recycling"),
      icon: RefreshCw,
      isActive: location.pathname === "/passport/recycling",
    },
  ]

  return (
    <nav
      className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[var(--bg-surface)]/95 backdrop-blur-md border-t border-[var(--border-light)] pb-[env(safe-area-inset-bottom,0px)]"
      aria-label="Mobile Bottom Navigation"
    >
      <div className="grid grid-cols-4 h-16">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              to={item.href}
              className={`flex flex-col items-center justify-center min-h-[44px] px-1 text-center transition-colors ${
                item.isActive
                  ? "text-[var(--brand-teal-text)] font-semibold"
                  : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
              }`}
              aria-current={item.isActive ? "page" : undefined}
            >
              <Icon
                className={`w-5 h-5 mb-1 transition-transform ${
                  item.isActive ? "scale-110" : ""
                }`}
                aria-hidden="true"
              />
              <span className="text-[11px] leading-tight tracking-tight truncate max-w-[70px]">
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
