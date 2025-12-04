import { BooleanGrid } from "~/lib/grid";

export default async function part2(input: string[]) {
  let total = 0;

  const grid = new BooleanGrid().import(input, "@");

  let removed = 0;

  do {
    total += removed;
    removed = 0;

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
          removed++;
          grid.set({ x, y }, false);
        }
      }
    }
  } while (removed > 0);

  return total;
}

// Solve time: 1 minute and 41 seconds
// Total solve time: 7 minutes and 52 seconds
