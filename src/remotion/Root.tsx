import React from "react";
import { Composition } from "remotion";
import { KairosReel } from "./KairosReel";
import { KairosReel3 } from "./KairosReel3";
import { KairosReel5 } from "./KairosReel5";

export const Root: React.FC = () => (
  <>
    <Composition
      id="KairosReel"
      component={KairosReel}
      durationInFrames={600}
      fps={25}
      width={1080}
      height={1920}
    />
    <Composition
      id="KairosReel3"
      component={KairosReel3}
      durationInFrames={660}
      fps={30}
      width={1080}
      height={1920}
    />
    <Composition
      id="KairosReel5"
      component={KairosReel5}
      durationInFrames={1800}
      fps={30}
      width={1080}
      height={1920}
    />
  </>
);
