import { Link } from "react-router-dom"
import { AlertTriangle, RotateCcw } from "lucide-react"

export default function ErrorPage() {
  return (
    <div className="w-full max-w-lg mx-auto px-4 py-20 text-center">
      <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto mb-6">
        <AlertTriangle className="w-8 h-8" />
      </div>

      <h1 className="text-2xl font-bold font-display text-[var(--text-main)] mb-2">
        Something went wrong
      </h1>

      <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6">
        An error occurred while rendering this passport page. Your data is safe.
      </p>

      <div className="flex items-center justify-center gap-3">
        <button
          onClick={() => window.location.reload()}
          type="button"
          className="px-5 py-2.5 rounded-xl bg-[var(--brand-teal)] text-white text-sm font-semibold hover:opacity-95 transition-opacity inline-flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Reload Application
        </button>

        <Link
          to="/"
          className="px-5 py-2.5 rounded-xl border border-[var(--border-light)] bg-[var(--bg-surface)] text-[var(--text-main)] text-sm font-medium hover:bg-[var(--bg-subtle)]"
        >
          Return to Home
        </Link>
      </div>
    </div>
  )
}
