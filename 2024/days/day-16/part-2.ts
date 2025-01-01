import type { Coordinate } from "../../lib/types";

function getKey(c: Coordinate, dir: number) {
  return `${c.x},${c.y},${dir}`;
}

const dirs = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];

const getScore = (grid: string[][], start: Coordinate, end: Coordinate) => {
  let score = 0;

  const queue: [number, number, number, number][] = [[start.x, start.y, 1, 0]];
  const visited = new Set<string>();

  while (queue.length) {
    // Poor man's priority queue / Dijkstra's algorithm
    queue.sort((a, b) => a[3] - b[3]);

    const [x, y, dir, score] = queue.shift()!;
    const key = getKey({ x, y }, dir);

    if (x === end.x && y === end.y) return score;
    if (visited.has(key)) continue;

    visited.add(key);

    const nx = x + dirs[dir][0];
    const ny = y + dirs[dir][1];
    if (grid[ny]?.[nx] !== "#") {
      queue.push([nx, ny, dir, score + 1]);
    }

    queue.push([x, y, (dir + 1) % 4, score + 1000]);
    queue.push([x, y, (dir + 3) % 4, score + 1000]);
  }

  return score;
};

const getPaths = (
  grid: string[][],
  start: Coordinate,
  end: Coordinate,
  lowestScore: number,
): Coordinate[][] => {
  const queue: [[number, number, number, number, Coordinate[]]] = [
    [start.x, start.y, 1, 0, [start]],
  ];
  const visited = new Map<string, number>();
  const paths: Coordinate[][] = [];

  while (queue.length) {
    const [x, y, dir, score, path] = queue.shift()!;
    const key = getKey({ x, y }, dir);

    if (score > lowestScore) continue;
    if (visited.has(key) && visited.get(key)! < score) continue;
    visited.set(key, score);

    if (x === end.x && y === end.y && score === lowestScore) {
      paths.push(path);
      continue;
    }

    const nx = x + dirs[dir][0];
    const ny = y + dirs[dir][1];
    if (grid[ny]?.[nx] !== "#") {
      queue.push([nx, ny, dir, score + 1, [...path, { x: nx, y: ny }]]);
    }

    queue.push([x, y, (dir + 1) % 4, score + 1000, [...path]]);
    queue.push([x, y, (dir + 3) % 4, score + 1000, [...path]]);
  }

  return paths;
};

export default async function part2(input: string[]) {
  const maze = input.map((line) => line.split(""));

  let startingX: number = 0;
  let startingY: number = 0;
  let endingX: number = 0;
  let endingY: number = 0;

  for (let y = 0; y < maze.length; y++) {
    for (let x = 0; x < maze[y].length; x++) {
      if (maze[y][x] === "E") {
        endingX = x;
        endingY = y;
      }

      if (maze[y][x] === "S") {
        startingX = x;
        startingY = y;
      }
    }
  }

  const lowest = getScore(
    maze,
    { x: startingX, y: startingY },
    { x: endingX, y: endingY },
  );
  const paths = getPaths(
    maze,
    { x: startingX, y: startingY },
    { x: endingX, y: endingY },
    lowest,
  );

  const uniquePaths = new Set<string>();
  paths.forEach((path) => {
    path.forEach((coordinate) => uniquePaths.add(getKey(coordinate, 0)));
  });

  return uniquePaths.size;
}

// Solve time: 3 minutes and 31 seconds (because I copied)
// Total solve time: 1 hour, 0 minutes, 54 seconds
