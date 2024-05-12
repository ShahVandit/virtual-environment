import {
  useLocalParticipant,
  useRemoteParticipants,
} from "@livekit/components-react";
import { ParticipantEvent, TrackPublication } from "livekit-client";
import { useCallback, useEffect, useState } from "react";

export type StreamWithIdentity = {
  identity: string;
  stream: TrackPublication;
};

export const useStreamsByType = (type: string) => {
  const [streams, setStreams] = useState<StreamWithIdentity[]>([]);
  const remoteParticipants = useRemoteParticipants();
  const { localParticipant } = useLocalParticipant();

  const updateStreams = useCallback(() => {
    const remoteStreams: StreamWithIdentity[] = remoteParticipants
      .map((p) => ({
        identity: p.identity,
        stream: p.getTrackByName(type) as TrackPublication,
      }))
      .filter((s) => s.stream);
    const res = [...remoteStreams];
    if (localParticipant.getTrackByName(type)) {
      res.push({
        identity: localParticipant.identity,
        stream: localParticipant.getTrackByName(type) as TrackPublication,
      });
    }
    setStreams(res);
  }, [localParticipant, remoteParticipants, type]);

  const handleRemoteStreamPublished = useCallback(() => updateStreams(), [updateStreams]);

  const handleRemoteStreamUnpublished = useCallback(() => updateStreams(), [updateStreams]);

  const handleLocalStreamPublished = useCallback(() => updateStreams(), [updateStreams]);

  const handleLocalStreamUnpublished = useCallback(() => updateStreams(), [updateStreams]);

  useEffect(() => {
    updateStreams();

    remoteParticipants.forEach((p) => {
      p.on(ParticipantEvent.TrackPublished, handleRemoteStreamPublished);
      p.on(ParticipantEvent.TrackUnpublished, handleRemoteStreamUnpublished);
    });

    localParticipant.on(
      ParticipantEvent.LocalTrackPublished,
      handleLocalStreamPublished
    );
    localParticipant.on(
      ParticipantEvent.LocalTrackUnpublished,
      handleLocalStreamUnpublished
    );

    return () => {
      remoteParticipants.forEach((p) => {
        p.off(ParticipantEvent.TrackPublished, handleRemoteStreamPublished);
        p.off(ParticipantEvent.TrackUnpublished, handleRemoteStreamUnpublished);
      });

      localParticipant.off(
        ParticipantEvent.LocalTrackPublished,
        handleLocalStreamPublished
      );
      localParticipant.off(
        ParticipantEvent.LocalTrackUnpublished,
        handleLocalStreamUnpublished
      );
    };
  }, [
    localParticipant,
    remoteParticipants,
    handleLocalStreamPublished,
    handleLocalStreamUnpublished,
    handleRemoteStreamPublished,
    handleRemoteStreamUnpublished,
    updateStreams,
  ]);

  return streams;
};
