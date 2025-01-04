import type { Coordinate } from "~/lib/grid";

const movementMap = {
  v: [1, 0],
  "^": [-1, 0],
  "<": [0, -1],
  ">": [0, 1],
};

export default async function part2(input: string) {
  let total = 0;

  const [mapString, movesString] = input.split("\n\n");

  const map = mapString.split("\n").map((line) =>
    line.split("").flatMap((char) => {
      if (char === "#") return ["#", "#"];
      if (char === "O") return ["[", "]"];
      if (char === ".") return [".", "."];
      else return ["@", "."];
    }),
  );

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
    if (nextTile === "[" || nextTile === "]") {
      if (move[0] !== 0) {
        // Move in Y direction, find all boxes in y direction
        if (move[0] < 0) {
          const canMove = checkNeighbors(
            "up",
            [currentY - 1, nextTile === "[" ? currentX : currentX - 1],
            map,
          );

          if (canMove) {
            doMove(
              "up",
              [currentY - 1, nextTile === "[" ? currentX : currentX - 1],
              map,
            );

            map[currentY][currentX] = ".";
            map[currentY - 1][currentX] = "@";
            currentY--;
          }
        }
        if (move[0] > 0) {
          const canMove = checkNeighbors(
            "down",
            [currentY + 1, nextTile === "[" ? currentX : currentX - 1],
            map,
          );

          if (canMove) {
            doMove(
              "down",
              [currentY + 1, nextTile === "[" ? currentX : currentX - 1],
              map,
            );

            map[currentY][currentX] = ".";
            map[currentY + 1][currentX] = "@";
            currentY++;
          }
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

          map[currentY].splice(
            endIndex,
            currentX - endIndex + 1,
            ...Array.from({ length: currentX - endIndex - 1 }).map((_, i) =>
              i % 2 === 0 ? "[" : "]",
            ),
            "@",
            ".",
          );
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

          map[currentY].splice(
            currentX,
            endIndex - currentX + 1,
            ".",
            "@",
            ...Array.from({ length: endIndex - currentX - 1 }).map((_, i) =>
              i % 2 === 0 ? "[" : "]",
            ),
          );
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

  map.forEach((line) => console.log(line.join("")));
  console.log();

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      if (map[y][x] === "[") {
        total += 100 * y + x;
      }
    }
  }
  return total;
}

// Solve time: 1 hour, 5 minutes, and 14 seconds
// Total solve time: 1 hour, 51 minutes, and 21 seconds

const checkNeighbors = (
  direction: "up" | "down",
  origin: [number, number],
  map: string[][],
): boolean => {
  if (direction === "up") {
    if (
      map[origin[0] - 1][origin[1]] === "#" ||
      map[origin[0] - 1][origin[1] + 1] === "#"
    )
      return false;
    if (map[origin[0] - 1][origin[1]] === "[")
      return checkNeighbors(direction, [origin[0] - 1, origin[1]], map);

    const coordinatesToCheck: Coordinate[] = [];
    if (map[origin[0] - 1][origin[1]] === "]") {
      coordinatesToCheck.push({ x: origin[1] - 1, y: origin[0] - 1 });
    }
    if (map[origin[0] - 1][origin[1] + 1] === "[") {
      coordinatesToCheck.push({ x: origin[1] + 1, y: origin[0] - 1 });
    }

    return coordinatesToCheck.every((coordinate) =>
      checkNeighbors(direction, [coordinate.y, coordinate.x], map),
    );
  }

  if (
    map[origin[0] + 1][origin[1]] === "#" ||
    map[origin[0] + 1][origin[1] + 1] === "#"
  )
    return false;
  if (map[origin[0] + 1][origin[1]] === "[")
    return checkNeighbors(direction, [origin[0] + 1, origin[1]], map);

  const coordinatesToCheck: Coordinate[] = [];
  if (map[origin[0] + 1][origin[1]] === "]") {
    coordinatesToCheck.push({ x: origin[1] - 1, y: origin[0] + 1 });
  }
  if (map[origin[0] + 1][origin[1] + 1] === "[") {
    coordinatesToCheck.push({ x: origin[1] + 1, y: origin[0] + 1 });
  }

  return coordinatesToCheck.every((coordinate) =>
    checkNeighbors(direction, [coordinate.y, coordinate.x], map),
  );
};

const doMove = (
  direction: "up" | "down",
  [originY, originX]: [number, number],
  map: string[][],
) => {
  if (direction === "up") {
    if (map[originY - 1][originX] === "[") {
      doMove(direction, [originY - 1, originX], map);
      map[originY][originX] = ".";
      map[originY][originX + 1] = ".";
      map[originY - 1][originX] = "[";
      map[originY - 1][originX + 1] = "]";
      return;
    }

    const actionsToTakeBeforeMovingThisBadBoy: Coordinate[] = [];
    if (map[originY - 1][originX] === "]")
      actionsToTakeBeforeMovingThisBadBoy.push({
        x: originX - 1,
        y: originY - 1,
      });
    if (map[originY - 1][originX + 1] === "[")
      actionsToTakeBeforeMovingThisBadBoy.push({
        x: originX + 1,
        y: originY - 1,
      });

    actionsToTakeBeforeMovingThisBadBoy.forEach((action) =>
      doMove(direction, [action.y, action.x], map),
    );
    map[originY][originX] = ".";
    map[originY][originX + 1] = ".";
    map[originY - 1][originX] = "[";
    map[originY - 1][originX + 1] = "]";
    return;
  }

  if (map[originY + 1][originX] === "[") {
    doMove(direction, [originY + 1, originX], map);
    map[originY][originX] = ".";
    map[originY][originX + 1] = ".";
    map[originY + 1][originX] = "[";
    map[originY + 1][originX + 1] = "]";
    return;
  }

  const actionsToTakeBeforeMovingThisBadBoy: Coordinate[] = [];
  if (map[originY + 1][originX] === "]")
    actionsToTakeBeforeMovingThisBadBoy.push({
      x: originX - 1,
      y: originY + 1,
    });
  if (map[originY + 1][originX + 1] === "[")
    actionsToTakeBeforeMovingThisBadBoy.push({
      x: originX + 1,
      y: originY + 1,
    });

  actionsToTakeBeforeMovingThisBadBoy.forEach((action) =>
    doMove(direction, [action.y, action.x], map),
  );

  map[originY][originX] = ".";
  map[originY][originX + 1] = ".";
  map[originY + 1][originX] = "[";
  map[originY + 1][originX + 1] = "]";
  return;
};
