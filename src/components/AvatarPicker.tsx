import Image from "next/image";

export type PlayerTypes = "messi" | "ronaldo" | "neymar" | "haaland";

type AvatarPickerProps = {
  selectedAvatar: PlayerTypes;
  onAvatarChange: (playerType: PlayerTypes) => void;
};

export const AvatarPicker = ({
  selectedAvatar,
  onAvatarChange,
}: AvatarPickerProps) => {
  const avatarList: PlayerTypes[] = ["messi", "ronaldo", "neymar", "haaland"];

  return (
    <div>
      <div className="flex">
        {avatarList.map((playerType) => (
          <div
            key={playerType}
            className="m-2 cursor-pointer"
            onClick={() => onAvatarChange(playerType)}
          >
            <Avatar
              playerName={playerType}
              imagePath={`/characters/${playerType}.png`}
              isActive={selectedAvatar === playerType}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

type AvatarProps = {
  playerName: PlayerTypes;
  imagePath: string;
  isActive: boolean;
};

const Avatar = ({
  playerName,
  imagePath,
  isActive,
}: AvatarProps) => {
  return (
    <div className="flex flex-col items-center h-full">
      <div className={isActive ? "border-4 border-blue-500" : "border"}>
        <Image
          quality={100}
          width={64}
          height={64}
          src={imagePath}
          alt={playerName}
          style={{ imageRendering: "pixelated" }}
        />
      </div>
      <div>{playerName}</div>
    </div>
  );
};
