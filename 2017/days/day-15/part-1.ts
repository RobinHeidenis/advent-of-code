export default async function part1(input: string[]) {
  const aFactor = 16807;
  const bFactor = 48271;
  const divider = 2147483647;

  const [aStart, bStart] = input.map((line) => Number(line.split(" ").pop()));

  let total = 0;

  let a = aStart;
  let b = bStart;

  for (let i = 0; i < 40000000; i++) {
    a = (a * aFactor) % divider;
    b = (b * bFactor) % divider;

    if ((a & 0xffff) === (b & 0xffff)) {
      total++;
    }
  }

  return total;
}

// Solve time: 2 minutes and 59 seconds
