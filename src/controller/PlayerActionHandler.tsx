import { Inputs, Player } from "@/providers/playerData";
import { useTick } from "@pixi/react";
import { Dispatch, SetStateAction } from "react";

type Props = {
  playerSpeed: number;
  inputs: Inputs;
  setMyPlayer: Dispatch<SetStateAction<Player | null>>;
};

export function PlayerActionHandler({
  playerSpeed,
  inputs,
  setMyPlayer,
}: Props) {
  useTick((delta) => {
    setMyPlayer((prev) => {
      if (!prev) {
        return prev;
      }

      const magnitude = Math.sqrt(
        inputs.direction.x ** 2 + inputs.direction.y ** 2
      );
      let newAnimation = prev.animation;
      let newPosition = { ...prev.position };
      let walking = magnitude > 0.01;

      const velocity = {
        x: magnitude > 0 ? (inputs.direction.x * playerSpeed) / magnitude : 0,
        y: magnitude > 0 ? (inputs.direction.y * playerSpeed) / magnitude : 0,
      };

      newAnimation='walk'

      newPosition = {
        x: prev.position.x + velocity.x * delta,
        y: prev.position.y + velocity.y * delta,
      };

      return { ...prev, position: newPosition, animation: newAnimation };
    });
  });
  return null;
}
