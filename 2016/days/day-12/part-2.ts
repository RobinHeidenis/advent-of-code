import { runProgram, type Instruction, type Registers } from "./part-1";

export default async function part2(input: string[]) {
  const instructions: Instruction[] = input.map(
    (line) => line.split(" ") as Instruction,
  );

  const registers: Registers = { a: 0, b: 0, c: 1, d: 0 };

  runProgram(instructions, registers);

  return registers.a;
}

// Solve time: 21 seconds
// Total solve time: 17 minutes and 49 seconds
