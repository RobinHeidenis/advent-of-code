import { calculateRows } from "./part-1";

export default async function part2(input: string[]) {
  const numRows = 400000;

  return calculateRows(numRows, input[0]);
}

// Solve time: 37 seconds
// Total solve time: 12 minutes and 49 seconds
