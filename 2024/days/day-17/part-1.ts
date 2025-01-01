const outputs: number[] = [];

const registers = {
  A: 0,
  B: 0,
  C: 0,
};
type Registers = typeof registers;

const operandMap = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: "A",
  5: "B",
  6: "C",
  7: null,
};

const getOperand = (operand: keyof typeof operandMap, registers: Registers) => {
  const returnValue = operandMap[operand] ?? operand;

  if (typeof returnValue === "string") {
    return registers[returnValue as keyof typeof registers];
  }

  return returnValue;
};

const division = (numerator: number, denominator: number) => {
  return Math.trunc(numerator / denominator);
};

const divisionOperator = (
  operand: keyof typeof operandMap,
  registers: Registers,
) => {
  const numerator = registers.A;
  const denominator = Math.pow(2, getOperand(operand, registers));

  return division(numerator, denominator);
};

const operators = {
  0: {
    name: "adv",
    operate: (operand, registers) => {
      registers["A"] = divisionOperator(operand, registers);
    },
  },
  1: {
    name: "bxl",
    operate: (operand, registers) => {
      registers["B"] = registers.B ^ operand;
    },
  },
  2: {
    name: "bst",
    operate: (operand, registers) => {
      registers["B"] = getOperand(operand, registers) % 8;
    },
  },
  3: {
    name: "jnz",
    operate: (operand, registers) => {
      if (registers.A === 0) return;
      return operand;
    },
  },
  4: {
    name: "bxc",
    operate: (_operand, registers) => {
      registers["B"] = registers.B ^ registers.C;
    },
  },
  5: {
    name: "out",
    operate: (operand, registers) => {
      outputs.push(getOperand(operand, registers) % 8);
    },
  },
  6: {
    name: "bdv",
    operate: (operand, registers) => {
      registers["B"] = divisionOperator(operand, registers);
    },
  },
  7: {
    name: "cdv",
    operate: (operand, registers) => {
      registers["C"] = divisionOperator(operand, registers);
    },
  },
} satisfies Record<
  number,
  {
    name: string;
    operate: (
      operand: keyof typeof operandMap,
      registers: Registers,
    ) => void | number;
  }
>;

export default async function part1(input: string[]) {
  registers.A = Number(input[0].split(": ")[1]);
  registers.B = Number(input[1].split(": ")[1]);
  registers.C = Number(input[2].split(": ")[1]);

  const program = input[3].split(": ")[1].split(",").map(Number);

  let pointer = 0;
  while (pointer < program.length) {
    const operator = program[pointer] as keyof typeof operators;
    const operand = program[pointer + 1] as keyof typeof operandMap;
    if (operator === undefined || operand === undefined) break;

    const jumpResult = operators[operator].operate(operand, registers);
    if (jumpResult !== undefined) {
      pointer = jumpResult;
    } else {
      pointer += 2;
    }
  }

  return outputs.join(",");
}

// Solve time: 40 minutes and 13 seconds
