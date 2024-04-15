import React from 'react';
import { TrackPublication, RemoteTrackPublication } from 'livekit-client';
import { HRTFPlayback } from './SpatialPublicationPlayback';
import { useWebAudioContext } from '../providers/audio/webAudio';
import { Vector2 } from '@/model/Vector2';

export type TrackPosition = {
  trackPublication: TrackPublication;
  position: Vector2;
};

type SpatialAudioControllerProps = {
  trackPositions: TrackPosition[];
  myPosition: Vector2;
  maxHearableDistance: number;
};

export const SpatialAudioController: React.FC<SpatialAudioControllerProps> = ({
  trackPositions,
  myPosition,
  maxHearableDistance,
}) => {
  const audioContext = useWebAudioContext();
  if (!audioContext) return null;

  return (
    <>
      {trackPositions.map((tp) => (
        <HRTFPlayback
          key={tp.trackPublication.trackSid}
          trackPublication={tp.trackPublication}
          position={tp.position}
          myPosition={myPosition}
          maxHearableDistance={maxHearableDistance}
        />
      ))}
    </>
  );
};
