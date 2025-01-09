export default async function part2(input: string[]) {
  return input.reduce(
    (total, line) => total + (JSON.stringify(line).length - line.length),
    0,
  );
}

// Solve time: 1 minute and 20 seconds
// Total solve time: 4 minutes and 19 seconds
