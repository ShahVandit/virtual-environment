import { WorldBoundaries } from "@/model/WorldBoundaries";
import { Sprite } from "@pixi/react";
import {useState} from 'react'
import Slider from "./Slider";
type Props = {
  worldBoundaries: WorldBoundaries;
  backgroundZIndex: number;
};


export const World = ({ worldBoundaries, backgroundZIndex }: Props) => {
  const [earshotRadius, setEarshotRadius] = useState(150);

  const handleEarshotRadiusChange = (value:any) => {
    setEarshotRadius(value);
  }
  const imageWidth = worldBoundaries.maxX - worldBoundaries.minX;
  const imageHeight = worldBoundaries.maxY - worldBoundaries.minY;
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