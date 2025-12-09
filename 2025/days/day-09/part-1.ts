export default async function part1(input: string[]) {
  const tiles: { x: number; y: number }[] = [];

  input.forEach((line) => {
    const [x, y] = line.split(",").map(Number);

    tiles.push({ x, y });
  });

  let largestArea = 0;
  // for each tile, calculate the area that can be created between it and other tiles
  tiles.forEach((tile) => {
    tiles.forEach((otherTile) => {
      const area =
        (Math.abs(tile.x - otherTile.x) + 1) *
        (Math.abs(tile.y - otherTile.y) + 1);

      if (area > largestArea) {
        largestArea = area;
      }
    });
  });

  return largestArea;
}

// Solve time: 14 minutes and 16 seconds
