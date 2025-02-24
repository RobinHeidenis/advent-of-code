export default async function part2(input: string[]) {
  const ranges: [number, number][] = [];
  input.forEach((line) => {
    const range = line.split("-").map(Number);
    ranges.push([range[0], range[1]]);
  });

  ranges.sort((a, b) => a[0] - b[0]);

  const mergedRanges: [number, number][] = [];

  for (const range of ranges) {
    if (mergedRanges.length === 0) {
      // Add the first range
      mergedRanges.push(range);
    } else {
      // Get the last merged range
      const lastRange = mergedRanges[mergedRanges.length - 1];

      // Check if current range overlaps or is adjacent to the last merged range
      if (range[0] <= lastRange[1] + 1) {
        // Merge by extending the end of the last range if needed
        lastRange[1] = Math.max(lastRange[1], range[1]);
      } else {
        // No overlap or adjacency, add as a new range
        mergedRanges.push(range);
      }
    }
  }

  // Count all allowed IPs (the gaps between blocked ranges)
  let totalAllowed = 0;

  // Count IPs from 0 to the start of the first range (if any)
  if (mergedRanges[0][0] > 0) {
    totalAllowed += mergedRanges[0][0];
  }

  // Count IPs in the gaps between ranges
  for (let i = 0; i < mergedRanges.length - 1; i++) {
    const gapSize = mergedRanges[i + 1][0] - mergedRanges[i][1] - 1;
    if (gapSize > 0) {
      totalAllowed += gapSize;
    }
  }

  // Count IPs from the end of the last range to the maximum value
  const lastRange = mergedRanges[mergedRanges.length - 1];
  if (lastRange[1] < 4294967295) {
    totalAllowed += 4294967295 - lastRange[1];
  }

  return totalAllowed;
}

// Solve time: 7 minutes and 33 seconds
// Total solve time: 13 minutes and 27 seconds
