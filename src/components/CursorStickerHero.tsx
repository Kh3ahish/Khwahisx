import { useRef, useState, useEffect, useCallback } from "react"

interface PoseDefinition {
  id: string
  webp: string
  png: string
  vector: [number, number]
}

const POSES: PoseDefinition[] = [
  { id: "0-down", webp: "/cursor-assets/0 down.webp", png: "/cursor-assets/0 down.png", vector: [0.0, 1.0] },
  { id: "30-down-right", webp: "/cursor-assets/30 down right.webp", png: "/cursor-assets/30 down right.png", vector: [0.8, 0.6] },
  { id: "80-up-right", webp: "/cursor-assets/80 up right.webp", png: "/cursor-assets/80 up right.png", vector: [0.8, -0.6] },
  { id: "90-up", webp: "/cursor-assets/90 up.webp", png: "/cursor-assets/90 up.png", vector: [0.0, -1.0] },
  { id: "120-up-left", webp: "/cursor-assets/120 up left.webp", png: "/cursor-assets/120 up left.png", vector: [-0.8, -0.6] },
  { id: "150-down-left", webp: "/cursor-assets/170 down left.webp", png: "/cursor-assets/170 down left.png", vector: [-0.8, 0.6] },
  { id: "170-down-left", webp: "/cursor-assets/150 down left.webp", png: "/cursor-assets/150 down left.png", vector: [-1.0, 0.0] },
]

// Eager image cache pool to warm up browser network cache on module evaluation for PC
const imagePool: Map<string, HTMLImageElement> = new Map()
if (typeof window !== "undefined" && window.innerWidth >= 768) {
  POSES.forEach((pose, i) => {
    const img = new Image()
    if (i === 0) (img as any).fetchPriority = "high"
    img.decoding = "async"
    img.src = pose.webp
    imagePool.set(pose.webp, img)
  })
}

interface CursorStickerHeroProps {
  onLoad?: () => void
}

export function CursorStickerHero({ onLoad }: CursorStickerHeroProps) {
  const stageRef = useRef<HTMLDivElement>(null)
  const [currentPoseIndex, setCurrentPoseIndex] = useState(0)
  const currentPoseRef = useRef(0)
  const loadedRef = useRef<Set<number>>(new Set())
  const [, setLoadedTick] = useState(0)
  const hasTriggeredLoadRef = useRef(false)

  const triggerReady = useCallback(() => {
    if (!hasTriggeredLoadRef.current) {
      hasTriggeredLoadRef.current = true
      onLoad?.()
    }
  }, [onLoad])

  // Track loaded poses
  const markPoseLoaded = useCallback((idx: number) => {
    if (!loadedRef.current.has(idx)) {
      loadedRef.current.add(idx)
      setLoadedTick((t) => t + 1)
    }
    // Verify primary resting pose (pose 0) is ready
    if (loadedRef.current.has(0)) {
      if (loadedRef.current.size === POSES.length) {
        triggerReady()
      } else {
        // Fast grace window so other poses can load, then lift loading screen
        setTimeout(triggerReady, 150)
      }
    }
  }, [triggerReady])

  // Fast preloading and decode verification
  useEffect(() => {
    POSES.forEach((pose, i) => {
      let img = imagePool.get(pose.webp)
      if (!img) {
        img = new Image()
        if (i === 0) (img as any).fetchPriority = "high"
        img.decoding = "async"
        img.src = pose.webp
        imagePool.set(pose.webp, img)
      }

      if (img.complete && img.naturalWidth > 0) {
        markPoseLoaded(i)
      } else {
        img.onload = () => markPoseLoaded(i)
        img.onerror = () => {
          const fallback = new Image()
          fallback.src = pose.png
          fallback.onload = () => markPoseLoaded(i)
          fallback.onerror = () => markPoseLoaded(i)
        }
      }
    })

    // Safety fallback: ensure triggerReady fires so it never hangs or slows down
    const safetyTimer = setTimeout(() => {
      triggerReady()
    }, 700)

    return () => clearTimeout(safetyTimer)
  }, [markPoseLoaded, triggerReady])

  // Resilient cursor tracking with RAF & angle hysteresis
  useEffect(() => {
    let rafId: number | null = null
    let latestCoords: { x: number; y: number } | null = null
    let cachedRect: DOMRect | null = null

    const updateRect = () => {
      if (stageRef.current) {
        cachedRect = stageRef.current.getBoundingClientRect()
      }
    }

    updateRect()
    window.addEventListener("resize", updateRect, { passive: true })
    window.addEventListener("scroll", updateRect, { passive: true })

    const processCursor = () => {
      rafId = null
      if (!latestCoords || !stageRef.current) return

      if (!cachedRect || cachedRect.width === 0) {
        cachedRect = stageRef.current.getBoundingClientRect()
      }

      const rect = cachedRect
      if (!rect || rect.width === 0 || rect.height === 0) return

      const x = ((latestCoords.x - rect.left) / rect.width) * 2 - 1
      const y = ((latestCoords.y - rect.top) / rect.height) * 2 - 1
      const len = Math.hypot(x, y)

      // Ultra-sensitive micro dead-zone (0.005) so it reacts instantly to 1mm cursor movement
      if (len < 0.005) {
        if (currentPoseRef.current !== 0) {
          currentPoseRef.current = 0
          setCurrentPoseIndex(0)
        }
        return
      }

      const dx = x / len
      const dy = y / len

      let bestIndex = 0
      let bestScore = -Infinity

      for (let i = 0; i < POSES.length; i++) {
        const [vx, vy] = POSES[i].vector
        // Pure dot product score matching the exact pose degree vectors with zero hysteresis
        const score = dx * vx + dy * vy
        if (score > bestScore) {
          bestScore = score
          bestIndex = i
        }
      }

      // Only switch if index changed AND image is already loaded
      if (bestIndex !== currentPoseRef.current && loadedRef.current.has(bestIndex)) {
        currentPoseRef.current = bestIndex
        setCurrentPoseIndex(bestIndex)
      }
    }

    const onPointerMove = (e: MouseEvent | PointerEvent) => {
      latestCoords = { x: e.clientX, y: e.clientY }
      if (rafId === null) {
        rafId = requestAnimationFrame(processCursor)
      }
    }

    const onPointerLeave = () => {
      latestCoords = null
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
        rafId = null
      }
      currentPoseRef.current = 0
      setCurrentPoseIndex(0)
    }

    window.addEventListener("pointermove", onPointerMove, { passive: true })
    window.addEventListener("mousemove", onPointerMove, { passive: true })
    window.addEventListener("pointerleave", onPointerLeave, { passive: true })
    document.addEventListener("mouseleave", onPointerLeave, { passive: true })

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId)
      window.removeEventListener("resize", updateRect)
      window.removeEventListener("scroll", updateRect)
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("mousemove", onPointerMove)
      window.removeEventListener("pointerleave", onPointerLeave)
      document.removeEventListener("mouseleave", onPointerLeave)
    }
  }, [])

  return (
    <div
      ref={stageRef}
      className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center pointer-events-none z-30"
    >
      {/* SVG Grain filter used on artwork */}
      <svg width="0" height="0" aria-hidden="true" style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <filter
            id="grain-hero"
            x="-5%"
            y="-5%"
            width="110%"
            height="110%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.95"
              numOctaves="1"
              seed="17"
              stitchTiles="stitch"
              result="noise"
            />
            <feColorMatrix in="noise" type="saturate" values="0" result="grayNoise" />
            <feComponentTransfer in="grayNoise" result="dots">
              <feFuncR type="discrete" tableValues="0 0 0 0.07 0.12 0.17 0.22 0.28" />
              <feFuncG type="discrete" tableValues="0 0 0 0.07 0.12 0.17 0.22 0.28" />
              <feFuncB type="discrete" tableValues="0 0 0 0.07 0.12 0.17 0.22 0.28" />
              <feFuncA type="discrete" tableValues="0 0.02 0.04 0.07 0.10 0.13 0.16 0.20" />
            </feComponentTransfer>
            <feComposite in="dots" in2="SourceGraphic" operator="in" result="clippedDots" />
            <feBlend in="SourceGraphic" in2="clippedDots" mode="multiply" />
          </filter>
        </defs>
      </svg>

      <style>{`
        .cursor-stickers-layer {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: fill;
          object-position: center;
          pointer-events: none;
          display: block;
          filter: url(#grain-hero);
          transform: translateZ(0);
          backface-visibility: hidden;
        }

        .cursor-people-dots {
          position: absolute;
          inset: 0;
          z-index: 4;
          width: 100%;
          height: 100%;
          pointer-events: none;
          background-image: 
            radial-gradient(circle, rgba(0, 0, 0, 0.28) 1.25px, transparent 1.25px),
            radial-gradient(circle, rgba(0, 0, 0, 0.28) 1.25px, transparent 1.25px);
          background-size: 8px 8px;
          background-position: 0 0, 4px 4px;
          mix-blend-mode: multiply;
        }

        .dark .cursor-people-dots {
          background-image: 
            radial-gradient(circle, rgba(0, 0, 0, 0.45) 1.25px, transparent 1.25px),
            radial-gradient(circle, rgba(0, 0, 0, 0.45) 1.25px, transparent 1.25px);
          mix-blend-mode: multiply;
        }
      `}</style>

      {/* 
        Instant discrete sprite swap:
        Each pose container bundles its preloaded image AND matching static halftone mask.
        Zero opacity cross-fading, which eliminates semi-transparent ghosting and strobing.
      */}
      {POSES.map((pose, index) => {
        const isActive = index === currentPoseIndex
        const maskUrl = encodeURI(pose.webp)
        return (
          <div
            key={pose.id}
            aria-hidden={!isActive}
            className="absolute inset-0 w-full h-full pointer-events-none select-none"
            style={{
              visibility: isActive ? "visible" : "hidden",
              zIndex: isActive ? 2 : 1,
            }}
          >
            <picture>
              <source type="image/webp" srcSet={pose.webp} />
              <img
                src={pose.png}
                alt=""
                className="cursor-stickers-layer"
                draggable={false}
                loading="eager"
                onLoad={() => markPoseLoaded(index)}
              />
            </picture>

            <div
              aria-hidden="true"
              className="cursor-people-dots"
              style={{
                WebkitMaskImage: `url("${maskUrl}")`,
                maskImage: `url("${maskUrl}")`,
                WebkitMaskSize: "100% 100%",
                maskSize: "100% 100%",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
                maskPosition: "center",
              }}
            />
          </div>
        )
      })}
    </div>
  )
}
