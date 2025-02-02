import type { Coordinate } from "~/lib/grid";

const keypad = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

export default async function part1(input: string[]) {
  const instructions = input.map((line) => {
    return line.split("");
  });

  return Number(solveKeypad(instructions, keypad).join(""));
}

// Solve time: 11 minutes and 53 seconds

const moveMap = {
  U: [0, -1],
  R: [1, 0],
  D: [0, 1],
  L: [-1, 0],
};

export const solveKeypad = (instructions: string[][], keypad: (number | string | undefined)[][]) => {
  const startingPosition: Coordinate = { x: 1, y: 1 }; // 5

  const code: (number | string | undefined)[] = [];
  let position: Coordinate = startingPosition;
  for (const instruction of instructions) {
    for (const move of instruction) {
      const delta = moveMap[move as keyof typeof moveMap];
      const newPosition = {
        x: position.x + delta[0],
        y: position.y + delta[1],
      };

      if (keypad[newPosition.y]?.[newPosition.x] === undefined) {
        continue;
      }

      position = newPosition;
    }

    code.push(keypad[position.y][position.x]);
  }

  return code;
};
