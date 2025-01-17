import { subsetSum } from "./part-1";

export default async function part2(input: string[]) {
  const possibilities = subsetSum(input.map(Number), 150);
  const min = Math.min(
    ...possibilities.map((possibility) => possibility.length),
  );

  return possibilities.filter((possibility) => possibility.length === min)
    .length;
}

// Solve time: 1 minute and 18 seconds
// Total solve time: 8 minutes and 22 seconds
