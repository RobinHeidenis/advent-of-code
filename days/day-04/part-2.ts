type Direction = "N" | "E" | "S" | "W" | "NE" | "SE" | "SW" | "NW";

const grid: string[][] = [];

export default async function part2(input: string[]) {
  let total = 0;

  input.forEach((line) => grid.push(line.split("")));

  for (let y = 0; y < grid.length; y++) {
    const line = grid[y];

    for (let x = 0; x < line.length; x++) {
      const char = line[x];
      if (char !== "A") continue;

      const NW = getPos(x, y, "NW");
      const NE = getPos(x, y, "NE");
      const SW = getPos(x, y, "SW");
      const SE = getPos(x, y, "SE");

      if (isXMas(NW.character, NE.character, SW.character, SE.character))
        total++;
    }
  }

  return total;
}

const isXMas = (NW: string, NE: string, SW: string, SE: string) => {
  if ([NW, NE, SW, SE].filter((i) => i !== "M" && i !== "S").length)
    return false;

  if (NW === SE) return false;
  if (NE === SW) return false;

  return true;
};

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

const getPos = (x: number, y: number, direction: Direction) => {
  const [deltaX, deltaY] = directionMap[direction];
  const newX = x + deltaX;
  const newY = y + deltaY;
  return { character: grid[newY]?.[newX], x: newX, y: newY, direction };
};

// Solve time: 5 minutes and 51 seconds
// Total solve time: 1 hour, 5 minutes, and 28 seconds
