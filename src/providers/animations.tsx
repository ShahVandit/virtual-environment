"use-client";

import { CharacterName } from "@/components/CharacterSelector";
import { useApp } from "@pixi/react";
import {
  BaseTexture,
  Cache,
  Resource,
  SCALE_MODES,
  Spritesheet,
  Texture,
} from "pixi.js";
import React, { useCallback, useContext, useEffect, useState } from "react";

const atlasDataGenerator = (name: CharacterName) => {
  const baseAtlas = {
    frames: {},
    meta: {
      image: `/characters/${name}.png`,
      format: "RGBA8888",
      size: { w: 24, h: 24 },
      scale: "0.32",
    },
    animations: {
      walk: [`0_${name}`],
      idle: [`0_${name}`],
    },
  };
  for (let row = 0; row < 1; row++) {
    for (let col = 0; col < 24; col++) {
      (baseAtlas.frames as any)[`${row * 8 + col}_${name}`] = {
        frame: {
          x: col * 24,
          y: row * 24,
          w: 24,
          h: 24,
        },
        sourceSize: {
          w: 24,
          h: 24,
        },
        spriteSourceSize: {
          x: 0,
          y: 0,
          h: 24,
          w: 24,
        },
      };
    }
  }
  return baseAtlas;
};

type Animations = {
  walk: Texture<Resource>[];
  idle: Texture<Resource>[];
};

type Data = {
  animations: {
    [key in CharacterName]: Animations;
  };
};

const defaultValue: Data = {
  animations: {
    messi: { walk: [], idle: [] },
    ronaldo: { walk: [], idle: [] },
    neymar: { walk: [], idle: [] },
    haaland: { walk: [], idle: [] },
  },
};

const AnimationsContext = React.createContext({
  _provider: false,
  data: defaultValue,
});

type Props = {
  children: React.ReactNode;
};

export function AnimationsProvider({ children }: Props) {
  const [animations, setAnimations] = useState<{
    [key in CharacterName]: Animations;
  }>(defaultValue.animations);

  const loadAnimations = useCallback(async () => {
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

    const animations: { [key in CharacterName]: Animations } = {
      messi: { walk: messi.animations["walk"], idle: messi.animations["idle"] },
      ronaldo: { walk: ronaldo.animations["walk"], idle: ronaldo.animations["idle"] },
      neymar: { walk: neymar.animations["walk"], idle: neymar.animations["idle"] },
      haaland: { walk: haaland.animations["walk"], idle: haaland.animations["idle"] },
    };

    setAnimations(animations);
  }, []);

  useEffect(() => {
    loadAnimations();

    return () => {
      Cache.reset();
    };
  }, [loadAnimations]);

  return (
    <AnimationsContext.Provider
      value={{
        _provider: true,
        data: { animations },
      }}
    >
      {children}
    </AnimationsContext.Provider>
  );
}

export function useAnimations(character: CharacterName) {
  const ctx = useContext(AnimationsContext);
  if (!ctx._provider) {
    throw "useAnimations must be used within a AnimationsProvider";
  }

  return ctx.data.animations[character];
}