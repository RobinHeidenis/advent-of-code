export default async function part2(input: string[]) {
  const aFactor = 16807;
  const bFactor = 48271;
  const divider = 2147483647;

  const [aStart, bStart] = input.map((line) => Number(line.split(" ").pop()));

  let total = 0;

  let a = aStart;
  let b = bStart;

  for (let i = 0; i < 5000000; i++) {
    do {
      a = (a * aFactor) % divider;
    } while (a % 4 !== 0);

    do {
      b = (b * bFactor) % divider;
    } while (b % 8 !== 0);

    if ((a & 0xffff) === (b & 0xffff)) {
      total++;
    }
  }

  return total;
}

// Solve time: 30 seconds
// Total solve time: 3 minutes and 30 seconds
