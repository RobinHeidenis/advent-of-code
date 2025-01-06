export default async function part1(input: string[]) {
  const grid: boolean[][] = Array.from({ length: 1000 }).map(() =>
    Array.from({ length: 1000 }).map(() => false),
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
        grid[y][x] =
          operation === "toggle"
            ? !grid[y][x]
            : operation === "on"
              ? true
              : false;
      }
    }
  });

  return grid.reduce(
    (prev, line) =>
      prev + line.reduce((prev, char) => (char ? prev + 1 : prev), 0),
    0,
  );
}

// Solve time: 20 minutes and 10 seconds
