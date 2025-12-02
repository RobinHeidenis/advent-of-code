export default async function part1(input: string[]) {
  let total = 0;
  const ranges = input[0].split(',');

  for (const range of ranges) {
    const [start, finish] = range.split('-').map(Number);

    for (let i = start; i < finish + 1; i++) {
      const stringifiedNumber = i.toString();
      const firstHalf = stringifiedNumber.slice(0, stringifiedNumber.length / 2);
      const secondHalf = stringifiedNumber.slice(stringifiedNumber.length / 2);

      if (firstHalf === secondHalf) {
        total += i;
      }
    }
  }

  return total;
}

// Solve time: 2 minutes and 46 seconds
