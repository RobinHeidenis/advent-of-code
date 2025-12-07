import { makeCoordinateKey, type Coordinate } from "~/lib/grid";

export default async function part2(input: string[]) {
  const gridMap: string[][] = input.map((line) => line.trim().split(""));

  let startPosition: Coordinate | null = { x: gridMap[0].indexOf("S"), y: 0 };

  const cache = new Map<string, number>();

  const solve = ({ x, y }: Coordinate): number => {
    const key = makeCoordinateKey({ x, y });

    if (cache.has(key)) {
      return cache.get(key)!;
    }

    if (y >= gridMap.length) {
      return 1;
    }

    if (gridMap[y][x] === "." || gridMap[y][x] === "S") {
      const result = solve({ x, y: y + 1 });
      cache.set(key, result);
      return result;
    }

    if (gridMap[y][x] === "^") {
      const result = solve({ x: x - 1, y }) + solve({ x: x + 1, y });
      cache.set(key, result);
      return result;
    }

    return 0;
  };

  return solve(startPosition);
}

// Solve time: 6 minutes and 23 seconds
// Total solve time: 53 minutes and 37 seconds
