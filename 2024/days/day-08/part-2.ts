import { makeCoordinateKey } from "../../../lib/grid";
import { isInBounds, } from "./shared";

export default async function part2(input: string[]) {
  const frequencies = new Map<string, Coordinate[]>();
  const antinodes = new Set<string>();

  input.forEach((line, y) => {
    line.split("").forEach((char, x) => {
      if (char === ".") return;

      antinodes.add(makeCoordinateKey({ x, y }));

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
        let outOfBounds = false;
        let currentLocation: Coordinate = location;
        let nextLocation: Coordinate = otherLocation;

        while (!outOfBounds) {
          const { inBounds, targetX, targetY } = isInBounds(
            currentLocation,
            nextLocation,
            input[0].length,
            input.length,
          );

          if (!inBounds) {
            outOfBounds = true;
            break;
          }

          if (!antinodes.has(makeCoordinateKey({ x: targetX, y: targetY }))) {
            antinodes.add(makeCoordinateKey({ x: targetX, y: targetY }));
          }

          currentLocation = nextLocation;
          nextLocation = { x: targetX, y: targetY };
        }
      });
    });
  });

  return antinodes.size;
}

// Solve time: 9 minutes and 33 seconds
// Total solve time: 29 minutes and 48 seconds
