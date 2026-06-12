import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
  staticFile,
  Img,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Cardo";
import { loadFont as loadMontserrat } from "@remotion/google-fonts/Montserrat";

const { fontFamily: cardo } = loadFont("normal", { weights: ["400", "700"] });
const { fontFamily: montserrat } = loadMontserrat("normal", {
  weights: ["300", "400"],
});

const DEEP_GREEN = "#1C352D";
const CREAM = "#F8F0E5";
const SAGE = "#8CA399";
const RED = "#CC4444";
const BLACK = "#000000";

// Frame offsets (25fps)
const S1 = 0;    // 0–2s   (50 frames)
const S2 = 50;   // 2–6s   (100 frames)
const S3 = 150;  // 6–10s  (100 frames)
const S4 = 250;  // 10–16s (150 frames)
const S5 = 400;  // 16–20s (100 frames)
const S6 = 500;  // 20–24s (100 frames)

// ─────────────────────────────────────────────
// SCENE 1 — THE HOOK (black screen, text slams)
// ─────────────────────────────────────────────
const Scene1: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const f = frame - S1;

  const mk = (delay: number) =>
    interpolate(
      spring({ fps, frame: Math.max(0, f - delay), durationInFrames: 8, config: { stiffness: 200, damping: 20 } }),
      [0, 1],
      [160, 0]
    );

  const line1Y = mk(0);
  const line2Y = mk(8);
  const line1Op = interpolate(f, [0, 6], [0, 1], { extrapolateRight: "clamp" });
  const line2Op = interpolate(f, [8, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const style: React.CSSProperties = {
    fontFamily: cardo,
    fontWeight: 700,
    fontSize: 72,
    color: CREAM,
    lineHeight: 1.25,
    textAlign: "center",
  };

  return (
    <AbsoluteFill
      style={{ background: BLACK, justifyContent: "center", alignItems: "center", padding: "0 60px" }}
    >
      <div>
        <div style={{ ...style, transform: `translateY(${line1Y}px)`, opacity: line1Op, marginBottom: 12 }}>
          A customer Googled
        </div>
        <div style={{ ...style, transform: `translateY(${line2Y}px)`, opacity: line2Op }}>
          your business last night.
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────
// SCENE 2 — THE PHONE (typing search, no results)
// ─────────────────────────────────────────────
const QUERY = "[Your Business Name]";

const Scene2: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const f = frame - S2;

  const phoneScale = interpolate(
    spring({ fps, frame: f, durationInFrames: 12, config: { stiffness: 180, damping: 22 } }),
    [0, 1],
    [0.75, 1]
  );
  const phoneOp = interpolate(f, [0, 8], [0, 1], { extrapolateRight: "clamp" });

  const typed = QUERY.slice(0, Math.min(Math.floor(f / 2), QUERY.length));
  const cursorVisible = f % 24 < 12;
  const typingDone = typed.length >= QUERY.length;

  const noResultsOp = interpolate(f, [QUERY.length * 2 + 4, QUERY.length * 2 + 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: DEEP_GREEN, justifyContent: "center", alignItems: "center" }}>
      <div style={{ transform: `scale(${phoneScale})`, opacity: phoneOp }}>
        <div
          style={{
            width: 380,
            height: 680,
            border: `3px solid ${CREAM}`,
            borderRadius: 44,
            background: "#F2F2F2",
            overflow: "hidden",
            padding: "56px 20px 20px",
            boxSizing: "border-box",
          }}
        >
          {/* Notch */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
            <div style={{ width: 72, height: 16, background: "#ccc", borderRadius: 8 }} />
          </div>

          {/* Google wordmark */}
          <div
            style={{
              textAlign: "center",
              fontSize: 34,
              fontWeight: 700,
              letterSpacing: "-1px",
              marginBottom: 18,
              lineHeight: 1,
            }}
          >
            <span style={{ color: "#4285F4" }}>G</span>
            <span style={{ color: "#EA4335" }}>o</span>
            <span style={{ color: "#FBBC05" }}>o</span>
            <span style={{ color: "#4285F4" }}>g</span>
            <span style={{ color: "#34A853" }}>l</span>
            <span style={{ color: "#EA4335" }}>e</span>
          </div>

          {/* Search bar */}
          <div
            style={{
              background: "white",
              borderRadius: 24,
              padding: "12px 18px",
              marginBottom: 20,
              boxShadow: "0 2px 10px rgba(0,0,0,0.12)",
              border: "1px solid #E0E0E0",
              minHeight: 48,
              display: "flex",
              alignItems: "center",
            }}
          >
            <span style={{ fontFamily: montserrat, fontSize: 15, color: "#333" }}>
              {typed}
              {!typingDone && (
                <span style={{ opacity: cursorVisible ? 1 : 0, borderRight: `2px solid #333`, marginLeft: 1 }} />
              )}
            </span>
          </div>

          {/* No results */}
          <div
            style={{
              opacity: noResultsOp,
              textAlign: "center",
              padding: "16px 12px",
            }}
          >
            <div style={{ fontFamily: montserrat, fontSize: 18, fontWeight: 600, color: RED, marginBottom: 8 }}>
              No results found.
            </div>
            <div style={{ fontFamily: montserrat, fontSize: 13, color: "#999" }}>
              Your search did not match any results.
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────
// SCENE 3 — THE COMPETITOR
// ─────────────────────────────────────────────
const Scene3: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const f = frame - S3;

  const phoneOp = interpolate(f, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  const competitorY = interpolate(
    spring({ fps, frame: Math.max(0, f - 8), durationInFrames: 12, config: { stiffness: 160, damping: 20 } }),
    [0, 1],
    [32, 0]
  );
  const competitorOp = interpolate(f, [8, 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const yoursOp = interpolate(f, [25, 38], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const overlayOp = interpolate(f, [52, 66], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: DEEP_GREEN, justifyContent: "center", alignItems: "center" }}>
      <div style={{ opacity: phoneOp }}>
        <div
          style={{
            width: 380,
            height: 680,
            border: `3px solid ${CREAM}`,
            borderRadius: 44,
            background: "#F2F2F2",
            overflow: "hidden",
            padding: "56px 20px 20px",
            boxSizing: "border-box",
          }}
        >
          {/* Notch */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
            <div style={{ width: 72, height: 16, background: "#ccc", borderRadius: 8 }} />
          </div>

          {/* Static search bar */}
          <div
            style={{
              background: "white",
              borderRadius: 24,
              padding: "12px 18px",
              marginBottom: 18,
              border: "1px solid #E0E0E0",
              boxShadow: "0 2px 10px rgba(0,0,0,0.12)",
              fontFamily: montserrat,
              fontSize: 15,
              color: "#333",
            }}
          >
            {QUERY}
          </div>

          {/* Competitor result */}
          <div
            style={{
              transform: `translateY(${competitorY}px)`,
              opacity: competitorOp,
              background: "white",
              borderRadius: 12,
              padding: "14px 16px",
              marginBottom: 10,
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 22, color: "#34A853", lineHeight: 1 }}>✓</span>
              <div>
                <div style={{ fontFamily: montserrat, fontSize: 15, fontWeight: 600, color: "#1A73E8" }}>
                  Sharma Web Solutions
                </div>
                <div style={{ fontFamily: montserrat, fontSize: 12, color: "#666" }}>
                  sharma-web.com · Kanpur, UP
                </div>
              </div>
            </div>
          </div>

          {/* Your business — greyed / crossed */}
          <div
            style={{
              opacity: yoursOp,
              background: "#EBEBEB",
              borderRadius: 12,
              padding: "14px 16px",
            }}
          >
            <div style={{ fontFamily: montserrat, fontSize: 15, color: "#AAAAAA", textDecoration: "line-through" }}>
              {QUERY}
            </div>
            <div style={{ fontFamily: montserrat, fontSize: 12, color: "#BBBBBB", marginTop: 2 }}>
              No website found
            </div>
          </div>
        </div>
      </div>

      {/* Bottom overlay */}
      <div
        style={{
          position: "absolute",
          bottom: 160,
          left: 60,
          right: 60,
          opacity: overlayOp,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: montserrat,
            fontWeight: 300,
            fontSize: 34,
            color: `rgba(248,240,229,0.70)`,
            lineHeight: 1.4,
          }}
        >
          They called your competitor.
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────
// SCENE 4 — THE STATS
// ─────────────────────────────────────────────
const Scene4: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const f = frame - S4;

  // Stat 1 — counter 0→81
  const stat1Y = interpolate(
    spring({ fps, frame: f, durationInFrames: 14, config: { stiffness: 200, damping: 20 } }),
    [0, 1],
    [60, 0]
  );
  const stat1Op = interpolate(f, [0, 10], [0, 1], { extrapolateRight: "clamp" });
  const count = Math.round(
    interpolate(f, [0, 42], [0, 81], { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) })
  );

  // Stat 2 — clip-path reveal
  const f2 = f - 50;
  const clip2 = interpolate(f2, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease),
  });
  const stat2Op = interpolate(f2, [0, 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Stat 3 — clip-path reveal
  const f3 = f - 100;
  const clip3 = interpolate(f3, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease),
  });
  const stat3Op = interpolate(f3, [0, 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: DEEP_GREEN,
        justifyContent: "center",
        alignItems: "center",
        padding: "0 60px",
      }}
    >
      <div style={{ width: "100%", textAlign: "center" }}>
        {/* Stat 1 */}
        <div style={{ transform: `translateY(${stat1Y}px)`, opacity: stat1Op, marginBottom: 56 }}>
          <div
            style={{
              fontFamily: cardo,
              fontSize: 140,
              fontWeight: 700,
              color: CREAM,
              lineHeight: 1,
              marginBottom: 10,
            }}
          >
            {count}
            <span style={{ fontSize: 72 }}>%</span>
          </div>
          <div style={{ fontFamily: montserrat, fontSize: 26, color: SAGE, fontWeight: 400 }}>
            of people Google before visiting
          </div>
        </div>

        {/* Stat 2 */}
        <div style={{ opacity: stat2Op, marginBottom: 40, overflow: "hidden" }}>
          <div
            style={{
              fontFamily: cardo,
              fontSize: 54,
              fontWeight: 700,
              color: CREAM,
              lineHeight: 1.2,
              clipPath: `inset(0 ${(1 - clip2) * 100}% 0 0)`,
            }}
          >
            You lose them in under 10 seconds
          </div>
        </div>

        {/* Stat 3 */}
        <div style={{ opacity: stat3Op, overflow: "hidden" }}>
          <div
            style={{
              fontFamily: cardo,
              fontSize: 50,
              fontWeight: 700,
              color: CREAM,
              lineHeight: 1.2,
              clipPath: `inset(0 ${(1 - clip3) * 100}% 0 0)`,
            }}
          >
            Every day without a website = lost money
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────
// SCENE 5 — THE TURN (cream flip)
// ─────────────────────────────────────────────
const Scene5: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const f = frame - S5;

  const textY = interpolate(
    spring({ fps, frame: f, durationInFrames: 14, config: { stiffness: 200, damping: 20 } }),
    [0, 1],
    [100, 0]
  );
  const textOp = interpolate(f, [0, 12], [0, 1], { extrapolateRight: "clamp" });

  const lineW = interpolate(f, [14, 34], [0, 200], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease),
  });

  const style: React.CSSProperties = {
    fontFamily: cardo,
    fontWeight: 700,
    fontSize: 72,
    color: DEEP_GREEN,
    lineHeight: 1.2,
    textAlign: "center",
  };

  return (
    <AbsoluteFill
      style={{ background: CREAM, justifyContent: "center", alignItems: "center", padding: "0 60px" }}
    >
      <div style={{ textAlign: "center" }}>
        <div style={{ transform: `translateY(${textY}px)`, opacity: textOp }}>
          <div style={{ ...style, marginBottom: 14 }}>Your website is your</div>
          <div style={{ ...style, marginBottom: 44 }}>first impression.</div>
        </div>
        <div
          style={{
            height: 2,
            width: lineW,
            background: DEEP_GREEN,
            margin: "0 auto",
            opacity: textOp,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────
// SCENE 6 — KAIROS CLOSE
// ─────────────────────────────────────────────
const Scene6: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const f = frame - S6;

  const logoOp = interpolate(f, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  const textY = interpolate(
    spring({ fps, frame: Math.max(0, f - 15), durationInFrames: 14, config: { stiffness: 180, damping: 22 } }),
    [0, 1],
    [40, 0]
  );
  const textOp = interpolate(f, [15, 34], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const contactOp = interpolate(f, [35, 54], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Final breath: entire frame scales 1 → 1.02 over last 8 frames
  const breathScale = interpolate(f, [92, 100], [1, 1.02], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease),
  });

  return (
    <AbsoluteFill
      style={{
        background: DEEP_GREEN,
        justifyContent: "center",
        alignItems: "center",
        transform: `scale(${breathScale})`,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0,
          textAlign: "center",
        }}
      >
        {/* Logo mark */}
        <div style={{ opacity: logoOp, marginBottom: 28 }}>
          <Img
            src={staticFile("kairos-mark-light.png")}
            style={{ width: 110, height: 110, objectFit: "contain" }} />
        </div>

        {/* KAIROS wordmark */}
        <div style={{ transform: `translateY(${textY}px)`, opacity: textOp, marginBottom: 28 }}>
          <div
            style={{
              fontFamily: cardo,
              fontWeight: 700,
              fontSize: 56,
              color: CREAM,
              letterSpacing: 12,
            }}
          >
            KAIROS
          </div>
        </div>

        {/* Contact info */}
        <div
          style={{
            opacity: contactOp,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 14,
          }}
        >
          <div style={{ fontFamily: montserrat, fontWeight: 300, fontSize: 22, color: SAGE }}>
            kairosbuilds.in@gmail.com
          </div>
          <div
            style={{
              fontFamily: montserrat,
              fontWeight: 300,
              fontSize: 20,
              color: `rgba(140,163,153,0.60)`,
            }}
          >
            @kairosbuilds.in
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────
// ROOT COMPOSITION
// ─────────────────────────────────────────────
export const KairosReel: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ background: DEEP_GREEN }}>
      <Sequence from={S1} durationInFrames={50}>
        <Scene1 frame={frame} fps={fps} />
      </Sequence>
      <Sequence from={S2} durationInFrames={100}>
        <Scene2 frame={frame} fps={fps} />
      </Sequence>
      <Sequence from={S3} durationInFrames={100}>
        <Scene3 frame={frame} fps={fps} />
      </Sequence>
      <Sequence from={S4} durationInFrames={150}>
        <Scene4 frame={frame} fps={fps} />
      </Sequence>
      <Sequence from={S5} durationInFrames={100}>
        <Scene5 frame={frame} fps={fps} />
      </Sequence>
      <Sequence from={S6} durationInFrames={100}>
        <Scene6 frame={frame} fps={fps} />
      </Sequence>
    </AbsoluteFill>
  );
};
