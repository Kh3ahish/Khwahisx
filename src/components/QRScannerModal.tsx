import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { usePassport } from "../context/PassportContext"
import { X, QrCode, Camera, CheckCircle2, AlertCircle } from "lucide-react"

interface QRScannerModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function QRScannerModal({ isOpen, onClose }: QRScannerModalProps) {
  const navigate = useNavigate()
  const { t, product } = usePassport()
  const [scanning, setScanning] = useState(false)
  const [simulatedSuccess, setSimulatedSuccess] = useState(false)
  const [hasCameraError, setHasCameraError] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleSimulateScan = () => {
    setScanning(true)
    setHasCameraError(false)
    setTimeout(() => {
      setScanning(false)
      setSimulatedSuccess(true)
      setTimeout(() => {
        onClose()
        navigate("/passport")
      }, 700)
    }, 1200)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-labelledby="scanner-modal-title"
    >
      <div className="relative w-full max-w-md rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-light)] p-6 shadow-2xl transition-all">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[var(--border-light)]">
          <div className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-[var(--brand-teal-text)]" />
            <h2 id="scanner-modal-title" className="font-display font-bold text-lg text-[var(--text-main)]">
              Scan Product QR Code
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-subtle)] transition-colors"
            aria-label="Close scanner dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Viewfinder simulation box */}
        <div className="my-6">
          <div className="relative w-full aspect-square rounded-xl bg-[var(--bg-subtle)] border-2 border-dashed border-[var(--border-strong)] flex flex-col items-center justify-center overflow-hidden">
            {/* Viewfinder targeting brackets */}
            <div className="absolute inset-8 pointer-events-none border-2 border-[var(--brand-teal)]/40 rounded-lg">
              <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-[var(--brand-teal)]" />
              <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-[var(--brand-teal)]" />
              <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-[var(--brand-teal)]" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-[var(--brand-teal)]" />

              {/* Animated laser scan line */}
              {scanning && (
                <div className="w-full h-0.5 bg-[var(--brand-teal)] shadow-[0_0_8px_var(--brand-teal)] animate-bounce" />
              )}
            </div>

            {simulatedSuccess ? (
              <div className="flex flex-col items-center text-center p-4 animate-fade-in">
                <CheckCircle2 className="w-12 h-12 text-[var(--brand-teal)] mb-2" />
                <span className="font-semibold text-sm text-[var(--text-main)]">
                  Passport Detected!
                </span>
                <span className="text-xs text-[var(--text-muted)] mt-1">
                  Loading {product.name}...
                </span>
              </div>
            ) : scanning ? (
              <div className="flex flex-col items-center text-center p-4">
                <Camera className="w-10 h-10 text-[var(--brand-teal)] animate-pulse mb-2" />
                <span className="text-xs text-[var(--text-muted)]">
                  Focusing on QR code...
                </span>
              </div>
            ) : (
              <div className="flex flex-col items-center text-center p-6 text-xs text-[var(--text-muted)]">
                <QrCode className="w-12 h-12 text-[var(--text-faint)] mb-3" />
                <p className="max-w-[220px]">
                  Point camera at the QR code on the battery casing or test with demo passport.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="space-y-3">
          <button
            onClick={handleSimulateScan}
            disabled={scanning || simulatedSuccess}
            className="w-full py-3 px-4 rounded-xl bg-[var(--brand-teal)] text-white font-medium text-sm hover:opacity-95 transition-opacity flex items-center justify-center gap-2 shadow-sm"
          >
            <Camera className="w-4 h-4" />
            {scanning ? "Reading QR Data..." : "Scan Demo Battery QR Code"}
          </button>

          <button
            onClick={() => {
              onClose()
              navigate("/passport")
            }}
            className="w-full py-2.5 px-4 rounded-xl border border-[var(--border-light)] text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-subtle)] font-medium text-xs transition-colors"
          >
            Or Open Voltra Range 500 Directly
          </button>
        </div>

        {/* Privacy reassurance note */}
        <p className="text-[11px] text-[var(--text-faint)] text-center mt-4">
          Camera feed processed locally on-device. No images are saved or transmitted.
        </p>
      </div>
    </div>
  )
}
