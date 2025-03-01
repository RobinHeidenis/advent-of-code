export default async function part2(input: string[]) {
  const digits = input[0].split("").map(Number);

  let total = 0;

  for (let i = 0; i < digits.length; i++) {
    const current = digits[i];
    const next = digits[(i + digits.length / 2) % digits.length];

    if (current === next) {
      total += current;
    }
  }

  return total;
}

// Solve time: 1 minute and 31 seconds
// Total solve time: 4 minutes
