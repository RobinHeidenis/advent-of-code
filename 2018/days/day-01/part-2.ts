export default async function part2(input: string[]) {
  let numbers = input.map(Number);

  let seen = new Set<number>([0]);

  let last = 0;
  while (true) {
    for (let n of numbers) {
      last += n;
      if (seen.has(last)) {
        return last;
      } else {
        seen.add(last);
      }
    }
  }
}

// Solve time: 2 minutes and 14 seconds
// Total solve time: 3 minutes and 10 seconds
