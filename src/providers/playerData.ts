import { useState } from "react";
export type Vector2 = {
  x: number;
  y: number;
};

export type WorldBoundaries = {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
};

export type Inputs = {
  direction: Vector2;
};

export type AnimationState = "walk";

type AudioSpeakerState_Off = {
  type: "off";
};

type AudioSpeakerState_On = {
  type: "on";
  owner: string;
};

export type AudioSpeakerState = AudioSpeakerState_Off | AudioSpeakerState_On;

export type PlayerType = {
  // Define the expected type for the character if it is not a string
  id: string; // example if character is more complex than a string
};

export type Player = {
  username: string;
  position: Vector2;
  animation: AnimationState;
  character: PlayerType; // Update this to match the expected type in Avatar
};

// export type Player = {
//   username: string;
//   position: Vector2;
//   animation: AnimationState;
//   character: string
// };

export const useGameState = () => {
  const [inputs, setInputs] = useState<Inputs>({ direction: { x: 0, y: 0 } });
  const [myPlayer, setMyPlayer] = useState<Player | null>(null);
  const [remotePlayers, setRemotePlayers] = useState<Player[]>([]);
  const [networkPositions, setNetworkPositions] = useState<
    Map<string, Vector2>
  >(new Map());
  const [networkAnimations, setNetworkAnimations] = useState<
    Map<string, AnimationState>
  >(new Map());
  const [cameraOffset, setCameraOffset] = useState<Vector2>({ x: 0, y: 0 });
  const [speakerPosition, setSpeakerPosition] = useState<Vector2>({
    x: 0,
    y: -200,
  });
  const [speakerState, setSpeakerState] = useState<AudioSpeakerState>({
    type: "off",
  });

  return {
    inputs,
    myPlayer,
    remotePlayers,
    networkPositions,
    networkAnimations,
    worldBoundaries: { minX: -775, maxX: 780, minY: -790, maxY: 770 },
    cameraOffset,
    backgroundZIndex: -100000,
    earshotRadius: 300,
    playerSpeed: 6,
    speakerPosition,
    speakerState,

    setMyPlayer,
    setInputs,
    setRemotePlayers,
    setNetworkPositions,
    setNetworkAnimations,
    setCameraOffset,
    setSpeakerPosition,
    setSpeakerState,
  };
};
