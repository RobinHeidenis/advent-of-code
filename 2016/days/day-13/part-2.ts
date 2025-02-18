import { findReachable } from "~/lib/pathfinding";
import { setupGrid } from "./part-1";

export default async function part2(input: string[]) {
  const grid = setupGrid(input);

  return findReachable(grid, { x: 1, y: 1 }, 50)!.length;
}
