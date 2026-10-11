interface ScoreGaugeProps {
  score: number
  scale?: number
  label?: string
  subtitle?: string
  size?: "sm" | "md" | "lg"
}

export default function ScoreGauge({
  score,
  scale = 100,
  label,
  subtitle,
  size = "lg",
}: ScoreGaugeProps) {
  const percentage = Math.min(100, Math.max(0, (score / scale) * 100))
  const radius = size === "lg" ? 54 : size === "md" ? 40 : 28
  const stroke = size === "lg" ? 8 : size === "md" ? 6 : 4
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference
  const viewBoxSize = (radius + stroke) * 2

  // Determine descriptive rating label (so information is never by color alone)
  const ratingText =
    score >= 80 ? "Grade A · Excellent" : score >= 65 ? "Grade B · Good" : "Grade C · Moderate"

  return (
    <div
      className="flex flex-col items-center text-center"
      role="meter"
      aria-label={`${label || "Sustainability Score"}: ${score} out of ${scale}. ${ratingText}`}
      aria-valuenow={score}
      aria-valuemin={0}
      aria-valuemax={scale}
    >
      <div className="relative inline-flex items-center justify-center">
        <svg
          width={viewBoxSize}
          height={viewBoxSize}
          viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
          className="transform -rotate-90"
          aria-hidden="true"
        >
          {/* Background track circle */}
          <circle
            cx={radius + stroke}
            cy={radius + stroke}
            r={radius}
            fill="transparent"
            stroke="currentColor"
            strokeWidth={stroke}
            className="text-[var(--border-light)]"
          />
          {/* Animated active progress arc */}
          <circle
            cx={radius + stroke}
            cy={radius + stroke}
            r={radius}
            fill="transparent"
            stroke="currentColor"
            strokeWidth={stroke}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="text-[var(--brand-teal)] transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center score readout - number explicitly shown as readable text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="font-display font-bold text-3xl sm:text-4xl text-[var(--text-main)] tracking-tight tabular-nums">
            {score}
          </span>
          <span className="text-xs text-[var(--text-faint)] font-medium">
            / {scale}
          </span>
        </div>
      </div>

      {label && (
        <span className="mt-3 text-sm font-semibold text-[var(--text-main)]">
          {label}
        </span>
      )}

      {/* Semantic textual grade ensuring accessibility */}
      <span className="mt-1 text-xs text-[var(--brand-teal-text)] font-medium">
        {ratingText}
      </span>

      {subtitle && (
        <span className="mt-1 text-xs text-[var(--text-muted)] max-w-[200px]">
          {subtitle}
        </span>
      )}
    </div>
  )
}
