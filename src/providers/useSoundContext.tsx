import React, { useContext } from "react";

export const SoundContext = React.createContext<AudioContext | undefined>(
  undefined
);

export function useSoundContext() {
  const ctx = useContext(SoundContext);
  if (!ctx) {
    throw new Error("useSoundContext must be used within a SoundProvider");
  }
  return ctx;
}
