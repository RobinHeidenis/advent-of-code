export default async function part2(input: string[]) {
  const ranges: { start: number; end: number }[] = [];

  input.forEach((line) => {
    if (line.includes("-")) {
      const [start, end] = line.split("-").map(Number);

      ranges.push({ start, end });
    }
  });

  ranges.sort((a, b) => a.start - b.start);

  let total = 0;
  let last: (typeof ranges)[0] | null = null;

  for (const range of ranges) {
    if (last === null) {
      last = range;
      continue;
    }

    // if no overlap
    if (last.end < range.start) {
      total += last.end - last.start + 1;
      last = range;
      continue;
    }

    // if overlap
    last = { start: last.start, end: Math.max(last.end, range.end) };
  }

  total += last!.end - last!.start + 1;

  return total;
}

// Solve time: 25 minutes and 15 seconds
// Total solve time: 27 minutes and 34 seconds
