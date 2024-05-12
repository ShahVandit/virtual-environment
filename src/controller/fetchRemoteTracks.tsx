import { Vector2 } from "@/providers/playerData";
import { TrackReference } from "@livekit/components-core";
import { useTracks } from "@livekit/components-react";
import { Player } from "@/providers/playerData";
import {
  Participant,
  RoomEvent,
  Track,
  TrackPublication,
} from "livekit-client";
import { useEffect, useMemo, useState } from "react";
import { TrackPosition } from "./HRTFController";

type Props = {
  speakerPosition: Vector2;
  remotePlayers: Player[];
};

export const fetchRemoteTracks = ({
  speakerPosition,
  remotePlayers,
}: Props) => {
  const [sourceFilter] = useState([
    Track.Source.Microphone,
    Track.Source.Unknown,
  ]);
  const [sourceOptions] = useState({
    updateOnlyOn: [
      RoomEvent.TrackPublished,
      RoomEvent.TrackUnpublished,
      RoomEvent.ParticipantConnected,
      RoomEvent.Connected,
    ],
    onlySubscribed: false,
  });
  const trackParticipantPairs = useTracks(sourceFilter, sourceOptions);
  const data: TrackPosition[] = useMemo(() => {
    const microphoneTrackLookup = new Map<string, TrackReference>();
    let speakerPublication: TrackPublication | null = null;
    let speakerParticipant: Participant | null = null;

    trackParticipantPairs.forEach((tpp) => {
      if (tpp.publication.trackName === "audio") {
        speakerPublication = tpp.publication;
        speakerParticipant = tpp.participant;
        return;
      }

      microphoneTrackLookup.set(tpp.participant.identity, tpp);
    });

    const result = remotePlayers
      .filter((player) => microphoneTrackLookup.has(player.username))
      .map((player) => {
        return {
          trackPublication: microphoneTrackLookup.get(player.username)!.publication,
          participant: microphoneTrackLookup.get(player.username)!.participant,
          position: player.position,
        };
      });

    if (speakerPublication) {
      result.push({
        trackPublication: speakerPublication,
        position: speakerPosition,
        participant: speakerParticipant!,
      });
    }
    return result;
  }, [trackParticipantPairs, remotePlayers, speakerPosition]);

  return data;
};
