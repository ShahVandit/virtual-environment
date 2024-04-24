import React, { useMemo } from 'react';
import { Container, Sprite, Text } from '@pixi/react';
import { TextStyle } from 'pixi.js';
import { CharacterName } from "./CharacterSelector";
import { useImages } from '@/providers/imageprovider'; // Adjust import according to your project structure

type Props = {
  x: number;
  y: number;
  speaking: boolean;
  username: string;
  character: CharacterName;
};

export function Character1({
  x,
  y,
  username,
  speaking,
  character,
}: Props) {
  const images = useImages(); // This now refers to the hook that provides static images
  
  const textStyle = useMemo(() => {
    return new TextStyle({
      fill: '#ffffff',
      stroke: speaking ? 0x00ff00 : 0x000000,
      strokeThickness: speaking ? 6 : 4,
    });
  }, [speaking]);

  return (
    <Container position={[x, y]} zIndex={y} sortableChildren={true}>
      <Text
        anchor={[0.5, 1]}
        x={0}
        y={-60}
        text={username}
        style={textStyle}
      />
      {images[character] && (
        <Sprite
          anchor={[0.5, 0.65]}
        //   texture={images[character]}
        />
      )}
    </Container>
  );
}
