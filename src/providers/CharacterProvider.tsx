"use-client";

import { PlayerType } from "@/components/AvatarPicker";
import {
  BaseTexture,
  Cache,
  Resource,
  SCALE_MODES,
  Spritesheet,
  Texture,
} from "pixi.js";
import React, { useCallback, useContext, useEffect, useState } from "react";

const atlasDataGenerator = (name: PlayerType) => {
  const frameWidth = 564;
  const frameHeight = 572;

  const baseAtlas = {
    frames: {
      [`0_${name}`]: {
        frame: {
          x: 0,
          y: 0,
          w: frameWidth,
          h: frameHeight,
        },
        sourceSize: {
          w: frameWidth,
          h: frameHeight,
        },
        spriteSourceSize: {
          x: 0,
          y: 0,
          w: frameWidth,
          h: frameHeight,
        },
      },
    },
    meta: {
      image: `/characters/${name}.png`,
      format: "RGBA8888",
      size: { w: frameWidth, h: frameHeight },
      scale: "4.76",
    },
    animations: {
      walk: [`0_${name}`],
    },
  };

  return baseAtlas;
};

type AnimationData = {
  walk: Texture<Resource>[];
};

type CharacterAnimationsData = {
  [key in PlayerType]: AnimationData;
};

const defaultValue: CharacterAnimationsData = {
  messi: { walk: [] },
  ronaldo: { walk: [] },
  neymar: { walk: [] },
  haaland: { walk: [] },
};

const CharacterAnimationsContext = React.createContext<{
  _provider: boolean;
  data: CharacterAnimationsData;
}>({
  _provider: false,
  data: defaultValue,
});

type Props = {
  children: React.ReactNode;
};

export function CharacterProvider({ children }: Props) {
  const [characterAnimations, setCharacterAnimations] = useState<CharacterAnimationsData>(defaultValue);

  const loadCharacterAnimations = useCallback(async () => {
    const atlases = [
      atlasDataGenerator("messi"),
      atlasDataGenerator("ronaldo"),
      atlasDataGenerator("neymar"),
      atlasDataGenerator("haaland"),
    ];
    const [messi, ronaldo, neymar, haaland] = atlases.map(
      (atlas) =>
        new Spritesheet(
          BaseTexture.from(atlas.meta.image, {
            scaleMode: SCALE_MODES.NEAREST,
          }),
          atlas
        )
    );

    await messi.parse();
    await ronaldo.parse();
    await neymar.parse();
    await haaland.parse();

    const animations: CharacterAnimationsData = {
      messi: { walk: messi.animations["walk"] },
      ronaldo: { walk: ronaldo.animations["walk"] },
      neymar: { walk: neymar.animations["walk"] },
      haaland: { walk: haaland.animations["walk"] },
    };

    setCharacterAnimations(animations);
  }, []);

  useEffect(() => {
    loadCharacterAnimations();

    return () => {
      Cache.reset();
    };
  }, [loadCharacterAnimations]);

  return (
    <CharacterAnimationsContext.Provider
      value={{
        _provider: true,
        data: { ...characterAnimations },
      }}
    >
      {children}
    </CharacterAnimationsContext.Provider>
  );
}

export function useCharacters(character: PlayerType) {
  const ctx = useContext(CharacterAnimationsContext);
  if (!ctx._provider) {
    throw "useCharacterAnimations must be used within a CharacterAnimationsProvider";
  }

  return ctx.data[character];
}
