// PlayerAnimationController.tsx
"use-client";

import { AnimationState } from "@/providers/playerData";
import {
  useLocalParticipant,
  useRemoteParticipants,
  useRoomContext,
} from "@livekit/components-react";
import { DataPacket_Kind, RemoteParticipant, RoomEvent } from "livekit-client";
import React, { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useRef } from "react";
import { useInterval } from "react-use";
import { sendDataChannelMessage } from "@/providers/sendDataChannelMessage";

type PlayerAnimationControllerProps = {
  playerAnimation: AnimationState;
  setRemotePlayerAnimations: Dispatch<SetStateAction<Map<string, AnimationState>>>;
};

export function PlayerAnimationController({
  playerAnimation,
  setRemotePlayerAnimations,
}: PlayerAnimationControllerProps) {
  // LiveKit state
  const roomContext = useRoomContext();
  const remoteParticipants = useRemoteParticipants({});
  const { localParticipant } = useLocalParticipant();

  // Player animation state
  const playerAnimationsRef = useRef<Map<string, AnimationState>>(new Map());
  const playerAnimationRef = useRef<AnimationState>(playerAnimation);
  const animationSendLockRef = useRef(false);
  const textEncoderRef = useRef(new TextEncoder());
  const textDecoderRef = useRef(new TextDecoder());

  const handleDataChannelMessage = useCallback(
    (payload: Uint8Array, participant: RemoteParticipant | undefined) => {
      if (!participant) return;
      const data = JSON.parse(textDecoderRef.current.decode(payload));
      if (data.channelId === "animation") {
        playerAnimationsRef.current.set(participant.identity, data.payload);
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

  // Update player animation ref
  useEffect(() => {
    playerAnimationRef.current = playerAnimation;
  }, [playerAnimation]);

  const sendPlayerAnimation = useCallback(async () => {
    if (animationSendLockRef.current) return;
    animationSendLockRef.current = true;
    try {
      await sendDataChannelMessage(
        localParticipant,
        { payload: playerAnimationRef.current, channelId: "animation" },
        textEncoderRef.current
      );
    } finally {
      animationSendLockRef.current = false;
    }
  }, [localParticipant]);

  const remoteParticipantIdentities = useMemo(() => {
    return new Set(remoteParticipants.map((p) => p.identity));
  }, [remoteParticipants]);

  // Clean up animations for participants that have left
  useEffect(() => {
    const animationIdentities = Array.from(playerAnimationsRef.current.keys());
    for (const identity of animationIdentities) {
      if (!remoteParticipantIdentities.has(identity)) {
        playerAnimationsRef.current.delete(identity);
      }
    }
  }, [remoteParticipantIdentities]);

  const updateRemotePlayerAnimations = useCallback(() => {
    setRemotePlayerAnimations(new Map(playerAnimationsRef.current));
  }, [setRemotePlayerAnimations]);

  const sendAnimationUpdate = useCallback(() => {
    sendPlayerAnimation();
  }, [sendPlayerAnimation]);

  useInterval(updateRemotePlayerAnimations, 100);
  useInterval(sendAnimationUpdate, 100);

  return null;
}
