const findStrongestAndLongestBridge = (
  components: number[][],
): { strength: number; length: number } => {
  const stack: {
    port: number;
    usedComponents: number[][];
    strength: number;
    length: number;
  }[] = [{ port: 0, usedComponents: [], strength: 0, length: 0 }];

  let maxStrength = 0;
  let maxLength = 0;

  while (stack.length > 0) {
    const { port, usedComponents, strength, length } = stack.pop()!;

    if (
      length > maxLength ||
      (length === maxLength && strength > maxStrength)
    ) {
      maxLength = length;
      maxStrength = strength;
    }

    for (let i = 0; i < components.length; i++) {
      const component = components[i];

      if (usedComponents.includes(component)) continue;

      if (component[0] === port || component[1] === port) {
        const nextPort = component[0] === port ? component[1] : component[0];

        stack.push({
          port: nextPort,
          usedComponents: [...usedComponents, component],
          strength: strength + component[0] + component[1],
          length: length + 1,
        });
      }
    }
  }

  return { strength: maxStrength, length: maxLength };
};

export default async function part2(input: string[]) {
  const components = input.map((line) => line.split("/").map(Number));
  const result = findStrongestAndLongestBridge(components);
  return result.strength;
}

// Solve time: 18 minutes and 25 seconds
// Total solve time: 25 minutes and 58 seconds
