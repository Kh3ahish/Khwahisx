import { useState } from "react"
import { Link } from "react-router-dom"
import { usePassport } from "../context/PassportContext"
import {
  RefreshCw,
  MapPin,
  CheckSquare,
  Square,
  ShieldCheck,
  AlertOctagon,
  Clock,
  ArrowRight,
  Info
} from "lucide-react"

export default function RecyclingPage() {
  const { product, t } = usePassport()
  const [selectedCity, setSelectedCity] = useState<string>("All")
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({})

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  // Get unique list of cities for filter
  const cities = ["All", ...Array.from(new Set(product.recycling.collectionPoints.map((c) => c.city)))]

  const filteredPoints =
    selectedCity === "All"
      ? product.recycling.collectionPoints
      : product.recycling.collectionPoints.filter((c) => c.city === selectedCity)

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-[var(--text-faint)] mb-4">
        <Link to="/" className="hover:text-[var(--text-main)] transition-colors">
          {t("nav.home")}
        </Link>
        <span aria-hidden="true">/</span>
        <Link to="/passport" className="hover:text-[var(--text-main)] transition-colors">
          {t("nav.overview")}
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-[var(--text-muted)] font-medium">{t("nav.recycling")}</span>
      </div>

      {/* Page Title */}
      <div className="max-w-3xl mb-8">
        <h1 className="text-2xl sm:text-4xl font-bold font-display text-[var(--text-main)]">
          {t("recycling.title")}
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-muted)] mt-2 leading-relaxed">
          {t("recycling.subtitle")}
        </p>
      </div>

      {/* Section 1: What to do with the battery / Citizen Rights */}
      <section className="rounded-2xl border border-[var(--border-light)] bg-[var(--bg-surface)] p-6 sm:p-8 mb-10 shadow-xs">
        <div className="max-w-3xl">
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-faint)]">
            EU Regulation 2023/1542 Mandate
          </span>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-[var(--text-main)] mt-0.5 mb-3">
            {t("recycling.takeBackTitle")}
          </h2>
          <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6">
            {t("recycling.takeBackDesc")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-[var(--border-light)] text-xs">
          <div className="p-3.5 rounded-xl bg-[var(--bg-subtle)]">
            <span className="text-[var(--text-faint)] block mb-1">Consumer Cost</span>
            <span className="text-base font-bold text-[var(--brand-teal-text)]">
              {product.recycling.consumerCost}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-[var(--bg-subtle)]">
            <span className="text-[var(--text-faint)] block mb-1">Landfill Ban</span>
            <span className="text-sm font-semibold text-[var(--text-main)]">
              Strict Ban in 27 EU States
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-[var(--bg-subtle)]">
            <span className="text-[var(--text-faint)] block mb-1">Mandatory Recovery Rate</span>
            <span className="text-base font-bold text-[var(--text-main)]">
              {product.recycling.recoveryRateTarget}
            </span>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-[var(--border-light)] text-[11px] text-[var(--text-faint)] flex items-center justify-between">
          <span>{t("common.source")}: {product.recycling.euDirective}</span>
          <span>In effect across EU</span>
        </div>
      </section>

      {/* Section 2: Interactive Safety Checklist Before Handover */}
      <section className="rounded-2xl border border-[var(--border-light)] bg-[var(--bg-surface)] p-6 sm:p-8 mb-10 shadow-xs">
        <div className="max-w-2xl mb-6">
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-faint)]">
            Safety Precautions
          </span>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-[var(--text-main)] mt-0.5">
            {t("recycling.checklistTitle")}
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
            Complete these 4 verification steps before bringing the battery to a drop-off point.
          </p>
        </div>

        <div className="space-y-3">
          {product.recycling.safetyChecklist.map((item) => {
            const isChecked = !!checkedItems[item.id]
            return (
              <div
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 select-none ${
                  isChecked
                    ? "bg-teal-500/5 border-[var(--brand-teal)] text-[var(--text-main)]"
                    : "bg-[var(--bg-subtle)] border-[var(--border-light)] hover:border-[var(--border-strong)] text-[var(--text-muted)]"
                }`}
                role="checkbox"
                aria-checked={isChecked}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === " " || e.key === "Enter") {
                    e.preventDefault()
                    toggleCheck(item.id)
                  }
                }}
              >
                <div className="mt-0.5 shrink-0 text-[var(--brand-teal-text)]">
                  {isChecked ? (
                    <CheckSquare className="w-5 h-5 text-[var(--brand-teal)]" />
                  ) : (
                    <Square className="w-5 h-5 text-[var(--text-faint)]" />
                  )}
                </div>

                <div>
                  <span className={`text-sm font-semibold block ${isChecked ? "text-[var(--text-main)]" : ""}`}>
                    {item.label}
                  </span>
                  <p className="text-xs text-[var(--text-muted)] mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Section 3: Where to take it (Static Realistic Collection Points) */}
      <section className="rounded-2xl border border-[var(--border-light)] bg-[var(--bg-surface)] p-6 sm:p-8 mb-10 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-faint)]">
              Local Infrastructure
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[var(--text-main)] mt-0.5">
              {t("recycling.locationsTitle")}
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-0.5">
              {t("recycling.locationsDesc")}
            </p>
          </div>

          {/* City Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0">
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                type="button"
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedCity === city
                    ? "bg-[var(--brand-teal)] text-white"
                    : "bg-[var(--bg-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)]"
                }`}
              >
                {city === "All" ? t("recycling.allCities") : city.split(",")[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Collection Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPoints.map((point, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl border border-[var(--border-light)] bg-[var(--bg-subtle)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[var(--text-faint)] mb-2">
                  <span className="font-semibold text-[var(--brand-teal-text)]">
                    {point.city}
                  </span>
                  <span className="font-medium text-emerald-700 dark:text-emerald-400">
                    {point.cost}
                  </span>
                </div>

                <h3 className="font-display font-bold text-base text-[var(--text-main)] mb-1">
                  {point.name}
                </h3>

                <p className="text-xs text-[var(--text-muted)] flex items-start gap-1 mb-3">
                  <MapPin className="w-3.5 h-3.5 text-[var(--text-faint)] shrink-0 mt-0.5" />
                  <span>{point.address}</span>
                </p>

                <div className="text-[11px] text-[var(--text-faint)] flex items-center gap-1.5">
                  <Clock className="w-3 h-3" />
                  <span>{point.hours}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[var(--border-light)]/60 flex items-center justify-between text-[11px] text-[var(--text-muted)]">
                <span>{point.type}</span>
                <span className="inline-flex items-center gap-1 text-[var(--brand-teal-text)] font-medium">
                  <ShieldCheck className="w-3 h-3" /> Certified
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-[var(--border-light)] text-[11px] text-[var(--text-faint)] flex items-center justify-between">
          <span>{t("common.source")}: National Battery Take-Back Organizations (GRS, Corepile, Bebat)</span>
          <span>Verified Registry 2026</span>
        </div>
      </section>

      {/* Section 4: What happens next? Circular Recycling Journey */}
      <section className="rounded-2xl border border-[var(--border-light)] bg-[var(--bg-surface)] p-6 sm:p-8 shadow-xs">
        <div className="max-w-2xl mb-8">
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-faint)]">
            Closed-Loop Metallurgy
          </span>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-[var(--text-main)] mt-0.5">
            {t("recycling.whatHappensTitle")}
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
            {t("recycling.whatHappensDesc")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {product.recycling.circularProcess.map((step) => (
            <div
              key={step.stage}
              className="p-4 rounded-xl border border-[var(--border-light)] bg-[var(--bg-subtle)] flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-mono font-bold text-[var(--brand-teal-text)] block mb-1">
                  0{step.stage}
                </span>
                <h3 className="font-display font-semibold text-sm text-[var(--text-main)] mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-4 pt-2 border-t border-[var(--border-light)]/40 text-[10px] text-[var(--text-faint)]">
                Phase {step.stage} / 5
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-4 border-t border-[var(--border-light)] text-xs text-[var(--text-muted)] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span>95% Recovery Efficiency verified by Fraunhofer Institute for Systems and Innovation Research (ISI)</span>
          <Link
            to="/passport/materials"
            className="text-[var(--brand-teal-text)] font-semibold hover:underline inline-flex items-center gap-1"
          >
            <span>See where recycled metals are used</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
