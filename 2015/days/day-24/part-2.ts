import { getOptimalFirstGroupQE } from "./part-1";

export default async function part2(input: string[]) {
  const packages = input.map(Number);
  return getOptimalFirstGroupQE(packages, 4);
}

// Solve time: 20 seconds
// Total solve time: 22 minutes and 13 seconds
