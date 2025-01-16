const gt = (number: number) => (input: number) => input > number;
const lt = (number: number) => (input: number) => input < number;

export default async function part2(input: string[]) {
  const conditions: Record<string, number | ((input: number) => boolean)> = {
    children: 3,
    cats: gt(7),
    samoyeds: 2,
    pomeranians: lt(3),
    akitas: 0,
    vizslas: 0,
    goldfish: lt(5),
    trees: gt(3),
    cars: 2,
    perfumes: 1,
  };

  for (const line of input) {
    const sue = line.match(/Sue (\d+): /)?.[1];
    const rest = line.slice(6 + sue!.length);
    const found = rest.split(", ").map((compound) => {
      const [key, value] = compound.split(": ");
      return { key, value };
    });

    const cluesMatch = found.every((clue) => {
      const conditionValue = conditions[clue.key as keyof typeof conditions];

      if (conditionValue === undefined) return true;
      if (typeof conditionValue === "function")
        return conditionValue(Number(clue.value));
      return conditionValue === Number(clue.value);
    });

    if (cluesMatch) {
      return Number(sue);
    }
  }
}

// Solve time: 3 minutes and 8 seconds
// Total solve time: 14 minutes and 18 seconds
