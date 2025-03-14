import { makeCoordinateKey, type Coordinate, type Grid } from "./grid";

export const GridRegionUtils = {
  getAllCoordinates: <T>(grid: Grid<T>, targetValue: T): Coordinate[] => {
    const coordinates: Coordinate[] = [];

    for (let y = 0; y < grid.getYLength(); y++) {
      const row = grid.getGrid()[y] || [];

      for (let x = 0; x < row.length; x++) {
        if (grid.get({ x, y }) === targetValue) {
          coordinates.push({ x, y });
        }
      }
    }

    return coordinates;
  },

  getAdjacent: ({ x, y }: Coordinate): Coordinate[] => {
    return [
      { x, y: y - 1 }, // top
      { x: x + 1, y }, // right
      { x, y: y + 1 }, // bottom
      { x: x - 1, y }, // left
    ];
  },

  isValidTargetCell: <T>(
    grid: Grid<T>,
    coord: Coordinate,
    targetValue: T,
  ): boolean => {
    const value = grid.get(coord);
    return value === targetValue;
  },

  getRegion: <T>(
    grid: Grid<T>,
    startCoordinate: Coordinate,
    targetValue: T,
  ): Coordinate[] => {
    const visited = new Set<string>();
    const region: Coordinate[] = [];

    GridRegionUtils.floodFill(
      grid,
      startCoordinate,
      visited,
      targetValue,
      region,
    );

    return region;
  },

  getAllRegions: <T>(grid: Grid<T>, targetValue: T): Coordinate[][] => {
    const allCoordinates = GridRegionUtils.getAllCoordinates(grid, targetValue);
    const visited = new Set<string>();
    const regions: Coordinate[][] = [];

    for (const coordinate of allCoordinates) {
      const key = makeCoordinateKey(coordinate);

      if (!visited.has(key)) {
        const region: Coordinate[] = [];
        GridRegionUtils.floodFill(
          grid,
          coordinate,
          visited,
          targetValue,
          region,
        );
        regions.push(region);
      }
    }

    return regions;
  },

  floodFill: <T>(
    grid: Grid<T>,
    coordinate: Coordinate,
    visited: Set<string>,
    targetValue: T,
    region?: Coordinate[],
  ): void => {
    const key = makeCoordinateKey(coordinate);

    if (
      visited.has(key) ||
      !GridRegionUtils.isValidTargetCell(grid, coordinate, targetValue)
    ) {
      return;
    }

    visited.add(key);

    if (region) {
      region.push(coordinate);
    }

    for (const adjacentCoord of GridRegionUtils.getAdjacent(coordinate)) {
      if (GridRegionUtils.isValidTargetCell(grid, adjacentCoord, targetValue)) {
        GridRegionUtils.floodFill(
          grid,
          adjacentCoord,
          visited,
          targetValue,
          region,
        );
      }
    }
  },
};
