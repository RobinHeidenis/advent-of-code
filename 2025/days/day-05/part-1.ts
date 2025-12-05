export default async function part1(input: string[]) {
  let total = 0;

  const ranges: { start: number; end: number }[] = [];

  input.forEach((line) => {
    if (line.includes("-")) {
      const [start, end] = line.split("-").map(Number);
      ranges.push({ start, end });
      return;
    }

    const number = Number(line);
    if (ranges.some((range) => number >= range.start && number <= range.end)) {
      total++;
    }
  });

  return total;
}

// Solve time: 2 minutes and 18 seconds
