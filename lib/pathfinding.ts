export interface Point {
  x: number;
  y: number;
}

export class GridPathfinder {
  private grid: string[][];
  private rows: number;
  private cols: number;

  constructor(grid: string[][]) {
    this.grid = grid;
    this.rows = grid.length;
    this.cols = grid[0].length;
  }

  private isValidPoint(point: Point): boolean {
    return (
      point.x >= 0 &&
      point.x < this.rows &&
      point.y >= 0 &&
      point.y < this.cols &&
      this.grid[point.x][point.y] !== "#"
    );
  }

  private directions: Point[] = [
    { x: -1, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 0 },
    { x: 0, y: -1 },
  ];

  findReachablePoints(start: Point, steps: number): Point[] {
    const reachablePoints: Point[] = [];
    const queue: { point: Point; distance: number }[] = [
      { point: start, distance: 0 },
    ];
    const visited = new Set<string>();
    visited.add(`${start.x},${start.y}`);
    reachablePoints.push(start);

    while (queue.length > 0) {
      const { point, distance } = queue.shift()!;

      if (distance < steps) {
        for (const dir of this.directions) {
          const nextPoint: Point = {
            x: point.x + dir.x,
            y: point.y + dir.y,
          };

          const nextPointKey = `${nextPoint.x},${nextPoint.y}`;

          if (this.isValidPoint(nextPoint) && !visited.has(nextPointKey)) {
            queue.push({ point: nextPoint, distance: distance + 1 });
            visited.add(nextPointKey);
            reachablePoints.push(nextPoint);
          }
        }
      }
    }

    return reachablePoints;
  }

  findShortestPath(start: Point, end: Point): Point[] | null {
    const queue: { point: Point; path: Point[] }[] = [
      { point: start, path: [start] },
    ];

    const visited = new Set<string>();
    visited.add(`${start.x},${start.y}`);

    while (queue.length > 0) {
      const { point, path } = queue.shift()!;

      if (point.x === end.x && point.y === end.y) {
        return path;
      }

      for (const dir of this.directions) {
        const nextPoint: Point = {
          x: point.x + dir.x,
          y: point.y + dir.y,
        };

        const nextPointKey = `${nextPoint.x},${nextPoint.y}`;

        if (this.isValidPoint(nextPoint) && !visited.has(nextPointKey)) {
          queue.push({
            point: nextPoint,
            path: [...path, nextPoint],
          });
          visited.add(nextPointKey);
        }
      }
    }

    return null;
  }

  findSpecialPoints(): { start: Point; end: Point } {
    let start: Point | null = null;
    let end: Point | null = null;

    for (let x = 0; x < this.rows; x++) {
      for (let y = 0; y < this.cols; y++) {
        if (this.grid[x][y] === "S") {
          start = { x, y };
        }
        if (this.grid[x][y] === "E") {
          end = { x, y };
        }
      }
    }

    if (!start || !end) {
      throw new Error("Start or end point not found in the grid");
    }

    return { start, end };
  }
}

export function solveGridPath(grid: string[][]): Point[] | null {
  const pathfinder = new GridPathfinder(grid);
  const { start, end } = pathfinder.findSpecialPoints();
  return pathfinder.findShortestPath(start, end);
}

export function findReachable(
  grid: string[][],
  start: Point,
  steps: number,
): Point[] {
  const pathfinder = new GridPathfinder(grid);
  return pathfinder.findReachablePoints(start, steps);
}
