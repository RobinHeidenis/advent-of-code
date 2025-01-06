export default async function part2(input: string[]) {
  const grid: number[][] = Array.from({ length: 1000 }).map(() =>
    Array.from({ length: 1000 }).map(() => 0),
  );

  input.forEach((line) => {
    const [[_, startY, startX], [__, endY, endX]] = [
      ...line.matchAll(/(\d+),(\d+)/g),
    ].map((l) => l.map(Number));

    let operation = "off";
    if (line.includes("on")) operation = "on";
    if (line.includes("toggle")) operation = "toggle";

    for (let y = startY; y <= endY; y++) {
      for (let x = startX; x <= endX; x++) {
        const currentValue = grid[y][x];
        grid[y][x] =
          operation === "toggle"
            ? currentValue + 2
            : operation === "on"
              ? currentValue + 1
              : currentValue > 0
                ? currentValue - 1
                : currentValue;
      }
    }
  });

  return grid.reduce(
    (prev, line) => prev + line.reduce((prev, char) => prev + char, 0),
    0,
  );
}

// Solve time: 2 minutes and 1 second
