import { getTargetHashIndex } from "./part-1";

export default async function part2(input: string[]) {
  return getTargetHashIndex(input[0], 2016);
}

// Solve time: 4 minutes and 11 seconds
// Total solve time: 20 minutes and 47 seconds
