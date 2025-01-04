import { makeCoordinateKey, type Coordinate } from "~/lib/grid";

const directionMap = {
  ">": [1, 0],
  v: [0, 1],
  "<": [-1, 0],
  "^": [0, -1],
};

export default async function part2(input: string[]) {
  const santaState: Coordinate = { x: 0, y: 0 };
  const santaBotState: Coordinate = { x: 0, y: 0 };
  const visitMap = new Map<string, number>();
  visitMap.set(makeCoordinateKey({ x: 0, y: 0 }), 1);

  for (let [index, instruction] of input[0].split("").entries()) {
    const delta = directionMap[instruction as keyof typeof directionMap];

    const state = index % 2 === 0 ? santaState : santaBotState;
    state.y += delta[1];
    state.x += delta[0];

    const coordinateKey = makeCoordinateKey(state);

    const currentAmount = visitMap.get(coordinateKey) ?? 0;
    visitMap.set(coordinateKey, currentAmount + 1);
  }

  return Array.from(visitMap).reduce(
    (prev, curr) => (curr[1] > 0 ? prev + 1 : prev),
    0,
  );
}

// Solve time: 2 minutes and 33 seconds
// Total solve time: 10 minutes and 44 seconds
