import { BooleanGrid } from "~/lib/grid";

export default async function part1(input: string[]) {
  const steps = 100;

  const grid = new BooleanGrid();
  grid.import(input);

  for (let i = 0; i < steps; i++) {
    const currentState = grid.copy();

    for (let y = 0; y < grid.getYLength(); y++) {
      for (let x = 0; x < grid.getXLength(); x++) {
        const neighbors = currentState.getSurrounding({ x, y }).filter(Boolean);

        const currentLight = currentState.get({ x, y });
        if (
          (currentLight &&
            (neighbors.length === 2 || neighbors.length === 3)) ||
          (!currentLight && neighbors.length === 3)
        ) {
          grid.set({ x, y }, true);
        } else {
          grid.set({ x, y }, false);
        }
      }
    }
  }

  return grid
    .getGrid()
    .reduce(
      (total, line) =>
        total + line.reduce((total, light) => (light ? total + 1 : total), 0),
      0,
    );
}

// Solve time: 9 minutes and 27 seconds
