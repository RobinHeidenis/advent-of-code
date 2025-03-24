export default async function part1(input: string[]) {
  const components = input.map((line) => {
    const [a, b] = line.split("/").map(Number);

    return { a, b, used: false };
  });

  const findStrongestBridge = (currentPort: number): number => {
    let maxStrength = 0;

    for (const component of components) {
      if (component.used) continue;

      if (component.a === currentPort) {
        component.used = true;
        const strength =
          component.a + component.b + findStrongestBridge(component.b);
        maxStrength = Math.max(maxStrength, strength);
        component.used = false;
      } else if (component.b === currentPort) {
        component.used = true;
        const strength =
          component.a + component.b + findStrongestBridge(component.a);
        maxStrength = Math.max(maxStrength, strength);
        component.used = false;
      }
    }

    return maxStrength;
  };

  return findStrongestBridge(0);
}

// Solve time: 7 minutes and 33 seconds
