export const directions = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

export const oppositeDirections = {
  up: "down",
  down: "up",
  left: "right",
  right: "left",
};

export default async function part1(input: string[]) {
  let word = "";

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

    if (currentChar === "+") {
      const nextDirection = getNextDirection(
        grid,
        state.x,
        state.y,
        state.direction,
      );

      if (nextDirection === undefined) {
        return word;
      }

      state.direction = nextDirection;
      state.x += directions[nextDirection].x;
      state.y += directions[nextDirection].y;
    } else {
      if (currentChar !== "|" && currentChar !== "-") {
        word += currentChar;
      }

      const direction = directions[state.direction];
      if (grid[state.y + direction.y][state.x + direction.x] === " ") {
        return word;
      }

      state.x += direction.x;
      state.y += direction.y;
    }
  }
}

// Solve time: 16 minutes and 29 seconds

export const getNextDirection = (
  grid: string[][],
  x: number,
  y: number,
  direction: keyof typeof directions,
) => {
  const applicableDirections = Object.entries(directions).filter(
    ([key]) => key !== direction && key !== oppositeDirections[direction],
  );

  for (const [key, { x: dx, y: dy }] of applicableDirections) {
    if (grid[y + dy][x + dx] !== " ") {
      return key as keyof typeof directions;
    }
  }
};
