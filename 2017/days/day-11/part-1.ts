export type Direction = "n" | "ne" | "se" | "s" | "sw" | "nw";

export interface HexPosition {
  x: number;
  y: number;
  z: number;
}

export const directions: Record<Direction, HexPosition> = {
  n: { x: 0, y: 1, z: -1 },
  ne: { x: 1, y: 0, z: -1 },
  se: { x: 1, y: -1, z: 0 },
  s: { x: 0, y: -1, z: 1 },
  sw: { x: -1, y: 0, z: 1 },
  nw: { x: -1, y: 1, z: 0 },
};

export default async function part1(input: string[]) {
  const steps = input[0].split(",") as Direction[];

  const position: HexPosition = { x: 0, y: 0, z: 0 };

  for (const step of steps) {
    const dir = directions[step];
    position.x += dir.x;
    position.y += dir.y;
    position.z += dir.z;
  }

  return hexDistance(position);
}

// Solve time: 4 minutes and 44 seconds

export const hexDistance = (pos: HexPosition): number => {
  return Math.max(Math.abs(pos.x), Math.abs(pos.y), Math.abs(pos.z));
};
