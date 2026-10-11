import { useState } from "react"
import { Link } from "react-router-dom"
import { usePassport } from "../../src/context/PassportContext"
import ProductVisual from "../components/ProductVisual"
import ScoreGauge from "../components/ScoreGauge"
import {
  Layers,
  Wrench,
  RefreshCw,
  ArrowRight,
  ShieldCheck,
  Calendar,
  CheckCircle2,
  FileText,
  Copy,
  Check,
  ExternalLink,
  Info
} from "lucide-react"

export default function PassportOverviewPage() {
  const { product, t } = usePassport()
  const [copiedCode, setCopiedCode] = useState(false)

  const handleCopyCode = () => {
    navigator.clipboard.writeText(product.id)
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2000)
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Top Breadcrumb & ID Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-[var(--border-light)]">
        <div>
          <div className="flex items-center gap-2 text-xs text-[var(--text-faint)] mb-1">
            <Link to="/" className="hover:text-[var(--text-main)] transition-colors">
              {t("nav.home")}
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-[var(--text-muted)] font-medium">{t("nav.overview")}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-[var(--text-main)]">
            {product.name}
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-0.5">
            {product.category} · {product.manufacturer.name}
          </p>
        </div>

        {/* Passport ID Copy Affordance */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="px-3 py-1.5 rounded-lg border border-[var(--border-light)] bg-[var(--bg-subtle)] text-xs font-mono text-[var(--text-muted)] flex items-center gap-2">
            <span className="text-[var(--text-faint)]">DPP-ID:</span>
            <span>{product.id}</span>
            <button
              onClick={handleCopyCode}
              type="button"
              className="p-1 -mr-1 rounded hover:bg-[var(--bg-surface)] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
              aria-label={t("common.copyCode")}
              title={t("common.copyCode")}
            >
              {copiedCode ? (
                <Check className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Two-Column Desktop Section: Left Column (Visual + Specs), Right Column (Score + Key Facts) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
        {/* Left Column (5 of 12 cols on desktop): Product Visual & Key Specs */}
        <div className="lg:col-span-6 space-y-6">
          <ProductVisual
            id={product.id}
            name={product.name}
            voltage={product.specifications.voltageNominal}
            energy={product.specifications.energyNominal}
          />

          {/* Technical Specs Card */}
          <div className="rounded-2xl border border-[var(--border-light)] bg-[var(--bg-surface)] p-6 shadow-xs">
            <h2 className="text-base font-bold font-display text-[var(--text-main)] mb-4 flex items-center justify-between">
              <span>{t("overview.productSpecsTitle")}</span>
              <span className="text-xs font-normal text-[var(--text-faint)]">
                Verified Lab Test
              </span>
            </h2>

            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5 text-xs">
              <div>
                <dt className="text-[var(--text-faint)]">{t("overview.capacity")}</dt>
                <dd className="font-semibold text-[var(--text-main)] tabular-nums mt-0.5">
                  {product.specifications.energyNominal} ({product.specifications.capacityRated})
                </dd>
              </div>

              <div>
                <dt className="text-[var(--text-faint)]">{t("overview.voltage")}</dt>
                <dd className="font-semibold text-[var(--text-main)] tabular-nums mt-0.5">
                  {product.specifications.voltageNominal} (Max {product.specifications.voltageMax})
                </dd>
              </div>

              <div>
                <dt className="text-[var(--text-faint)]">{t("overview.cellType")}</dt>
                <dd className="font-semibold text-[var(--text-main)] mt-0.5">
                  {product.specifications.cellChemistry}
                </dd>
              </div>

              <div>
                <dt className="text-[var(--text-faint)]">Configuration & Form</dt>
                <dd className="font-semibold text-[var(--text-main)] mt-0.5">
                  {product.specifications.cellCount}
                </dd>
              </div>

              <div>
                <dt className="text-[var(--text-faint)]">Weight & Dimensions</dt>
                <dd className="font-semibold text-[var(--text-main)] tabular-nums mt-0.5">
                  {product.specifications.weight} · {product.specifications.dimensions}
                </dd>
              </div>

              <div>
                <dt className="text-[var(--text-faint)]">Ingress Protection</dt>
                <dd className="font-semibold text-[var(--text-main)] mt-0.5">
                  {product.specifications.ingressProtection}
                </dd>
              </div>

              <div>
                <dt className="text-[var(--text-faint)]">{t("overview.manufactureDate")}</dt>
                <dd className="font-semibold text-[var(--text-main)] tabular-nums mt-0.5">
                  {product.specifications.manufactureDate}
                </dd>
              </div>

              <div>
                <dt className="text-[var(--text-faint)]">{t("overview.warranty")}</dt>
                <dd className="font-semibold text-[var(--text-main)] mt-0.5">
                  {product.specifications.warrantyPeriod}
                </dd>
              </div>
            </dl>

            <div className="mt-5 pt-4 border-t border-[var(--border-light)] text-[11px] text-[var(--text-faint)] flex items-center justify-between">
              <span>{t("common.source")}: VDE Testing Institute ISO/IEC 17025</span>
              <span>2026-02-12</span>
            </div>
          </div>
        </div>

        {/* Right Column (6 of 12 cols on desktop): Overall Score & 5 Sub-Scores */}
        <div className="lg:col-span-6 space-y-6">
          {/* Main Circular Score Spotlight Box */}
          <div className="rounded-2xl border border-[var(--border-light)] bg-[var(--bg-surface)] p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
              <div className="shrink-0">
                <ScoreGauge
                  score={product.sustainability.overallScore}
                  scale={product.sustainability.scoreScale}
                  size="lg"
                />
              </div>

              <div className="space-y-2 text-center sm:text-left">
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-faint)]">
                  EU Standardized Metric
                </span>
                <h2 className="text-xl sm:text-2xl font-bold font-display text-[var(--text-main)]">
                  {t("overview.overallScoreLabel")}
                </h2>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                  {t("overview.overallScoreDesc")}
                </p>
                <div className="pt-2 text-[11px] text-[var(--text-faint)]">
                  {t("common.source")}: EU Eco-Design Sustainability Index 2026 · Verified 2026-02-15
                </div>
              </div>
            </div>
          </div>

          {/* 5 Core Sub-Scores List */}
          <div className="rounded-2xl border border-[var(--border-light)] bg-[var(--bg-surface)] p-6 shadow-xs">
            <h2 className="text-base font-bold font-display text-[var(--text-main)] mb-4">
              {t("overview.subScoresTitle")}
            </h2>

            <div className="space-y-4">
              {product.sustainability.subScores.map((sub) => (
                <div
                  key={sub.id}
                  className="p-3.5 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-light)]/60 space-y-1.5"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs sm:text-sm font-semibold text-[var(--text-main)]">
                      {sub.label}
                    </span>
                    <div className="flex items-baseline gap-1.5 text-right shrink-0">
                      <span className="font-display font-bold text-base text-[var(--brand-teal-text)] tabular-nums">
                        {sub.score}
                      </span>
                      <span className="text-xs text-[var(--text-faint)]">/ 100</span>
                    </div>
                  </div>

                  {/* Clean progress meter bar */}
                  <div className="w-full h-1.5 rounded-full bg-[var(--border-light)] overflow-hidden">
                    <div
                      className="h-full bg-[var(--brand-teal)] rounded-full transition-all duration-700"
                      style={{ width: `${sub.score}%` }}
                    />
                  </div>

                  <div className="flex flex-wrap items-center justify-between text-[11px] text-[var(--text-muted)] pt-1">
                    <span className="font-medium text-[var(--text-main)]">{sub.value}</span>
                    <span className="text-[var(--text-faint)]">{sub.benchmark}</span>
                  </div>

                  {/* Fact source and date stamp */}
                  <div className="text-[10px] text-[var(--text-faint)] pt-0.5 border-t border-[var(--border-light)]/40 flex items-center justify-between">
                    <span className="truncate max-w-[260px]">{t("common.source")}: {sub.source}</span>
                    <span>{sub.sourceDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4 Key Facts Grid (Carbon, Recycled, Lifetime, Repairability) */}
      <section className="mb-12">
        <div className="mb-4">
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-faint)]">
            Impact Metrics
          </span>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-[var(--text-main)]">
            {t("overview.keyFactsTitle")}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Fact 1: Carbon Footprint */}
          <div className="rounded-2xl border border-[var(--border-light)] bg-[var(--bg-surface)] p-5 flex flex-col justify-between shadow-xs">
            <div>
              <span className="text-xs text-[var(--text-faint)] font-medium">
                Carbon Footprint
              </span>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="font-display font-bold text-2xl sm:text-3xl text-[var(--text-main)] tabular-nums">
                  34.2
                </span>
                <span className="text-xs text-[var(--text-muted)] font-medium">
                  kg CO₂e / kWh
                </span>
              </div>
              <p className="mt-2 text-xs text-[var(--text-muted)] leading-relaxed">
                Total pack lifecycle footprint: 17.0 kg CO₂e from cradle to gate.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[var(--border-light)] text-[11px] text-[var(--text-faint)] flex items-center justify-between">
              <span>{t("common.source")}: TÜV Rheinland ISO 14067</span>
              <span>2026-01-14</span>
            </div>
          </div>

          {/* Fact 2: Recycled Content */}
          <div className="rounded-2xl border border-[var(--border-light)] bg-[var(--bg-surface)] p-5 flex flex-col justify-between shadow-xs">
            <div>
              <span className="text-xs text-[var(--text-faint)] font-medium">
                Recycled Content
              </span>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="font-display font-bold text-2xl sm:text-3xl text-[var(--text-main)] tabular-nums">
                  24.5%
                </span>
                <span className="text-xs text-[var(--text-muted)] font-medium">
                  metal share
                </span>
              </div>
              <p className="mt-2 text-xs text-[var(--text-muted)] leading-relaxed">
                62% recycled aluminum housing; 22% recycled cobalt in cathode.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[var(--border-light)] text-[11px] text-[var(--text-faint)] flex items-center justify-between">
              <span>{t("common.source")}: Bureau Veritas EN 45557</span>
              <span>2026-02-02</span>
            </div>
          </div>

          {/* Fact 3: Lifetime */}
          <div className="rounded-2xl border border-[var(--border-light)] bg-[var(--bg-surface)] p-5 flex flex-col justify-between shadow-xs">
            <div>
              <span className="text-xs text-[var(--text-faint)] font-medium">
                Expected Lifetime
              </span>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="font-display font-bold text-2xl sm:text-3xl text-[var(--text-main)] tabular-nums">
                  1,200
                </span>
                <span className="text-xs text-[var(--text-muted)] font-medium">
                  cycles (8+ yrs)
                </span>
              </div>
              <p className="mt-2 text-xs text-[var(--text-muted)] leading-relaxed">
                Maintains ≥80% State of Health (SoH) under standard 1C cycling.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[var(--border-light)] text-[11px] text-[var(--text-faint)] flex items-center justify-between">
              <span>{t("common.source")}: VDE Test IEC 62133-2</span>
              <span>2025-11-20</span>
            </div>
          </div>

          {/* Fact 4: Repairability */}
          <div className="rounded-2xl border border-[var(--border-light)] bg-[var(--bg-surface)] p-5 flex flex-col justify-between shadow-xs">
            <div>
              <span className="text-xs text-[var(--text-faint)] font-medium">
                Repairability Index
              </span>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="font-display font-bold text-2xl sm:text-3xl text-[var(--brand-teal-text)] tabular-nums">
                  8.2
                </span>
                <span className="text-xs text-[var(--text-muted)] font-medium">
                  / 10 EU scale
                </span>
              </div>
              <p className="mt-2 text-xs text-[var(--text-muted)] leading-relaxed">
                Fastened with standard Torx T20 screws. No glue or sonic welds.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[var(--border-light)] text-[11px] text-[var(--text-faint)] flex items-center justify-between">
              <span>{t("common.source")}: ADEME Eco-Framework</span>
              <span>2026-01-18</span>
            </div>
          </div>
        </div>
      </section>

      {/* Links to Other Dedicated Passport Pages */}
      <section className="pt-4 border-t border-[var(--border-light)]">
        <div className="mb-6">
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-faint)]">
            Detailed Breakdown
          </span>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-[var(--text-main)] mt-0.5">
            {t("overview.quickNavTitle")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Materials */}
          <Link
            to="/passport/materials"
            className="group rounded-2xl border border-[var(--border-light)] bg-[var(--bg-surface)] p-6 hover:border-[var(--brand-teal)] hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-[var(--brand-teal-light)] text-[var(--brand-teal-text)] flex items-center justify-center mb-4 transition-transform group-hover:scale-105">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-[var(--text-main)] mb-2 group-hover:text-[var(--brand-teal-text)] transition-colors">
                {t("overview.quickNavMaterials")}
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                {t("overview.quickNavMaterialsDesc")}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[var(--border-light)] flex items-center justify-between text-xs font-medium text-[var(--brand-teal-text)]">
              <span>View Materials & Origins</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

          {/* Card 2: Repair */}
          <Link
            to="/passport/repair"
            className="group rounded-2xl border border-[var(--border-light)] bg-[var(--bg-surface)] p-6 hover:border-[var(--brand-teal)] hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-[var(--brand-teal-light)] text-[var(--brand-teal-text)] flex items-center justify-center mb-4 transition-transform group-hover:scale-105">
                <Wrench className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-[var(--text-main)] mb-2 group-hover:text-[var(--brand-teal-text)] transition-colors">
                {t("overview.quickNavRepair")}
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                {t("overview.quickNavRepairDesc")}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[var(--border-light)] flex items-center justify-between text-xs font-medium text-[var(--brand-teal-text)]">
              <span>View Guides & Spare Parts</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

          {/* Card 3: Recycling */}
          <Link
            to="/passport/recycling"
            className="group rounded-2xl border border-[var(--border-light)] bg-[var(--bg-surface)] p-6 hover:border-[var(--brand-teal)] hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-[var(--brand-teal-light)] text-[var(--brand-teal-text)] flex items-center justify-center mb-4 transition-transform group-hover:scale-105">
                <RefreshCw className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-[var(--text-main)] mb-2 group-hover:text-[var(--brand-teal-text)] transition-colors">
                {t("overview.quickNavRecycling")}
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                {t("overview.quickNavRecyclingDesc")}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[var(--border-light)] flex items-center justify-between text-xs font-medium text-[var(--brand-teal-text)]">
              <span>View Drop-Off & Recovery</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        </div>
      </section>
    </div>
  )
}
