import { GridRegionUtils } from "~/lib/grid-region";
import { generateGrid } from "./part-1";

export default async function part2(input: string[]) {
  const key = input[0];

  const grid = await generateGrid(key);

  return GridRegionUtils.getAllRegions(grid, true).length;
}

// Solve time: 12 minutes and 16 seconds
// Total solve time: 15 minutes and 36 seconds
