import { Vector2 } from "@/providers/playerData";
import { Container, useApp } from "@pixi/react";

type ViewPortProps = {
  children?: React.ReactNode;
  focusPoint: Vector2;
};

export const ViewPort = ({ children, focusPoint }: ViewPortProps) => {
  const app = useApp();

  return (
    <Container
      pivot={[
        focusPoint.x - app.screen.width / 2,
        focusPoint.y - app.screen.height / 2,
      ]}
    >
      {children}
    </Container>
  );
};
