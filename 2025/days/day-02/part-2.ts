export default async function part2(input: string[]) {
  let total = 0;
  const ranges = input[0].split(",");

  for (const range of ranges) {
    const [start, finish] = range.split("-").map(Number);

    for (let i = start; i < finish + 1; i++) {
      const regex = /^(\d+)\1+$/;
      if (!regex.test(i.toString())) {
        continue;
      }

      total += i;
    }
  }

  return total;
}

// Solve time: 1 minute and 20 seconds
