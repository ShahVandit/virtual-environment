import React, { useEffect, useRef, useCallback } from 'react';
import { TrackPublication } from 'livekit-client';
import { useSoundContext } from '../providers/useSoundContext';
import { AudioMediaStream } from '@/providers/AudioMediaStream';
import { Vector2 } from '@/providers/playerData';
import hrtfData from '@/data/data1.json'

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
  const audioContext = useSoundContext();
  const mediaStream = AudioMediaStream(trackPublication);
  const convolverNode = useRef<ConvolverNode | null>(null);
  const gainNode = useRef<GainNode | null>(null);

  const updateConvolver = useCallback(() => {
    if (!convolverNode.current) return;
    const relativeX = position.x - myPosition.x;
    const relativeY = position.y - myPosition.y;

    const distance = Math.sqrt(relativeX ** 2 + relativeY ** 2);
    let azimuth = Math.atan2(relativeY, relativeX);

    azimuth = azimuth * (180 / Math.PI); 
  
    azimuth = (azimuth + 360) % 360;
    if (azimuth > 180) {
      azimuth -= 360;  
    }
  
    azimuth = 90 - azimuth;
    if (azimuth < 0) {
      azimuth += 360; 
    }
const roundedAzimuth = Math.round(azimuth / 5) * 5;

const hrtfData1 = hrtfData[roundedAzimuth];
if (!hrtfData1) return;

const hrtfBuffer = audioContext.createBuffer(2, hrtfData1[0].length, audioContext.sampleRate);
hrtfBuffer.copyToChannel(new Float32Array(hrtfData1[0]), 0);
hrtfBuffer.copyToChannel(new Float32Array(hrtfData1[1]), 1);
convolverNode.current.buffer = hrtfBuffer;

if (gainNode.current) {
  const gainValue = distance > maxHearableDistance ? 0 : 15 - (distance / maxHearableDistance);
  gainNode.current.gain.setValueAtTime(gainValue, audioContext.currentTime);
}
}, [position, myPosition, audioContext, maxHearableDistance]);

useEffect(() => {
if (!mediaStream || !audioContext || !audioEl.current) return;
const audioSourceNode = audioContext.createMediaStreamSource(mediaStream);
convolverNode.current = audioContext.createConvolver();
gainNode.current = audioContext.createGain();

audioSourceNode.connect(convolverNode.current).connect(gainNode.current).connect(audioContext.destination);
audioEl.current.srcObject = mediaStream;
audioEl.current.play();

return () => {
  audioSourceNode.disconnect();
  if (convolverNode.current) convolverNode.current.disconnect();
  if (gainNode.current) gainNode.current.disconnect();
};
}, [mediaStream, audioContext, maxHearableDistance]);

useEffect(updateConvolver, [updateConvolver]);

  return <audio ref={audioEl} autoPlay muted />;
};