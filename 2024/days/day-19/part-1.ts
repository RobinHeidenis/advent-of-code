export default async function part1(input: string[]) {
  let total = 0;

  const availableTypes = new Set<string>();
  const types = input[0].split(", ");
  types.forEach((type) => availableTypes.add(type));
  const maxLength = types.reduce(
    (prev, curr) => (curr.length > prev ? curr.length : prev),
    0,
  );

  const cache = new Map<string, boolean>();

  input.forEach((line, index) => {
    if (index === 0) return;

    if (canObtain(line, maxLength + 1, availableTypes, cache)) {
      total++;
    }
  });

  return total;
}

// Solve time: 31 minutes and 49 seconds

const canObtain = (
  design: string,
  maxLength: number,
  patterns: Set<string>,
  cache: Map<string, boolean>,
): boolean => {
  if (cache.has(design)) {
    return cache.get(design)!;
  }

  if (design === "") return true;

  for (let i = 0; i < Math.min(design.length, maxLength); i++) {
    if (
      patterns.has(design.slice(0, i + 1)) &&
      canObtain(design.slice(i + 1), maxLength, patterns, cache)
    ) {
      cache.set(design, true);
      return true;
    }
  }

  cache.set(design, false);
  return false;
};
