import React from "react";
import { Composition } from "remotion";
import { KairosReel } from "./KairosReel";

export const Root: React.FC = () => (
  <Composition
    id="KairosReel"
    component={KairosReel}
    durationInFrames={600}
    fps={25}
    width={1080}
    height={1920}
  />
);
