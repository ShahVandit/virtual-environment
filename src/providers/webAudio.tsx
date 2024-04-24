"use-client";

import React, { useContext } from "react";
// access web audio a
export const WebAudioContext = React.createContext<AudioContext | undefined>(
  undefined
);
// get webAudioContext
export function useWebAudioContext() {
  const ctx = useContext(WebAudioContext);
  if (!ctx) {
    throw "useWebAudio must be used within a WebAudioProvider";
  }
  return ctx;
}
