// src/controllers/useBackgroundAudio.ts
import { createContext, useContext } from 'react';
import { TrackWithIdentity } from "@/util/useAudioTracksByName";

export type BackgroundAudioData = {
  audioTrack: TrackWithIdentity | null;
  audioParticipant: string | null;
  isLocalPlaying: boolean;
  isRemotePlaying: boolean;
  playAudio: () => Promise<void>;
  stopAudio: () => Promise<void>;
};

export const defaultBackgroundAudioData: BackgroundAudioData = {
  audioTrack: null,
  audioParticipant: null,
  isLocalPlaying: false,
  isRemotePlaying: false,
  playAudio: () => Promise.resolve(),
  stopAudio: () => Promise.resolve(),
};

export const BackgroundAudioContext = createContext<BackgroundAudioData>(defaultBackgroundAudioData);

export function useBackgroundAudio() {
  const context = useContext(BackgroundAudioContext);
  if (!context) {
    throw new Error("useBackgroundAudio must be used within a BackgroundAudioProvider");
  }
  return context;
}
