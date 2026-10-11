import { useState } from "react"
import { Link } from "react-router-dom"
import { usePassport } from "../context/PassportContext"
import {
  Wrench,
  AlertTriangle,
  Clock,
  CheckCircle2,
  ExternalLink,
  ShieldAlert,
  ShoppingBag,
  X,
  FileCheck
} from "lucide-react"

export default function RepairPage() {
  const { product, t } = usePassport()
  const [selectedPart, setSelectedPart] = useState<any | null>(null)
  const [orderConfirmed, setOrderConfirmed] = useState(false)

  const handleOrderPart = (part: any) => {
    setSelectedPart(part)
    setOrderConfirmed(false)
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
        <span className="text-[var(--text-muted)] font-medium">{t("nav.repair")}</span>
      </div>

      {/* Page Title */}
      <div className="max-w-3xl mb-8">
        <h1 className="text-2xl sm:text-4xl font-bold font-display text-[var(--text-main)]">
          {t("repair.title")}
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-muted)] mt-2 leading-relaxed">
          {t("repair.subtitle")}
        </p>
      </div>

      {/* Repairability Index & Methodology Card */}
      <section className="rounded-2xl border border-[var(--border-light)] bg-[var(--bg-surface)] p-6 sm:p-8 mb-10 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-[var(--border-light)]">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-faint)]">
              Official Assessment
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[var(--text-main)] mt-0.5">
              {t("repair.repairIndexTitle")}
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
              Evaluated under the French & EU Repairability Index criteria (Order of 29 December 2020).
            </p>
          </div>

          <div className="flex items-baseline gap-2 bg-[var(--bg-subtle)] px-5 py-3 rounded-2xl border border-[var(--border-light)] shrink-0">
            <span className="font-display font-bold text-4xl text-[var(--brand-teal-text)] tabular-nums">
              {product.repair.score.toFixed(1)}
            </span>
            <span className="text-sm font-semibold text-[var(--text-muted)]">
              / {product.repair.scale}
            </span>
          </div>
        </div>

        {/* Detailed Criteria Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 text-xs">
          <div>
            <dt className="text-[var(--text-faint)] font-medium">Fastener Accessibility</dt>
            <dd className="text-[var(--text-main)] font-semibold mt-1">
              {product.repair.fastenerType}
            </dd>
          </div>

          <div>
            <dt className="text-[var(--text-faint)] font-medium">Tools Required</dt>
            <dd className="text-[var(--text-main)] font-semibold mt-1">
              {product.repair.toolRequirements}
            </dd>
          </div>

          <div>
            <dt className="text-[var(--text-faint)] font-medium">Parts Availability Guarantee</dt>
            <dd className="text-[var(--brand-teal-text)] font-semibold mt-1">
              {product.repair.sparePartsGuaranteedYears} Years Guaranteed by Voltra
            </dd>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-[var(--border-light)] text-[11px] text-[var(--text-faint)] flex items-center justify-between">
          <span>{t("common.source")}: ADEME Eco-Design Evaluation Dossier REP-2026-VOLTRA</span>
          <span>2026-01-18</span>
        </div>
      </section>

      {/* Safety Warnings Section (WCAG High Contrast Cues) */}
      <section className="mb-10">
        <h2 className="text-lg font-bold font-display text-[var(--text-main)] mb-4 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-[var(--warm-accent)]" />
          <span>{t("repair.safetyTitle")}</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {product.repair.safetyWarnings.map((warn, i) => (
            <div
              key={i}
              className={`p-5 rounded-2xl border ${
                warn.level === "danger"
                  ? "bg-red-500/5 border-red-500/30 text-red-950 dark:text-red-200"
                  : warn.level === "warning"
                  ? "bg-amber-500/5 border-amber-500/30 text-amber-950 dark:text-amber-200"
                  : "bg-teal-500/5 border-teal-500/30 text-teal-950 dark:text-teal-200"
              }`}
            >
              <div className="flex items-center gap-2 mb-2 font-semibold text-xs sm:text-sm">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{warn.title}</span>
              </div>
              <p className="text-xs leading-relaxed opacity-90">
                {warn.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Step-by-Step Guides Section */}
      <section className="mb-12">
        <div className="mb-6">
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-faint)]">
            Maintenance & Troubleshooting
          </span>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-[var(--text-main)] mt-0.5">
            {t("repair.guidesTitle")}
          </h2>
        </div>

        <div className="space-y-6">
          {product.repair.guides.map((guide) => (
            <article
              key={guide.id}
              className="rounded-2xl border border-[var(--border-light)] bg-[var(--bg-surface)] p-6 shadow-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[var(--border-light)]">
                <div>
                  <h3 className="font-display font-bold text-base sm:text-lg text-[var(--text-main)]">
                    {guide.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--text-faint)] mt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {guide.estimatedMinutes} min
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>Difficulty: {guide.difficulty}</span>
                    <span aria-hidden="true">·</span>
                    <span
                      className={`font-medium ${
                        guide.consumerSafe
                          ? "text-emerald-700 dark:text-emerald-400"
                          : "text-amber-700 dark:text-amber-400"
                      }`}
                    >
                      {guide.consumerSafe ? t("repair.consumerSafe") : t("repair.technicianOnly")}
                    </span>
                  </div>
                </div>

                <div className="text-xs text-[var(--text-muted)] sm:text-right">
                  <span className="text-[var(--text-faint)]">Tools: </span>
                  <span className="font-medium text-[var(--text-main)]">{guide.tools.join(", ")}</span>
                </div>
              </div>

              {/* Step Sequence List */}
              <div className="mt-4 pt-2">
                <ol className="space-y-3">
                  {guide.steps.map((step, stepIdx) => (
                    <li key={stepIdx} className="flex items-start gap-3 text-xs sm:text-sm text-[var(--text-muted)]">
                      <span className="w-5 h-5 rounded-full bg-[var(--bg-subtle)] border border-[var(--border-light)] text-[var(--text-main)] font-semibold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {stepIdx + 1}
                      </span>
                      <span className="leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Spare Parts Catalog Table & Order Triggers */}
      <section className="rounded-2xl border border-[var(--border-light)] bg-[var(--bg-surface)] p-6 sm:p-8 shadow-xs">
        <div className="max-w-2xl mb-6">
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-faint)]">
            Original Manufacturer Components
          </span>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-[var(--text-main)] mt-0.5">
            {t("repair.partsTitle")}
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
            Genuine Voltra components guaranteed for 10 years from the date of battery production.
          </p>
        </div>

        <div className="overflow-x-auto -mx-6 sm:mx-0 px-6 sm:px-0">
          <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[640px]">
            <thead>
              <tr className="border-b border-[var(--border-light)] text-[var(--text-faint)] text-xs font-semibold">
                <th className="pb-3 pr-4">{t("repair.partNumber")}</th>
                <th className="pb-3 pr-4">Component Name</th>
                <th className="pb-3 pr-4 text-right">{t("repair.price")}</th>
                <th className="pb-3 pr-4">{t("repair.availability")}</th>
                <th className="pb-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-light)]">
              {product.repair.spareParts.map((part) => (
                <tr key={part.partNumber} className="hover:bg-[var(--bg-subtle)] transition-colors">
                  <td className="py-4 pr-4 font-mono font-medium text-[var(--text-main)]">
                    {part.partNumber}
                  </td>

                  <td className="py-4 pr-4">
                    <span className="font-semibold text-[var(--text-main)] block">
                      {part.name}
                    </span>
                    <span className="text-[11px] text-[var(--text-faint)]">
                      {part.weightGrams}g · {part.warrantyMonths} months warranty · {part.consumerReplaceable ? "Consumer replaceable" : "Technician only"}
                    </span>
                  </td>

                  <td className="py-4 pr-4 text-right font-display font-bold text-[var(--text-main)] tabular-nums">
                    €{part.priceEur.toFixed(2)}
                  </td>

                  <td className="py-4 pr-4 text-xs">
                    <span className="text-emerald-700 dark:text-emerald-400 font-medium">
                      {part.availability}
                    </span>
                  </td>

                  <td className="py-4 text-right">
                    <button
                      onClick={() => handleOrderPart(part)}
                      type="button"
                      className="px-3.5 py-2 rounded-lg text-xs font-semibold bg-[var(--bg-subtle)] hover:bg-[var(--brand-teal)] hover:text-white border border-[var(--border-light)] transition-colors min-h-[38px] whitespace-nowrap"
                    >
                      {t("repair.orderPart")}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 pt-4 border-t border-[var(--border-light)] text-[11px] text-[var(--text-faint)] flex items-center justify-between">
          <span>{t("common.source")}: Voltra Parts Registry & EU Spare Parts Mandate EN 45554</span>
          <span>Updated 2026-02-18</span>
        </div>
      </section>

      {/* Spare Part Order Simulation Modal */}
      {selectedPart && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-md rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-light)] p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[var(--border-light)]">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[var(--brand-teal-text)]" />
                <h3 className="font-display font-bold text-base text-[var(--text-main)]">
                  {t("repair.orderModalTitle")}
                </h3>
              </div>
              <button
                onClick={() => setSelectedPart(null)}
                className="p-1 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)]"
                aria-label={t("repair.close")}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="my-5 space-y-3">
              <div>
                <span className="text-xs text-[var(--text-faint)]">Selected Component:</span>
                <p className="font-semibold text-sm text-[var(--text-main)] mt-0.5">
                  {selectedPart.name}
                </p>
                <p className="text-xs font-mono text-[var(--text-muted)]">
                  Part #: {selectedPart.partNumber}
                </p>
              </div>

              <div className="flex items-baseline justify-between pt-2 border-t border-[var(--border-light)]">
                <span className="text-xs text-[var(--text-faint)]">Price:</span>
                <span className="text-lg font-bold font-display text-[var(--text-main)] tabular-nums">
                  €{selectedPart.priceEur.toFixed(2)} (Incl. VAT)
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[var(--bg-subtle)] text-xs text-[var(--text-muted)] leading-relaxed">
                {t("repair.orderModalDesc")}
              </div>

              {orderConfirmed ? (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Order request simulated successfully! No charge incurred.</span>
                </div>
              ) : null}
            </div>

            <div className="space-y-2">
              {!orderConfirmed ? (
                <button
                  onClick={() => setOrderConfirmed(true)}
                  type="button"
                  className="w-full py-3 rounded-xl bg-[var(--brand-teal)] text-white text-xs sm:text-sm font-semibold hover:opacity-95 transition-opacity"
                >
                  Proceed to Certified EU Distributor
                </button>
              ) : (
                <button
                  onClick={() => setSelectedPart(null)}
                  type="button"
                  className="w-full py-2.5 rounded-xl border border-[var(--border-light)] text-xs font-medium text-[var(--text-muted)]"
                >
                  {t("repair.close")}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
