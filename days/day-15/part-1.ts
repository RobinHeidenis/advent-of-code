const movementMap = {
  v: [1, 0],
  "^": [-1, 0],
  "<": [0, -1],
  ">": [0, 1],
};

export default async function part1(input: string) {
  let total = 0;

  const [mapString, movesString] = input.split("\n\n");

  const map = mapString.split("\n").map((line) => line.split(""));
  const moves = movesString
    .split("")
    .map(
      (character) =>
        movementMap[character as keyof typeof movementMap] ?? undefined,
    )
    .filter(Boolean);

  let startingX = 0;
  let startingY = 0;

  for (let y = 0; y < map.length; y++) {
    const line = map[y];
    startingX = line.findIndex((char) => char === "@");
    if (startingX !== -1) {
      startingY = y;
      break;
    }
  }

  let currentX = startingX;
  let currentY = startingY;
  moves.forEach((move) => {
    const nextTile = map[currentY + move[0]][currentX + move[1]];
    if (nextTile === "#") return;
    if (nextTile === "O") {
      if (move[0] !== 0) {
        if (move[0] < 0) {
          let endIndex = 0;
          for (let y = currentY - 1; y >= 0; y--) {
            if (map[y][currentX] === ".") {
              endIndex = y;
              break;
            }
            if (map[y][currentX] === "#") return;
          }

          map[endIndex][currentX] = "O";
          map[currentY - 1][currentX] = "@";
          map[currentY][currentX] = ".";
          currentY--;
        }
        if (move[0] > 0) {
          let endIndex = 0;
          for (let y = currentY + 1; y < map.length; y++) {
            if (map[y][currentX] === ".") {
              endIndex = y;
              break;
            }
            if (map[y][currentX] === "#") return;
          }

          map[endIndex][currentX] = "O";
          map[currentY + 1][currentX] = "@";
          map[currentY][currentX] = ".";
          currentY++;
        }
      }
      if (move[1] !== 0) {
        if (move[1] < 0) {
          let endIndex = 0;
          for (let x = currentX - 1; x >= 0; x--) {
            if (map[currentY][x] === ".") {
              endIndex = x;
              break;
            }
            if (map[currentY][x] === "#") return;
          }

          map[currentY][endIndex] = "O";
          map[currentY][currentX - 1] = "@";
          map[currentY][currentX] = ".";
          currentX--;
        }
        if (move[1] > 0) {
          let endIndex = 0;
          for (let x = currentX + 1; x < map[0].length; x++) {
            if (map[currentY][x] === ".") {
              endIndex = x;
              break;
            }
            if (map[currentY][x] === "#") return;
          }

          map[currentY][endIndex] = "O";
          map[currentY][currentX + 1] = "@";
          map[currentY][currentX] = ".";
          currentX++;
        }
      }
    }
    if (nextTile === ".") {
      map[currentY][currentX] = ".";
      map[currentY + move[0]][currentX + move[1]] = "@";
      currentY += move[0];
      currentX += move[1];
    }
  });

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      if (map[y][x] === "O") {
        total += 100 * y + x;
      }
    }
  }
  return total;
}

// Solve time: 46 minutes and 7 seconds
