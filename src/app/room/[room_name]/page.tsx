"use client";

import { WebAudioContext } from "@/providers/webAudio";
import { AudioInputControlPanel } from "@/components/AudioInputControlPanel";
import {
  ConnectionDetails,
  ConnectionDetailsBody,
} from "@/pages/api/connection_details";
import { LiveKitRoom } from "@livekit/components-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import {
  CharacterName,
  CharacterSelector,
} from "@/components/CharacterSelector";
import { useMobile } from "@/util/useMobile";
import { GameView } from "@/components/GameView";
import { URLSearchParams } from "url";
import { Participant } from "livekit-client";


type Props = {
  params: { room_name: string };
  searchParams?: { connectionDetails: string };
};
const Page: React.FC<Props> = ({ params, searchParams }) => {
  const { room_name } = params;
  const connectionDetailsString = searchParams?.connectionDetails;

  // Use the defaultConnectionDetails if connectionDetailsString is not provided
  const connectionDetails: ConnectionDetails = connectionDetailsString
    ? JSON.parse(decodeURIComponent(connectionDetailsString))
    : undefined;
  const isMobile = useMobile();
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  console.log('connectionDetails ',connectionDetails)

  useEffect(() => {
    setAudioContext(new AudioContext());
    return () => {
      setAudioContext((prev) => {
        prev?.close();
        return null;
      });
    };
  }, []);

  const humanRoomName = useMemo(() => {
    return decodeURI(room_name);
  }, [room_name]);
  if (!connectionDetails) {
    // Render a loading state or a message indicating that connectionDetails are not available
    return <div>Loading...</div>;
  }
  if (!audioContext) {
    return null;
  }

  return (
    <div>
      <LiveKitRoom
        token={connectionDetails.token}
        serverUrl={connectionDetails.ws_url}
        connect={true}
        connectOptions={{ autoSubscribe: false }}
        options={{ expWebAudioMix: { audioContext } }}
      >
        <WebAudioContext.Provider value={audioContext}>
          <div className="flex h-screen w-screen">
            <div
              className={`flex ${
                isMobile ? "flex-col-reverse" : "flex-col"
              } w-full h-full`}
            >
              <div className="grow flex">
                <div className="grow">
                  <GameView />
                </div>
              </div>
              <div className="bg-neutral">
                <AudioInputControlPanel />
              </div>
            </div>
          </div>
        </WebAudioContext.Provider>
      </LiveKitRoom>
    </div>
  );
}

export default Page