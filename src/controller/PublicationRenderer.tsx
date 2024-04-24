import React, { useEffect, useRef, useCallback } from 'react';
import { TrackPublication } from 'livekit-client';
import { useWebAudioContext } from '../providers/webAudio';
import { AudioMediaStream } from './AudioMediaStream'; 
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
  const mediaStream = AudioMediaStream(trackPublication);
  const panner = useRef<PannerNode | null>(null);
  const gainNode = useRef<GainNode | null>(null);

  const updatePanner = useCallback(() => {
    if (!panner.current) return;
    const relativeX = position.x - myPosition.x;
    const relativeY = position.y - myPosition.y;
    const distance = Math.sqrt(relativeX**2 + relativeY**2);
    panner.current.positionX.setValueAtTime(relativeX, audioContext.currentTime);
    panner.current.positionY.setValueAtTime(relativeY, audioContext.currentTime);
    if (gainNode.current) {
      const gainValue = distance > maxHearableDistance ? 0 : 1 - (distance / maxHearableDistance);
      gainNode.current.gain.setValueAtTime(gainValue, audioContext.currentTime);
    }
  }, [position, myPosition, audioContext, maxHearableDistance]);

  useEffect(() => {
    if (!mediaStream || !audioContext || !audioEl.current) return;
    const audioSourceNode = audioContext.createMediaStreamSource(mediaStream);
    panner.current = audioContext.createPanner();
    gainNode.current = audioContext.createGain();

    panner.current.orientationX.setValueAtTime(0, audioContext.currentTime);
    panner.current.orientationY.setValueAtTime(0, audioContext.currentTime);
    panner.current.orientationZ.setValueAtTime(-1, audioContext.currentTime);
    panner.current.panningModel = 'HRTF';
    panner.current.distanceModel = 'inverse'; // decrease volume on increasing distance
    panner.current.refDistance = 150; // pre-set max distance
    panner.current.maxDistance = maxHearableDistance;
    panner.current.rolloffFactor = 5;   // sensitivity of changing volume

    // Connect the nodes properly
    audioSourceNode.connect(panner.current).connect(gainNode.current).connect(audioContext.destination);
    audioEl.current.srcObject = mediaStream;
    audioEl.current.play();

    return () => {
      audioSourceNode.disconnect();
      if (panner.current) panner.current.disconnect();
      if (gainNode.current) gainNode.current.disconnect();
    };
  }, [mediaStream, audioContext, maxHearableDistance]);

  useEffect(updatePanner, [updatePanner]);

  return <audio ref={audioEl} autoPlay muted />;
};
