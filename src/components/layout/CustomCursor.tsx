import { useEffect, useRef } from 'react';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Don't run on touch-only devices
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let rafId: number;
    const LERP = 0.18;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const tick = () => {
      currentX += (targetX - currentX) * LERP;
      currentY += (targetY - currentY) * LERP;
      cursor.style.transform = `translate(calc(${currentX}px - 50%), calc(${currentY}px - 50%))`;
      rafId = requestAnimationFrame(tick);
    };

    const onEnter = () => cursor.classList.add(styles.hover);
    const onLeave = () => cursor.classList.remove(styles.hover);

    const bindInteractives = () => {
      document.querySelectorAll<Element>('a, button, [role="button"]').forEach(el => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    };

    document.addEventListener('mousemove', onMove);
    rafId = requestAnimationFrame(tick);
    bindInteractives();

    // Re-bind when new interactive elements appear (e.g. after route change)
    const observer = new MutationObserver(bindInteractives);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  return <div ref={cursorRef} className={styles.cursor} aria-hidden="true" />;
}
