import React, { useEffect, useMemo } from 'react';
import { TrackPublication, RemoteTrackPublication } from 'livekit-client';
import { PublicationRenderer } from './PublicationRenderer';
import { Vector2 } from '@/model/Vector2';

type SpatialPublicationPlaybackProps = {
  maxHearableDistance: number;
  trackPublication: TrackPublication;
  myPosition: Vector2;
  position: Vector2;
};

export const HRTFPlayback: React.FC<SpatialPublicationPlaybackProps> = ({
  maxHearableDistance,
  trackPublication,
  myPosition,
  position,
}) => {
  const distance = useMemo(() => {
    const dx = myPosition.x - position.x;
    const dy = myPosition.y - position.y;
    return Math.sqrt(dx * dx + dy * dy);
  }, [myPosition, position]);

  const hearable = distance <= maxHearableDistance;

  useEffect(() => {
    if (trackPublication instanceof RemoteTrackPublication) {
      trackPublication.setSubscribed(hearable);
    }
  }, [hearable, trackPublication]);

  return (
    <div>
      {hearable ? (
        <PublicationRenderer
          trackPublication={trackPublication}
          position={position}
          myPosition={myPosition}
          maxHearableDistance={maxHearableDistance}
        />
      ) : null}
    </div>
  );
};
