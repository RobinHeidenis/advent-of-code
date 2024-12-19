export default async function part2(input: string[]) {
  let total = 0;

  const availableTypes = new Set<string>();
  const types = input[0].split(", ");
  types.forEach((type) => availableTypes.add(type));
  const maxLength = types.reduce(
    (prev, curr) => (curr.length > prev ? curr.length : prev),
    0,
  );

  const cache = new Map<string, number>();

  input.forEach((line, index) => {
    if (index === 0) return;

    const amount = numberOfPossibilities(
      line,
      maxLength + 1,
      availableTypes,
      cache,
    );
    total += amount;
  });

  return total;
}

// Solve time: 7 minutes and 28 seconds
// Total solve time: 39 minutes and 17 seconds

const numberOfPossibilities = (
  design: string,
  maxLength: number,
  patterns: Set<string>,
  cache: Map<string, number>,
): number => {
  if (design === "") return 1;
  if (cache.has(design)) return cache.get(design)!;

  let count = 0;
  for (let i = 0; i < Math.min(design.length, maxLength); i++) {
    if (patterns.has(design.slice(0, i + 1))) {
      count += numberOfPossibilities(
        design.slice(i + 1),
        maxLength,
        patterns,
        cache,
      );
    }
  }

  cache.set(design, count);
  return count;
};
