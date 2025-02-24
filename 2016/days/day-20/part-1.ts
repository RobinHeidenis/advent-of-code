export default async function part1(input: string[]) {
  const ranges: [number, number][] = [];
  input.forEach((line) => {
    const range = line.split("-").map(Number);
    ranges.push([range[0], range[1]]);
  });

  ranges.sort((a, b) => a[0] - b[0]);

  for (let i = ranges[0][1] + 1; i <= ranges.at(-1)![1] + 1; i++) {
    if (!ranges.find(([floor, ceiling]) => i >= floor && i <= ceiling)) {
      return i;
    }
  }
}

// Solve time: 5 minutes and 54 seconds
