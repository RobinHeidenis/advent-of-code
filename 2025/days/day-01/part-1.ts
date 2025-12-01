export default async function part1(input: string[]) {
  let total = 0;

  const start = 50;
  let current = start;
  input.forEach((line) => {
    const [operation, ...amountString] = line;
    const amount = Number(amountString.join(""));

    if (operation === "L") {
      current -= amount;
      while (current < 0) {
        current = 100 + current;
      }
    } else {
      current += amount;
      while (current > 99) {
        current -= 100;
      }
    }

    if (current === 0) {
      total++;
    }
  });

  return total;
}

// Solve time: 5 minutes and 6 seconds
