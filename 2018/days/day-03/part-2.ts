import { Grid } from "~/lib/grid";

export default async function part2(input: string[]) {
  const grid = new Grid<number[]>();

  const allClaimIds = new Set<number>();
  const overlappingClaimIds = new Set<number>();

  input.forEach((line) => {
    const [idString, info] = line.split("@ ");
    const id = Number(idString.slice(1));
    allClaimIds.add(id);

    const [coords, size] = info.split(": ");
    const [x, y] = coords.split(",").map(Number);
    const [width, height] = size.split("x").map(Number);

    for (let i = x; i < x + width; i++) {
      for (let j = y; j < y + height; j++) {
        const cell = grid.get({ x: i, y: j }) || [];

        if (cell.length > 0) {
          overlappingClaimIds.add(id);
          cell.forEach((existingId) => overlappingClaimIds.add(existingId));
        }

        grid.set({ x: i, y: j }, [...cell, id]);
      }
    }
  });

  const nonOverlappingIds = [...allClaimIds].filter(
    (id) => !overlappingClaimIds.has(id),
  );

  return nonOverlappingIds[0];
}

// Solve time: 5 minutes and 48 seconds
// Total solve time: 11 minutes and 42 seconds
