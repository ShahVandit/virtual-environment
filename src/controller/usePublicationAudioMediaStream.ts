import { useState, useEffect } from 'react';
import { TrackPublication, LocalTrackPublication } from 'livekit-client';

export const usePublicationAudioMediaStream = (trackPublication: TrackPublication) => {
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    const handleSubscribed = (track: any) => {
      if (track.kind !== 'audio') return;
      setMediaStream(track.mediaStream || null);
    };

    trackPublication.on('subscribed', handleSubscribed);

    if (
      trackPublication.track &&
      trackPublication.track.kind === 'audio'
    ) {
      setMediaStream(new MediaStream([trackPublication.track.mediaStreamTrack]));
    }

    return () => {
      trackPublication.off('subscribed', handleSubscribed);
    };
  }, [trackPublication]);

  return mediaStream;
};
