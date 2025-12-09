import type { Coordinate, Coordinate3D } from "~/lib/grid";

interface CoordinatePair {
  area: number;
  tileA: Coordinate;
  tileB: Coordinate;
}

export default async function part2(input: string[]) {
  const tiles: Coordinate[] = input.map((line) => {
    const [x, y] = line.split(",").map(Number);
    return { x, y };
  });

  const pairs: CoordinatePair[] = tiles
    .flatMap((tileA, i) =>
      tiles.slice(i + 1).map((tileB) => ({
        area: calculateArea(tileA, tileB),
        tileA,
        tileB,
      })),
    )
    .toSorted((a, b) => b.area - a.area);

  const sides: [Coordinate, Coordinate][] = tiles.map((p, i) => [
    p,
    tiles[i + 1 === tiles.length ? 0 : i + 1],
  ]);

  const intersectsWithPolygonSide = (pair: CoordinatePair): boolean => {
    const { tileA, tileB } = pair;
    const [x1, y1] = [tileA.x, tileA.y];
    const [x2, y2] = [tileB.x, tileB.y];

    return sides.some(
      ([sideA, sideB]) =>
        inRange(sideA.y, sideB.y, y1, y2) && inRange(sideA.x, sideB.x, x1, x2),
    );
  };

  const result = pairs.find((pair) => !intersectsWithPolygonSide(pair));

  return result ? result.area : 0;
}

const calculateArea = (
  tileA: { x: number; y: number },
  tileB: { x: number; y: number },
): number => {
  const width = Math.abs(tileA.x - tileB.x) + 1;
  const height = Math.abs(tileA.y - tileB.y) + 1;
  return width * height;
};

const inRange = (a1: number, a2: number, b1: number, b2: number): boolean => {
  return (
    !(Math.max(a1, a2) <= Math.min(b1, b2)) &&
    !(Math.min(a1, a2) >= Math.max(b1, b2))
  );
};

// Solve time: 49 minutes and 23 seconds
// Total solve time: 1 hour, 3 minutes, and 39 seconds
