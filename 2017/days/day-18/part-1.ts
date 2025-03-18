export type Registers = Record<string, number>;
export type InstructionFunction = (
  registers: Registers,
  x: string,
  y?: string,
) => void;

export const getValue = (registers: Registers, x: string) =>
  isNaN(Number(x)) ? (registers[x] ?? 0) : Number(x);

const INSTRUCTIONS = {
  set: (registers, x, y) => {
    registers[x] = getValue(registers, y!);
  },
  add: (registers, x, y) => {
    const registerValue = registers[x] ?? 0;
    registers[x] = registerValue + getValue(registers, y!);
  },
  mul: (registers, x, y) => {
    const registerValue = registers[x] ?? 0;
    registers[x] = registerValue * getValue(registers, y!);
  },
  mod: (registers, x, y) => {
    const registerValue = registers[x] ?? 0;
    registers[x] = registerValue % getValue(registers, y!);
  },
  snd: (registers, x) => {
    registers.lastSound = getValue(registers, x);
  },
  rcv: (registers, x) => {
    if (registers[x] !== 0) {
      registers.recoveredSound = registers.lastSound;
    }
  },
} satisfies Record<string, InstructionFunction>;

export default async function part1(input: string[]) {
  const instructions = input.map((line) => {
    const [instruction, ...args] = line.split(" ");
    const [x, y] = args;

    return {
      instruction: instruction as keyof typeof INSTRUCTIONS | "jgz",
      args: [x, y],
    };
  });

  let position = 0;
  const registers: Registers = { lastSound: 0, recoveredSound: 0 };

  while (position >= 0 && position < instructions.length) {
    const { instruction, args } = instructions[position];
    const [x, y] = args;

    if (instruction === "jgz") {
      if (getValue(registers, x) > 0) {
        position += getValue(registers, y);
      } else {
        position++;
      }
    } else {
      INSTRUCTIONS[instruction](registers, x, y);
      position++;
    }

    if (registers.recoveredSound !== 0) {
      return registers.recoveredSound;
    }
  }
}

// Solve time: 20 minutes and 48 seconds
