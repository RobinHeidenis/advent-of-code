import { parse } from "path";

export default async function part2(input: string[]) {
  let total = 0;

  for (let i = 0; i < input.length - 2; i += 3) {
    const lines = input.slice(i, i + 3);

    const parsedLines = lines.map((line) => {
      return [...line.matchAll(/\d+/g)].map((match) => match[0]).map(Number);
    });

    for (let j = 0; j < 3; j++) {
      const [a, b, c] = [
        parsedLines[0][j],
        parsedLines[1][j],
        parsedLines[2][j],
      ].toSorted((a, b) => a - b);
      if (a + b > c) {
        total++;
      }
    }
  }

  return total;
}

// Solve time: 9 minutes and 25 seconds
// Total solve time: 10 minutes and 40 seconds
