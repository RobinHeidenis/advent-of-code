import part1 from "./part-1";

export default async function part2(input: string[]) {
  console.log(
    "Warning: This solution is not optimized and takes about 9 minutes to run on an m2 macbook",
  );

  input[0] +=
    "An elerium generator, an elerium-compatible microchip, a dilithium generator, and a dilithium-compatible microchip";
  return part1(input);
}

// Solve time: 49 seconds
// Total solve time: 47 minutes and 18 seconds
