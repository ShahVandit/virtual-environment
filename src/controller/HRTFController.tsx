import React from 'react';
import { TrackPublication, RemoteTrackPublication } from 'livekit-client';
import { HRTFPlayback } from './HRTFPlayback';
import { useWebAudioContext } from '../providers/webAudio';
import { Vector2 } from '@/model/Vector2';

export type TrackPosition = {
  trackPublication: TrackPublication;
  position: Vector2;
};

type HRTFControllerProps = {
  trackPositions: TrackPosition[];
  myPosition: Vector2;
  maxHearableDistance: number;
};

export const HRTFController: React.FC<HRTFControllerProps> = ({
  myPosition,
  trackPositions,
  maxHearableDistance,
}) => {
  const audioContext = useWebAudioContext();
  if (!audioContext) return null;

  return (
    <>
      {trackPositions.map((tp) => (
        <HRTFPlayback
          trackPublication={tp.trackPublication}
          position={tp.position}
          myPosition={myPosition}
          maxHearableDistance={maxHearableDistance}
        />
      ))}
    </>
  );
};
