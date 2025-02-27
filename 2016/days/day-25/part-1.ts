export type Registers = Record<string, number>;
export type Instruction = [string, string, string?];

export default function part1(input: string[]): number {
  const instructions: Instruction[] = input.map(
    (line) => line.split(" ") as Instruction,
  );

  let i = 0;
  while (true) {
    console.log(i);
    const registers: Registers = { a: i, b: 0, c: 0, d: 0 };

    const out = runProgram(instructions, registers);

    if (out.every((x, index) => x === index % 2)) {
      return i;
    }

    i++;
  }
}

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
  const out: number[] = [];

  while (ip < len && out.length < 100) {
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

      case "out":
        out.push(getValue(x));
        ip++;
        break;
    }
  }

  return out;
};
