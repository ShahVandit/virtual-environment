import {Stage as PixiStage } from "@pixi/react";
import { RoomContext } from "@livekit/components-react";
import { AudioContext } from "@/controller/AudioSpeaker";

interface ProviderBridgeProps extends React.PropsWithChildren {
  render: (tree: React.ReactElement) => React.ReactNode;
}

// the provider bridge:
const ProviderBridge = ({ children, render }: ProviderBridgeProps) => {
  return (
    <RoomContext.Consumer>
      {(roomValue) => (
        <AudioContext.Consumer>
          {(trackValue) =>
            render(
              <RoomContext.Provider value={roomValue}>
                <AudioContext.Provider value={trackValue}>
                  {children}
                </AudioContext.Provider>
              </RoomContext.Provider>
            )
          }
        </AudioContext.Consumer>
      )}
    </RoomContext.Consumer>
  );
};

export const PixiWithContext = ({ children, ...props }: PixiStage["props"]) => {
  return (
    <ProviderBridge
      render={(children) => <PixiStage {...props}>{children}</PixiStage>}
    >
      {children}
    </ProviderBridge>
  );
};
