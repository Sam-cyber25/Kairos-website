import { useEffect, useRef } from 'react';
import styles from './CustomCursor.module.css';

// ─── lerp-based bracket cursor ────────────────────────────────────────────────
// DOM: .cursor > (.bracketLeft "(", .dot, .bracketRight ")")
// Hover: brackets snap inward 90°, dot scales 1.35×
// Click: all elements scale 0.8, spring back on release
// Starts hidden, visible after first mousemove (initialised at viewport centre)

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Skip on touch / non-hover devices — CSS also handles this
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const LERP = 0.18;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let rafId: number;
    let hasMovedOnce = false;

    // ── rAF tick ──────────────────────────────────────────────────────────────
    const tick = () => {
      currentX += (targetX - currentX) * LERP;
      currentY += (targetY - currentY) * LERP;
      // Direct style.transform — never CSS custom properties (would trigger child recalc)
      cursor.style.transform = `translate(${currentX}px, ${currentY}px)`;
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    // ── pointer tracking ─────────────────────────────────────────────────────
    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!hasMovedOnce) {
        // Snap current position on first move so cursor doesn't drift in from centre
        currentX = e.clientX;
        currentY = e.clientY;
        cursor.style.opacity = '1';
        hasMovedOnce = true;
      }
    };

    // ── hover state ──────────────────────────────────────────────────────────
    const onEnter = () => cursor.classList.add(styles.hovering);
    const onLeave = () => cursor.classList.remove(styles.hovering);

    // ── click state ──────────────────────────────────────────────────────────
    const onDown  = () => cursor.classList.add(styles.clicking);
    const onUp    = () => cursor.classList.remove(styles.clicking);

    // ── interactive element binding ───────────────────────────────────────────
    const bindInteractives = () => {
      document.querySelectorAll<Element>('a, button, [role="button"], input, select, textarea').forEach(el => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);
    bindInteractives();

    // Re-bind after route changes inject new interactive elements
    const observer = new MutationObserver(bindInteractives);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={cursorRef} className={styles.cursor} aria-hidden="true">
      <span className={`${styles.bracket} ${styles.bracketLeft}`}>(</span>
      <span className={styles.dot} />
      <span className={`${styles.bracket} ${styles.bracketRight}`}>)</span>
    </div>
  );
}
