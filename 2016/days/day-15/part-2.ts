import { getTime, parseInput } from "./part-1";

export default async function part2(input: string[]) {
  const discs = parseInput(input);

  discs.push({
    positions: 11,
    start: 0,
  });

  return getTime(discs);
}

// Solve time: 1 minute and 46 seconds
// Total solve time: 7 minutes and 41 seconds
