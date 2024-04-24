import React, { useContext, useEffect, useState, createContext } from "react";
import { BaseTexture, Texture, SCALE_MODES } from "pixi.js";
import { CharacterName } from "@/components/CharacterSelector";

// Define a simpler data structure that only includes a texture for each character
type ImageData = {
  textures: { [key in CharacterName]: Texture | null };
};

const defaultImageData: ImageData = {
  textures: {
    messi: null,
    ronaldo: null,
    neymar: null,
    haaland: null,
  },
};

// Create context for the images
const ImageContext = createContext<ImageData>(defaultImageData);

type Props = {
    children: React.ReactNode;
  };
  
  export const ImageProvider = ({ children }: Props) => {
    const [textures, setTextures] = useState<{ [key in CharacterName]: Texture | null }>({
      messi: null,
      ronaldo: null,
      neymar: null,
      haaland: null,
    });
  
    useEffect(() => {
      // Load textures for each character
      const loadTextures = async () => {
        const characters: CharacterName[] = ["messi", "ronaldo", "neymar", "haaland"];
        const loadedTextures: { [key in CharacterName]: Texture | null } = {
          messi: null,
          ronaldo: null,
          neymar: null,
          haaland: null,
        };
  
        characters.forEach(name => {
          const texture = Texture.from(`/characters/${name}.png`, {
            scaleMode: SCALE_MODES.NEAREST,
          });
          loadedTextures[name] = texture;
        });
  
        setTextures(loadedTextures);
      };
  
      loadTextures();
  
      return () => {
        Object.values(textures).forEach(texture => {
          texture?.destroy(true);
        });
      };
    }, []);
  
    return (
      <ImageContext.Provider value={{ textures }}>
        {children}
      </ImageContext.Provider>
    );
  };

  export function useImages() {
    const context = useContext(ImageContext);
    if (!context) {
      throw new Error("useImages must be used within an ImageProvider");
    }
    return context.textures;
  }
  