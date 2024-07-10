import { useCharacters } from "@/providers/CharacterProvider";
import { AnimatedSprite, Container, Text } from "@pixi/react";
import { TextStyle } from "pixi.js";
import { useEffect, useMemo } from "react";
import { PlayerType } from "@/providers/playerData";

type Props = {
  x: number;
  y: number;
  speaking: boolean;
  username: string;
  animation: "walk";
  character: PlayerType;
};

export function Avatar({
  x,
  y,
  username,
  animation,
  speaking,
  character,
}: Props) {
  const animationSheet = useCharacters(character);

  const { color:usernameOutlineColor, thickness:usernameOutlineThickness } =
    useMemo(() => {
      if (speaking) {
        return { color: 0x00ff00, thickness: 6 };
      } else {
        return { color: 0x000000, thickness: 4 };
      }
    }, [speaking]);

  const animationName = "walk"

  return (
    <Container position={[x, y]} zIndex={y} sortableChildren={true}>
      <Text
        anchor={[0.5, 1]}
        x={0}
        y={-60}
        text={username}
        style={
          new TextStyle({
            fill: "0xffffff",
            stroke: usernameOutlineColor,
            strokeThickness: usernameOutlineThickness,
          })
        }
      />
      {["walk"].map(
        (a) =>
          animationName === a && (
            <AnimatedSprite
              key={a}
              anchor={[0.5, 0.65]}
              isPlaying={true}
              animationSpeed={0.15}
              textures={animationSheet[animationName]}
            />
          )
      )}
    </Container>
  );
}