export const getSurroundingTiles = (
  x: number,
  y: number,
  grid: number[][],
): [
  number | undefined,
  number | undefined,
  number | undefined,
  number | undefined,
] => {
  const north = grid[y - 1]?.[x];
  const east = grid[y][x + 1];
  const south = grid[y + 1]?.[x];
  const west = grid[y][x - 1];

  return [north, east, south, west];
};

