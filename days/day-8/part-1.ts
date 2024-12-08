export default async function part1(input: string[]) {
  const frequencies = new Map<string, { x: number; y: number }[]>();
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

  console.log(frequencies);

  frequencies.forEach((frequency) => {
    frequency.forEach((location, index) => {
      const locationsWithoutCurrent = [...frequency].toSpliced(index, 1);

      locationsWithoutCurrent.forEach((otherLocation) => {
        const deltaX = otherLocation.x - location.x;
        const deltaY = otherLocation.y - location.y;

        const targetX = otherLocation.x + deltaX;
        const targetY = otherLocation.y + deltaY;
        if (
          targetX >= 0 &&
          targetX < input[0].length &&
          targetY >= 0 &&
          targetY < input.length &&
          !antinodes.has(makeLocationKey(targetX, targetY))
        ) {
          antinodes.add(makeLocationKey(targetX, targetY));
        }
      });
    });
  });

  console.log(antinodes);
  return antinodes.size;
}

// Solve time: 20 minutes and 15 seconds

const makeLocationKey = (x: number, y: number) => {
  return `${x},${y}`;
};
