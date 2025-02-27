type Point = { x: number; y: number };

type Grid = string[][];

const directions: Point[] = [
  { x: 0, y: 1 },
  { x: 0, y: -1 },
  { x: 1, y: 0 },
  { x: -1, y: 0 },
];

export default async function part1(input: string[]) {
  return shortestPath(input);
}

// Solve time: 42 minutes and 8 seconds

const bfs = (grid: Grid, start: Point, target: Point): number => {
  const queue: [Point, number][] = [[start, 0]];
  const visited = new Set<string>();
  visited.add(`${start.x},${start.y}`);

  while (queue.length) {
    const [{ x, y }, steps] = queue.shift()!;
    if (x === target.x && y === target.y) return steps;

    for (const { x: dx, y: dy } of directions) {
      const nx = x + dx;
      const ny = y + dy;
      if (grid[ny]?.[nx] !== "#" && !visited.has(`${nx},${ny}`)) {
        visited.add(`${nx},${ny}`);
        queue.push([{ x: nx, y: ny }, steps + 1]);
      }
    }
  }
  return Infinity;
};

export const shortestPath = (
  input: string[],
  returnToStart = false,
): number => {
  const grid = input.map((line) => line.split(""));
  const points = grid
    .reduce<{ location: Point; number: number }[]>((acc, row, y) => {
      row.forEach((cell, x) => {
        if (cell !== "#" && cell !== ".") {
          acc.push({ location: { x, y }, number: Number(cell) });
        }
      });
      return acc;
    }, [])
    .sort((a, b) => a.number - b.number);

  const otherPoints = points.slice(1).map((p) => p.location);

  const distances: number[][] = Array(points.length)
    .fill(null)
    .map(() => Array(points.length).fill(0));

  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const dist = bfs(grid, points[i].location, points[j].location);
      distances[i][j] = dist;
      distances[j][i] = dist;
    }
  }

  const permutations = (array: number[]): number[][] => {
    if (array.length === 1) return [array];
    return array.flatMap((current, i) =>
      permutations(array.slice(0, i).concat(array.slice(i + 1))).map((permutation) => [
        current,
        ...permutation,
      ]),
    );
  };

  let minSteps = Infinity;
  for (const order of permutations(
    [...Array(otherPoints.length).keys()].map((i) => i + 1),
  )) {
    let steps = 0;
    let last = 0;

    for (const point of order) {
      steps += distances[last][point];
      last = point;
    }
    if (returnToStart) steps += distances[last][0];
    minSteps = Math.min(minSteps, steps);
  }

  return minSteps;
};
