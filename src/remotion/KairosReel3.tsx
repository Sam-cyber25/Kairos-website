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
  weights: ["300", "500", "700"],
});

const DARK = "#0D1A14";
const GREEN = "#1C352D";
const CREAM = "#F8F0E5";
const SAGE = "#8CA399";

// Scene boundaries at 30fps
const S1 = 0;
const S2 = 90;
const S3 = 180;
const S4 = 300;
const S5 = 420;
const S6 = 540;

const easeOut = Easing.out(Easing.ease);
const punch = Easing.bezier(0.23, 1, 0.32, 1);

// ─── Film Grain ───────────────────────────────
const FilmGrain: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ pointerEvents: "none", zIndex: 999 }}>
      <svg
        style={{ position: "absolute", width: "100%", height: "100%", opacity: 0.035 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id={`g${frame}`}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              seed={frame}
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
        <rect width="100%" height="100%" filter={`url(#g${frame})`} />
      </svg>
    </AbsoluteFill>
  );
};

// ─── Scene Counter ────────────────────────────
const Ctr: React.FC<{ n: number; dark?: boolean }> = ({ n, dark = true }) => (
  <div
    style={{
      position: "absolute",
      top: 40,
      right: 40,
      fontFamily: "Courier New, monospace",
      fontSize: 18,
      color: dark ? CREAM : GREEN,
      opacity: 0.3,
      letterSpacing: "0.08em",
      zIndex: 50,
    }}
  >
    {String(n).padStart(2, "0")}/06
  </div>
);

// ─────────────────────────────────────────────
// SCENE 1 — THE HOOK (frames 0–90)
// ─────────────────────────────────────────────
const Scene1: React.FC<{ frame: number }> = ({ frame }) => {
  const f = frame - S1;

  const imProg = interpolate(f, [20, 32], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: punch,
  });
  const imX = interpolate(imProg, [0, 1], [-120, 0]);

  const sixProg = interpolate(f, [35, 47], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: punch,
  });
  const sixX = interpolate(sixProg, [0, 1], [120, 0]);

  const lineW = interpolate(f, [60, 90], [0, 864], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });

  return (
    <AbsoluteFill style={{ background: DARK }}>
      <Ctr n={1} dark />

      {/* "I'm" — 220px, centers around y≈840 */}
      <div
        style={{
          position: "absolute",
          left: 40,
          top: 730,
          transform: `translateX(${imX}px)`,
          opacity: imProg,
          fontFamily: cardo,
          fontWeight: 700,
          fontStyle: "italic",
          fontSize: 220,
          color: CREAM,
          lineHeight: 1,
        }}
      >
        I'm
      </div>

      {/* "16." — 340px, -40px margin-top from "I'm" end */}
      <div
        style={{
          position: "absolute",
          left: 40,
          top: 910,
          transform: `translateX(${sixX}px)`,
          opacity: sixProg,
          fontFamily: cardo,
          fontWeight: 700,
          fontSize: 340,
          color: CREAM,
          lineHeight: 1,
        }}
      >
        16.
      </div>

      {/* Underline: beneath "16." */}
      <div
        style={{
          position: "absolute",
          left: 40,
          top: 1265,
          width: lineW,
          height: 3,
          background: "rgba(248,240,229,0.3)",
        }}
      />
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────
// SCENE 2 — WHO (frames 90–180)
// ─────────────────────────────────────────────
const Scene2: React.FC<{ frame: number }> = ({ frame }) => {
  const f = frame - S2;

  // Cream wipe from bottom (0–15)
  const wipeH = interpolate(f, [0, 15], [0, 1920], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.77, 0, 0.175, 1),
  });

  // Left green bar scaleY (5–25)
  const barScale = interpolate(f, [5, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });

  // "From" — global f105, local f=15
  const fromOp = interpolate(f, [15, 35], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const fromY  = interpolate(f, [15, 35], [30, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut });

  // "Kanpur." — global f118, local f=28
  const kanpurOp = interpolate(f, [28, 48], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const kanpurY  = interpolate(f, [28, 48], [30, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut });

  // "India." — global f140, local f=50
  const indiaOp = interpolate(f, [50, 70], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const indiaY  = interpolate(f, [50, 70], [30, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut });

  // Grid overlay (65–90)
  const gridOp = interpolate(f, [65, 90], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: DARK }} />

      {/* Cream wipe */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: wipeH,
          background: CREAM,
        }}
      />

      {/* Grid texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: gridOp * 0.06,
          backgroundImage: `linear-gradient(to right,${GREEN} 1px,transparent 1px),linear-gradient(to bottom,${GREEN} 1px,transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Left green vertical bar */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 16,
          height: "100%",
          background: GREEN,
          transformOrigin: "top center",
          transform: `scaleY(${barScale})`,
        }}
      />

      <Ctr n={2} dark={false} />

      {/* Text block */}
      <div style={{ position: "absolute", left: 56, top: 300 }}>
        <div
          style={{
            fontFamily: montserrat,
            fontWeight: 300,
            fontSize: 72,
            color: SAGE,
            opacity: fromOp,
            transform: `translateY(${fromY}px)`,
            lineHeight: 1.1,
          }}
        >
          From
        </div>

        <div
          style={{
            fontFamily: cardo,
            fontWeight: 700,
            fontSize: 200,
            color: GREEN,
            letterSpacing: "-0.03em",
            opacity: kanpurOp,
            transform: `translateY(${kanpurY}px)`,
            lineHeight: 0.92,
            marginTop: 8,
          }}
        >
          Kanpur.
        </div>

        <div
          style={{
            fontFamily: montserrat,
            fontWeight: 500,
            fontSize: 88,
            color: GREEN,
            opacity: indiaOp * 0.5,
            transform: `translateY(${indiaY}px)`,
            lineHeight: 1.1,
            marginTop: 20,
          }}
        >
          India.
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────
// SCENE 3 — WHAT (frames 180–300)
// ─────────────────────────────────────────────
const Scene3: React.FC<{ frame: number }> = ({ frame }) => {
  const f = frame - S3;

  // Green wipe from center (0–8)
  const wipeX = interpolate(f, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: punch,
  });

  // Word drops — 14 frames each, starting f=10
  const mkWord = (start: number) => ({
    op: interpolate(f, [start, start + 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
    y:  interpolate(f, [start, start + 14], [-60, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut }),
  });
  const w1 = mkWord(10);
  const w2 = mkWord(24);
  const w3 = mkWord(38);

  // "Not templates…" f=75 (global 255)
  const sub1Op = interpolate(f, [75, 95], [0, 0.8], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // "Actual custom websites." f=90 (global 270)
  const sub2Op = interpolate(f, [90, 105], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const sub2Y  = interpolate(f, [90, 105], [8, 0],  { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut });

  const wordStyle: React.CSSProperties = {
    fontFamily: cardo,
    fontWeight: 700,
    fontSize: 190,
    color: CREAM,
    lineHeight: 0.88,
    display: "block",
    textAlign: "center",
  };

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: CREAM }} />

      {/* Green wipe from center */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: GREEN,
          transformOrigin: "center center",
          transform: `scaleX(${wipeX})`,
        }}
      />

      <Ctr n={3} dark />

      {/* Words stacked, centered */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: "50%",
          transform: "translateY(-58%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ ...wordStyle, opacity: w1.op, transform: `translateY(${w1.y}px)` }}>I</div>
        <div style={{ ...wordStyle, opacity: w2.op, transform: `translateY(${w2.y}px)` }}>build</div>
        <div style={{ ...wordStyle, opacity: w3.op, transform: `translateY(${w3.y}px)` }}>websites.</div>
      </div>

      {/* Sub-copy */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 180,
          textAlign: "center",
          padding: "0 40px",
        }}
      >
        <div
          style={{
            fontFamily: montserrat,
            fontWeight: 300,
            fontSize: 52,
            color: SAGE,
            opacity: sub1Op,
            marginBottom: 18,
          }}
        >
          Not templates. Not shortcuts.
        </div>
        <div
          style={{
            fontFamily: montserrat,
            fontWeight: 600,
            fontSize: 52,
            color: CREAM,
            opacity: sub2Op,
            transform: `translateY(${sub2Y}px)`,
          }}
        >
          Actual custom websites.
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────
// SCENE 4 — THE WHY (frames 300–420)
// ─────────────────────────────────────────────
const Scene4: React.FC<{ frame: number }> = ({ frame }) => {
  const f = frame - S4;

  // Fade from prev scene GREEN → DARK (0–10)
  const prevFade = interpolate(f, [0, 10], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Spotlight circle expands (13–38)
  const spotPct = interpolate(f, [13, 38], [0, 80], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });

  // Quote line 1 — global 330, local f=30
  const q1Op = interpolate(f, [30, 46], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const q1Y  = interpolate(f, [30, 46], [16, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut });

  // Quote line 2 — global 348, local f=48
  const q2Op = interpolate(f, [48, 64], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const q2Y  = interpolate(f, [48, 64], [16, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut });

  // Rule — global 370, local f=70
  const ruleW = interpolate(f, [70, 90], [0, 648], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });

  // "That's not a problem." — global 385, local f=85
  const t1Op = interpolate(f, [85, 100], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const t1Y  = interpolate(f, [85, 100], [12, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut });

  // "That's an opportunity." — global 400, local f=100
  const t2Op = interpolate(f, [100, 115], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const t2Y  = interpolate(f, [100, 115], [12, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut });

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: DARK }} />

      {/* CREAM revealed by spotlight */}
      <AbsoluteFill
        style={{
          background: CREAM,
          clipPath: `circle(${spotPct}% at 50% 50%)`,
        }}
      />

      {/* Prev scene (GREEN) fades out */}
      {f < 12 && (
        <AbsoluteFill style={{ background: GREEN, opacity: prevFade }} />
      )}

      <Ctr n={4} dark={false} />

      {/* Decorative quote mark */}
      <div
        style={{
          position: "absolute",
          top: -60,
          left: -30,
          fontFamily: cardo,
          fontWeight: 700,
          fontSize: 400,
          color: GREEN,
          opacity: 0.08,
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        "
      </div>

      {/* Quote + copy */}
      <div
        style={{
          position: "absolute",
          left: 40,
          right: 40,
          top: 360,
        }}
      >
        <div
          style={{
            fontFamily: cardo,
            fontWeight: 700,
            fontStyle: "italic",
            fontSize: 96,
            color: GREEN,
            lineHeight: 1.15,
            opacity: q1Op,
            transform: `translateY(${q1Y}px)`,
          }}
        >
          Most businesses in India
        </div>
        <div
          style={{
            fontFamily: cardo,
            fontWeight: 700,
            fontStyle: "italic",
            fontSize: 96,
            color: GREEN,
            lineHeight: 1.15,
            opacity: q2Op,
            transform: `translateY(${q2Y}px)`,
          }}
        >
          don't have a website.
        </div>

        <div
          style={{
            marginTop: 48,
            height: 2,
            width: ruleW,
            background: "rgba(28,53,45,0.3)",
          }}
        />

        <div
          style={{
            marginTop: 40,
            fontFamily: montserrat,
            fontWeight: 500,
            fontSize: 64,
            color: GREEN,
            opacity: t1Op,
            transform: `translateY(${t1Y}px)`,
          }}
        >
          That's not a problem.
        </div>

        <div
          style={{
            marginTop: 16,
            fontFamily: cardo,
            fontWeight: 700,
            fontStyle: "italic",
            fontSize: 80,
            color: GREEN,
            opacity: t2Op,
            transform: `translateY(${t2Y}px)`,
          }}
        >
          That's an opportunity.
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────
// SCENE 5 — THE PROOF (frames 420–540)
// ─────────────────────────────────────────────
const Scene5: React.FC<{ frame: number }> = ({ frame }) => {
  const f = frame - S5;

  // GREEN slam from top (0–10)
  const slamY = interpolate(f, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: punch,
  });

  // STAT 1 — global f435, local f=15, count 0→24 by f=60
  const s1Op = interpolate(f, [15, 28], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const ct1  = Math.floor(interpolate(f, [15, 60], [0, 24], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut }));
  const sub1Op = interpolate(f, [25, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const sub1Y  = interpolate(f, [25, 40], [8, 0],  { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut });

  // STAT 2 — global f475, local f=55, count 0→100 by f=85
  const s2Op = interpolate(f, [55, 68], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const ct2  = Math.floor(interpolate(f, [55, 85], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut }));
  const sub2Op = interpolate(f, [65, 80], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const sub2Y  = interpolate(f, [65, 80], [8, 0],  { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut });

  // STAT 3 — global f515, local f=95
  const s3Op = interpolate(f, [95, 110], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const sub3Op = interpolate(f, [105, 118], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const sub3Y  = interpolate(f, [105, 118], [8, 0],  { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut });

  const div1Op = interpolate(f, [50, 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const div2Op = interpolate(f, [90, 100], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const Divider: React.FC<{ op: number }> = ({ op }) => (
    <div style={{ width: "100%", height: 1, background: CREAM, opacity: op * 0.15, margin: "12px 0" }} />
  );

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: CREAM }} />

      {/* GREEN slam from top */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: GREEN,
          transformOrigin: "top center",
          transform: `scaleY(${slamY})`,
        }}
      />

      <Ctr n={5} dark />

      {/* Stats */}
      <div
        style={{
          position: "absolute",
          left: 40,
          right: 40,
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        {/* STAT 1 */}
        <div style={{ opacity: s1Op }}>
          <div style={{ fontFamily: cardo, fontWeight: 700, fontSize: 280, color: CREAM, letterSpacing: "-0.04em", lineHeight: 0.88 }}>
            {ct1}hrs
          </div>
          <div style={{ fontFamily: montserrat, fontWeight: 300, fontSize: 44, color: SAGE, opacity: sub1Op, transform: `translateY(${sub1Y}px)`, marginTop: 6 }}>
            average delivery time
          </div>
        </div>

        <Divider op={div1Op} />

        {/* STAT 2 */}
        <div style={{ opacity: s2Op }}>
          <div style={{ fontFamily: cardo, fontWeight: 700, fontSize: 260, color: CREAM, letterSpacing: "-0.04em", lineHeight: 0.88 }}>
            {ct2}%
          </div>
          <div style={{ fontFamily: montserrat, fontWeight: 300, fontSize: 44, color: SAGE, opacity: sub2Op, transform: `translateY(${sub2Y}px)`, marginTop: 6 }}>
            built from scratch
          </div>
        </div>

        <Divider op={div2Op} />

        {/* STAT 3 */}
        <div style={{ opacity: s3Op }}>
          <div style={{ fontFamily: cardo, fontWeight: 700, fontSize: 300, color: CREAM, letterSpacing: "-0.04em", lineHeight: 0.88 }}>
            ₹0
          </div>
          <div style={{ fontFamily: montserrat, fontWeight: 300, fontSize: 44, color: SAGE, opacity: sub3Op, transform: `translateY(${sub3Y}px)`, marginTop: 6 }}>
            templates used.{" "}
            <span style={{ fontFamily: cardo, fontStyle: "italic", fontSize: 50 }}>ever.</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────
// SCENE 6 — KAIROS (frames 540–660)
// ─────────────────────────────────────────────
const Scene6: React.FC<{ frame: number }> = ({ frame }) => {
  const f = frame - S6;

  // Exit animation — scale+fade of prev scene (0–15)
  const exitScale = interpolate(f, [0, 15], [1, 1.08], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const exitOp   = interpolate(f, [0, 15], [1, 0],    { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // CREAM bg fades in (20–40)
  const bgOp = interpolate(f, [20, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Mark fades in (20–45)
  const markOp = interpolate(f, [20, 45], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut });

  // KAIROS letters stagger (35+i*5, each 12 frames)
  const letters = "KAIROS".split("");
  const lOps = letters.map((_, i) =>
    interpolate(f, [35 + i * 5, 35 + i * 5 + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
  );

  // Tagline — 20 frames after KAIROS (last letter at 35+25+12=72, tagline at f=65 keeps it tight)
  const tagOp = interpolate(f, [65, 85], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Divider (80–100)
  const divW = interpolate(f, [80, 100], [0, 1080], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut });

  // Contact (90–108)
  const contactOp = interpolate(f, [90, 108], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Final breath: scale 1→1.012 over last 60 frames (f 60–120)
  const breathScale = interpolate(f, [60, 120], [1, 1.012], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.linear,
  });

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: DARK }} />
      <AbsoluteFill style={{ background: CREAM, opacity: bgOp }} />

      {/* Prev scene exit */}
      {f < 16 && (
        <AbsoluteFill
          style={{
            background: GREEN,
            opacity: exitOp,
            transform: `scale(${exitScale})`,
          }}
        />
      )}

      <Ctr n={6} dark={false} />

      {/* Main content — applies breath scale */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${breathScale})`,
        }}
      >
        {/* Kairos mark */}
        <div style={{ opacity: markOp, marginBottom: 32 }}>
          <Img
            src={staticFile("kairos-mark-dark.png")}
            style={{ width: 320, height: 320, objectFit: "contain" }}
          />
        </div>

        {/* KAIROS wordmark — letter stagger */}
        <div
          style={{
            display: "flex",
            fontFamily: cardo,
            fontWeight: 700,
            fontSize: 144,
            color: GREEN,
            letterSpacing: "0.12em",
            marginBottom: 20,
          }}
        >
          {letters.map((l, i) => (
            <span key={i} style={{ opacity: lOps[i] }}>
              {l}
            </span>
          ))}
        </div>

        {/* Tagline */}
        <div
          style={{
            fontFamily: montserrat,
            fontWeight: 300,
            fontSize: 36,
            color: GREEN,
            opacity: tagOp * 0.6,
            letterSpacing: "0.2em",
            marginBottom: 48,
          }}
        >
          — THE PURSUIT CONTINUES —
        </div>

        {/* Divider */}
        <div
          style={{
            width: divW,
            height: 1,
            background: GREEN,
            opacity: 0.15,
            marginBottom: 32,
          }}
        />

        {/* Contact */}
        <div
          style={{
            fontFamily: montserrat,
            fontWeight: 500,
            fontSize: 52,
            color: GREEN,
            opacity: contactOp * 0.7,
          }}
        >
          @kairosbuilds.in
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────
// ROOT COMPOSITION
// ─────────────────────────────────────────────
export const KairosReel3: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ background: DARK }}>
      {/* Background music — add public/music.mp3 before rendering */}
      <Audio src={staticFile("music.mp3")} volume={0.35} startFrom={0} />

      <Sequence from={S1} durationInFrames={90}>
        <Scene1 frame={frame} />
      </Sequence>
      <Sequence from={S2} durationInFrames={90}>
        <Scene2 frame={frame} />
      </Sequence>
      <Sequence from={S3} durationInFrames={120}>
        <Scene3 frame={frame} />
      </Sequence>
      <Sequence from={S4} durationInFrames={120}>
        <Scene4 frame={frame} />
      </Sequence>
      <Sequence from={S5} durationInFrames={120}>
        <Scene5 frame={frame} />
      </Sequence>
      <Sequence from={S6} durationInFrames={120}>
        <Scene6 frame={frame} />
      </Sequence>

      <FilmGrain />
    </AbsoluteFill>
  );
};
