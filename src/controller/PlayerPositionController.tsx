// PlayerPositionController.tsx
"use-client";

import { Vector2 } from "@/providers/playerData";
import {
  useConnectionState,
  useLocalParticipant,
  useRemoteParticipants,
  useRoomContext,
} from "@livekit/components-react";
import { ConnectionState, DataPacket_Kind, RemoteParticipant, RoomEvent } from "livekit-client";
import React, { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useRef } from "react";
import { useInterval } from "react-use";
import { sendDataChannelMessage } from "@/providers/sendDataChannelMessage";

type PlayerPositionControllerProps = {
  playerPosition: Vector2;
  setRemotePlayerPositions: Dispatch<SetStateAction<Map<string, Vector2>>>;
};

export function PlayerPositionController({
  playerPosition,
  setRemotePlayerPositions,
}: PlayerPositionControllerProps) {
  // LiveKit state
  const roomContext = useRoomContext();
  const connectionState = useConnectionState();
  const remoteParticipants = useRemoteParticipants({});
  const { localParticipant } = useLocalParticipant();

  // Player position state
  const playerPositionsRef = useRef<Map<string, { x: number; y: number }>>(new Map());
  const playerPositionRef = useRef<Vector2>(playerPosition);
  const positionSendLockRef = useRef(false);
  const textEncoderRef = useRef(new TextEncoder());
  const textDecoderRef = useRef(new TextDecoder());

  const handleDataChannelMessage = useCallback(
    (payload: Uint8Array, participant: RemoteParticipant | undefined) => {
      if (!participant) return;
      const data = JSON.parse(textDecoderRef.current.decode(payload));
      if (data.channelId === "position") {
        const { x, y } = data.payload;
        playerPositionsRef.current.set(participant.identity, { x, y });
      }
    },
    []
  );

  // Setup data channel listener
  useEffect(() => {
    roomContext.on(RoomEvent.DataReceived, handleDataChannelMessage);

    return () => {
      roomContext.off(RoomEvent.DataReceived, handleDataChannelMessage);
    };
  }, [handleDataChannelMessage, roomContext]);

  // Update player position ref
  useEffect(() => {
    playerPositionRef.current = playerPosition;
  }, [playerPosition]);

  const sendPlayerPosition = useCallback(async () => {
    if (positionSendLockRef.current) return;
    positionSendLockRef.current = true;
    try {
      await sendDataChannelMessage(
        localParticipant,
        { payload: playerPositionRef.current, channelId: "position" },
        textEncoderRef.current
      );
    } finally {
      positionSendLockRef.current = false;
    }
  }, [localParticipant]);

  const remoteParticipantIdentities = useMemo(() => {
    return new Set(remoteParticipants.map((p) => p.identity));
  }, [remoteParticipants]);

  // Clean up positions for participants that have left
  useEffect(() => {
    const positionIdentities = Array.from(playerPositionsRef.current.keys());
    for (const identity of positionIdentities) {
      if (!remoteParticipantIdentities.has(identity)) {
        playerPositionsRef.current.delete(identity);
      }
    }
  }, [remoteParticipantIdentities]);

  const updateRemotePlayerPositions = useCallback(() => {
    setRemotePlayerPositions(new Map(playerPositionsRef.current));
  }, [setRemotePlayerPositions]);

  const sendPositionUpdate = useCallback(() => {
    if (connectionState !== ConnectionState.Connected) return;
    sendPlayerPosition();
  }, [connectionState, sendPlayerPosition]);

  useInterval(updateRemotePlayerPositions, 100);
  useInterval(sendPositionUpdate, 100);

  return null;
}
