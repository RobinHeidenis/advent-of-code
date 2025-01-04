import type { Coordinate } from "~/lib/grid";

export const isInBounds = (
  currentLocation: Coordinate,
  otherLocation: Coordinate,
  maxX: number,
  maxY: number,
) => {
  const deltaX = otherLocation.x - currentLocation.x;
  const deltaY = otherLocation.y - currentLocation.y;

  const targetX = otherLocation.x + deltaX;
  const targetY = otherLocation.y + deltaY;
  const inBounds =
    targetX >= 0 && targetX < maxX && targetY >= 0 && targetY < maxY;

  return { inBounds, targetX, targetY };
};
