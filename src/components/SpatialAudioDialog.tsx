import { useCallback, useEffect, useMemo } from "react";
import { useAudio } from "@/controller/AudioSpeaker";

export const SpatialAudioDialog = () => {
  const {
    play,
    amIPlaying,
    stop,
    participant,
    someoneElsePlaying,
  } = useAudio();

  const inner = useMemo(() => {
    if (amIPlaying) {
      // I'm playing
      return (
        <div className="text-neutral-200">
          Press <span className="font-bold">[x]</span> to stop.
        </div>
      );
    } else if (participant !== null) {
      // Someone else is playing
      return (
        <div className="text-neutral-200">
          <span className="font-bold">{participant}</span> is playing to the speaker.
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
    amIPlaying,
    participant,
    someoneElsePlaying,
  ]);

  const keyDownListener = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "x") {
        if (amIPlaying) {
          stop();
        } else if (!someoneElsePlaying) {
          play();
        }
      }
    },
    [amIPlaying, play, stop, someoneElsePlaying]
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
