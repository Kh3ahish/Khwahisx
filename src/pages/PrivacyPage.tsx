import { Link } from "react-router-dom"
import { usePassport } from "../context/PassportContext"
import {
  ShieldCheck,
  EyeOff,
  Database,
  Lock,
  Globe,
  CheckCircle2
} from "lucide-react"

export default function PrivacyPage() {
  const { t } = usePassport()

  const points = [
    {
      icon: EyeOff,
      title: t("privacy.point1Title"),
      desc: t("privacy.point1Desc"),
    },
    {
      icon: ShieldCheck,
      title: t("privacy.point2Title"),
      desc: t("privacy.point2Desc"),
    },
    {
      icon: Database,
      title: t("privacy.point3Title"),
      desc: t("privacy.point3Desc"),
    },
    {
      icon: Lock,
      title: t("privacy.point4Title"),
      desc: t("privacy.point4Desc"),
    },
    {
      icon: Globe,
      title: t("privacy.point5Title"),
      desc: t("privacy.point5Desc"),
    },
  ]

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-[var(--text-faint)] mb-4">
        <Link to="/" className="hover:text-[var(--text-main)] transition-colors">
          {t("nav.home")}
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-[var(--text-muted)] font-medium">{t("nav.privacy")}</span>
      </div>

      {/* Page Header */}
      <div className="max-w-2xl mb-10">
        <h1 className="text-2xl sm:text-4xl font-bold font-display text-[var(--text-main)]">
          {t("privacy.title")}
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-muted)] mt-2 leading-relaxed">
          {t("privacy.subtitle")}
        </p>
      </div>

      {/* Intro Banner */}
      <div className="p-6 rounded-2xl border border-[var(--border-light)] bg-[var(--bg-subtle)] mb-8">
        <p className="text-sm sm:text-base text-[var(--text-main)] font-medium leading-relaxed">
          {t("privacy.intro")}
        </p>
      </div>

      {/* 5 Core Principles */}
      <div className="space-y-6 mb-12">
        {points.map((pt, idx) => {
          const Icon = pt.icon
          return (
            <div
              key={idx}
              className="p-6 rounded-2xl border border-[var(--border-light)] bg-[var(--bg-surface)] shadow-xs flex items-start gap-4 sm:gap-5"
            >
              <div className="w-10 h-10 rounded-xl bg-[var(--brand-teal-light)] text-[var(--brand-teal-text)] flex items-center justify-center shrink-0 mt-0.5">
                <Icon className="w-5 h-5" />
              </div>

              <div>
                <h2 className="font-display font-bold text-base sm:text-lg text-[var(--text-main)] mb-1">
                  {pt.title}
                </h2>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                  {pt.desc}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Summary Box & Return Action */}
      <div className="p-6 rounded-2xl border border-[var(--border-light)] bg-[var(--bg-surface)] text-xs text-[var(--text-muted)] space-y-3">
        <div className="flex items-center gap-2 font-semibold text-[var(--text-main)]">
          <CheckCircle2 className="w-4 h-4 text-[var(--brand-teal-text)]" />
          <span>Full Compliance with European GDPR (Regulation (EU) 2016/679)</span>
        </div>
        <p className="leading-relaxed">
          Because Loop processes zero personal identification data on external servers, there is no risk of cross-site profiling, identity theft, or data breach. Product passport data belongs to the public domain under European open data guidelines.
        </p>
      </div>
    </div>
  )
}
