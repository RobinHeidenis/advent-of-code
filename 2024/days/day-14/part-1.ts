import type { Coordinate } from "~/lib/grid";

export default async function part1(input: string[]) {
  const endPositions: Coordinate[] = [];
  const height = 103;
  const width = 101;

  input.forEach((line) => {
    const [positionString, velocityString] = line.split(" ");
    const [x, y] = positionString.split("=")[1].split(",").map(Number);
    const [deltaX, deltaY] = velocityString
      .split("=")[1]
      .split(",")
      .map(Number);

    const moves: Coordinate[] = [];

    let currentX = x;
    let currentY = y;
    for (let i = 0; i < 100; i++) {
      // Memoization for moves (didn't work ?)
      //if (
      //  moves[0]?.x === currentX &&
      //  moves[0]?.y === currentY &&
      //  i + moves.length < 100
      //) {
      //  i += moves.length;
      //  continue;
      //}

      moves.push({ x: currentX, y: currentY });

      if (currentX + deltaX >= width) {
        currentX = currentX + deltaX - width;
      } else if (currentX + deltaX < 0) {
        currentX = width - Math.abs(currentX + deltaX);
      } else {
        currentX += deltaX;
      }

      if (currentY + deltaY >= height) {
        currentY = currentY + deltaY - height;
      } else if (currentY + deltaY < 0) {
        currentY = height - Math.abs(currentY + deltaY);
      } else {
        currentY += deltaY;
      }
    }

    endPositions.push({ x: currentX, y: currentY });
  });

  const { NE, SE, SW, NW } = Object.groupBy(endPositions, (item) => {
    if (item.x === (width - 1) / 2 || item.y === (height - 1) / 2)
      return "invalid";

    if (item.x < (width - 1) / 2) {
      if (item.y < (height - 1) / 2) return "NW";
      return "SW";
    }

    if (item.y < (height - 1) / 2) return "NE";
    return "SE";
  });

  return [NW, NE, SE, SW].reduce((prev, quadrant) => {
    console.log(quadrant);
    return prev * (quadrant?.length ?? 0);
  }, 1);
}

// Solve time: 43 minutes and 44 seconds
