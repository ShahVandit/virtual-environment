import { PointerEvent } from 'react';
import React, { useState } from 'react';
import { Graphics as GraphicsComponent } from '@pixi/react';

interface Props {
  initialValue: number;  // This should be a value from 50 to 250
  backgroundZIndex: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}

interface PixiPointerData {
  global: {
    x: number;
    y: number;
  };
}

interface PixiPointerEvent extends PointerEvent {
  data: PixiPointerData;
}

const Slider = ({ initialValue, min = 50, max = 250, onChange }: Props) => {
  const [value, setValue] = useState(initialValue - min);
  const [isDragging, setIsDragging] = useState(false);

  const handleSliderChange = (newValue: number) => {
    const radius = (newValue) + 50;
    console.log(newValue, radius)
    setValue(newValue);
    onChange(radius);
  };

  const handlePointerDown = (event: PixiPointerEvent) => {
    setIsDragging(true);
    handleSliderChange(getSliderValueFromEvent(event));
  };

  const handlePointerMove = (event: PixiPointerEvent) => {
    if (isDragging) {
      handleSliderChange(getSliderValueFromEvent(event));
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const getSliderValueFromEvent = (event: PixiPointerEvent) => {
    const localX = event.data.global.x - 10;
    const normalizedPosition = Math.max(0, Math.min(1, (localX / 200)));
    return normalizedPosition * (max - min);
  };

  return (
    <>
      <GraphicsComponent
        zIndex={1000}
        draw={(g) => {
          g.clear();
          g.beginFill(0xffffff);
          g.drawRect(10, 10, 200, 10);
          g.endFill();

          g.beginFill(0xff0000);
          g.drawRect(10, 10, ((value / (max - min)) * 200), 10);
          g.endFill();
        }}
        interactive={true}
        cursor="pointer"
        pointerdown={handlePointerDown}
        pointermove={handlePointerMove}
        pointerup={handlePointerUp}
        pointerupoutside={handlePointerUp}
      />
    </>
  );
};

export default Slider;