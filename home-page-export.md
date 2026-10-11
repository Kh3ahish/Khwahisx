# Home Page Export & Reproduction Prompt

This document contains the exact source code for the home page of **Khwahish Kushwah's Portfolio** (`HomePage.tsx` and `Hero.tsx`), along with the exact system prompt to recreate this precise UI without any backend dependencies.

---

## 1. Reproduction Prompt (Copy & Paste into a New Chat)

```markdown
Build a sleek, high-end portfolio home page for a Product Designer & UX Engineer named "Khwahish Kushwah".
Requirements:
- NO backend, NO database, and NO user login required (static frontend application).
- Tech Stack: React (Vite), TypeScript, Tailwind CSS, Framer Motion.
- Design Direction: Minimalist, ultra-clean European editorial aesthetic with deep contrast, subtle blur backdrops, precise typography, and dark/light mode support.
- Sections to Include:
  1. Hero Section: Stunning interactive title with responsive layout, custom character/sticker integration, and dual primary CTAs ("Explore Work" with custom arrow icon, and "Let's Connect").
  2. Selected Work Section: Grid of featured case studies with polished hover interactions and high-fidelity mockups.
  3. Thinking Process Section: Scroll-driven interactive process showcase with smooth video scrub/progress interaction.
  4. Toolbox & Skills Section: Clean typography-driven showcase of design & engineering tools.
  5. Testimonials / Kind Words Section.
- Ensure WCAG 2.2 AA accessibility, smooth responsive breakpoints (mobile, tablet, desktop), and lightning-fast scroll performance.
```

---

## 2. Source Code: `src/pages/HomePage.tsx`

```tsx
import { useEffect } from "react"
import Hero from "../components/Hero"
import SelectedWork from "../components/SelectedWork"
import ThinkingProcess from "../components/ThinkingProcess"
import ToolboxSection from "../components/ToolboxSection"
import KindWords from "../components/KindWords"
import { updateMetaTags } from "../lib/seo"

interface HomePageProps {
  onRobotLoad?: () => void
  onOpenContact?: () => void
}

export default function HomePage({ onRobotLoad, onOpenContact }: HomePageProps) {
  useEffect(() => {
    const cleanup = updateMetaTags({
      title: "Khwahish Kushwah | Product Designer & UX Engineer — Berlin",
      description: "Khwahish Kushwah is a Berlin-based Product Designer and UX Engineer bridging behavioral research, accessible design systems (WCAG 2.2 AA), and frontend engineering in React & TypeScript.",
      canonical: "https://khwahix.com/",
      ogType: "profile",
      image: "https://khwahix.com/kk-black-logo.png",
      keywords: "Khwahish Kushwah, Product Designer, UX Engineer, UX Designer, UI/UX Designer, UX Researcher, Interaction Design, Design Systems, Frontend Development, React, TypeScript, Berlin UX Designer, Behavioral Research, Human-Computer Interaction, AI UX Design",
    })

    if (window.location.hash === "#work") {
      const el = document.getElementById("work")
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" })
        }, 150)
      }
    }

    return () => {
      cleanup()
    }
  }, [])

  return (
    <div className="bg-[var(--background)] text-[var(--foreground)]">
      <Hero onOpenContact={onOpenContact || (() => {})} onRobotLoad={onRobotLoad} />
      <SelectedWork />
      <ThinkingProcess />
      <ToolboxSection />
      <KindWords onOpenContact={onOpenContact || (() => {})} />
    </div>
  )
}
export { HomePage }
```

---

## 3. Source Code: `src/components/Hero.tsx`

```tsx
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useScroll, useTransform } from "framer-motion"
import { GooglyCharacters } from "./GooglyCharacters"
import { CursorStickerHero } from "./CursorStickerHero"
import { useLanguage } from "../context/LanguageContext"
import ScrollMorphHero, { HeroTileItem } from "./ui/ScrollMorphHero"
import { SharpLiquidButton } from "./SharpLiquidButton"
import { CreativeHeroName } from "./CreativeHeroName"

interface HeroProps {
  onOpenContact: () => void
  images?: (string | HeroTileItem)[]
  onRobotLoad?: () => void
}

interface HeroVisualProps {
  wrapperRef: React.RefObject<HTMLDivElement | null>
  onOpenContact: () => void
  entered: boolean
  onRobotLoad?: () => void
}

function HeroVisual({ wrapperRef, onOpenContact, entered, onRobotLoad }: HeroVisualProps) {
  const { t } = useLanguage()
  const navigate = useNavigate()
  const [showCharacters, setShowCharacters] = useState(() => {
    if (typeof window === "undefined") return false
    const isMobile = window.innerWidth < 768
    const isIpadPortrait = window.innerWidth >= 768 && window.innerWidth < 1024 && window.innerHeight > window.innerWidth
    return !isMobile && !isIpadPortrait
  })
  const base = "transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"

  useEffect(() => {
    const checkCharactersVisibility = () => {
      const isMobile = window.innerWidth < 768
      const isIpadPortrait = window.innerWidth >= 768 && window.innerWidth < 1024 && window.innerHeight > window.innerWidth
      setShowCharacters(!isMobile && !isIpadPortrait)
    }
    checkCharactersVisibility()
    window.addEventListener('resize', checkCharactersVisibility)
    return () => window.removeEventListener('resize', checkCharactersVisibility)
  }, [])

  return (
    <div
      className="relative w-full max-w-[700px] md:max-w-[850px] lg:max-w-[1020px] xl:max-w-[1140px] aspect-[1671/941] flex items-center justify-center mx-auto -translate-y-2 md:-translate-y-4 lg:-translate-y-6"
      ref={wrapperRef}
    >
      <div
        className="absolute top-[21%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-full max-w-[980px] px-3 flex justify-center pointer-events-auto"
      >
        <div
          className={`w-full flex justify-center ${base} ${
            entered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
          style={{ transitionDelay: "0.18s" }}
        >
          <CreativeHeroName
            entered={entered}
            fontSize="text-[5.2rem] sm:text-[5.8rem] md:text-[6.4rem] lg:text-[7.2rem]"
            gap="gap-x-6 sm:gap-x-10 md:gap-x-14"
            justify="justify-center"
          />
        </div>
      </div>

      {showCharacters && (
        <CursorStickerHero onLoad={onRobotLoad} />
      )}

      <div
        className="absolute top-[81%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-auto"
      >
        <div
          id="hero-cta-group"
          className={`relative flex items-center justify-center gap-4 scale-[1.08] origin-center ${base} ${
            entered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
          style={{ transitionDelay: "0.28s" }}
        >
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-12 rounded-full bg-white/85 dark:bg-white/45 blur-xl pointer-events-none -z-10" />

          <SharpLiquidButton
            label={t("hero.workBtn")}
            onClick={() => {
              navigate("/projects")
            }}
            icon={
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M1 1L9 9M9 9H3M9 9V3" />
              </svg>
            }
          />
          <button
            type="button"
            onClick={onOpenContact}
            className="inline-flex items-center justify-center gap-2 w-[168px] h-[48px] font-sans font-semibold text-xs tracking-wider uppercase text-zinc-900 bg-white border border-black/20 hover:border-black/50 shadow-[0_2px_8px_rgba(0,0,0,0.06)] active:scale-[0.98] transition-all duration-200 cursor-pointer rounded-full"
          >
            {t("hero.connectBtn")}
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M1 5H9M9 5L5 1M9 5L5 9" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
```
