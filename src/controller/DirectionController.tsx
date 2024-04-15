import { Inputs } from "@/model/Inputs";
import { Dispatch, SetStateAction, useEffect } from "react";

interface InputControllerProps {
  updateInputs: Dispatch<SetStateAction<Inputs>>;
}

export function DirectionController({ updateInputs }: InputControllerProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      updateInputs(currentInputs => ({
        ...currentInputs,
        direction: {
          x: event.key === "ArrowLeft" || event.key === "a" ? -1 : event.key === "ArrowRight" || event.key === "d" ? 1 : currentInputs.direction.x,
          y: event.key === "ArrowUp" || event.key === "w" ? -1 : event.key === "ArrowDown" || event.key === "s" ? 1 : currentInputs.direction.y,
        },
      }));
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      updateInputs(currentInputs => ({
        ...currentInputs,
        direction: {
          x: (event.key === "ArrowLeft" || event.key === "a" || event.key === "ArrowRight" || event.key === "d") && currentInputs.direction.x !== 0 ? 0 : currentInputs.direction.x,
          y: (event.key === "ArrowUp" || event.key === "w" || event.key === "ArrowDown" || event.key === "s") && currentInputs.direction.y !== 0 ? 0 : currentInputs.direction.y,
        },
      }));
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [updateInputs]);

  return null;
}
