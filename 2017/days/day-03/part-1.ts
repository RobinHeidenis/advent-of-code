import type { Coordinate } from "~/lib/grid";

export default async function part1(input: string[]) {
  const position = getSpiralCoordinates(Number(input[0]));

  return Math.abs(position.x) + Math.abs(position.y);
}

// Solve time: 3 minutes and 36 seconds

const getSpiralCoordinates = (n: number): Coordinate => {
  if (n === 1) {
    return { x: 0, y: 0 };
  }

  // Find the layer (ring) of the spiral
  const layer = Math.ceil((Math.sqrt(n) - 1) / 2);

  // Calculate the side length of the current ring
  const sideLength = 2 * layer;

  // Calculate the bottom-right corner of this ring
  const bottomRight = (2 * layer + 1) ** 2;

  // Calculate the offset from the bottom-right corner
  const offset = bottomRight - n;

  // Determine the side and position along that side
  if (offset < sideLength) {
    // Bottom side (moving right to left)
    return { x: -layer + offset, y: -layer };
  } else if (offset < 2 * sideLength) {
    // Left side (moving bottom to top)
    return { x: -layer, y: -layer + (offset - sideLength) };
  } else if (offset < 3 * sideLength) {
    // Top side (moving left to right)
    return { x: -layer + (offset - 2 * sideLength), y: layer };
  } else {
    // Right side (moving top to bottom)
    return { x: layer, y: layer - (offset - 3 * sideLength) };
  }
};
