export default async function part2(input: string[]) {
  const visited = new Set<string>();
  const grid: string[][] = [];
  const result: { area: number; perimeter: number }[] = [];

  input.forEach((line) => {
    grid.push(line.split(""));
  });

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (visited.has(`${x},${y}`)) continue;

      const areaMap = {
        coordinates: new Set<string>(),
        perimeter: 0,
      };

      step(x, y, grid[y][x], areaMap, grid);
      areaMap.coordinates.forEach((coordinate) => visited.add(coordinate));
      result.push({
        area: areaMap.coordinates.size,
        perimeter: areaMap.perimeter,
      });
    }
  }

  return result.reduce((prev, curr) => prev + curr.perimeter * curr.area, 0);
}

// Solve time: 27 minutes and 19 seconds
// Total solve time: 1 hour, 1 minute, and 58 seconds

const diagonalMap = [
  [-1, 1],
  [1, 1],
  [1, -1],
  [-1, -1],
];

const step = (
  x: number,
  y: number,
  character: string,
  areaMap: { coordinates: Set<string>; perimeter: number },
  grid: string[][],
) => {
  if (areaMap.coordinates.has(`${x},${y}`)) return;
  areaMap.coordinates.add(`${x},${y}`);
  const surrounding = getSurroundingTiles(x, y, grid);
  surrounding.forEach((tile, index) => {
    if (tile !== character) {
      const nextDirection =
        index === 3 ? surrounding[0] : surrounding[index + 1];
      if (nextDirection !== character) {
        areaMap.perimeter++;
      } else {
        const [diagonalY, diagonalX] = diagonalMap[index]!;
        if (grid[y + diagonalY]?.[x + diagonalX] === character) {
          areaMap.perimeter++;
        }
      }
    }
  });

  const availableNextSteps = getNextSteps(
    x,
    y,
    character,
    areaMap.coordinates,
    grid,
  ).filter(Boolean);
  if (availableNextSteps.length === 0) return;

  availableNextSteps.forEach((nextStep) => {
    step(nextStep.x, nextStep.y, character, areaMap, grid);
  });
};

export const getNextSteps = (
  x: number,
  y: number,
  character: string,
  visited: Set<string>,
  grid: string[][],
) => {
  const [north, east, south, west] = getSurroundingTiles(x, y, grid);
  const result: { x: number; y: number }[] = [];

  if (north === character && !visited.has(`${x},${y - 1}`))
    result.push({ x, y: y - 1 });
  if (east === character && !visited.has(`${x + 1},${y}`))
    result.push({ x: x + 1, y });
  if (south === character && !visited.has(`${x},${y + 1}`))
    result.push({ x, y: y + 1 });
  if (west === character && !visited.has(`${x - 1},${y}`))
    result.push({ x: x - 1, y });

  return result;
};

export const getSurroundingTiles = (
  x: number,
  y: number,
  grid: string[][],
): [
  string | undefined,
  string | undefined,
  string | undefined,
  string | undefined,
] => {
  const north = grid[y - 1]?.[x];
  const east = grid[y][x + 1];
  const south = grid[y + 1]?.[x];
  const west = grid[y][x - 1];

  return [north, east, south, west];
};
