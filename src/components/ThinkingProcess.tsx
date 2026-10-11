import { useRef, useMemo, useEffect, useState } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useLanguage } from "../context/LanguageContext"
import { useTheme } from "../hooks/useTheme"

export default function ThinkingProcess() {
  const { t, language } = useLanguage()
  const { dark } = useTheme()
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRefLight = useRef<HTMLVideoElement>(null)
  const videoRefDark = useRef<HTMLVideoElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Fluid spring smoothing with responsive tuning for mobile touch inertia
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 32,
    restDelta: 0.001,
  })

  // 3 distinct magnetic plateaus matching Step 1, Step 2, and Step 3
  const magneticVideoProgress = useTransform(
    smoothProgress,
    [0, 0.18, 0.32, 0.52, 0.68, 0.88],
    [0, 0, 0.5, 0.5, 1.0, 1.0]
  )

  useEffect(() => {
    const videoLight = videoRefLight.current
    const videoDark = videoRefDark.current

    // Setup DOM-level iOS WebKit properties
    const setupVideo = (v: HTMLVideoElement | null) => {
      if (!v) return
      v.muted = true
      v.defaultMuted = true
      v.playsInline = true
      v.setAttribute("playsinline", "true")
      v.setAttribute("webkit-playsinline", "true")
      v.setAttribute("x5-playsinline", "true")
      try {
        v.load()
      } catch {}
    }

    setupVideo(videoLight)
    setupVideo(videoDark)

    // iOS Safari requires an initial play/pause to spin up the hardware AVPlayer decoder
    let primed = false
    const primeVideos = () => {
      if (primed) return
      primed = true
      const activeVideo = dark ? videoRefDark.current : videoRefLight.current
      if (activeVideo) {
        activeVideo.muted = true
        activeVideo.defaultMuted = true
        const playPromise = activeVideo.play()
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              activeVideo.pause()
            })
            .catch(() => {})
        }
      }
    }

    primeVideos()
    window.addEventListener("touchstart", primeVideos, { passive: true, once: true })
    window.addEventListener("scroll", primeVideos, { passive: true, once: true })

    // Silky Smooth Throttled Seeking Queue:
    // Throttles seeks to 30Hz max and skips redundant sub-frame steps to eliminate scroll lag
    let isSeeking = false
    let pendingTargetTime: number | null = null
    let rafId: number | null = null
    let lastSeekTimestamp = 0

    const performSeek = () => {
      const activeVideo = dark ? videoRefDark.current : videoRefLight.current
      if (!activeVideo || pendingTargetTime === null) return

      if (isSeeking || activeVideo.seeking) {
        return
      }

      // Throttle seeks to 30 seeks per second to protect CPU/GPU and prevent main thread lag
      const now = Date.now()
      if (now - lastSeekTimestamp < 33) {
        if (rafId === null) {
          rafId = requestAnimationFrame(() => {
            rafId = null
            performSeek()
          })
        }
        return
      }

      const target = pendingTargetTime
      
      // Skip seeking if the visual frame difference is less than 1 frame (~0.033 seconds)
      if (Math.abs(activeVideo.currentTime - target) < 0.033) {
        pendingTargetTime = null
        return
      }

      pendingTargetTime = null
      isSeeking = true
      lastSeekTimestamp = now

      if (!activeVideo.paused) {
        try {
          activeVideo.pause()
        } catch {}
      }

      try {
        activeVideo.currentTime = target
      } catch {
        isSeeking = false
      }
    }

    const onSeeked = () => {
      isSeeking = false
      if (pendingTargetTime !== null) {
        performSeek()
      }
    }

    if (videoLight) videoLight.addEventListener("seeked", onSeeked)
    if (videoDark) videoDark.addEventListener("seeked", onSeeked)

    const handleScrub = (mvp: number) => {
      if (typeof window !== "undefined" && window.innerWidth < 768) return // Bypass heavy video seeking on mobile for lightning fast touch scroll
      const activeVideo = dark ? videoRefDark.current : videoRefLight.current
      if (!activeVideo) return

      const dur =
        activeVideo.duration && !isNaN(activeVideo.duration) && activeVideo.duration > 0
          ? activeVideo.duration
          : 4.63

      const targetTime = Math.max(0, Math.min(dur - 0.04, mvp * (dur - 0.04)))
      pendingTargetTime = targetTime

      if (!isSeeking && !activeVideo.seeking) {
        if (rafId === null) {
          rafId = requestAnimationFrame(() => {
            rafId = null
            performSeek()
          })
        }
      }
    }

    // Set initial frame
    handleScrub(magneticVideoProgress.get() || 0)

    const unsubscribe = magneticVideoProgress.on("change", handleScrub)
    return () => {
      unsubscribe()
      if (rafId !== null) cancelAnimationFrame(rafId)
      if (videoLight) videoLight.removeEventListener("seeked", onSeeked)
      if (videoDark) videoDark.removeEventListener("seeked", onSeeked)
      window.removeEventListener("touchstart", primeVideos)
      window.removeEventListener("scroll", primeVideos)
    }
  }, [magneticVideoProgress, dark])

  const STEPS = useMemo(
    () => [
      {
        word: t("thinking.step1") || "OBSERVE",
        description: t("thinking.step1Desc") || "Deep user observation and behavioral research. Finding latent needs before writing a single line or drawing a frame.",
      },
      {
        word: t("thinking.step2") || "STRUCTURE",
        description: t("thinking.step2Desc") || "Information architecture, wireframes, and mental models. Defining relationships, hierarchies, and system boundaries.",
      },
      {
        word: t("thinking.step3") || "DESIGN",
        description: t("thinking.step3Desc") || "High-fidelity design systems, interaction patterns, and production-ready interfaces built for real humans.",
      },
    ],
    [t]
  )

  // Step opacities — Step 1 starts at 1 so it is never vanished
  const opacity1 = useTransform(smoothProgress, [0, 0.18, 0.28], [1, 1, 0])
  const opacity2 = useTransform(smoothProgress, [0.28, 0.35, 0.52, 0.62], [0, 1, 1, 0])
  const opacity3 = useTransform(smoothProgress, [0.62, 0.68, 0.85, 0.90], [0, 1, 1, 0])
  const opacityFinal = useTransform(smoothProgress, [0.90, 0.96], [0, 1])

  // Responsive device check with immediate synchronous initial value for mobile/iPhone
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false
    return window.innerWidth < 768
  })

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkDevice()
    window.addEventListener("resize", checkDevice)
    return () => window.removeEventListener("resize", checkDevice)
  }, [])

  // Video horizontal travel across stages (centered on mobile, alternating on desktop)
  const phoneX = useTransform(
    smoothProgress,
    [0, 0.18, 0.32, 0.52, 0.68, 0.88, 0.92],
    isMobile
      ? ["0%", "0%", "0%", "0%", "0%", "0%", "0%"]
      : language === "de"
      ? ["65%", "65%", "-135%", "-135%", "65%", "65%", "0%"]
      : ["45%", "45%", "-105%", "-105%", "45%", "45%", "0%"]
  )

  const phoneScale = useTransform(smoothProgress, [0.88, 0.95], [1, 0.85])
  const phoneOpacity = useTransform(smoothProgress, [0.88, 0.95], [1, 0])

  const textContainerBase = "absolute w-full px-6 flex flex-col items-start text-left pointer-events-none transition-all duration-300"
  const textContainerRight = "absolute w-full px-6 flex flex-col items-end text-right pointer-events-none transition-all duration-300"

  return (
    <section
      ref={containerRef}
      id="thinking"
      className={`relative bg-[var(--background)] text-[var(--foreground)] ${isMobile ? "h-[280vh]" : "h-[400vh]"} z-[200]`}
    >
      <div className="sticky top-0 h-screen h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16 w-full h-full relative flex items-center justify-center">

          {/* BACKGROUND SECTION HEADING */}
          <motion.div
            style={{ opacity: useTransform(smoothProgress, [0, 0.05], [1, 0.2]) }}
            className="absolute top-10 sm:top-20 left-6 md:left-10 lg:left-16"
          >
            <h2 className="font-display font-medium text-[clamp(1.5rem,5vw,5rem)] leading-[0.92] tracking-0 text-[var(--foreground)] opacity-40">
              {t("thinking.heading")}
            </h2>
          </motion.div>

          {/* STEP 1: OBSERVE (Left) */}
          <motion.div
            style={{ opacity: opacity1 }}
            className={`${textContainerBase} md:left-16 lg:left-24 md:max-w-xl top-[12%] md:top-auto h-full flex items-start justify-center`}
          >
            <h3 className="font-display font-medium text-[clamp(3rem,7vw,7.2rem)] leading-none uppercase text-[var(--foreground)] whitespace-nowrap -rotate-90 md:rotate-0 origin-left md:origin-center md:mb-6">
              {STEPS[0].word}
            </h3>
            <p className="hidden md:block font-sans text-base sm:text-lg md:text-xl text-[var(--muted-foreground)] leading-relaxed max-w-[200px] sm:max-w-sm">
              {STEPS[0].description}
            </p>
          </motion.div>

          {/* STEP 2: STRUCTURE (Right) */}
          <motion.div
            style={{ opacity: opacity2 }}
            className={`${textContainerRight} md:right-16 lg:right-24 md:max-w-2xl top-[12%] md:top-auto h-full flex items-end justify-center`}
          >
            <h3 className="font-display font-medium text-[clamp(3rem,7vw,7.2rem)] leading-none uppercase text-[var(--foreground)] whitespace-nowrap rotate-90 md:rotate-0 origin-right md:origin-center md:mb-6">
              {STEPS[1].word}
            </h3>
            <p className="hidden md:block font-sans text-base sm:text-lg md:text-xl text-[var(--muted-foreground)] leading-relaxed max-w-[200px] sm:max-w-sm">
              {STEPS[1].description}
            </p>
          </motion.div>

          {/* STEP 3: DESIGN (Left) */}
          <motion.div
            style={{ opacity: opacity3 }}
            className={`${textContainerBase} md:left-16 lg:left-24 md:max-w-xl top-[12%] md:top-auto h-full flex items-start justify-center`}
          >
            <h3 className="font-display font-medium text-[clamp(3rem,7vw,7.2rem)] leading-none uppercase text-[var(--foreground)] whitespace-nowrap -rotate-90 md:rotate-0 origin-left md:origin-center md:mb-6">
              {STEPS[2].word}
            </h3>
            <p className="hidden md:block font-sans text-base sm:text-lg md:text-xl text-[var(--muted-foreground)] leading-relaxed max-w-[200px] sm:max-w-sm">
              {STEPS[2].description}
            </p>
          </motion.div>

          {/* DIRECT RAW VIDEO (Ultra-minimal: no frame, no outline, no shadow) */}
          <motion.div
            style={{
              x: phoneX,
              scale: phoneScale,
              opacity: phoneOpacity,
              WebkitTransform: "translate3d(0,0,0)",
              transform: "translate3d(0,0,0)",
            }}
            className="relative z-10 w-[240px] sm:w-[280px] md:w-[320px] aspect-[440/929] overflow-hidden select-none [transform:translate3d(0,0,0)] [-webkit-transform:translate3d(0,0,0)] [-webkit-mask-image:-webkit-radial-gradient(white,black)]"
          >
            <video
              ref={videoRefLight}
              src="/light-mode-video.mp4"
              poster="/light-mode-poster.jpg"
              playsInline
              muted
              autoPlay={false}
              controls={false}
              disablePictureInPicture
              disableRemotePlayback
              preload="auto"
              style={{
                WebkitTransform: "translate3d(0,0,0)",
                transform: "translate3d(0,0,0)",
                WebkitBackfaceVisibility: "hidden",
                backfaceVisibility: "hidden",
              }}
              onLoadedMetadata={(e) => {
                const v = e.currentTarget
                v.muted = true
                v.defaultMuted = true
                const mvp = magneticVideoProgress.get() || 0
                const dur = v.duration && !isNaN(v.duration) && v.duration > 0 ? v.duration : 4.63
                try {
                  v.currentTime = Math.max(0, Math.min(dur - 0.05, mvp * (dur - 0.05)))
                } catch {}
              }}
              className={`w-full h-full object-cover will-change-transform ${!dark ? "block" : "hidden"}`}
              aria-label="Interactive mobile prototype"
            />
            <video
              ref={videoRefDark}
              src="/dark-mode-video.mp4"
              poster="/dark-mode-poster.jpg"
              playsInline
              muted
              autoPlay={false}
              controls={false}
              disablePictureInPicture
              disableRemotePlayback
              preload="auto"
              style={{
                WebkitTransform: "translate3d(0,0,0)",
                transform: "translate3d(0,0,0)",
                WebkitBackfaceVisibility: "hidden",
                backfaceVisibility: "hidden",
              }}
              onLoadedMetadata={(e) => {
                const v = e.currentTarget
                v.muted = true
                v.defaultMuted = true
                const mvp = magneticVideoProgress.get() || 0
                const dur = v.duration && !isNaN(v.duration) && v.duration > 0 ? v.duration : 4.63
                try {
                  v.currentTime = Math.max(0, Math.min(dur - 0.05, mvp * (dur - 0.05)))
                } catch {}
              }}
              className={`w-full h-full object-cover will-change-transform ${dark ? "block" : "hidden"}`}
              aria-label="Interactive mobile prototype"
            />
          </motion.div>

          {/* FINAL ROW MAP */}
          <motion.div
            style={{ opacity: opacityFinal }}
            className="absolute inset-x-6 md:inset-x-10 lg:inset-x-16 flex flex-col md:flex-row items-start justify-between gap-12 md:gap-8"
          >
            {STEPS.map((step, idx) => (
              <div key={idx} className="flex-1">
                <h4 className="font-display font-medium text-3xl sm:text-4xl md:text-5xl uppercase mb-4 md:mb-6 text-[var(--foreground)]">
                  {step.word}
                </h4>
                <p className="font-sans text-xs sm:text-sm md:text-base text-[var(--muted-foreground)] leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export { ThinkingProcess }
