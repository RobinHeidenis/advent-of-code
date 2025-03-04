export default async function part1(input: string[]) {
  let total = 0;

  input.forEach((line) => {
    const words = line.split(" ");

    if (new Set(words).size === words.length) {
      total++;
    }
  });

  return total;
}

// Solve time: 29 seconds
