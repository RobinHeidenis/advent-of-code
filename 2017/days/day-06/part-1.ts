export default async function part1(input: string[]) {
  const banks = input[0].split("	").map(Number);

  const seen = new Set<string>();

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
      break;
    }

    seen.add(banks.join(","));
  }

  return i;
}

// Solve time: 3 minutes and 53 seconds
