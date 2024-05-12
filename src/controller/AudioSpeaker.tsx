import { useCallback, useMemo, useRef } from "react";
import React, { useContext } from "react";
import {
  useLocalParticipant,
  useRemoteParticipants,
} from "@livekit/components-react";
import { useUnmount } from "react-use";
import { StreamWithIdentity, useStreamsByType } from "@/providers/StreamSubscriber";

import { useSoundContext } from "@/providers/useSoundContext";
import { LocalTrack, LocalTrackPublication, Track } from "livekit-client";

type Data = {
  track: StreamWithIdentity | null;
  amIPlaying: boolean;
  participant: string | null;
  someoneElsePlaying: boolean;
  play: () => Promise<void>;
  stop: () => Promise<void>;
};

const defaultData: Data = {
  track: null,
  participant: null,
  amIPlaying: false,
  someoneElsePlaying: false,
  play: () => Promise.resolve(),
  stop: () => Promise.resolve(),
};

type Props = {
  children: React.ReactNode;
};

export const AudioContext = React.createContext<Data>(defaultData);

export const AudioProvider = ({ children }: Props) => {
  const { localParticipant } = useLocalParticipant();
  const existingTracks = useStreamsByType("audio");
  const audioContext = useSoundContext();

  const audioElContainer = useRef<HTMLDivElement | null>(null);
  const audioEl = useRef<HTMLAudioElement | null>(null);
  const source = useRef<MediaElementAudioSourceNode | null>(null);
  const sink = useRef<MediaStreamAudioDestinationNode | null>(null);

  const track = useMemo(() => {
    return existingTracks[0] || null;
  }, [existingTracks]);

  const participant = useMemo(
    () => track?.identity || null,
    [track?.identity]
  );

  const amIPlaying = useMemo(
    () =>
      existingTracks.findIndex(
        (t) => t.identity === localParticipant.identity
      ) > -1,
    [existingTracks, localParticipant.identity]
  );

  const cleanup = useRef(() => {
    if (sink.current) sink.current.disconnect();
    if (source.current) source.current.disconnect();
    if (audioEl.current) {
      audioEl.current.pause();
      audioEl.current.remove();
    }
  });

  const stop = useCallback(async () => {
    cleanup.current();
    const myTracks = existingTracks
      .filter((t) => t.stream instanceof LocalTrackPublication && t.stream.track)
      .map((t) => t.stream.track as LocalTrack);
    myTracks.forEach((t) => localParticipant.unpublishTrack(t));
  }, [existingTracks, localParticipant]);

  const play = useCallback(async () => {
    if (!audioElContainer.current) return;

    // Stop any existing audio
    await stop();

    audioEl.current = new Audio("/water.wav");
    audioEl.current.setAttribute("muted", "false");
    audioEl.current.setAttribute("loop", "true");
    audioEl.current.setAttribute("autoplay", "true");
    audioElContainer.current.appendChild(audioEl.current);
    source.current = audioContext.createMediaElementSource(audioEl.current);
    sink.current = audioContext.createMediaStreamDestination();
    source.current.connect(sink.current);
    localParticipant.publishTrack(sink.current.stream.getAudioTracks()[0], {
      name: "audio",
      source: Track.Source.Unknown,
    });
  }, [audioContext, localParticipant, stop]);

  useUnmount(cleanup.current);

  return (
    <AudioContext.Provider
      value={{
        track,
        participant,
        amIPlaying,
        someoneElsePlaying:
          existingTracks.length > 0 && !amIPlaying,
        play,
        stop,
      }}
    >
      {children}
      <div ref={audioElContainer} />
    </AudioContext.Provider>
  );
};

export function useAudio() {
  const ctx = useContext(AudioContext);
  if (!ctx) {
    throw "useAudio must be used within a AudioProvider";
  }
  return ctx;
}
