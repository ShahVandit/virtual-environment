import { useState, useEffect } from 'react';
import { TrackPublication, LocalTrackPublication } from 'livekit-client';

export const AudioMediaStream = (trackPublication: TrackPublication) => {
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);

  // handling track publications
  useEffect(() => {
    const handleSubscribed = (track: any) => {
      if (track.kind !== 'audio') return;
      setMediaStream(track.mediaStream || null);
    };

    trackPublication.on('subscribed', handleSubscribed);
    // creating new audio stream with audio
    if (
      trackPublication.track &&
      trackPublication.track.kind === 'audio'
    ) {
      setMediaStream(new MediaStream([trackPublication.track.mediaStreamTrack]));
    }
    // unsubscribe event listeners 
    return () => {
      trackPublication.off('subscribed', handleSubscribed);
    };
  }, [trackPublication]);

  return mediaStream;
};
