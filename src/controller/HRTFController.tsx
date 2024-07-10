import React from 'react';
import { TrackPublication, RemoteTrackPublication } from 'livekit-client';
import { HRTFPlayback } from './HRTFPlayback';
import { useSoundContext } from '../providers/useSoundContext';
import { Vector2 } from '@/providers/playerData';

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
  const audioContext = useSoundContext();
  if (!audioContext) return null;

  return (
    <>
      {trackPositions.map((tp) => (
        <HRTFPlayback key={Number(tp.trackPublication.trackSid)}
          trackPublication={tp.trackPublication}
          position={tp.position}
          myPosition={myPosition}
          maxHearableDistance={maxHearableDistance}
        />
      ))}
    </>
  );
};
