type Direction = "N" | "E" | "S" | "W" | "NE" | "SE" | "SW" | "NW";

const grid: string[][] = [];

export default async function part1(input: string[]) {
  let total = 0;

  input.forEach((line) => grid.push(line.split("")));

  for (let y = 0; y < grid.length; y++) {
    const line = grid[y];

    for (let x = 0; x < line.length; x++) {
      const char = line[x];
      if (char !== "X") continue;

      total += makeStep(x, y, null, 1);
    }
  }

  return total;
}

const letters = ["X", "M", "A", "S"];

const directionMap = {
  N: [0, -1],
  NE: [1, -1],
  E: [1, 0],
  SE: [1, 1],
  S: [0, 1],
  SW: [-1, 1],
  W: [-1, 0],
  NW: [-1, -1],
} satisfies Record<Direction, [number, number]>;

const determineNextSteps = (
  x: number,
  y: number,
  direction: Direction | null,
  iteration: number,
) => {
  if (iteration > 3) {
    return [];
  }

  const nextLetter = letters[iteration];

  let options: {
    character: string;
    x: number;
    y: number;
    direction: Direction;
  }[] = [];

  if (direction === null || iteration === 1) {
    options = Object.keys(directionMap).map((direction) =>
      getPos(x, y, direction as Direction),
    );
  } else {
    options = [getPos(x, y, direction)];
  }

  return options.filter((option) => option.character === nextLetter);
};

const getPos = (x: number, y: number, direction: Direction) => {
  const [deltaX, deltaY] = directionMap[direction];
  const newX = x + deltaX;
  const newY = y + deltaY;
  return { character: grid[newY]?.[newX], x: newX, y: newY, direction };
};

const makeStep = (
  x: number,
  y: number,
  direction: Direction | null,
  iteration: number = 1,
): number => {
  const nextSteps = determineNextSteps(x, y, direction, iteration);

  if (nextSteps.length === 0) return 0;

  if (iteration === 3) {
    return nextSteps.length;
  }

  const nextNextSteps = nextSteps.map((step) =>
    makeStep(step.x, step.y, step.direction, iteration + 1),
  );
  return nextNextSteps.reduce((prev, curr) => prev + curr, 0);
};

// Solve time: 59 minutes and 37 seconds
