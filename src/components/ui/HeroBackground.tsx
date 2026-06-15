"use client"
import { GrainGradient } from
  "@paper-design/shaders-react"
import {
  useEffect, useRef,
  useState, memo
} from "react"

const HeroBackground = memo(
  function HeroBackground() {

  const [isVisible, setIsVisible] =
    useState(true)
  const [isTabActive, setIsTabActive] =
    useState(true)
  const [isMobile, setIsMobile] =
    useState(false)
  const containerRef =
    useRef<HTMLDivElement>(null)

  // Mobile detection
  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    check()
    window.addEventListener(
      'resize', check, { passive: true }
    )
    return () =>
      window.removeEventListener('resize', check)
  }, [])

  // OPTIMIZATION 1:
  // Unmount WebGL when hero scrolls out
  // of viewport — full GPU relief
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0 }
    )
    if (containerRef.current) {
      observer.observe(containerRef.current)
    }
    return () => observer.disconnect()
  }, [])

  // OPTIMIZATION 2:
  // Pause when user switches tabs
  useEffect(() => {
    const handle = () => {
      setIsTabActive(!document.hidden)
    }
    document.addEventListener(
      'visibilitychange', handle
    )
    return () => document.removeEventListener(
      'visibilitychange', handle
    )
  }, [])

  // OPTIMIZATION 3:
  // Reduced motion — no animation at all
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

  // Mobile & reduced motion:
  // Pure CSS gradient — zero WebGL
  if (isMobile || prefersReduced) {
    return (
      <div
        ref={containerRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          background: `
            radial-gradient(
              ellipse 70% 70% at 85% 10%,
              rgba(140,163,153,0.45) 0%,
              rgba(62,96,82,0.2) 35%,
              transparent 65%
            ),
            linear-gradient(
              155deg,
              #0A1510 0%,
              #1C352D 50%,
              #0D1A14 100%
            )
          `
        }}
      />
    )
  }

  const shouldRender =
    isVisible && isTabActive

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        // OPTIMIZATION 4:
        // Force own GPU compositing layer
        transform: 'translateZ(0)',
        willChange: 'transform',
      }}
    >
      {/* OPTIMIZATION 5:
          Fully unmount WebGL when not
          visible — not just pause */}
      {shouldRender && (
        <GrainGradient
          style={{
            width: "100%",
            height: "100%"
          }}
          colorBack="hsl(153, 32%, 8%)"
          colors={[
            "hsl(153, 32%, 14%)",
            "hsl(152, 18%, 38%)",
            "hsl(153, 32%, 10%)",
          ]}
          softness={0.88}
          intensity={0.28}
          noise={0.08}
          shape="corners"
          offsetX={0}
          offsetY={0}
          scale={1}
          rotation={0}
          speed={0.05}
        />
      )}
    </div>
  )
})

export { HeroBackground }
