const OPERATIONS = {
  AND: (a, b) => a & b,
  OR: (a, b) => a | b,
  NOT: (a, _b) => ~a,
  LSHIFT: (a, b) => a << b,
  RSHIFT: (a, b) => a >> b,
  SET: (a, _b) => a,
} satisfies Record<string, (a: number, b: number) => number>;

export default async function part1(input: string[]) {
  const registers: Record<string, number> = {};

  const instructions: {
    input: [number | string] | [number | string, number | string];
    output: string;
    operation: keyof typeof OPERATIONS | "SET";
  }[] = [];

  input.forEach((line) => {
    const [instructionText, output] = line.split("->").map((s) => s.trim());
    const instructionParts = instructionText.split(" ").map((s) => s.trim());

    const instruction: (typeof instructions)[number] = {
      output,
      operation: "SET",
      input: [] as unknown as [string | number],
    };

    if (instructionParts.length === 1) {
      instruction.input.push(
        !Number.isNaN(Number(instructionParts[0]))
          ? Number(instructionParts[0])
          : instructionParts[0],
      );
    } else if (instructionParts.length === 2) {
      instruction.operation = "NOT";
      instruction.input.push(instructionParts[1]);
    } else {
      instruction.operation = instructionParts[1] as keyof typeof OPERATIONS;
      instruction.input.push(
        ...[instructionParts[0], instructionParts[2]].map((part) =>
          Number.isNaN(Number(part)) ? part : Number(part),
        ),
      );
    }

    instructions.push(instruction);
  });

  while (true) {
    for (let i = 0; i < instructions.length; i++) {
      if (instructions.length === 0) break;
      const instruction = instructions[i];
      if (
        instruction.input.some(
          (input) =>
            typeof input === "string" && registers[input] === undefined,
        )
      )
        continue;

      const input = instruction.input.map((input) =>
        typeof input === "string" ? registers[input] : input,
      ) as [number, number];

      const result = OPERATIONS[instruction.operation](...input);

      if (result < 0) {
        registers[instruction.output] = 65536 + result;
      } else {
        registers[instruction.output] = result;
      }

      instructions.splice(i, 1);

      break;
    }

    if (instructions.length === 0) break;
  }

  return registers["a"];
}

// Solve time: 46 minutes and 41 seconds
