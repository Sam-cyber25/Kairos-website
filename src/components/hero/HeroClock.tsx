import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import styles from './HeroClock.module.css';

// ─── clock engine ────────────────────────────────────────────────────────────
// Tracks accumulated degrees to prevent backward animation on hour/minute wrap.
// Applies via style.transform (NOT CSS vars) — no recalc on child elements.

class ClockEngine {
  private hourEl: SVGGElement;
  private minuteEl: SVGGElement;
  private lastHourDeg: number | null = null;
  private lastMinuteDeg: number | null = null;
  private hourTotal = 0;
  private minuteTotal = 0;
  private rafId: number | null = null;
  private timerId: ReturnType<typeof setTimeout> | null = null;

  constructor(hourEl: SVGGElement, minuteEl: SVGGElement) {
    this.hourEl = hourEl;
    this.minuteEl = minuteEl;
  }

  private getAngles() {
    const now = new Date();
    const h = now.getHours() % 12;
    const m = now.getMinutes();
    const s = now.getSeconds();
    return {
      hourDeg: h * 30 + m * 0.5,       // 360/12 = 30, smooth minute contribution
      minuteDeg: m * 6 + s * 0.1,       // 360/60 = 6, smooth second contribution
    };
  }

  private tick() {
    const { hourDeg, minuteDeg } = this.getAngles();

    if (this.lastHourDeg !== null) {
      let hd = hourDeg - this.lastHourDeg;
      if (hd < -180) hd += 360;
      this.hourTotal += hd;

      let md = minuteDeg - this.lastMinuteDeg!;
      if (md < -180) md += 360;
      this.minuteTotal += md;
    } else {
      this.hourTotal = hourDeg;
      this.minuteTotal = minuteDeg;
    }

    this.lastHourDeg = hourDeg;
    this.lastMinuteDeg = minuteDeg;

    // Direct style.transform — NOT CSS custom properties
    this.hourEl.style.transform = `rotate(${this.hourTotal}deg)`;
    this.minuteEl.style.transform = `rotate(${this.minuteTotal}deg)`;

    this.timerId = setTimeout(() => {
      this.rafId = requestAnimationFrame(() => this.tick());
    }, 1000);
  }

  start() { this.tick(); }

  destroy() {
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
    if (this.timerId !== null) clearTimeout(this.timerId);
  }

  /** Jump hands to current position instantly (for reduced-motion) */
  static snap(hourEl: SVGGElement, minuteEl: SVGGElement) {
    const now = new Date();
    const h = now.getHours() % 12;
    const m = now.getMinutes();
    const s = now.getSeconds();
    hourEl.style.transform = `rotate(${h * 30 + m * 0.5}deg)`;
    minuteEl.style.transform = `rotate(${m * 6 + s * 0.1}deg)`;
  }
}

// ─── component ───────────────────────────────────────────────────────────────

export default function HeroClock() {
  const hourRef = useRef<SVGGElement>(null);
  const minuteRef = useRef<SVGGElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const h = hourRef.current;
    const m = minuteRef.current;
    if (!h || !m) return;

    if (reducedMotion) {
      ClockEngine.snap(h, m);
      return;
    }

    const clock = new ClockEngine(h, m);
    clock.start();
    return () => clock.destroy();
  }, [reducedMotion]);

  return (
    <svg
      className={styles.clock}
      aria-hidden="true"
      focusable="false"
      viewBox="-350 -350 700 700"
    >
      {/* Ghost circle — barely visible stroke, no fill */}
      <circle
        cx="0"
        cy="0"
        r="340"
        fill="none"
        stroke="rgba(248, 240, 229, 0.055)"
        strokeWidth="1"
      />

      {/* Hour hand — shorter, slightly thicker */}
      <g ref={hourRef} className={styles.handGroup}>
        <line
          x1="0" y1="0"
          x2="0" y2="-160"
          stroke="rgba(248, 240, 229, 0.10)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>

      {/* Minute hand — longer, thinner */}
      <g ref={minuteRef} className={styles.handGroup}>
        <line
          x1="0" y1="0"
          x2="0" y2="-240"
          stroke="rgba(248, 240, 229, 0.07)"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
