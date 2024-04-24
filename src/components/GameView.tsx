import { NetcodeController } from "@/controller/NetcodeController";
import {
  useConnectionState,
  useIsSpeaking,
  useLocalParticipant,
  useParticipantInfo,
  useSpeakingParticipants,
} from "@livekit/components-react";
import { Container } from "@pixi/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import useResizeObserver from "use-resize-observer";
import { Character } from "./Avatar";
import { DirectionController } from "@/controller/DirectionController";
import { useGameState } from "@/model/GameState";
import { MyCharacterController } from "@/controller/MyCharacterController";
import { MyPlayerSpawnController } from "@/controller/MyPlayerSpawnController";
import { ConnectionState } from "livekit-client";
import { HRTFController } from "@/controller/HRTFController";
import { RemotePlayersController } from "@/controller/RemotePlayersController";
import { WorldBoundaryController } from "@/controller/EnvironmentArea";
import { World } from "./World";
import { Camera } from "./Camera";
import { AvatarArea } from "./AvatarArea";
import { AnimationsProvider } from "@/providers/animations";
import Slider from "./Slider";
import { Inputs } from "@/model/Inputs";
import { Stage } from "./Stage";
import { JukeBox } from "./JukeBox";
import { JukeBoxModal } from "./JukeBoxModal";
import { JukeBoxProvider } from "@/controller/JukeBoxProvider";
import { useTrackPositions } from "@/controller/useTrackPositions";

export function GameView() {
  const [earshotRadius, setEarshotRadius] = useState(150);

  const handleEarshotRadiusChange = (value:any) => {
    setEarshotRadius(value);
  }
  const { ref, width = 1, height = 1 } = useResizeObserver<HTMLDivElement>();
  const connectionState = useConnectionState();
  const { localParticipant } = useLocalParticipant();
  const { metadata: localMetadata } = useParticipantInfo({
    participant: localParticipant,
  });
  const localSpeaking = useIsSpeaking(localParticipant);
  const speakingParticipants = useSpeakingParticipants();
  const gameState = useGameState();

  const {
    inputs,
    remotePlayers,
    myPlayer,
    networkAnimations,
    networkPositions,
    worldBoundaries,
    // earshotRadius,
    backgroundZIndex,
    playerSpeed,
    jukeBoxPosition,
    setMyPlayer,
    setInputs,
    setNetworkAnimations,
    setNetworkPositions,
    setRemotePlayers,
  } = useGameState();

  const speakingLookup = useMemo(() => {
    const lookup = new Set<string>();
    for (const p of speakingParticipants) {
      lookup.add(p.identity);
    }
    return lookup;
  }, [speakingParticipants]);

  useEffect(() => {
    if (localParticipant) {
      setMyPlayer((prev) => prev && { ...prev, character: "neymar" });
    }
  }, [localParticipant, setMyPlayer]);

  const localCharacter = useMemo(
    () => JSON.parse(localMetadata || "{}").character || null,
    [localMetadata]
  );


  const distanceFromJukeBox = useMemo(() => {
    if (!myPlayer) return Infinity;
    return Math.sqrt(
      (myPlayer.position.x - jukeBoxPosition.x) ** 2 +
        (myPlayer.position.y - jukeBoxPosition.y) ** 2
    );
  }, [jukeBoxPosition.x, jukeBoxPosition.y, myPlayer]);

  const sliderPosition = useMemo(() => {
    return { x: 100, y: 100 }; // Fixed position in the top-left corner, adjust as needed
  }, []);

  const trackPositions = useTrackPositions({ remotePlayers, jukeBoxPosition });
  if (connectionState !== ConnectionState.Connected) {
    return null;
  }
  
  return (
    <div ref={ref} className="relative h-full w-full bg-red-400">
      <JukeBoxProvider>
        {myPlayer && (
          <HRTFController
          myPosition={myPlayer.position}
          trackPositions={trackPositions}
          maxHearableDistance={earshotRadius}
          />
        )}
        {myPlayer && (
          <NetcodeController
          setNetworkAnimations={setNetworkAnimations}
          setNetworkPositions={setNetworkPositions}
          myPlayer={myPlayer}
          />
        )}
        <RemotePlayersController
          networkAnimations={networkAnimations}
          networkPositions={networkPositions}
          setRemotePlayers={setRemotePlayers}
        />
        <DirectionController updateInputs={setInputs} />
        <MyPlayerSpawnController
          localCharacter={localCharacter}
          myPlayer={myPlayer}
          setMyPlayer={setMyPlayer}
          localParticipant={localParticipant}
        />
        {distanceFromJukeBox < 60 && (
          <div className="absolute w-screen h-screen flex justify-center items-center z-10">
            <div className="shadow-md mb-[500px]">
              <JukeBoxModal />
            </div>
          </div>
        )}
        <Stage
          className="absolute top-0 left-0 bottom-0 right-0"
          raf={true}
          renderOnComponentChange={false}
          width={width}
          height={height}
          options={{ resolution: 2, backgroundColor: 0x509b66 }}
        >
            <Slider
            backgroundZIndex={100} // Ensure this zIndex puts it above other elements but adjust based on need
            initialValue={150}
            min={50}
            max={250}
            onChange={handleEarshotRadiusChange}
            // position={sliderPosition}
        />
          <AnimationsProvider>
            <Camera targetPosition={myPlayer?.position || { x: 0, y: 0 }}>
              <Container anchor={[0.5, 0.5]} sortableChildren={true}>
                <MyCharacterController
                  playerSpeed={playerSpeed}
                  inputs={inputs}
                  setMyPlayer={setMyPlayer}
                />
                {myPlayer && (
                  <WorldBoundaryController
                  worldBoundaries={worldBoundaries}
                  myPlayer={myPlayer}
                  setMyPlayer={setMyPlayer}
                  />
                )}
                {myPlayer && (
                  <Character
                    speaking={localSpeaking}
                    username={myPlayer.username}
                    x={myPlayer.position.x}
                    y={myPlayer.position.y}
                    character={myPlayer.character}
                    animation={myPlayer.animation}
                    />
                  )}
                <JukeBox
                  backgroundZIndex={backgroundZIndex+1}
                  position={jukeBoxPosition}
                />
                <World
                  backgroundZIndex={backgroundZIndex}
                  worldBoundaries={worldBoundaries}
                />
                {remotePlayers.map((player) => (
                  <Character
                    speaking={speakingLookup.has(player.username)}
                    username={player.username}
                    key={player.username}
                    x={player.position.x}
                    y={player.position.y}
                    character={player.character}
                    animation={player.animation}
                  />
                ))}
                <AvatarArea
                  backgroundZIndex={backgroundZIndex}
                  render={true}
                  earshotRadius={earshotRadius}
                  myPlayerPosition={myPlayer?.position || { x: 0, y: 0 }}
                />
              </Container>
            </Camera>
          </AnimationsProvider>
        </Stage>
      </JukeBoxProvider>
    </div>
  );
}

