export type Registers = Record<string, number>;
export type Instruction = [string, string, string?];

export default function part1(input: string[]): number {
  const instructions: Instruction[] = input.map(
    (line) => line.split(" ") as Instruction,
  );

  const registers: Registers = { a: 0, b: 0, c: 0, d: 0 };

  runProgram(instructions, registers);

  return registers.a;
}

// Solve time: 17 minutes and 28 seconds

export const runProgram = (
  instructions: Instruction[],
  registers: Registers,
) => {
  const getValue = (x: string): number => {
    const num = Number(x);
    return isNaN(num) ? registers[x] : num;
  };

  let ip = 0; // instruction pointer
  const len = instructions.length;

  while (ip < len) {
    const [op, x, y] = instructions[ip];

    switch (op) {
      case "cpy":
        registers[y!] = getValue(x);
        ip++;
        break;

      case "inc":
        registers[x]++;
        ip++;
        break;

      case "dec":
        registers[x]--;
        ip++;
        break;

      case "jnz":
        ip += getValue(x) !== 0 ? Number(y) : 1;
        break;
    }
  }
};
