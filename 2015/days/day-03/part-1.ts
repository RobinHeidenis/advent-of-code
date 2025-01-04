import { makeCoordinateKey, type Coordinate } from "~/lib/grid";

const directionMap = {
  ">": [1, 0],
  v: [0, 1],
  "<": [-1, 0],
  "^": [0, -1],
};

export default async function part1(input: string[]) {
  const state: Coordinate = { x: 0, y: 0 };
  const visitMap = new Map<string, number>();
  visitMap.set(makeCoordinateKey({ x: 0, y: 0 }), 1);

  for (let instruction of input[0]) {
    const delta = directionMap[instruction as keyof typeof directionMap];
    state.y += delta[1];
    state.x += delta[0];

    const coordinateKey = makeCoordinateKey(state);

    const currentAmount = visitMap.get(coordinateKey) ?? 0;
    visitMap.set(coordinateKey, currentAmount! + 1);
  }

  return Array.from(visitMap).reduce(
    (prev, curr) => (curr[1] > 0 ? prev + 1 : prev),
    0,
  );
}

// Solve time: 8 minutes and 11 seconds
