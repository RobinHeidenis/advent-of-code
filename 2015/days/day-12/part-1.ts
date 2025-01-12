export default async function part1(input: string[]) {
  return [...input[0].matchAll(/(-?\d+)/g)]
    .map((match) => Number(match[0]))
    .reduce((total, curr) => total + curr, 0);
}

// Solve time: 1 minute and 46 seconds
