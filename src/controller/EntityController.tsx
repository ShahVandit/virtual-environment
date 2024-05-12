import { PlayerType } from "@/components/AvatarPicker";
import { Player } from "@/providers/playerData";
import { Participant } from "livekit-client";
import { Dispatch, SetStateAction, useEffect } from "react";

type EntityControllerProps = {
  localParticipant: Participant | null;
  localCharacter: PlayerType | null;
  entity: Player | null;
  setEntity: Dispatch<SetStateAction<Player | null>>;
};

export function EntityController({
  setEntity,
  entity,
  localParticipant,
  localCharacter,
}: EntityControllerProps) {
  useEffect(() => {
    if (entity === null && localParticipant?.identity && localCharacter) {
      setEntity({
        username: localParticipant.identity,
        position: { x: 10, y: 0 },
        animation: "walk",
        character: localCharacter,
      });
    }
  }, [localCharacter, localParticipant, entity, setEntity]);
  return null;
}
