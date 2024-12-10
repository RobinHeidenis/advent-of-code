const directionMap = {
  N: { x: 0, y: -1 },
  E: { x: 1, y: 0 },
  S: { x: 0, y: 1 },
  W: { x: -1, y: 0 },
} as const;

const directions = ["N", "E", "S", "W"] as const;

export default async function part2(input: string[]) {
  let total = 0;
  const map: string[][] = [];

  input.forEach((line) => {
    map.push(line.split(""));
  });

  let direction: "N" | "E" | "S" | "W" = "N";

  const startingY = map.findIndex((row) =>
    row.find((col) => col.includes("^")),
  );
  const startingX = map[startingY].findIndex((col) => col === "^");

  const state: { x: number; y: number; direction: "N" | "E" | "S" | "W" } = {
    x: startingX,
    y: startingY,
    direction,
  };

  while (
    state.x >= 0 &&
    state.x <= map[0].length &&
    state.y >= 0 &&
    state.y <= map.length
  ) {
    map[state.y][state.x] = "X";
    const directionMove = directionMap[state.direction];

    const nextRow = map[state.y + directionMove.y];

    const nextTile = nextRow[state.x + directionMove.x];

    if (nextTile === undefined) break;

    if (nextTile === "#") {
      state.direction =
        directions.at(
          directions.findIndex((direction) => direction === state.direction) +
            1,
        ) ?? "N";

      continue;
    }

    state.x = state.x + directionMove.x;
    state.y = state.y + directionMove.y;
  }

  for (let y = 0; y < map.length; y++) {
    const row = map[y];
    for (let x = 0; x < row.length; x++) {
      if (map[y][x] !== "X") continue;

      const newMap = structuredClone(map);
      newMap[y][x] = "#";

      if (!guardEscapes(startingX, startingY, newMap)) {
        total++;
      }
    }
  }

  return total;
}

// Solve time: 13 minutes and 29 seconds
// Total solve time: 48 minutes and 38 seconds
// Execution time: 15 seconds :) [Edit: after a simple optimization it is now only 4 seconds]

const constructSetKey = (x: number, y: number, direction: string) => {
  return `${x},${y},${direction}`;
};

const guardEscapes = (
  startingX: number,
  startingY: number,
  map: string[][],
) => {
  const positions = new Set<string>();

  const state: { x: number; y: number; direction: "N" | "E" | "S" | "W" } = {
    x: startingX,
    y: startingY,
    direction: "N",
  };

  while (
    state.x >= 0 &&
    state.x <= map[0].length &&
    state.y >= 0 &&
    state.y < map.length
  ) {
    if (positions.has(constructSetKey(state.x, state.y, state.direction)))
      return false;

    positions.add(constructSetKey(state.x, state.y, state.direction));
    const directionMove = directionMap[state.direction];

    const nextRow = map[state.y + directionMove.y];

    if (nextRow === undefined) break;

    const nextTile = nextRow[state.x + directionMove.x];

    if (nextTile === undefined) break;

    if (nextTile === "#") {
      state.direction =
        directions.at(
          directions.findIndex((direction) => direction === state.direction) +
            1,
        ) ?? "N";

      continue;
    }

    state.x = state.x + directionMove.x;
    state.y = state.y + directionMove.y;
  }

  return true;
};
