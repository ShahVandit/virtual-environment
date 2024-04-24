import Image from "next/image";

export type CharacterName = "messi" | "ronaldo" | "neymar" | "haaland";

type Props = {
  selectedCharacter: CharacterName;
  onSelectedCharacterChange: (character: CharacterName) => void;
};

export const CharacterSelector = ({
  selectedCharacter,
  onSelectedCharacterChange,
}: Props) => {
  return (
    <div>
      <div className="flex">
        <div
          className="m-2 cursor-pointer"
          onClick={() => onSelectedCharacterChange("messi")}
        >
          <Character
            name="messi"
            image="/characters/icon1.png"
            selected={selectedCharacter === "messi"}
          />
        </div>
        <div
          className="m-2 cursor-pointer"
          onClick={() => onSelectedCharacterChange("ronaldo")}
        >
          <Character
            name="ronaldo"
            image="/characters/icon2.png"
            selected={selectedCharacter === "ronaldo"}
          />
        </div>
        <div
          className="m-2 cursor-pointer"
          onClick={() => onSelectedCharacterChange("neymar")}
        >
          <Character
            name="neymar"
            image="/characters/icon3.png"
            selected={selectedCharacter === "neymar"}
          />
        </div>
        <div
          className="m-2 cursor-pointer"
          onClick={() => onSelectedCharacterChange("haaland")}
        >
          <Character
            name="haaland"
            image="/characters/icon4.png"
            selected={selectedCharacter === "haaland"}
          />
        </div>
      </div>
    </div>
  );
};

const Character = ({
  name,
  image,
  selected,
}: {
  name: string;
  image: string;
  selected: boolean;
}) => {
  return (
    <div className="flex flex-col items-center h-full">
<div className={`${selected ? "border-4 border-blue-500" : "border"}`}>
        <Image
          quality={100}
          width={64}
          height={64}
          src={image}
          alt={name}
          style={{ imageRendering: "pixelated" }}
        />
      </div>
      <div>{name}</div>
    </div>
  );
};
