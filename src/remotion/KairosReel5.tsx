import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  interpolate,
  Easing,
  staticFile,
  Img,
  Audio,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Cardo";
import { loadFont as loadMontserrat } from "@remotion/google-fonts/Montserrat";

const { fontFamily: cardo } = loadFont("normal", { weights: ["400", "700"] });
loadFont("italic", { weights: ["400"] });
const { fontFamily: montserrat } = loadMontserrat("normal", {
  weights: ["300", "400", "500", "600", "700"],
});

const BLACK = "#080C0A";
const GREEN = "#1C352D";
const CREAM = "#F8F0E5";
const SAGE  = "#8CA399";
const TEAL  = "#1A7A8A";
const AMBER = "#E8A835";
const WHITE = "#FAFAF8";

// Easing presets
const entry  = Easing.bezier(0.23, 1, 0.32, 1);
const trans  = Easing.bezier(0.77, 0, 0.175, 1);
const eOut   = Easing.out(Easing.ease);

// Clamped interpolate shorthand
const ci = (
  f: number,
  i: [number, number],
  o: [number, number],
  easing?: (t: number) => number
) =>
  interpolate(f, i, o, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing,
  });

// Scene start frames (30 fps)
const S1 = 0;
const S2 = 265;
const S3 = 565;
const S4 = 865;
const S5 = 1165;
const S6 = 1405;
const S7 = 1615;

// ─── Film Grain ───────────────────────────────
const FilmGrain: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ pointerEvents: "none", zIndex: 999 }}>
      <svg
        style={{ position: "absolute", width: "100%", height: "100%", opacity: 0.025 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id={`g${f}`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" seed={f} stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
        <rect width="100%" height="100%" filter={`url(#g${f})`} />
      </svg>
    </AbsoluteFill>
  );
};

// ─── Scene Timer — "00 / 60" bottom-left ──────
const SceneTimer: React.FC = () => {
  const frame = useCurrentFrame();
  const sec = Math.floor(frame / 30);
  const onLight = frame >= S3 && frame < S5 || frame >= S7;
  return (
    <div
      style={{
        position: "absolute",
        bottom: 40,
        left: 40,
        fontFamily: "Courier New, monospace",
        fontSize: 16,
        color: onLight ? GREEN : WHITE,
        opacity: 0.2,
        zIndex: 50,
        letterSpacing: "0.05em",
      }}
    >
      {String(sec).padStart(2, "0")} / 60
    </div>
  );
};

// ─── Persistent Live Dot (top-right from frame 200) ─
const LiveDot: React.FC = () => {
  const frame = useCurrentFrame();
  const op    = ci(frame, [200, 210], [0, 1]);
  const phase = (frame - 200) % 45;
  const scale = interpolate(phase, [0, 22, 44], [1, 1.5, 1]);
  if (frame < 200) return null;
  return (
    <div
      style={{
        position: "absolute",
        top: 40,
        right: 40,
        width: 14,
        height: 14,
        borderRadius: "50%",
        background: TEAL,
        opacity: op,
        transform: `scale(${scale})`,
        zIndex: 60,
      }}
    />
  );
};

// ─────────────────────────────────────────────
// SCENE 1 — HOOK  (frames 0–270)
// ─────────────────────────────────────────────
const Scene1: React.FC<{ frame: number }> = ({ frame }) => {
  const f = frame - S1;

  const lineW  = ci(f, [30, 50],  [0, 800],  entry);
  const labelOp = ci(f, [50, 65], [0, 0.6]);
  const l1Op   = ci(f, [70, 90],  [0, 1]);
  const l1Y    = ci(f, [70, 90],  [-30, 0],  entry);
  const l2Op   = ci(f, [85, 105], [0, 1]);
  const l2Y    = ci(f, [85, 105], [-30, 0],  entry);
  // Fade slightly before transition
  const exitOp = ci(f, [240, 270], [1, 0.6]);

  return (
    <AbsoluteFill style={{ background: BLACK }}>
      <div style={{ position: "absolute", inset: 0, opacity: exitOp }}>
        {/* Horizontal rule from center */}
        <div style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: lineW,
          height: 1.5,
          background: WHITE,
        }} />

        {/* "Every 60 seconds" above line */}
        <div style={{
          position: "absolute",
          left: 0, right: 0,
          top: "calc(50% - 64px)",
          textAlign: "center",
          fontFamily: montserrat,
          fontWeight: 400,
          fontSize: 36,
          color: WHITE,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          opacity: labelOp,
        }}>
          Every 60 seconds
        </div>

        {/* "the internet" */}
        <div style={{
          position: "absolute",
          left: 0, right: 0,
          top: "calc(50% + 36px)",
          textAlign: "center",
          fontFamily: cardo,
          fontWeight: 700,
          fontSize: 118,
          color: WHITE,
          letterSpacing: "-0.02em",
          lineHeight: 1.1,
          opacity: l1Op,
          transform: `translateY(${l1Y}px)`,
        }}>
          the internet
        </div>

        {/* "doesn't sleep." */}
        <div style={{
          position: "absolute",
          left: 0, right: 0,
          top: "calc(50% + 162px)",
          textAlign: "center",
          fontFamily: cardo,
          fontWeight: 700,
          fontSize: 118,
          color: WHITE,
          letterSpacing: "-0.02em",
          lineHeight: 1.1,
          opacity: l2Op,
          transform: `translateY(${l2Y}px)`,
        }}>
          doesn't sleep.
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────
// SCENE 2 — STAT 1 · Google  (frames 265–570)
// ─────────────────────────────────────────────
const Scene2: React.FC<{ frame: number }> = ({ frame }) => {
  const f = frame - S2;

  // TEAL wipe from left covers BLACK (f 0–12)
  const wipeX  = ci(f, [0, 12], [-1080, 0], trans);

  const labelOp = ci(f, [20, 38], [0, 1]);
  const labelY  = ci(f, [20, 38], [-20, 0], entry);

  // Counter 0 → 6 000 000  (f 40–190 = global 305–455)
  const count   = Math.floor(ci(f, [40, 190], [0, 6_000_000], eOut));
  const ctrOp   = ci(f, [40, 55],  [0, 1]);
  const subOp   = ci(f, [45, 65],  [0, 0.8]);

  // White flash at f≈192 (global ~457), peaks then fades
  const flashRise = ci(f, [190, 192], [0, 0.12]);
  const flashFall = ci(f, [192, 198], [0, 0.12]);
  const flash     = Math.max(0, flashRise - flashFall);

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: TEAL }} />

      {/* Incoming wipe covers previous scene */}
      <div style={{
        position: "absolute", inset: 0,
        background: BLACK,
        transform: `translateX(${wipeX}px)`,
      }} />

      {/* Flash overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: WHITE,
        opacity: flash,
        pointerEvents: "none",
      }} />

      {/* Label */}
      <div style={{
        position: "absolute", left: 0, right: 0, top: 300,
        textAlign: "center",
        fontFamily: montserrat, fontWeight: 600, fontSize: 28,
        color: WHITE, letterSpacing: "0.25em",
        opacity: labelOp, transform: `translateY(${labelY}px)`,
      }}>
        GOOGLE SEARCHES
      </div>

      {/* Counter */}
      <div style={{
        position: "absolute", left: 0, right: 0, top: 660,
        textAlign: "center",
        fontFamily: cardo, fontWeight: 700, fontSize: 156,
        color: WHITE, letterSpacing: "-0.03em",
        opacity: ctrOp, lineHeight: 1,
      }}>
        {count.toLocaleString("en-IN")}
      </div>

      {/* Sub-label */}
      <div style={{
        position: "absolute", left: 0, right: 0, top: 840,
        textAlign: "center",
        fontFamily: montserrat, fontWeight: 300, fontSize: 52,
        color: WHITE, opacity: subOp,
      }}>
        searches happen
      </div>
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────
// SCENE 3 — STAT 2 · Instagram  (frames 565–870)
// ─────────────────────────────────────────────
const Scene3: React.FC<{ frame: number }> = ({ frame }) => {
  const f = frame - S3;

  // Split: left half → left, right half → right, AMBER revealed
  const sp  = ci(f, [0, 12], [0, 1], trans);
  const lX  = interpolate(sp, [0, 1], [0, -1080]);
  const rX  = interpolate(sp, [0, 1], [0, 1080]);

  const labelOp = ci(f, [20, 38], [0, 1]);
  const labelY  = ci(f, [20, 38], [-20, 0], entry);

  // Counter 0 → 695 000  (f 40–180 = global 605–745)
  const count  = Math.floor(ci(f, [40, 180], [0, 695_000], eOut));
  const ctrOp  = ci(f, [40, 55],  [0, 1]);
  const subOp  = ci(f, [45, 65],  [0, 0.75]);

  // Secondary stat (global 765 → f 200)
  const s2Op = ci(f, [200, 218], [0, 0.45]);
  const s2Y  = ci(f, [200, 218], [30, 0], entry);
  const waOp = ci(f, [215, 230], [0, 0.45]);

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: AMBER }} />

      {/* TEAL halves split apart */}
      <div style={{
        position: "absolute", top: 0, left: 0, width: "50%", height: "100%",
        background: TEAL, transform: `translateX(${lX}px)`,
      }} />
      <div style={{
        position: "absolute", top: 0, left: "50%", width: "50%", height: "100%",
        background: TEAL, transform: `translateX(${rX}px)`,
      }} />

      {/* Label */}
      <div style={{
        position: "absolute", left: 0, right: 0, top: 300,
        textAlign: "center",
        fontFamily: montserrat, fontWeight: 600, fontSize: 28,
        color: BLACK, letterSpacing: "0.25em",
        opacity: labelOp, transform: `translateY(${labelY}px)`,
      }}>
        INSTAGRAM STORIES
      </div>

      {/* Counter */}
      <div style={{
        position: "absolute", left: 0, right: 0, top: 640,
        textAlign: "center",
        fontFamily: cardo, fontWeight: 700, fontSize: 164,
        color: BLACK, letterSpacing: "-0.03em",
        opacity: ctrOp, lineHeight: 1,
      }}>
        {count.toLocaleString("en-IN")}
      </div>

      {/* Sub-label */}
      <div style={{
        position: "absolute", left: 0, right: 0, top: 830,
        textAlign: "center",
        fontFamily: montserrat, fontWeight: 300, fontSize: 52,
        color: BLACK, opacity: subOp,
      }}>
        Stories posted
      </div>

      {/* Secondary: 41M */}
      <div style={{
        position: "absolute", left: 0, right: 0, top: 1120,
        textAlign: "center",
        fontFamily: cardo, fontWeight: 700, fontSize: 72,
        color: BLACK, opacity: s2Op,
        transform: `translateY(${s2Y}px)`,
      }}>
        41,000,000
      </div>
      <div style={{
        position: "absolute", left: 0, right: 0, top: 1210,
        textAlign: "center",
        fontFamily: montserrat, fontWeight: 300, fontSize: 36,
        color: BLACK, opacity: waOp,
      }}>
        WhatsApp messages
      </div>
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────
// SCENE 4 — STAT 3 · YouTube  (frames 865–1170)
// ─────────────────────────────────────────────
const Scene4: React.FC<{ frame: number }> = ({ frame }) => {
  const f = frame - S4;

  // Iris wipe (f 0–12)
  const irisR = ci(f, [0, 12], [0, 150], eOut);

  const labelOp = ci(f, [20, 38], [0, 1]);
  const labelY  = ci(f, [20, 38], [-20, 0], entry);

  // "500 HOURS" (f 40–62 = global 905–927)
  const statSc = ci(f, [40, 62], [0.94, 1], entry);
  const statOp = ci(f, [40, 62], [0, 1]);

  // "of video uploaded" (f 50–68)
  const subOp = ci(f, [50, 68], [0, 0.7]);
  const subY  = ci(f, [50, 68], [12, 0], entry);

  // Vertical divider (f 115–145 = global 980–1010)
  const divH = ci(f, [115, 145], [0, 600], eOut);

  // Right-side secondary (f 135, f 150)
  const r1Op = ci(f, [135, 155], [0, 0.4]);
  const r2Op = ci(f, [150, 165], [0, 0.4]);

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: AMBER }} />

      {/* CREAM iris wipe */}
      <AbsoluteFill style={{
        background: CREAM,
        clipPath: `circle(${irisR}% at 50% 50%)`,
      }} />

      {/* Label */}
      <div style={{
        position: "absolute", left: 0, right: 0, top: 300,
        textAlign: "center",
        fontFamily: montserrat, fontWeight: 600, fontSize: 28,
        color: GREEN, letterSpacing: "0.25em",
        opacity: labelOp, transform: `translateY(${labelY}px)`,
      }}>
        YOUTUBE — EVERY MINUTE
      </div>

      {/* "500 HOURS" */}
      <div style={{
        position: "absolute", left: 0, right: 0, top: 640,
        textAlign: "center",
        fontFamily: cardo, fontWeight: 700, fontSize: 148,
        color: GREEN, letterSpacing: "-0.02em",
        opacity: statOp, transform: `scale(${statSc})`,
        lineHeight: 1,
      }}>
        500 HOURS
      </div>

      {/* "of video uploaded" */}
      <div style={{
        position: "absolute", left: 0, right: 0, top: 820,
        textAlign: "center",
        fontFamily: montserrat, fontWeight: 300, fontSize: 52,
        color: GREEN, opacity: subOp,
        transform: `translateY(${subY}px)`,
      }}>
        of video uploaded
      </div>

      {/* Vertical divider at x=center, draws down from y=960 */}
      <div style={{
        position: "absolute",
        left: "50%",
        top: 960,
        transform: "translateX(-50%)",
        width: 1.5,
        height: divH,
        background: GREEN,
        opacity: 0.15,
      }} />

      {/* Right side secondary stat */}
      <div style={{
        position: "absolute",
        left: "52%", right: 40,
        top: 1090,
        textAlign: "center",
        fontFamily: cardo, fontWeight: 700, fontSize: 68,
        color: GREEN, opacity: r1Op,
      }}>
        167,000,000
      </div>
      <div style={{
        position: "absolute",
        left: "52%", right: 40,
        top: 1175,
        textAlign: "center",
        fontFamily: montserrat, fontWeight: 300, fontSize: 32,
        color: GREEN, opacity: r2Op,
      }}>
        TikTok videos watched
      </div>
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────
// SCENE 5 — PIVOT  (frames 1165–1410)
// ─────────────────────────────────────────────
const Scene5: React.FC<{ frame: number }> = ({ frame }) => {
  const f = frame - S5;

  // Fade from CREAM → BLACK (f 0–8)
  const prevFade = ci(f, [0, 8], [1, 0]);

  // "?" decoration (f 15–45)
  const qOp = ci(f, [15, 45], [0, 0.04]);

  // "And your" (f 30–50 = global 1195–1215)
  const ay1Op = ci(f, [30, 50], [0, 1]);
  const ay1Y  = ci(f, [30, 50], [20, 0], entry);

  // "business?" (f 50–70 = global 1215–1235)
  const bizOp = ci(f, [50, 70], [0, 1]);
  const bizY  = ci(f, [50, 70], [20, 0], entry);

  // Line (f 90–110 = global 1255–1275)
  const lineW = ci(f, [90, 110], [0, 600], eOut);

  // "Getting any of this?" (f 110–130 = global 1275–1295)
  const gaOp = ci(f, [110, 130], [0, 0.55]);

  // "Without a website —" (f 145–163 = global 1310–1328)
  const waOp = ci(f, [145, 163], [0, 1]);

  // "zero." (f 170–190 = global 1335–1355)
  const zeroSc = ci(f, [170, 190], [0.9, 1], entry);
  const zeroOp = ci(f, [170, 190], [0, 1]);

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: BLACK }} />

      {/* CREAM overlay fades out (exit from Scene 4) */}
      {f < 9 && (
        <AbsoluteFill style={{ background: CREAM, opacity: prevFade }} />
      )}

      {/* Giant "?" texture */}
      <div style={{
        position: "absolute",
        left: 0, right: 0, top: "50%",
        transform: "translateY(-55%)",
        textAlign: "center",
        fontFamily: cardo, fontWeight: 700, fontSize: 500,
        color: WHITE, opacity: qOp,
        lineHeight: 1,
        userSelect: "none", pointerEvents: "none",
      }}>
        ?
      </div>

      {/* Text block */}
      <div style={{ position: "absolute", left: 44, top: 380 }}>
        <div style={{
          fontFamily: cardo, fontWeight: 400, fontStyle: "italic",
          fontSize: 88, color: WHITE,
          opacity: ay1Op, transform: `translateY(${ay1Y}px)`,
          lineHeight: 1.1,
        }}>
          And your
        </div>

        <div style={{
          fontFamily: cardo, fontWeight: 700,
          fontSize: 128, color: WHITE,
          opacity: bizOp, transform: `translateY(${bizY}px)`,
          lineHeight: 1, marginTop: -8,
        }}>
          business?
        </div>

        {/* Line */}
        <div style={{
          marginTop: 52,
          width: lineW, height: 1.5,
          background: WHITE, opacity: 0.2,
        }} />

        {/* "Getting any of this?" */}
        <div style={{
          marginTop: 52,
          fontFamily: montserrat, fontWeight: 400, fontSize: 52,
          color: WHITE, opacity: gaOp,
        }}>
          Getting any of this?
        </div>

        {/* "Without a website —" */}
        <div style={{
          marginTop: 32,
          fontFamily: montserrat, fontWeight: 300, fontSize: 48,
          color: SAGE, opacity: waOp,
        }}>
          Without a website —
        </div>

        {/* "zero." */}
        <div style={{
          marginTop: 20,
          fontFamily: cardo, fontWeight: 700,
          fontSize: 160, color: WHITE,
          opacity: zeroOp,
          transform: `scale(${zeroSc})`,
          transformOrigin: "left center",
          lineHeight: 1,
        }}>
          zero.
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────
// SCENE 6 — THE FIX  (frames 1405–1620)
// ─────────────────────────────────────────────
const Scene6: React.FC<{ frame: number }> = ({ frame }) => {
  const f = frame - S6;

  // GREEN rises from bottom (f 0–14)
  const riseSc = ci(f, [0, 14], [0, 1], trans);

  // "That changes." (f 20–40 = global 1425–1445)
  const tc1Op = ci(f, [20, 40], [0, 1]);
  const tc1X  = ci(f, [20, 40], [-24, 0], entry);

  // "One website." (f 45–63 = global 1450–1468)
  const tc2Op = ci(f, [45, 63], [0, 0.75]);
  const tc2X  = ci(f, [45, 63], [-24, 0], entry);

  // Rule (f 85–107 = global 1490–1512)
  const ruleW = ci(f, [85, 107], [0, 700], eOut);

  // Checklist items
  const mk = (start: number) => ({
    op: ci(f, [start, start + 14], [0, 1]),
    x:  ci(f, [start, start + 14], [-16, 0], entry),
  });
  const it1 = mk(105); // global 1510
  const it2 = mk(135); // global 1540
  const it3 = mk(165); // global 1570

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: BLACK }} />

      {/* GREEN rises from bottom */}
      <div style={{
        position: "absolute", inset: 0,
        background: GREEN,
        transformOrigin: "bottom center",
        transform: `scaleY(${riseSc})`,
      }} />

      <div style={{ position: "absolute", left: 44, top: 320 }}>
        {/* "That changes." */}
        <div style={{
          fontFamily: cardo, fontWeight: 700, fontSize: 124,
          color: CREAM,
          opacity: tc1Op, transform: `translateX(${tc1X}px)`,
          lineHeight: 1,
        }}>
          That changes.
        </div>

        {/* "One website." */}
        <div style={{
          fontFamily: cardo, fontWeight: 700, fontStyle: "italic", fontSize: 112,
          color: CREAM,
          opacity: tc2Op, transform: `translateX(${tc2X}px)`,
          lineHeight: 1, marginTop: 8,
        }}>
          One website.
        </div>

        {/* Horizontal rule */}
        <div style={{
          marginTop: 64,
          width: ruleW, height: 1.5,
          background: CREAM, opacity: 0.2,
        }} />

        {/* Checklist */}
        <div style={{ marginTop: 52, display: "flex", flexDirection: "column", gap: 32 }}>
          {[
            { text: "✓  Show up on Google",      anim: it1 },
            { text: "✓  Get found. Get called.", anim: it2 },
            { text: "✓  Look like you mean it.", anim: it3 },
          ].map(({ text, anim }) => (
            <div
              key={text}
              style={{
                fontFamily: montserrat, fontWeight: 400, fontSize: 44,
                color: SAGE,
                opacity: anim.op,
                transform: `translateX(${anim.x}px)`,
              }}
            >
              {text}
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────
// SCENE 7 — KAIROS  (frames 1615–1800)
// ─────────────────────────────────────────────
const Scene7: React.FC<{ frame: number }> = ({ frame }) => {
  const f = frame - S7;

  // Diagonal wipe top-left → bottom-right (f 0–14)
  const dp = ci(f, [0, 14], [0, 1], eOut);
  const tx = Math.min(dp * 200, 100);
  const bx = Math.max(0, dp * 200 - 100);
  const diagClip = `polygon(0 0, ${tx}% 0, ${bx}% 100%, 0 100%)`;

  // Logo (f 20–48 = global 1635–1663)
  const markOp = ci(f, [20, 48], [0, 1], eOut);

  // KAIROS letter stagger (f 50+i*5, 12 frames each = global 1665+)
  const letters = "KAIROS".split("");
  const lOps   = letters.map((_, i) => ci(f, [50 + i * 5, 50 + i * 5 + 12], [0, 1]));

  // Tagline (f 85–105 = global 1700–1720)
  const tagOp = ci(f, [85, 105], [0, 0.5]);

  // Divider (f 105–125 = global 1720–1740)
  const divW  = ci(f, [105, 125], [0, 920], eOut);

  // "We build websites that work." (f 125–143)
  const sub1Op = ci(f, [125, 143], [0, 0.7]);

  // "@kairosbuilds.in" (f 145–160)
  const sub2Op = ci(f, [145, 160], [0, 0.55]);

  // Final breath (f 160–185)
  const breathSc = ci(f, [160, 185], [1, 1.01], Easing.linear);

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: GREEN }} />

      {/* CREAM diagonal wipe */}
      <AbsoluteFill style={{ background: CREAM, clipPath: diagClip }} />

      {/* Content with breath */}
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        transform: `scale(${breathSc})`,
      }}>
        {/* Logo mark */}
        <div style={{ opacity: markOp, marginBottom: 28 }}>
          <Img
            src={staticFile("kairos-mark-dark.png")}
            style={{ width: 260, height: 260, objectFit: "contain" }}
          />
        </div>

        {/* KAIROS letter stagger */}
        <div style={{
          display: "flex",
          fontFamily: cardo, fontWeight: 700, fontSize: 112,
          color: GREEN, letterSpacing: "0.14em",
          marginBottom: 20,
        }}>
          {letters.map((l, i) => (
            <span key={i} style={{ opacity: lOps[i] }}>{l}</span>
          ))}
        </div>

        {/* Tagline */}
        <div style={{
          fontFamily: montserrat, fontWeight: 300, fontSize: 26,
          color: GREEN, opacity: tagOp,
          letterSpacing: "0.22em", marginBottom: 40,
        }}>
          — THE PURSUIT CONTINUES —
        </div>

        {/* Divider */}
        <div style={{
          width: divW, height: 1,
          background: GREEN, opacity: 0.1,
          marginBottom: 32,
        }} />

        {/* "We build websites that work." */}
        <div style={{
          fontFamily: cardo, fontWeight: 400, fontStyle: "italic", fontSize: 56,
          color: GREEN, opacity: sub1Op,
          marginBottom: 20,
        }}>
          We build websites that work.
        </div>

        {/* "@kairosbuilds.in" */}
        <div style={{
          fontFamily: montserrat, fontWeight: 500, fontSize: 40,
          color: GREEN, opacity: sub2Op,
        }}>
          @kairosbuilds.in
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────
// ROOT — KairosReel5
// ─────────────────────────────────────────────
const TICK_S2 = [305, 325, 345, 365, 385, 405, 425, 445];
const TICK_S3 = [605, 625, 645, 665, 685, 705, 725];
const KAIROS_TICKS = [1665, 1670, 1675, 1680, 1685, 1690];

export const KairosReel5: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ background: BLACK }}>
      {/* ── Ambient music (add public/sounds/ambient.mp3) ─ */}
      <Audio src={staticFile("ambient.mp3")} volume={0.2} loop />

      {/* ── Sound effects ─────────────────────────────── */}
      {/* Scene 1 */}
      <Sequence from={30}   durationInFrames={15}><Audio src={staticFile("whoosh.mp3")}  volume={0.5} /></Sequence>
      <Sequence from={70}   durationInFrames={9}>  <Audio src={staticFile("impact.mp3")}  volume={0.7} /></Sequence>

      {/* Scene 2 */}
      <Sequence from={265}  durationInFrames={15}><Audio src={staticFile("whoosh.mp3")}  volume={0.8} /></Sequence>
      {TICK_S2.map(tf => (
        <Sequence key={`t2${tf}`} from={tf} durationInFrames={3}><Audio src={staticFile("tick.mp3")} volume={0.35} /></Sequence>
      ))}
      <Sequence from={455}  durationInFrames={15}><Audio src={staticFile("chime.mp3")}   volume={0.6} /></Sequence>

      {/* Scene 3 */}
      <Sequence from={565}  durationInFrames={15}><Audio src={staticFile("whoosh.mp3")}  volume={0.8} /></Sequence>
      {TICK_S3.map(tf => (
        <Sequence key={`t3${tf}`} from={tf} durationInFrames={3}><Audio src={staticFile("tick.mp3")} volume={0.3} /></Sequence>
      ))}
      <Sequence from={750}  durationInFrames={15}><Audio src={staticFile("chime.mp3")}   volume={0.6} /></Sequence>

      {/* Scene 4 */}
      <Sequence from={865}  durationInFrames={15}><Audio src={staticFile("whoosh.mp3")}  volume={0.8} /></Sequence>
      <Sequence from={905}  durationInFrames={9}>  <Audio src={staticFile("impact.mp3")}  volume={0.7} /></Sequence>

      {/* Scene 5 — NO sound at 1165 transition */}
      <Sequence from={1215} durationInFrames={9}>  <Audio src={staticFile("impact.mp3")}  volume={0.6} /></Sequence>
      <Sequence from={1335} durationInFrames={9}>  <Audio src={staticFile("impact.mp3")}  volume={0.9} /></Sequence>

      {/* Scene 6 */}
      <Sequence from={1405} durationInFrames={15}><Audio src={staticFile("whoosh.mp3")}  volume={0.8} /></Sequence>
      <Sequence from={1425} durationInFrames={9}>  <Audio src={staticFile("impact.mp3")}  volume={0.6} /></Sequence>
      <Sequence from={1510} durationInFrames={3}>  <Audio src={staticFile("tick.mp3")}   volume={0.5} /></Sequence>
      <Sequence from={1540} durationInFrames={3}>  <Audio src={staticFile("tick.mp3")}   volume={0.5} /></Sequence>
      <Sequence from={1570} durationInFrames={3}>  <Audio src={staticFile("tick.mp3")}   volume={0.5} /></Sequence>

      {/* Scene 7 */}
      <Sequence from={1615} durationInFrames={15}><Audio src={staticFile("whoosh.mp3")}  volume={0.6} /></Sequence>
      {KAIROS_TICKS.map(tf => (
        <Sequence key={`kt${tf}`} from={tf} durationInFrames={3}><Audio src={staticFile("tick.mp3")} volume={0.25} /></Sequence>
      ))}

      {/* ── Scene visuals ──────────────────────────────── */}
      <Sequence from={S1} durationInFrames={270}><Scene1 frame={frame} /></Sequence>
      <Sequence from={S2} durationInFrames={305}><Scene2 frame={frame} /></Sequence>
      <Sequence from={S3} durationInFrames={305}><Scene3 frame={frame} /></Sequence>
      <Sequence from={S4} durationInFrames={305}><Scene4 frame={frame} /></Sequence>
      <Sequence from={S5} durationInFrames={245}><Scene5 frame={frame} /></Sequence>
      <Sequence from={S6} durationInFrames={215}><Scene6 frame={frame} /></Sequence>
      <Sequence from={S7} durationInFrames={185}><Scene7 frame={frame} /></Sequence>

      {/* ── Global overlays ────────────────────────────── */}
      <LiveDot />
      <SceneTimer />
      <FilmGrain />
    </AbsoluteFill>
  );
};
