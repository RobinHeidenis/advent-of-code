export default async function part1(input: string) {
  let total = 0;

  const blocks = input.split("\n\n");

  for (const region of blocks.at(-1)!.trim().split("\n")) {
    const [regionSize, presentAmountsString] = region.split(": ");
    const [x, y] = regionSize.split("x").map(Number);
    const presentAmounts = presentAmountsString.split(" ").map(Number);

    if (
      (x / 3) * (y / 3) >=
      presentAmounts.reduce((total, presentAmount) => (total += presentAmount))
    ) {
      total++;
    }
  }

  return total;
}

// Solve time: 13 minutes and 40 seconds
