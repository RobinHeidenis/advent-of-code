import { solveKeypad } from "./part-1";

const keypad = [
  [undefined, undefined, 1, undefined, undefined],
  [undefined, 2, 3, 4, undefined],
  [5, 6, 7, 8, 9],
  [undefined, "A", "B", "C", undefined],
  [undefined, undefined, "D", undefined, undefined],
];

export default async function part2(input: string[]) {
  const instructions = input.map((line) => {
    return line.split("");
  });

  return solveKeypad(instructions, keypad).join("");
}

// Solve time: 2 minutes and 3 seconds
// Total solve time: 13 minutes and 55 seconds
