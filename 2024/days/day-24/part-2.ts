type Bit = 0 | 1;

const GATES = {
  AND: (input1, input2) => input1 === 1 && input2 === 1,
  OR: (input1, input2) => input1 === 1 || input2 === 1,
  XOR: (input1, input2) =>
    (input1 === 1 && input2 === 0) || (input1 === 0 && input2 === 1),
} satisfies Record<string, (input1: Bit, input2: Bit) => boolean>;

export default async function part2(input: string) {
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

  const zOutputsWithoutXOR = gates.filter(
    ({ gate, output }) =>
      gate !== "XOR" && output.startsWith("z") && output !== "z45",
  );
  const regularXORGates = gates.filter(({ inputs, gate, output }) => {
    const [input1, input2] = inputs;
    if (
      !output.startsWith("z") &&
      !(input1.startsWith("x") && input2.startsWith("y")) &&
      !(input2.startsWith("x") && input1.startsWith("y"))
    ) {
      return gate === "XOR";
    }
  });

  const xORGatesThatDoNotInputIntoAnotherXORGate = gates.filter(
    ({ gate, inputs, output }) => {
      if (inputs.includes("x00") && inputs.includes("y00")) return false;
      if (
        gate === "XOR" &&
        ((inputs[0].startsWith("x") && inputs[1].startsWith("y")) ||
          inputs[0].startsWith("y") ||
          inputs[1].startsWith("x"))
      ) {
        return !gates.find(
          ({ inputs, gate }) => gate === "XOR" && inputs.includes(output),
        );
      }
      return false;
    },
  );

  const aNDGatesThatDoNotInputIntoORGate = gates.filter(
    ({ gate, inputs, output }) => {
      if (
        (inputs.includes("x00") && inputs.includes("y00")) ||
        output.startsWith("z")
      )
        return false;
      if (gate === "AND") {
        return !gates.find(
          ({ gate, inputs }) => gate === "OR" && inputs.includes(output),
        );
      }

      return false;
    },
  );

  return [
    ...zOutputsWithoutXOR,
    ...regularXORGates,
    ...xORGatesThatDoNotInputIntoAnotherXORGate,
    ...aNDGatesThatDoNotInputIntoORGate,
  ]
    .map(({ output }) => output)
    .sort()
    .join(",");
}

// Solve time: 29 minutes and 26 seconds
// Total solve time: 58 minutes and 18 seconds
