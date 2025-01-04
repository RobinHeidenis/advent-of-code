import type { Coordinate } from "~/lib/grid";

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

export default async function part1(input: string[]) {
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

  return getScore(
    maze,
    { x: startingX, y: startingY },
    { x: endingX, y: endingY },
  );
}

// Solve time: 57 minutes and 23 seconds
// NOTE: I cheated and stole the dijkstra's algorithm from @JustSamuel over here:
// https://github.com/JustSamuel/AOC/blob/9c7a7b1b55044120407df888480b5b75283b7beb/src/day16/index.ts
// My original attempt sucked (I believe I implemented a shitty version of BFS but I'm not sure) and I don't want to invest much more time relearning dijkstra's algo, so this will do for now.
