export default async function part1(input: string[]) {
  const digits = input[0].split("").map(Number);

  let total = 0;

  for (let i = 0; i < digits.length; i++) {
    const current = digits[i];
    const next = digits[i + 1];

    if (current === next) {
      total += current;
    }
  }

  if (digits[0] === digits.at(-1)) {
    total += digits[0];
  }

  return total;
}

// Solve time: 2 minutes and 29 seconds
