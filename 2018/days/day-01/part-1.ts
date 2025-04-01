import { sum } from "~/lib/array";

export default async function part1(input: string[]) {
  return input.map(Number).reduce(sum, 0);
}

// Solve time: 55 seconds
