export default async function part1(input: string[]) {
  let total = 0;

  input.forEach((line) => {
    const numbers = [...line.matchAll(/\d+/g)]
      .map((match) => match[0])
      .map(Number);
    const sorted = numbers.toSorted((a, b) => a - b);

    if (sorted[0] + sorted[1] > sorted[2]) {
      total++;
    }
  });

  return total;
}

// Solve time: 1 minute and 14 seconds
