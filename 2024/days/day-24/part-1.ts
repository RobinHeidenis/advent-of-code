type Bit = 0 | 1;

const GATES = {
  AND: (input1, input2) => input1 === 1 && input2 === 1,
  OR: (input1, input2) => input1 === 1 || input2 === 1,
  XOR: (input1, input2) =>
    (input1 === 1 && input2 === 0) || (input1 === 0 && input2 === 1),
} satisfies Record<string, (input1: Bit, input2: Bit) => boolean>;

export default async function part1(input: string) {
  const values = new Map<string, Bit | undefined>();
  const gates: {
    inputs: string[];
    output: string;
    gate: keyof typeof GATES;
  }[] = [];

  const [initialValues, gatesString] = input.split("\n\n");
  initialValues
    .split("\n")
    .filter(Boolean)
    .forEach((line) => {
      const [id, value] = line.split(": ");
      values.set(id, Number(value) as Bit);
    });

  gatesString
    .split("\n")
    .filter(Boolean)
    .forEach((gateString) => {
      const [input1, gate, input2, _, output] = gateString.split(" ");

      if (!values.has(input1)) values.set(input1, undefined);
      if (!values.has(input2)) values.set(input2, undefined);
      if (!values.has(output)) values.set(output, undefined);

      gates.push({
        inputs: [input1, input2],
        output,
        gate: gate as keyof typeof GATES,
      });
    });

  while (
    Array.from(values.entries())
      .filter(([key]) => key.startsWith("z"))
      .some(([_, value]) => value === undefined)
  ) {
    gates.forEach(({ inputs, output, gate }) => {
      const value1 = values.get(inputs[0]);
      const value2 = values.get(inputs[1]);
      if (value1 === undefined || value2 === undefined) return;

      const result = GATES[gate](value1, value2);

      if (result) {
        values.set(output, 1);
      } else {
        values.set(output, 0);
      }
    });
  }

  return parseInt(
    Array.from(values.entries())
      .filter(([key]) => key.startsWith("z"))
      .sort(([keyA], [keyB]) => {
        if (keyA < keyB) {
          return -1;
        }
        if (keyA > keyB) {
          return 1;
        }

        // names must be equal
        return 0;
      })
      .reduce((prev, [_, value]) => value + prev, ""),
    2,
  );
}

// Solve time: 28 minutes and 52 seconds
