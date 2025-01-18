import type { Coordinate } from "~/lib/grid";

export default async function part1(input: string[]) {
  const steps = 100;

  const grid: boolean[][] = input.map((line) =>
    line.split("").map((c) => c === "#"),
  );

  for (let i = 0; i < steps; i++) {
    const currentState = grid.map((row) => row.slice());

    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        const neighbors = getNeighbors(currentState, { x, y }).filter(Boolean);

        const currentLight = currentState[y][x];
        if (
          (currentLight &&
            (neighbors.length === 2 || neighbors.length === 3)) ||
          (!currentLight && neighbors.length === 3)
        ) {
          grid[y][x] = true;
        } else {
          grid[y][x] = false;
        }
      }
    }
  }

  return grid.reduce(
    (total, line) =>
      total + line.reduce((total, light) => (light ? total + 1 : total), 0),
    0,
  );
}

// Solve time: 9 minutes and 27 seconds

export const getNeighbors = (grid: boolean[][], coordinate: Coordinate) => {
  return [
    grid[coordinate.y - 1]?.[coordinate.x - 1],
    grid[coordinate.y - 1]?.[coordinate.x],
    grid[coordinate.y - 1]?.[coordinate.x + 1],
    grid[coordinate.y]?.[coordinate.x + 1],
    grid[coordinate.y + 1]?.[coordinate.x + 1],
    grid[coordinate.y + 1]?.[coordinate.x],
    grid[coordinate.y + 1]?.[coordinate.x - 1],
    grid[coordinate.y]?.[coordinate.x - 1],
  ];
};
