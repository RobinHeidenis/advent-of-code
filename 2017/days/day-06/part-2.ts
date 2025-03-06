export default async function part2(input: string[]) {
  const banks = input[0].split("	").map(Number);

  const seen = new Map<string, number>();

  let i = 0;
  while (true) {
    i++;
    const maxBlocks = Math.max(...banks);
    const index = banks.indexOf(maxBlocks);

    banks[index] = 0;

    for (let j = 0; j < maxBlocks; j++) {
      banks[(index + j + 1) % banks.length]++;
    }

    if (seen.has(banks.join(","))) {
      return i - seen.get(banks.join(","))!;
    }

    seen.set(banks.join(","), i);
  }
}

// Solve time: 36 seconds
// Total solve time: 4 minutes and 30 seconds
