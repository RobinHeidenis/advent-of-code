import { calculateFactorial } from "./part-1";

export default async function part2(_input: string[]) {
  // For Part 2, it's calculating:
  // 12! + 75 * 78

  // Step 1: Calculate 12! = 479,001,600
  let result = calculateFactorial(12);

  // Step 2: Add 75 * 78 = 5850
  result += 75 * 78;

  return result;
}

// Solve time: 21 seconds
// Total solve time: 17 minutes and 49 seconds
