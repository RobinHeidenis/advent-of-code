import { CryptoHasher } from "bun";

export default async function part1(input: string[]) {
  return findShortestPath(input[0]);
}

// Solve time: 26 minutes and 46 seconds

export interface Position {
  x: number;
  y: number;
  path: string;
}

const hasher = new CryptoHasher("md5");
const getMD5Hash = (input: string): string => {
  return hasher.update(input).digest("hex");
};

export const getOpenDoors = (passcode: string, path: string): boolean[] => {
  const hash = getMD5Hash(passcode + path);
  // Check first 4 characters of hash for open doors (b-f)
  return hash
    .slice(0, 4)
    .split("")
    .map((c) => c >= "b" && c <= "f");
};

export const isValidPosition = (pos: Position): boolean => {
  return pos.x >= 0 && pos.x < 4 && pos.y >= 0 && pos.y < 4;
};

const findShortestPath = (passcode: string): string => {
  const queue: Position[] = [{ x: 0, y: 0, path: "" }];

  while (queue.length > 0) {
    const current = queue.shift()!;

    // Check if we reached the vault (bottom-right corner)
    if (current.x === 3 && current.y === 3) {
      return current.path;
    }

    // Get available doors from current position
    const doors = getOpenDoors(passcode, current.path);

    // Try each direction (Up, Down, Left, Right)
    const moves = [
      { dx: 0, dy: -1, dir: "U" },
      { dx: 0, dy: 1, dir: "D" },
      { dx: -1, dy: 0, dir: "L" },
      { dx: 1, dy: 0, dir: "R" },
    ];

    for (let i = 0; i < 4; i++) {
      if (doors[i]) {
        const newPos: Position = {
          x: current.x + moves[i].dx,
          y: current.y + moves[i].dy,
          path: current.path + moves[i].dir,
        };

        if (isValidPosition(newPos)) {
          queue.push(newPos);
        }
      }
    }
  }

  return "No path found";
};
