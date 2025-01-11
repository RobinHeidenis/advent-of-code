import part1 from "./part-1";

export default async function part2(input: string[]) {
  const nextPassword = await part1(input);
  return await part1([nextPassword]);
}

// Solve time: 14 seconds
// Total solve time: 17 minutes and 8 seconds
