import { getValue, type InstructionFunction, type Registers } from "./part-1";

let total = 0;

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
  jgz: (registers, x, y) => {
    if (getValue(registers, x) > 0) {
      return getValue(registers, y!);
    }
    return 1;
  },
  snd: (registers, x) => {
    return getValue(registers, x);
  },
  rcv: (registers, x, value) => {
    if (value !== undefined) {
      registers[x] = getValue(registers, value);
    }
    return 1;
  },
} satisfies Record<string, InstructionFunction>;

export default async function part2(input: string[]) {
  const instructions = input.map((line) => {
    const [instruction, ...args] = line.split(" ");
    const [x, y] = args;
    return {
      instruction: instruction as keyof typeof INSTRUCTIONS,
      args: [x, y],
    };
  });

  let positionA = 0;
  const registersA: Registers = { p: 0 };
  let positionB = 0;
  const registersB: Registers = { p: 1 };
  const messageQueue: { a: number[]; b: number[] } = {
    a: [],
    b: [],
  };

  registersB["p"] = 1;

  let programAWaiting = false;
  let programBWaiting = false;

  while (
    (positionA >= 0 && positionA < instructions.length) ||
    (positionB >= 0 && positionB < instructions.length)
  ) {
    programAWaiting =
      positionA >= 0 &&
      positionA < instructions.length &&
      instructions[positionA].instruction === "rcv" &&
      messageQueue.a.length === 0;

    programBWaiting =
      positionB >= 0 &&
      positionB < instructions.length &&
      instructions[positionB].instruction === "rcv" &&
      messageQueue.b.length === 0;

    if (programAWaiting && programBWaiting) {
      break;
    }

    if (positionA >= 0 && positionA < instructions.length) {
      const { instruction, args } = instructions[positionA];
      const [x, y] = args;

      if (instruction === "snd") {
        messageQueue.b.push(getValue(registersA, x));
        positionA++;
      } else if (instruction === "rcv") {
        if (messageQueue.a.length > 0) {
          registersA[x] = messageQueue.a.shift()!;
          positionA++;
        }
      } else if (instruction === "jgz") {
        if (getValue(registersA, x) > 0) {
          positionA += getValue(registersA, y!);
        } else {
          positionA++;
        }
      } else {
        INSTRUCTIONS[instruction](registersA, x, y);
        positionA++;
      }
    }

    if (positionB >= 0 && positionB < instructions.length) {
      const { instruction, args } = instructions[positionB];
      const [x, y] = args;

      if (instruction === "snd") {
        messageQueue.a.push(getValue(registersB, x));
        total++;
        positionB++;
      } else if (instruction === "rcv") {
        if (messageQueue.b.length > 0) {
          registersB[x] = messageQueue.b.shift()!;
          positionB++;
        }
      } else if (instruction === "jgz") {
        if (getValue(registersB, x) > 0) {
          positionB += getValue(registersB, y!);
        } else {
          positionB++;
        }
      } else {
        INSTRUCTIONS[instruction](registersB, x, y);
        positionB++;
      }
    }
  }

  return total;
}

// Solve time: 11 minutes and 36 seconds
// Total solve time: 32 minutes and 24 seconds
