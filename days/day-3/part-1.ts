export default async function part1(input: string[]) {
  let total = 0;

  input.forEach((line) => {
    const regex = /mul\((?<num1>\d{1,3}),(?<num2>\d{1,3})\)/g;

    const matches = Array.from(line.matchAll(regex));

    matches.forEach(([_match, num1, num2]) => {
      total += Number(num1) * Number(num2);
    });
  });

  return total;
}

// Solve time: 8 minutes and 20 seconds
