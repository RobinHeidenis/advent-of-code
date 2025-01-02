export default async function part2(input: string[]) {
  let total = 0;

  input.forEach((line) => {
    const sizes = line.split("x").map(Number);

    const [l, r] = sizes.sort((a, b) => a - b).slice(0, 2);

    total += l + l + r + r;
    total += sizes.reduce((prev, curr) => prev * curr);
  });

  return total;
}

// Solve time: 3 minutes and 19 seconds
// Total solve time: 12 minutes and 18 seconds
