import { WorldBoundaries } from "@/providers/playerData";
import { Sprite } from "@pixi/react";
import { useState } from 'react'
import Slider from "./Slider";

type Props = {
  environmentBoundaries: WorldBoundaries;
  backgroundZIndex: number;
};

export const Environment = ({ environmentBoundaries, backgroundZIndex }: Props) => {
  const imageWidth = environmentBoundaries.maxX - environmentBoundaries.minX;
  const imageHeight = environmentBoundaries.maxY - environmentBoundaries.minY;
  return (
    <Sprite
      anchor={[0.5, 0.5]}
      zIndex={backgroundZIndex}
      image="/world/images21.jpeg"
      width={imageWidth}
      height={imageHeight}
    />
  );
};
