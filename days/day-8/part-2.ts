export default async function part2(input: string[]) {
  const frequencies = new Map<string, { x: number; y: number }[]>();
  const antinodes = new Set<string>();

  input.forEach((line, y) => {
    line.split("").forEach((char, x) => {
      if (char === ".") return;

      antinodes.add(makeLocationKey(x, y));

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
        let currentLocation: Location = location;
        let nextLocation: Location = otherLocation;

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

          if (!antinodes.has(makeLocationKey(targetX, targetY))) {
            antinodes.add(makeLocationKey(targetX, targetY));
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

const makeLocationKey = (x: number, y: number) => {
  return `${x},${y}`;
};

type Location = { x: number; y: number };

const isInBounds = (
  currentLocation: Location,
  otherLocation: Location,
  maxX: number,
  maxY: number,
) => {
  const deltaX = otherLocation.x - currentLocation.x;
  const deltaY = otherLocation.y - currentLocation.y;

  const targetX = otherLocation.x + deltaX;
  const targetY = otherLocation.y + deltaY;
  const inBounds =
    targetX >= 0 && targetX < maxX && targetY >= 0 && targetY < maxY;

  return { inBounds, targetX, targetY };
};
