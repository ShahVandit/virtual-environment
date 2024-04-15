import React, { useEffect, useRef, useCallback } from 'react';
import { TrackPublication } from 'livekit-client';
import { useWebAudioContext } from '../providers/audio/webAudio';
import { usePublicationAudioMediaStream } from './usePublicationAudioMediaStream'; // This hook should be in its own file.
import { Vector2 } from '@/model/Vector2';

type PublicationRendererProps = {
  trackPublication: TrackPublication;
  position: Vector2;
  myPosition: Vector2;
  maxHearableDistance: number;
};

export const PublicationRenderer: React.FC<PublicationRendererProps> = ({
  trackPublication,
  position,
  myPosition,
  maxHearableDistance,
}) => {
  const audioEl = useRef<HTMLAudioElement>(null);
  const audioContext = useWebAudioContext();
  const mediaStream = usePublicationAudioMediaStream(trackPublication);
  const panner = useRef<PannerNode | null>(null);

  const updatePanner = useCallback(() => {
    if (!panner.current) return;
    const relativeX = position.x - myPosition.x;
    const relativeY = position.y - myPosition.y;
    panner.current.positionX.setValueAtTime(relativeX, audioContext.currentTime);
    panner.current.positionY.setValueAtTime(relativeY, audioContext.currentTime);
  }, [position, myPosition, audioContext]);

  useEffect(() => {
    if (!mediaStream || !audioContext || !audioEl.current) return;

    const audioSourceNode = audioContext.createMediaStreamSource(mediaStream);
    const newPanner = audioContext.createPanner();
    newPanner.panningModel = 'HRTF';
    newPanner.distanceModel = 'inverse';
    newPanner.refDistance = 50;
    newPanner.maxDistance = maxHearableDistance;
    newPanner.rolloffFactor = 1;
    newPanner.setPosition(position.x, position.y, 0);

    panner.current = newPanner;
    audioSourceNode.connect(panner.current).connect(audioContext.destination);
    audioEl.current.srcObject = mediaStream;
    audioEl.current.play();

    return () => {
      audioSourceNode.disconnect();
      newPanner.disconnect();
    };
  }, [mediaStream, audioContext, maxHearableDistance, position]);

  useEffect(updatePanner, [updatePanner]);

  return <audio ref={audioEl} autoPlay muted />;
};
