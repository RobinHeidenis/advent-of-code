import {
  directions,
  hexDistance,
  type Direction,
  type HexPosition,
} from "./part-1";

export default async function part2(input: string[]) {
  const steps = input[0].split(",") as Direction[];

  const position: HexPosition = { x: 0, y: 0, z: 0 };

  let maxDistance = 0;

  for (const step of steps) {
    const dir = directions[step];
    position.x += dir.x;
    position.y += dir.y;
    position.z += dir.z;

    const distance = hexDistance(position);

    if (distance > maxDistance) {
      maxDistance = distance;
    }
  }

  return maxDistance;
}

// Solve time: 59 seconds
// Total solve time: 5 minutes and 43 seconds
