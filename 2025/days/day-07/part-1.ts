import { makeCoordinateKey, type Coordinate } from "~/lib/grid";

export default async function part1(input: string[]): Promise<number> {
  const gridMap: string[][] = input.map((line) => line.trim().split(""));

  let startPosition: Coordinate | null = { x: gridMap[0].indexOf("S"), y: 0 };

  const beamQueue: Coordinate[] = [startPosition];

  const visitedCoordinates: Set<string> = new Set<string>([
    makeCoordinateKey(startPosition),
  ]);

  let totalCount: number = 0;

  const addCoordinate = (coordinate: Coordinate) => {
    const key = makeCoordinateKey(coordinate);
    if (visitedCoordinates.has(key)) return;
    visitedCoordinates.add(key);
    beamQueue.push(coordinate);
  };

  while (beamQueue.length > 0) {
    const currentPosition = beamQueue.shift() as Coordinate;
    const { x: currentCol, y: currentRow } = currentPosition;

    if (
      currentRow < 0 ||
      currentRow >= gridMap.length ||
      currentCol < 0 ||
      currentCol >= gridMap[currentRow].length
    ) {
      continue;
    }

    const cellCharacter = gridMap[currentRow][currentCol];

    if (cellCharacter === "." || cellCharacter === "S") {
      if (currentRow === gridMap.length - 1) continue;
      addCoordinate({ x: currentCol, y: currentRow + 1 });
    } else if (cellCharacter === "^") {
      totalCount += 1;
      addCoordinate({ x: currentCol - 1, y: currentRow });
      addCoordinate({ x: currentCol + 1, y: currentRow });
    }
  }

  return totalCount;
}

// Solve time: 47 minutes and 14 seconds
