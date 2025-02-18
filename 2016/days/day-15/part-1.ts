export default async function part1(input: string[]) {
  const discs = parseInput(input);

  return getTime(discs);
}

// Solve time: 5 minutes and 55 seconds

export const parseInput = (input: string[]) => {
  const discs: { positions: number; start: number }[] = [];

  input.forEach((line) => {
    const [, positions, , start] = line
      .matchAll(/(\d+)/g)
      .map((match) => Number(match[0]));

    discs.push({ positions, start });
  });

  return discs;
}

export const getTime = (discs: { positions: number; start: number }[]) => {
  let i = 0;
  while (true) {
    if (
      discs.every(
        (disc, index) => (disc.start + i + index + 1) % disc.positions === 0,
      )
    ) {
      break;
    }

    i++;
  }

  return i;
};
