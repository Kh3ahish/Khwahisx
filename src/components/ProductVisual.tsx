import { useState } from "react"
import { ShieldCheck, BatteryCharging, Zap, Info } from "lucide-react"

interface ProductVisualProps {
  id?: string
  name?: string
  voltage?: string
  energy?: string
}

export default function ProductVisual({
  id = "EU-DPP-2026-BAT-VOLTRA-500-8492",
  name = "Voltra Range 500",
  voltage = "36.0 V",
  energy = "496.8 Wh",
}: ProductVisualProps) {
  const [activeCallout, setActiveCallout] = useState<string | null>("cells")

  const callouts = {
    cells: {
      title: "Modular 18650 NMC Cell Pack",
      detail: "40 high-density cells arranged in 10S4P configuration. Mechanical busbars allow single-cell cluster replacement.",
    },
    casing: {
      title: "Low-Carbon Extruded Aluminum",
      detail: "Hydro-powered 62% recycled aluminum shell with longitudinal cooling fins. Fastened with 6× Torx T20 screws (no glue).",
    },
    bms: {
      title: "Smart Open Telemetry BMS",
      detail: "Dual thermal thermistors, over-current cutoff, and Bluetooth Low Energy diagnostic port.",
    },
    seal: {
      title: "IP67 Silicone Perimeter Gasket",
      detail: "Dust-tight and water submersible up to 1 meter for 30 minutes. Easily replaced during maintenance.",
    },
  }

  return (
    <div className="rounded-2xl border border-[var(--border-light)] bg-[var(--bg-surface)] p-6 sm:p-8 flex flex-col justify-between transition-colors shadow-xs">
      {/* Top Header Information */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-faint)]">
            Verified Hardware Model
          </span>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-[var(--text-main)] mt-0.5">
            {name}
          </h2>
          <div className="text-xs text-[var(--text-muted)] mt-1 flex flex-wrap items-center gap-2">
            <span>{voltage}</span>
            <span aria-hidden="true">·</span>
            <span>{energy}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-[11px]">{id}</span>
          </div>
        </div>

        {/* Regulatory Stamp */}
        <div className="hidden sm:flex flex-col items-end text-right text-[11px] text-[var(--text-faint)] shrink-0">
          <span className="inline-flex items-center gap-1 font-semibold text-[var(--brand-teal-text)]">
            <ShieldCheck className="w-3.5 h-3.5" /> CE · EN 50604-1
          </span>
          <span>UN 38.3 Certified</span>
        </div>
      </div>

      {/* Precision Vector SVG Graphic of Voltra Range 500 Battery */}
      <div className="relative w-full aspect-[16/9] sm:aspect-[2/1] my-4 flex items-center justify-center bg-[var(--bg-subtle)] rounded-xl border border-[var(--border-light)] overflow-hidden p-4">
        <svg
          viewBox="0 0 640 280"
          className="w-full h-full max-h-[240px] drop-shadow-md select-none"
          role="img"
          aria-label="Technical diagram of Voltra Range 500 battery showing anodized casing, fuel gauge, and modular connector"
        >
          <defs>
            {/* Gradients for realistic matte aluminum casing */}
            <linearGradient id="casingGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#243d34" />
              <stop offset="30%" stopColor="#1a312a" />
              <stop offset="85%" stopColor="#0e211b" />
              <stop offset="100%" stopColor="#081410" />
            </linearGradient>

            <linearGradient id="finGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#315549" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0e211b" stopOpacity="0.8" />
            </linearGradient>

            <linearGradient id="accentStrip" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#d97736" />
              <stop offset="100%" stopColor="#c05f24" />
            </linearGradient>
          </defs>

          {/* Shadow underneath */}
          <ellipse cx="320" cy="245" rx="260" ry="18" fill="rgba(0,0,0,0.18)" />

          {/* Main battery body extrusion */}
          <rect
            x="60"
            y="70"
            width="520"
            height="140"
            rx="16"
            fill="url(#casingGrad)"
            stroke="#3a6052"
            strokeWidth="2"
          />

          {/* Longitudinal cooling ribs / fins */}
          <line x1="80" y1="95" x2="520" y2="95" stroke="#2d4f43" strokeWidth="2" strokeDasharray="6 3" />
          <line x1="80" y1="120" x2="520" y2="120" stroke="#2d4f43" strokeWidth="2" strokeDasharray="6 3" />
          <line x1="80" y1="145" x2="520" y2="145" stroke="#2d4f43" strokeWidth="2" strokeDasharray="6 3" />
          <line x1="80" y1="170" x2="520" y2="170" stroke="#2d4f43" strokeWidth="2" strokeDasharray="6 3" />

          {/* Warm Accent Line symbolizing energy & circular loop */}
          <rect x="75" y="74" width="490" height="4" rx="2" fill="url(#accentStrip)" />

          {/* Left Handle & Locking Mechanism */}
          <path
            d="M 60 90 L 40 100 L 40 180 L 60 190 Z"
            fill="#12251f"
            stroke="#29483d"
            strokeWidth="1.5"
          />
          <circle cx="48" cy="140" r="6" fill="#081410" stroke="#416b5c" strokeWidth="1.5" />

          {/* Right Power Connector Socket */}
          <path
            d="M 580 95 L 600 105 L 600 175 L 580 185 Z"
            fill="#12251f"
            stroke="#29483d"
            strokeWidth="1.5"
          />
          <circle cx="590" cy="130" r="3.5" fill="#d97736" />
          <circle cx="590" cy="145" r="3.5" fill="#d97736" />

          {/* Integrated 5-bar LED Battery Level Indicator */}
          <g transform="translate(100, 185)">
            <rect x="0" y="0" width="80" height="12" rx="3" fill="#081410" stroke="#29483d" strokeWidth="1" />
            <rect x="4" y="2.5" width="12" height="7" rx="1.5" fill="#3be2bd" />
            <rect x="18" y="2.5" width="12" height="7" rx="1.5" fill="#3be2bd" />
            <rect x="32" y="2.5" width="12" height="7" rx="1.5" fill="#3be2bd" />
            <rect x="46" y="2.5" width="12" height="7" rx="1.5" fill="#3be2bd" />
            <rect x="60" y="2.5" width="12" height="7" rx="1.5" fill="#1b4237" />
          </g>

          {/* Regulatory Laser Etching Badge */}
          <g transform="translate(420, 168)">
            <rect x="0" y="0" width="140" height="32" rx="4" fill="#0a1813" stroke="#1f3b31" strokeWidth="1" />
            <text x="8" y="14" fill="#88a89c" fontSize="9" fontFamily="monospace" fontWeight="bold">VOLTRA 500 · 36V</text>
            <text x="8" y="25" fill="#5a7a6e" fontSize="7" fontFamily="monospace">EU-DPP-2026-BAT · IP67</text>
          </g>

          {/* Brand Wordmark on battery */}
          <text
            x="100"
            y="135"
            fill="#f0f7f4"
            fontSize="22"
            fontFamily="'IBM Plex Sans', sans-serif"
            fontWeight="bold"
            letterSpacing="1"
          >
            VOLTRA
          </text>
          <text
            x="205"
            y="135"
            fill="#d97736"
            fontSize="14"
            fontFamily="'IBM Plex Sans', sans-serif"
            fontWeight="600"
          >
            RANGE 500
          </text>

          {/* Interactive Inspection Pins */}
          <g className="cursor-pointer" onClick={() => setActiveCallout("cells")}>
            <circle cx="280" cy="115" r="9" fill="#0d3b32" stroke="#ffffff" strokeWidth="2" />
            <text x="277" y="119" fill="#ffffff" fontSize="11" fontWeight="bold">1</text>
          </g>

          <g className="cursor-pointer" onClick={() => setActiveCallout("casing")}>
            <circle cx="360" cy="85" r="9" fill="#0d3b32" stroke="#ffffff" strokeWidth="2" />
            <text x="357" y="89" fill="#ffffff" fontSize="11" fontWeight="bold">2</text>
          </g>

          <g className="cursor-pointer" onClick={() => setActiveCallout("bms")}>
            <circle cx="490" cy="130" r="9" fill="#0d3b32" stroke="#ffffff" strokeWidth="2" />
            <text x="487" y="134" fill="#ffffff" fontSize="11" fontWeight="bold">3</text>
          </g>
        </svg>
      </div>

      {/* Interactive Component Callouts Tabs */}
      <div className="mt-4 pt-4 border-t border-[var(--border-light)]">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <button
            onClick={() => setActiveCallout("cells")}
            type="button"
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeCallout === "cells"
                ? "bg-[var(--brand-teal)] text-white"
                : "bg-[var(--bg-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)]"
            }`}
          >
            1. Cells (10S4P)
          </button>
          <button
            onClick={() => setActiveCallout("casing")}
            type="button"
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeCallout === "casing"
                ? "bg-[var(--brand-teal)] text-white"
                : "bg-[var(--bg-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)]"
            }`}
          >
            2. Recycled Casing
          </button>
          <button
            onClick={() => setActiveCallout("bms")}
            type="button"
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeCallout === "bms"
                ? "bg-[var(--brand-teal)] text-white"
                : "bg-[var(--bg-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)]"
            }`}
          >
            3. Smart BMS
          </button>
        </div>

        {activeCallout && (
          <div className="bg-[var(--bg-subtle)] rounded-xl p-3.5 text-xs">
            <span className="font-semibold text-[var(--text-main)] block mb-1">
              {callouts[activeCallout as keyof typeof callouts].title}
            </span>
            <p className="text-[var(--text-muted)] leading-relaxed">
              {callouts[activeCallout as keyof typeof callouts].detail}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
