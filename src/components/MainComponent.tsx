import {
  useConnectionState,
  useIsSpeaking,
  useLocalParticipant,
  useParticipantInfo,
  useSpeakingParticipants,
} from "@livekit/components-react";
import { Container } from "@pixi/react";
import { useEffect, useMemo, useState } from "react";
import useResizeObserver from "use-resize-observer";
import { Avatar } from "@/components/Avatar";
import { PlayerAnimationController } from "@/controller/PlayerAnimationController";
import { PlayerPositionController } from "@/controller/PlayerPositionController";
import { DirectionController } from "@/controller/DirectionController";
import { useGameState } from "@/providers/playerData";
import { PlayerActionHandler } from "@/controller/PlayerActionHandler";
import { EntityController } from "@/controller/EntityController";
import { ConnectionState } from "livekit-client";
import { HRTFController } from "@/controller/HRTFController";
import { RemotePlayersController } from "@/controller/RemotePlayersController";
import { EnvironmentBoundaryController } from "@/controller/EnvironmentBoundaryController";
import { Environment } from "./Environment";
import { ViewPort } from "./ViewPort";
import { AvatarArea } from "./AvatarArea";
import { CharacterProvider } from "@/providers/CharacterProvider";
import Slider from "./Slider";
import { PixiWithContext } from "./PixiWithContext";
import { SpatialAudioSpeaker } from "./SpatialAudioSpeaker";
import { SpatialAudioDialog } from "./SpatialAudioDialog";
import { AudioProvider } from "@/controller/AudioSpeaker";
import { fetchRemoteTracks } from "@/controller/fetchRemoteTracks";

export function MainComponent() {
  const [earshotRadius, setEarshotRadius] = useState(150);

  const handleEarshotRadiusChange = (value: any) => {
    setEarshotRadius(value);
  };
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
    backgroundZIndex,
    playerSpeed,
    speakerPosition,
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

  const distanceFromSpeaker = useMemo(() => {
    if (!myPlayer) return Infinity;
    return Math.sqrt(
      (myPlayer.position.x - speakerPosition.x) ** 2 +
        (myPlayer.position.y - speakerPosition.y) ** 2
    );
  }, [speakerPosition.x, speakerPosition.y, myPlayer]);

  const trackPositions = fetchRemoteTracks({
    remotePlayers,
    speakerPosition: speakerPosition,
  });
  if (connectionState !== ConnectionState.Connected) {
    return null;
  }

  return (
    <div ref={ref} className="relative h-full w-full bg-red-400">
      <AudioProvider>
        {myPlayer && (
          <HRTFController
            myPosition={myPlayer.position}
            trackPositions={trackPositions}
            maxHearableDistance={earshotRadius}
          />
        )}
        {myPlayer && (
          <PlayerPositionController
            setRemotePlayerPositions={setNetworkPositions}
            playerPosition={myPlayer.position}
          />
        )}
        {myPlayer && (
          <PlayerAnimationController
            setRemotePlayerAnimations={setNetworkAnimations}
            playerAnimation={myPlayer.animation}
          />
        )}
        <RemotePlayersController
          networkAnimations={networkAnimations}
          networkPositions={networkPositions}
          setRemotePlayers={setRemotePlayers}
        />
        <DirectionController updateInputs={setInputs} />
        <EntityController
          localCharacter={localCharacter}
          entity={myPlayer}
          setEntity={setMyPlayer}
          localParticipant={localParticipant}
        />
        {distanceFromSpeaker < 60 && (
          <div className="absolute w-screen h-screen flex justify-center items-center z-10">
            <div className="shadow-md mb-[500px]">
              <SpatialAudioDialog />
            </div>
          </div>
        )}
        <PixiWithContext
          className="absolute top-0 left-0 bottom-0 right-0"
          raf={true}
          renderOnComponentChange={false}
          width={width}
          height={height}
          options={{ resolution: 2, backgroundColor: 0x509b66 }}
        >
          <Slider
            backgroundZIndex={100}
            initialValue={150}
            min={50}
            max={250}
            onChange={handleEarshotRadiusChange}
          />
          <CharacterProvider>
            <ViewPort focusPoint={myPlayer?.position || { x: 0, y: 0 }}>
              <Container anchor={[0.5, 0.5]} sortableChildren={true}>
                <PlayerActionHandler
                  playerSpeed={playerSpeed}
                  inputs={inputs}
                  setMyPlayer={setMyPlayer}
                />
                {myPlayer && (
                  <EnvironmentBoundaryController
                    environmentBoundaries={worldBoundaries}
                    Player={myPlayer}
                    setPlayer={setMyPlayer}
                  />
                )}
                {myPlayer && (
                  <Avatar
                    speaking={localSpeaking}
                    username={myPlayer.username}
                    x={myPlayer.position.x}
                    y={myPlayer.position.y}
                    character={myPlayer.character}
                    animation={myPlayer.animation}
                  />
                )}
                <SpatialAudioSpeaker
                  backgroundZIndex={backgroundZIndex + 1}
                  position={speakerPosition}
                />
                <Environment
                  backgroundZIndex={backgroundZIndex}
                  environmentBoundaries={worldBoundaries}
                />
                {remotePlayers.map((player) => (
                  <Avatar
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
            </ViewPort>
          </CharacterProvider>
        </PixiWithContext>
      </AudioProvider>
    </div>
  );
}
