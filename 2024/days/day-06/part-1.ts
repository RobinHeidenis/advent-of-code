const directionMap = {
  N: { x: 0, y: -1 },
  E: { x: 1, y: 0 },
  S: { x: 0, y: 1 },
  W: { x: -1, y: 0 },
} as const;

const directions = ["N", "E", "S", "W"] as const;

export default async function part1(input: string[]) {
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

  return map.reduce((prev, currentRow) => {
    return prev + currentRow.filter((tile) => tile === "X").length;
  }, 0);
}

// Solve time: 35 minutes and 9 seconds
