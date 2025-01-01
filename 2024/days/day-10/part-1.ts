import { getSurroundingTiles } from "./shared";

export default async function part1(input: string[]) {
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

      const uniqueEndings = new Set<string>();
      step(x, y, 0, grid, uniqueEndings);
      total += uniqueEndings.size;
    }
  }

  return total;
}

// Solve time: 32 minutes and 43 seconds

const step = (
  x: number,
  y: number,
  iteration: number,
  grid: number[][],
  uniqueEndings: Set<string>,
) => {
  if (iteration === 9) {
    if (!uniqueEndings.has(`${x},${y}`)) {
      uniqueEndings.add(`${x},${y}`);
    }
    return true;
  }

  const surroundingTiles = getSurroundingTiles(x, y, grid);
  if (!surroundingTiles.includes(iteration + 1)) return false;

  const availableOptions = [];

  if (surroundingTiles[0] === iteration + 1) availableOptions.push([-1, 0]);
  if (surroundingTiles[1] === iteration + 1) availableOptions.push([0, 1]);
  if (surroundingTiles[2] === iteration + 1) availableOptions.push([1, 0]);
  if (surroundingTiles[3] === iteration + 1) availableOptions.push([0, -1]);

  availableOptions.forEach((option) => {
    step(x + option[1], y + option[0], iteration + 1, grid, uniqueEndings);
  });
};
