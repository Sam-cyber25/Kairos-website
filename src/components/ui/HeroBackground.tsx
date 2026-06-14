import { GrainGradient } from "@paper-design/shaders-react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export function HeroBackground() {
  const reducedMotion = useReducedMotion();

  return (
    <div
      style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}
      aria-hidden="true"
    >
      <GrainGradient
        style={{ width: "100%", height: "100%" }}
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
        speed={reducedMotion ? 0 : 0.35}
      />
    </div>
  );
}
