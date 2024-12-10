import { getSurroundingTiles } from "./shared";

export default async function part2(input: string[]) {
  let total = 0;

  const grid: number[][] = [];

  input.forEach((line) => {
    grid.push(line.split("").map(Number));
  });

  for (let y = 0; y < grid.length; y++) {
    const row = grid[y];

    for (let x = 0; x < row.length; x++) {
      if (row[x] !== 0) continue;

      const surroundingTiles = getSurroundingTiles(x, y, grid);
      if (!surroundingTiles.includes(1)) continue;

      total += step(x, y, 0, grid);
    }
  }

  return total;
}

// Solve time: 1 minute and 6 seconds
// Total solve time: 33 minutes and 49 seconds

const step = (x: number, y: number, iteration: number, grid: number[][]) => {
  if (iteration === 9) {
    return 1;
  }

  const surroundingTiles = getSurroundingTiles(x, y, grid);
  if (!surroundingTiles.includes(iteration + 1)) return 0;

  const availableOptions = [];

  if (surroundingTiles[0] === iteration + 1) availableOptions.push([-1, 0]);
  if (surroundingTiles[1] === iteration + 1) availableOptions.push([0, 1]);
  if (surroundingTiles[2] === iteration + 1) availableOptions.push([1, 0]);
  if (surroundingTiles[3] === iteration + 1) availableOptions.push([0, -1]);

  let totalSuccessfulPaths = 0;
  availableOptions.forEach((option) => {
    totalSuccessfulPaths += step(
      x + option[1],
      y + option[0],
      iteration + 1,
      grid,
    );
  });

  return totalSuccessfulPaths;
};
