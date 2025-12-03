const wrapAround = (number: number) => {
  if (number > 99) {
    return { number: number - 100, wrapped: true };
  } else if (number < 0) {
    return { number: 100 + number, wrapped: true };
  }
  return { number, wrapped: false };
};

export default async function part2(input: string[]) {
  let total = 0;

  const start = 50;
  let current = start;
  input.forEach((line) => {
    const [operation, ...amountString] = line;
    const amount = Number(amountString.join(""));

    const remainder = amount % 100;
    const fullRotations = Math.floor(amount / 100);
    total += fullRotations;

    if (operation === "L") {
      const wrapped = wrapAround(current - remainder);
      if (wrapped.wrapped && wrapped.number !== 0 && current !== 0) {
        total++;
      }
      current = wrapped.number;
    } else {
      const wrapped = wrapAround(current + remainder);
      if (wrapped.wrapped && wrapped.number !== 0 && current !== 0) {
        total++;
      }
      current = wrapped.number;
    }

    if (current === 0) {
      total++;
    }
  });

  return total;
}

// Solve time: 15 minutes and 32 seconds
// Total solve time: 20 minutes and 38 seconds
