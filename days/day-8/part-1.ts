import type { Coordinate } from "~/lib/types.ts";
import { isInBounds, makeLocationKey } from "./shared";

export default async function part1(input: string[]) {
  const frequencies = new Map<string, Coordinate[]>();
  const antinodes = new Set<string>();

  input.forEach((line, y) => {
    line.split("").forEach((char, x) => {
      if (char === ".") return;

      if (!frequencies.has(char)) {
        frequencies.set(char, [{ x, y }]);
      } else {
        const existing = frequencies.get(char)!;
        existing?.push({ x, y });
      }
    });
  });

  frequencies.forEach((frequency) => {
    frequency.forEach((location, index) => {
      const locationsWithoutCurrent = [...frequency].toSpliced(index, 1);

      locationsWithoutCurrent.forEach((otherLocation) => {
        const { inBounds, targetX, targetY } = isInBounds(
          location,
          otherLocation,
          input[0].length,
          input.length,
        );

        if (
          inBounds &&
          !antinodes.has(makeLocationKey({ x: targetX, y: targetY }))
        ) {
          antinodes.add(makeLocationKey({ x: targetX, y: targetY }));
        }
      });
    });
  });

  return antinodes.size;
}

// Solve time: 20 minutes and 15 seconds
