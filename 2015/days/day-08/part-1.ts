export default async function part1(input: string[]) {
  return input.reduce(
    (total, line) => total + (line.length - eval(line).length),
    0,
  );
}

// Solve time: 2 minutes and 58 seconds
