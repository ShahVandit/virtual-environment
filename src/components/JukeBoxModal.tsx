import { useCallback, useEffect, useMemo } from "react";
import { useJukeBox } from "@/controller/JukeBoxProvider";

export const JukeBoxModal = () => {
  const {
    playJukeBox,
    amIPlayingJukeBox,
    stopJukeBox,
    jukeBoxParticipant,
    someoneElsePlayingJukeBox,
  } = useJukeBox();

  const inner = useMemo(() => {
    if (amIPlayingJukeBox) {
      // I'm playing
      return (
        <div className="text-neutral-200">
          Press <span className="font-bold">[x]</span> to stop.
        </div>
      );
    } else if (jukeBoxParticipant !== null) {
      // Someone else is playing
      return (
        <div className="text-neutral-200">
          <span className="font-bold">{jukeBoxParticipant}</span> is playing to the speaker.
        </div>
      );
    } else {
      // No one is playing
      return (
        <div className="text-white bg-blue-900 rounded-lg p-4 max-w-xs border border-blue-700 shadow-lg">
       Press <span className="font-bold text-red-500">[x]</span> to play.
</div>

      );
    }
  }, [
    amIPlayingJukeBox,
    jukeBoxParticipant,
    someoneElsePlayingJukeBox,
  ]);

  const keyDownListener = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "x") {
        if (amIPlayingJukeBox) {
          stopJukeBox();
        } else if (!someoneElsePlayingJukeBox) {
          playJukeBox();
        }
      }
    },
    [amIPlayingJukeBox, playJukeBox, stopJukeBox, someoneElsePlayingJukeBox]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyDownListener);
    return () => {
      document.removeEventListener("keydown", keyDownListener);
    };
  }, [keyDownListener]);

  return (
    <div className="flex flex-col items-center p-4 bg-neutral rounded-md">
      {inner}
    </div>
  );
};
