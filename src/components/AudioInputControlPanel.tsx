import React from 'react';
import { useMediaDeviceSelect, useRoomContext, TrackToggle } from "@livekit/components-react";
import { Track } from "livekit-client";
import Slider from './Slider';
import { useState } from 'react';
export function AudioInputControlPanel() {
  const [earshotRadius, setEarshotRadius] = useState(150);

  const handleEarshotRadiusChange = (value:any) => {
    setEarshotRadius(value);
  }
  const roomContext = useRoomContext();
  const {
    devices: audioDevices,
    activeDeviceId: selectedDeviceId,
    setActiveMediaDevice: selectAudioDevice
  } = useMediaDeviceSelect({
    kind: "audioinput",
    room: roomContext
  });

  const preventKeyInteraction = (event:any) => {
    event.preventDefault();
  };

  return (
    <div className="flex w-full h-full justify-between bg-gray-800 p-4">
      <div className="flex h-full">
        <div className="flex items-center">
          <TrackToggle
            source={Track.Source.Microphone}
            className="btn btn-primary w-10 h-full p-0 m-0 px-1"
          />
        </div>
        
        <div className="px-4">
          <div className="flex items-center">
          <Slider
            backgroundZIndex={100}
            initialValue={150}
            min={50}
            max={250}
            onChange={handleEarshotRadiusChange}
            // position={sliderPosition}
        />
            <select
              onChange={(e) => selectAudioDevice(e.currentTarget.value)}
              onKeyDown={preventKeyInteraction}
              value={selectedDeviceId || ''}
              className="select select-bordered select-sm w-full sm:max-w-xs max-w-xs m-2"
            >
              <option value={-1} disabled>
                Select the Device
              </option>
              {audioDevices.map((device) => (
                <option value={device.deviceId} key={device.deviceId}>
                  {device.label}
                </option>
              ))}
            </select>
          </div>
        </div>


      </div>
    </div>
  );
}
