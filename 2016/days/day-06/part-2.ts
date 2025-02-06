export default async function part2(input: string[]) {
  const counts: { [key: string]: number }[] = [];

  for (const line of input) {
    line.split("").forEach((character, index) => {
      if (counts[index]?.[character] !== undefined) {
        counts[index][character]++;
      } else {
        if (!counts[index]) {
          counts[index] = {};
        }
        counts[index][character] = 1;
      }
    });
  }

  return counts
    .map((counts) => {
      return Object.entries(counts).toSorted(([_a, aCount], [_b, bCount]) => {
        return aCount - bCount;
      })[0][0];
    })
    .join("");
}

// Solve time: 32 seconds
// Total solve time: 5 minutes and 34 seconds
