import { useState } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { PassportProvider } from "./context/PassportContext"
import ErrorBoundary from "./components/ErrorBoundary"
import SkipLink from "./components/SkipLink"
import Header from "./components/Header"
import BottomNav from "./components/BottomNav"
import Footer from "./components/Footer"
import QRScannerModal from "./components/QRScannerModal"
import ScrollToTop from "./components/ScrollToTop"

// Pages
import HomePage from "./pages/HomePage"
import PassportOverviewPage from "./pages/PassportOverviewPage"
import MaterialsPage from "./pages/MaterialsPage"
import RepairPage from "./pages/RepairPage"
import RecyclingPage from "./pages/RecyclingPage"
import SettingsPage from "./pages/SettingsPage"
import PrivacyPage from "./pages/PrivacyPage"
import NotFoundPage from "./pages/NotFoundPage"

function AppContent() {
  const [scannerOpen, setScannerOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-page)] text-[var(--text-main)] transition-colors antialiased selection:bg-[var(--brand-teal-light)] selection:text-[var(--brand-teal-text)]">
      <SkipLink />
      <ScrollToTop />

      {/* Top Navigation Bar */}
      <Header onOpenScanner={() => setScannerOpen(true)} />

      {/* Main Content Area */}
      <main id="main-content" className="flex-1 w-full focus:outline-none" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<HomePage onOpenScanner={() => setScannerOpen(true)} />} />
          <Route path="/passport" element={<PassportOverviewPage />} />
          <Route path="/passport/materials" element={<MaterialsPage />} />
          <Route path="/passport/repair" element={<RepairPage />} />
          <Route path="/passport/recycling" element={<RecyclingPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Site Footer */}
      <Footer />

      {/* Mobile-Only Bottom Navigation Bar (<640px) */}
      <BottomNav />

      {/* Interactive QR Code Scanner Modal */}
      <QRScannerModal isOpen={scannerOpen} onClose={() => setScannerOpen(false)} />
    </div>
  )
}

export default function App() {
  return (
    <ErrorBoundary>
      <PassportProvider>
        <AppContent />
      </PassportProvider>
    </ErrorBoundary>
  )
}
