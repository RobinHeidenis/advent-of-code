import { getOpenDoors, isValidPosition, type Position } from "./part-1";

export default async function part2(input: string[]) {
  return findLongestPath(input[0]);
}

// Solve time: 11 minutes and 38 seconds
// Total solve time: 38 minutes and 24 seconds

const findLongestPath = (passcode: string): number => {
  let longestLength = 0;
  const queue: Position[] = [{ x: 0, y: 0, path: "" }];

  while (queue.length > 0) {
    const current = queue.shift()!;

    // If at vault, update longest path but don't stop (continue exploring)
    if (current.x === 3 && current.y === 3) {
      longestLength = Math.max(longestLength, current.path.length);
      continue;
    }

    const doors = getOpenDoors(passcode, current.path);
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

  return longestLength;
};
