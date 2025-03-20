import { directions, getNextDirection } from "./part-1";

export default async function part2(input: string[]) {
  let total = 0;

  const grid = input.map((line) => {
    return line.split("");
  });

  const startIndex = grid[0].indexOf("|");

  const state: { x: number; y: number; direction: keyof typeof directions } = {
    x: startIndex,
    y: 0,
    direction: "down",
  };

  while (true) {
    const currentChar = grid[state.y][state.x];
    total++;

    if (currentChar === "+") {
      const nextDirection = getNextDirection(
        grid,
        state.x,
        state.y,
        state.direction,
      );

      if (nextDirection === undefined) {
        return total;
      }

      state.direction = nextDirection;
      state.x += directions[nextDirection].x;
      state.y += directions[nextDirection].y;
    } else {
      const direction = directions[state.direction];
      if (grid[state.y + direction.y][state.x + direction.x] === " ") {
        return total;
      }

      state.x += direction.x;
      state.y += direction.y;
    }
  }
}

// Solve time: 1 minutes and 21 seconds
// Total solve time: 17 minutes and 51 seconds
