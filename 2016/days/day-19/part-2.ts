export default async function part2(input: string[]) {
  const elves = Number(input[0]);

  const highestPowerOfThree = Math.pow(
    3,
    Math.floor(Math.log(elves) / Math.log(3)),
  );

  return (
    elves - highestPowerOfThree + Math.max(0, elves - 2 * highestPowerOfThree)
  );
}

// Solve time: 3 minutes and 31 seconds
// Total solve time: 5 minutes and 58 seconds
