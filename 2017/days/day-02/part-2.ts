export default async function part2(input: string[]) {
  let total = 0;

  input.forEach((line) => {
    const digits = line.split("	").map(Number);

    for (let i = 0; i < digits.length; i++) {
      for (let x = 0; x < digits.length; x++) {
        if (x === i) continue;

        if (Number.isInteger(digits[i] / digits[x])) {
          total += digits[i] / digits[x];
          return;
        }
      }
    }
  });

  return total;
}

// Solve time: 1 minute and 29 seconds
// Total solve time: 2 minutes and 16 seconds
