const registers = {
  a: 0,
  b: 0,
};

type Registers = typeof registers;

const OPS = {
  hlf: (registers, r) => (registers[r] /= 2),
  tpl: (registers, r) => (registers[r] *= 3),
  inc: (registers, r) => registers[r]++,
} satisfies Record<string, (registers: Registers, r: keyof Registers) => void>;

export default async function part1(input: string[]) {
  return runProgram(input, registers);
}

// Solve time: 13 minutes and 50 seconds

export const runProgram = (input: string[], registers: Registers) => {
  const instructions = input.map((line) => {
    const [op, register, location] = line.split(" ");
    return {
      op,
      register: register.replace(",", "") as keyof Registers,
      location: location ? Number(location) : null,
    };
  });

  for (let i = 0; i < instructions.length; i++) {
    const instruction = instructions[i];

    if (instruction.op in OPS) {
      OPS[instruction.op as keyof typeof OPS](registers, instruction.register);
      continue;
    }

    if (instruction.op === "jmp") {
      i += Number(instruction.register) - 1;
      continue;
    }

    if (instruction.op === "jie" && registers[instruction.register] % 2 === 0) {
      i += instruction.location! - 1;
      continue;
    }

    if (instruction.op === "jio" && registers[instruction.register] === 1) {
      i += instruction.location! - 1;
      continue;
    }
  }

  return registers.b;
};
