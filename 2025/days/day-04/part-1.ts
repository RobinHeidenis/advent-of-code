import { BooleanGrid } from "~/lib/grid";

export default async function part1(input: string[]) {
  let total = 0;

  const grid = new BooleanGrid().import(input, "@");

  for (let x = 0; x < grid.getXLength(); x++) {
    for (let y = 0; y < grid.getYLength(); y++) {
      if (!grid.get({ x, y })) {
        continue;
      }
      const surrounding = grid.getSurrounding({ x, y });
      const amountFreeSpaces = surrounding.filter(
        (coordinate) => !coordinate,
      ).length;
      if (amountFreeSpaces > 4) {
        total++;
      }
    }
  }

  return total;
}

// Solve time: 6 minutes and 11 seconds
