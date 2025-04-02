export default async function part1(input: string[]) {
  const counts = input.map((line) => {
    const characters = line.split("");
    const count: Record<string, number> = {};
    for (const char of characters) {
      count[char] = (count[char] || 0) + 1;
    }

    return count;
  });

  const twos = counts.filter((count) => {
    return Object.values(count).some((value) => value === 2);
  });

  const threes = counts.filter((count) => {
    return Object.values(count).some((value) => value === 3);
  });

  return twos.length * threes.length;
}

// Solve time: 1 minute and 44 seconds
