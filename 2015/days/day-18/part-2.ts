import { getNeighbors } from "./part-1.ts";

export default async function part2(input: string[]) {
  const steps = 100;

  const grid: boolean[][] = input.map((line) =>
    line.split("").map((c) => c === "#"),
  );

  for (let i = 0; i < steps; i++) {
    const currentState = grid.map((row) => row.slice());
    currentState[0][0] = true;
    currentState[currentState.length - 1][0] = true;
    currentState[0][currentState[0].length - 1] = true;
    currentState[currentState.length - 1][currentState[0].length - 1] = true;

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
  grid[0][0] = true;
  grid[grid.length - 1][0] = true;
  grid[0][grid[0].length - 1] = true;
  grid[grid.length - 1][grid[0].length - 1] = true;

  return grid.reduce(
    (total, line) =>
      total + line.reduce((total, light) => (light ? total + 1 : total), 0),
    0,
  );
}

// Solve time: 2 minutes and 27 seconds
// Total solve time: 11 minutes and 54 seconds
