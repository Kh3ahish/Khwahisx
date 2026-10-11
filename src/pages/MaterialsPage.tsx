import { useState } from "react"
import { Link } from "react-router-dom"
import { usePassport } from "../context/PassportContext"
import {
  Layers,
  MapPin,
  Calendar,
  ShieldCheck,
  Info,
  CheckCircle2,
  ExternalLink
} from "lucide-react"

export default function MaterialsPage() {
  const { product, t } = usePassport()
  const [filterCriticalOnly, setFilterCriticalOnly] = useState(false)

  const displayedMaterials = filterCriticalOnly
    ? product.materials.filter((m) => m.criticalRawMaterial)
    : product.materials

  // Color palette for chart bars
  const materialColors: Record<string, string> = {
    "Nickel (Ni)": "bg-emerald-700 dark:bg-emerald-500",
    "Aluminum (Al)": "bg-teal-600 dark:bg-teal-400",
    "Cobalt (Co)": "bg-blue-600 dark:bg-blue-400",
    "Manganese (Mn)": "bg-indigo-600 dark:bg-indigo-400",
    "Lithium (Li)": "bg-amber-600 dark:bg-amber-500",
    "Copper (Cu)": "bg-orange-600 dark:bg-orange-400",
    "Electrolyte & Polymer Separators": "bg-slate-500 dark:bg-slate-400",
  }

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
        <span className="text-[var(--text-muted)] font-medium">{t("nav.materials")}</span>
      </div>

      {/* Header */}
      <div className="max-w-3xl mb-8">
        <h1 className="text-2xl sm:text-4xl font-bold font-display text-[var(--text-main)]">
          {t("materials.title")}
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-muted)] mt-2 leading-relaxed">
          {t("materials.subtitle")}
        </p>
      </div>

      {/* Section 1: Visual Stacked Percentage Bar & Summary */}
      <section className="rounded-2xl border border-[var(--border-light)] bg-[var(--bg-surface)] p-6 sm:p-8 mb-10 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg font-bold font-display text-[var(--text-main)]">
              {t("materials.chartTitle")}
            </h2>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              Cumulative battery cell and casing mass: 2.85 kg total
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilterCriticalOnly(!filterCriticalOnly)}
              type="button"
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                filterCriticalOnly
                  ? "bg-[var(--brand-teal)] text-white border-[var(--brand-teal)]"
                  : "bg-[var(--bg-subtle)] text-[var(--text-muted)] border-[var(--border-light)] hover:text-[var(--text-main)]"
              }`}
            >
              {filterCriticalOnly ? "Showing Critical Only" : "Filter Critical Raw Materials"}
            </button>
          </div>
        </div>

        {/* Visual Stacked Progress Bar (Accessible text alternative provided below) */}
        <div
          className="w-full h-8 sm:h-10 rounded-xl overflow-hidden flex bg-[var(--bg-subtle)] border border-[var(--border-light)] shadow-inner"
          role="img"
          aria-label="Stacked bar chart showing material percentages: Nickel 32%, Aluminum 24%, Cobalt 14%, Manganese 12%, Lithium 9%, Copper 6%, Electrolyte 3%"
        >
          {product.materials.map((mat) => (
            <div
              key={mat.name}
              style={{ width: `${mat.percentage}%` }}
              className={`h-full ${
                materialColors[mat.name] || "bg-teal-600"
              } transition-all duration-500 relative group flex items-center justify-center`}
              title={`${mat.name}: ${mat.percentage}%`}
            >
              {mat.percentage >= 9 && (
                <span className="text-[10px] sm:text-xs font-bold text-white tracking-wider truncate px-1">
                  {mat.percentage}%
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Chart Legend / Color Swatches */}
        <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-xs">
          {product.materials.map((mat) => (
            <div key={mat.name} className="flex items-center gap-2">
              <span
                className={`w-3 h-3 rounded-xs shrink-0 ${
                  materialColors[mat.name] || "bg-teal-600"
                }`}
                aria-hidden="true"
              />
              <span className="text-[var(--text-main)] font-medium">
                {mat.name.split(" ")[0]}
              </span>
              <span className="text-[var(--text-faint)] tabular-nums">
                ({mat.percentage}%)
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-[var(--border-light)] flex items-center gap-2 text-xs text-[var(--text-muted)]">
          <Info className="w-4 h-4 text-[var(--brand-teal-text)] shrink-0" />
          <span>{t("materials.recycledNote")}</span>
        </div>
      </section>

      {/* Section 2: Structured Accessible Data Table */}
      <section className="rounded-2xl border border-[var(--border-light)] bg-[var(--bg-surface)] p-6 sm:p-8 mb-10 shadow-xs overflow-hidden">
        <h2 className="text-lg font-bold font-display text-[var(--text-main)] mb-2">
          {t("materials.tableTitle")}
        </h2>
        <p className="text-xs text-[var(--text-muted)] mb-6">
          Full material disclosure with chemical purpose, recycled share, and primary sourcing site.
        </p>

        {/* Responsive Table Container with horizontal scroll wrapper for small viewports */}
        <div className="overflow-x-auto -mx-6 sm:mx-0 px-6 sm:px-0">
          <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-[var(--border-light)] text-[var(--text-faint)] text-xs font-semibold">
                <th className="pb-3 pr-4">{t("materials.tableThMaterial")}</th>
                <th className="pb-3 pr-4 text-right tabular-nums">{t("materials.tableThShare")}</th>
                <th className="pb-3 pr-4 text-right tabular-nums">{t("materials.tableThRecycled")}</th>
                <th className="pb-3 pr-4">{t("materials.tableThOrigin")}</th>
                <th className="pb-3">{t("materials.tableThSource")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-light)]">
              {displayedMaterials.map((mat) => (
                <tr key={mat.name} className="hover:bg-[var(--bg-subtle)] transition-colors">
                  <td className="py-3.5 pr-4 font-semibold text-[var(--text-main)]">
                    <div className="flex items-center gap-2">
                      <span>{mat.name}</span>
                      {mat.criticalRawMaterial && (
                        <span
                          className="text-[10px] text-amber-700 dark:text-amber-400 font-normal"
                          title="EU Critical Raw Material"
                        >
                          [Critical]
                        </span>
                      )}
                    </div>
                    <span className="block text-[11px] font-normal text-[var(--text-faint)] mt-0.5">
                      {mat.purpose}
                    </span>
                  </td>

                  <td className="py-3.5 pr-4 text-right font-semibold text-[var(--text-main)] tabular-nums">
                    {mat.percentage.toFixed(1)}%
                  </td>

                  <td className="py-3.5 pr-4 text-right font-medium text-[var(--brand-teal-text)] tabular-nums">
                    {mat.recycledShare > 0 ? `${mat.recycledShare.toFixed(1)}%` : "0% (Virgin)"}
                  </td>

                  <td className="py-3.5 pr-4 text-[var(--text-muted)]">
                    {mat.origin}
                  </td>

                  <td className="py-3.5 text-[11px] text-[var(--text-faint)]">
                    <div className="max-w-[200px] leading-tight truncate" title={mat.source}>
                      {mat.source}
                    </div>
                    <div className="text-[10px] mt-0.5">{mat.sourceDate}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 3: Supply Chain Provenance Timeline */}
      <section className="rounded-2xl border border-[var(--border-light)] bg-[var(--bg-surface)] p-6 sm:p-8 shadow-xs">
        <div className="max-w-2xl mb-8">
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-faint)]">
            Traceability & Chain of Custody
          </span>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-[var(--text-main)] mt-1">
            {t("materials.timelineTitle")}
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
            {t("materials.dueDiligenceNote")}
          </p>
        </div>

        {/* Timeline Reflow */}
        <div className="relative border-l-2 border-[var(--border-light)] ml-3 sm:ml-4 pl-6 sm:pl-8 space-y-8 sm:space-y-10">
          {product.supplyChain.map((step) => (
            <div key={step.step} className="relative group">
              {/* Timeline Node Dot */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-4 h-4 rounded-full bg-[var(--bg-surface)] border-2 border-[var(--brand-teal)] flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-teal)]" />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs mb-1">
                  <span className="font-bold text-[var(--brand-teal-text)]">
                    Stage {step.step}
                  </span>
                  <span aria-hidden="true" className="text-[var(--text-faint)]">·</span>
                  <span className="text-[var(--text-muted)] font-mono">{step.date}</span>
                </div>

                <h3 className="text-base sm:text-lg font-bold font-display text-[var(--text-main)]">
                  {step.title}
                </h3>

                <div className="flex items-center gap-1.5 text-xs text-[var(--text-faint)] mt-1 mb-2">
                  <MapPin className="w-3.5 h-3.5 text-[var(--brand-teal-text)]" />
                  <span>{step.location}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-medium text-[var(--text-muted)]">{step.operator}</span>
                </div>

                <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed max-w-2xl">
                  {step.description}
                </p>

                {/* Audit Standards Verified */}
                <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-[var(--text-muted)]">
                  <span className="text-[var(--text-faint)]">Certifications:</span>
                  {step.certifications.map((c, i) => (
                    <span key={i} className="inline-flex items-center gap-1 font-medium text-[var(--text-main)]">
                      <ShieldCheck className="w-3 h-3 text-[var(--brand-teal-text)]" />
                      {c}
                      {i < step.certifications.length - 1 && <span className="text-[var(--text-faint)]">,</span>}
                    </span>
                  ))}
                </div>

                {/* Verified Source & Date */}
                <div className="mt-2 pt-2 border-t border-[var(--border-light)]/40 text-[10px] text-[var(--text-faint)] flex items-center justify-between max-w-xl">
                  <span>{t("common.source")}: {step.source}</span>
                  <span>{step.sourceDate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
