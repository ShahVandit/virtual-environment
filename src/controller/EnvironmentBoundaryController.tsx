import { Player } from "@/providers/playerData";
import { Dispatch, SetStateAction, useEffect } from "react";

type Props = {
  environmentBoundaries: { minX: number; maxX: number; minY: number; maxY: number };
  Player: Player;
  setPlayer: Dispatch<SetStateAction<Player | null>>;
};

export const EnvironmentBoundaryController = ({
  environmentBoundaries: { minX, maxX, minY, maxY },
  Player,
  setPlayer,
}: Props) => {
  useEffect(() => {
    if (Player.position.x < minX) {
      setPlayer(
        (prev) =>
          prev && {
            ...prev,
            position: { x: minX, y: prev.position.y },
          }
      );
      Player.position.x = minX;
    }
    if (Player.position.x > maxX) {
      setPlayer(
        (prev) =>
          prev && {
            ...prev,
            position: { x: maxX, y: prev.position.y },
          }
      );
      Player.position.x = maxX;
    }
    if (Player.position.y < minY) {
      setPlayer(
        (prev) =>
          prev && {
            ...prev,
            position: { x: prev.position.x, y: minY },
          }
      );
      Player.position.y = minY;
    }
    if (Player.position.y > maxY) {
      setPlayer(
        (prev) =>
          prev && {
            ...prev,
            position: { x: prev.position.x, y: maxY },
          }
      );
      Player.position.y = maxY;
    }
  }, [maxX, maxY, minX, minY, Player, setPlayer]);

  return null;
};
