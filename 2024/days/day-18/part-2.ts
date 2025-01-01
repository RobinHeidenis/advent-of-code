interface Point {
  x: number;
  y: number;
}

class GridPathfinder {
  private grid: string[][];
  private rows: number;
  private cols: number;

  constructor(grid: string[][]) {
    this.grid = grid;
    this.rows = grid.length;
    this.cols = grid[0].length;
  }

  // Helper method to check if a point is valid and walkable
  private isValidPoint(point: Point): boolean {
    return (
      point.x >= 0 &&
      point.x < this.rows &&
      point.y >= 0 &&
      point.y < this.cols &&
      this.grid[point.x][point.y] !== "#"
    );
  }

  // Possible movement directions (up, right, down, left)
  private directions: Point[] = [
    { x: -1, y: 0 }, // Up
    { x: 0, y: 1 }, // Right
    { x: 1, y: 0 }, // Down
    { x: 0, y: -1 }, // Left
  ];

  // Find the shortest path using Breadth-First Search
  findShortestPath(start: Point, end: Point): Point[] | null {
    // Queue to keep track of points to visit
    const queue: { point: Point; path: Point[] }[] = [
      { point: start, path: [start] },
    ];

    // Set to keep track of visited points
    const visited = new Set<string>();
    visited.add(`${start.x},${start.y}`);

    while (queue.length > 0) {
      const { point, path } = queue.shift()!;

      // Check if we've reached the end
      if (point.x === end.x && point.y === end.y) {
        return path;
      }

      // Explore neighboring points
      for (const dir of this.directions) {
        const nextPoint: Point = {
          x: point.x + dir.x,
          y: point.y + dir.y,
        };

        const nextPointKey = `${nextPoint.x},${nextPoint.y}`;

        // Check if the next point is valid and not visited
        if (this.isValidPoint(nextPoint) && !visited.has(nextPointKey)) {
          queue.push({
            point: nextPoint,
            path: [...path, nextPoint],
          });
          visited.add(nextPointKey);
        }
      }
    }

    // No path found
    return null;
  }

  // Helper method to find start and end points
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

// Example usage
function solveGridPath(grid: string[][]): Point[] | null {
  const pathfinder = new GridPathfinder(grid);
  const { start, end } = pathfinder.findSpecialPoints();
  return pathfinder.findShortestPath(start, end);
}

export default async function part2(input: string[]) {
  const width = 71;
  const height = 71;
  const map: string[][] = Array.from({ length: height }).map(
    () => Array.from({ length: width }).fill(".") as string[],
  ) as string[][];

  for (let i = 0; i < 1024; i++) {
    const [x, y] = input[i].split(",").map(Number);
    map[y][x] = "#";
  }

  for (let i = 1024; i < input.length; i++) {
    map[0][0] = "S";
    map[70][70] = "E";

    const [x, y] = input[i].split(",").map(Number);
    map[y][x] = "#";

    const path = solveGridPath(map);
    if (!path || !path.length) return input[i];
  }
}

// Solve time: 2 minutes and 17 seconds
// Total solve time: 54 minutes and 36 seconds
