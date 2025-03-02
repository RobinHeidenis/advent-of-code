export default async function part1(input: string[]) {
  let total = 0;

  input.forEach((line) => {
    const digits = line.split("	").map(Number);

    const max = Math.max(...digits);
    const min = Math.min(...digits);

    total += max - min;
  });

  return total;
}

// Solve time: 46 seconds
