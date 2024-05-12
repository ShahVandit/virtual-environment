import { useAudio } from "@/controller/AudioSpeaker";
import { Vector2 } from "@/providers/playerData";
import { Container, Graphics, Sprite, Text, useTick } from "@pixi/react";
import { SCALE_MODES, TextStyle, Texture } from "pixi.js";
import { useMemo } from "react";

type Props = {
  position: Vector2;
  backgroundZIndex: number;
};

const BASE_SCALE = 2;

export const SpatialAudioSpeaker = ({ position, backgroundZIndex }: Props) => {
  const { participant } = useAudio();

  const speakerTexture = useMemo(() => {
    return Texture.from("/world/boombox.png", {
      scaleMode: SCALE_MODES.NEAREST,
    });
  }, []);

  return (
    <Container
      zIndex={position.y}
      sortableChildren={true}
      anchor={[0.5, 0.05]}
      position={position}
    >
      {participant && (
        <Text
          anchor={[0.5, 0.9]}
          x={0}
          y={-60}
          text={`${participant}'s Speaker`}
          style={
            new TextStyle({
              fill: "0xffffff",
              stroke: "0x000000",
              strokeThickness: 4,
            })
          }
        />
      )}
      <Sprite
        position={[0, 0]}
        scale={BASE_SCALE}
        anchor={[0.5, 0.5]}
        texture={speakerTexture}
      />
      <Graphics
        x={0}
        y={0}
        zIndex={backgroundZIndex + 1}
        draw={(g) => {
          g.clear();
          g.beginFill(0x000000, 0.2);
          g.drawEllipse(0, 14, 35, 15);
          g.endFill();
        }}
      />
    </Container>
  );
};
