import { useEffect, useRef } from 'react';
import './CustomCursor.css';

// ─── KairosCursor ─────────────────────────────────────────────────────────────
// Resting: 7px circle. Hover: dot fades out, SVG bolt fades in.
// Click: bolt compresses then springs back. Lerp 0.14.
// Direct element.style.transform — no CSS vars (avoids child recalc at 60fps).

class KairosCursor {
  private el: HTMLDivElement;
  private x: number;
  private y: number;
  private tx: number;
  private ty: number;
  private raf: number | null = null;
  private fns: Array<() => void> = [];

  constructor(el: HTMLDivElement) {
    this.el = el;
    this.x  = window.innerWidth  / 2;
    this.y  = window.innerHeight / 2;
    this.tx = this.x;
    this.ty = this.y;
  }

  private on(t: EventTarget, type: string, fn: (e: Event) => void, opts?: AddEventListenerOptions) {
    t.addEventListener(type, fn, opts);
    this.fns.push(() => t.removeEventListener(type, fn));
  }

  init() {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    this.on(document, 'mousemove', (e: Event) => {
      const { clientX: cx, clientY: cy } = e as MouseEvent;
      this.tx = cx; this.ty = cy;
      // Snap to pointer on first appearance so it doesn't drift in from center
      if (!this.el.classList.contains('cursor--on')) { this.x = cx; this.y = cy; }
      this.el.classList.add('cursor--on');
      // Dark-theme detection: check element directly under cursor each frame
      const under = document.elementFromPoint(cx, cy);
      this.el.classList.toggle(
        'cursor--dark',
        !!(under as Element | null)?.closest('[data-cursor-theme="dark"]'),
      );
    }, { passive: true });

    this.on(document, 'mouseleave', () => this.el.classList.remove('cursor--on'));
    this.on(document, 'mouseenter', () => this.el.classList.add('cursor--on'));

    const INTERACTIVE = 'a, button, [role="button"], label, select, summary';
    this.on(document, 'mouseover', (e: Event) => {
      if ((e.target as Element | null)?.closest(INTERACTIVE))
        this.el.classList.add('cursor--hover');
    });
    this.on(document, 'mouseout', (e: Event) => {
      if ((e.target as Element | null)?.closest(INTERACTIVE))
        this.el.classList.remove('cursor--hover');
    });

    this.on(document, 'mousedown', () => this.el.classList.add('cursor--press'));
    this.on(document, 'mouseup',   () => this.el.classList.remove('cursor--press'));

    this.loop();
  }

  private loop() {
    this.x += (this.tx - this.x) * 0.14;
    this.y += (this.ty - this.y) * 0.14;
    this.el.style.transform = `translate(${this.x}px, ${this.y}px)`;
    this.raf = requestAnimationFrame(() => this.loop());
  }

  destroy() {
    if (this.raf !== null) cancelAnimationFrame(this.raf);
    this.fns.forEach(f => f());
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const c = new KairosCursor(ref.current);
    c.init();
    return () => c.destroy();
  }, []);

  return (
    <div ref={ref} className="cursor" aria-hidden="true">
      <div className="cursor__dot" />
      {/* Path: M 6,0 L 2,10 L 6,10 L 4,18 L 12,7 L 8,7 L 10,0 Z
          viewBox 0 0 14 20 gives ~1px padding on all sides               */}
      <svg
        className="cursor__bolt"
        viewBox="0 0 14 20"
        width="12"
        height="18"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M 6,0 L 2,10 L 6,10 L 4,18 L 12,7 L 8,7 L 10,0 Z" />
      </svg>
    </div>
  );
}
