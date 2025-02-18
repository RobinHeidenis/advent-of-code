import { solveGridPath } from "~/lib/pathfinding";

export default async function part1(input: string[]) {
  const grid = setupGrid(input);

  return solveGridPath(grid)!.length - 1;
}

// Solve time: 12 minutes and 29 seconds

export const setupGrid = (input: string[]) => {
  const grid: string[][] = [];

  const designersFavouriteNumber = BigInt(input[0]);

  for (let y = 0; y < 50; y++) {
    for (let x = 0; x < 50; x++) {
      if (y === 0) {
        grid[x] = [];
      }

      const bigX = BigInt(x);
      const bigY = BigInt(y);

      const calc =
        bigX * bigX + 3n * bigX + 2n * bigX * bigY + bigY + bigY * bigY;
      const binary = (calc + designersFavouriteNumber).toString(2);

      if (binary.split("").filter((c) => c === "1").length % 2 === 0) {
        grid[y][x] = ".";
      } else {
        grid[y][x] = "#";
      }
    }
  }

  grid[1][1] = "S";
  grid[39][31] = "E";

  return grid;
};
