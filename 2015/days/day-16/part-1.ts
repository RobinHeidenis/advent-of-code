export default async function part1(input: string[]) {
  const conditions = {
    children: 3,
    cats: 7,
    samoyeds: 2,
    pomeranians: 3,
    akitas: 0,
    vizslas: 0,
    goldfish: 5,
    trees: 3,
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
      return (
        conditionValue === undefined || conditionValue === Number(clue.value)
      );
    });

    if (cluesMatch) {
      return Number(sue);
    }
  }
}

// Solve time: 11 minutes and 9 seconds
