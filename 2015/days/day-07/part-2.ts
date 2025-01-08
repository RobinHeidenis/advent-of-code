import part1 from "./part-1";

export default async function part2(input: string[]) {
  // Calculate part 1 result
  const part1Result = await part1(input);

  // Add line to input to set the result of part 1 in register b
  input.unshift(`${part1Result} -> b`);

  // Re-run part 1 with new input
  return await part1(input);
}

// Solve time: 1 minute and 40 seconds
// Total solve time: 48 minutes and 22 seconds
