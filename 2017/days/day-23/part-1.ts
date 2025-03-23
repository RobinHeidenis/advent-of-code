export type Registers = Record<string, number>;
export type InstructionFunction = (
  registers: Registers,
  x: string,
  y?: string,
) => void;

export const getValue = (registers: Registers, x: string) =>
  isNaN(Number(x)) ? (registers[x] ?? 0) : Number(x);

export const INSTRUCTIONS = {
  set: (registers, x, y) => {
    registers[x] = getValue(registers, y!);
  },
  sub: (registers, x, y) => {
    const registerValue = registers[x] ?? 0;
    registers[x] = registerValue - getValue(registers, y!);
  },
  mul: (registers, x, y) => {
    const registerValue = registers[x] ?? 0;
    registers[x] = registerValue * getValue(registers, y!);
  },
} satisfies Record<string, InstructionFunction>;

export default async function part1(input: string[]) {
  let mulCount = 0;
  const instructions = input.map((line) => {
    const [instruction, ...args] = line.split(" ");
    const [x, y] = args;
    return {
      instruction: instruction as keyof typeof INSTRUCTIONS | "jnz",
      args: [x, y],
    };
  });

  let position = 0;
  const registers: Registers = {};

  while (position >= 0 && position < instructions.length) {
    const { instruction, args } = instructions[position];
    const [x, y] = args;

    if (instruction === "jnz") {
      // Fix: Check if value is not equal to 0, not > 0
      if (getValue(registers, x) !== 0) {
        position += getValue(registers, y);
      } else {
        position++;
      }
    } else {
      if (instruction === "mul") mulCount++;
      INSTRUCTIONS[instruction](registers, x, y);
      position++;
    }
  }

  return mulCount;
}

// Solve time: 4 minutes and 8 seconds
