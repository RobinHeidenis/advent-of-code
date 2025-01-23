import { runProgram } from "./part-1";

const registers = {
  a: 1,
  b: 0,
};

export default async function part2(input: string[]) {
  return runProgram(input, registers);
}

// Solve time: 28 seconds
// Total solve time: 14 minutes and 19 seconds
