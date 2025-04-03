import { Grid } from "~/lib/grid";

export default async function part1(input: string[]) {
  const grid = new Grid<number>();

  input.forEach((line) => {
    const [, info] = line.split("@ ");
    const [coords, size] = info.split(": ");

    const [x, y] = coords.split(",").map(Number);
    const [width, height] = size.split("x").map(Number);

    for (let i = x; i < x + width; i++) {
      for (let j = y; j < y + height; j++) {
        const count = grid.get({ x: i, y: j }) || 0;
        grid.set({ x: i, y: j }, count + 1);
      }
    }
  });

  return grid.getGrid().reduce((acc, row) => {
    return acc + row.filter((cell) => cell > 1).length;
  }, 0);
}

// Solve time: 5 minutes and 54 seconds
