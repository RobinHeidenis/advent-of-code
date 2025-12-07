export default async function part1(input: string[]) {
  let total = 0;

  const problems: { numbers: number[]; operation: "*" | "+" }[] = [];

  input.forEach((line, index) => {
    const parts = line.trim().split(/\s+/);
    if (index === input.length - 1) {
      for (let i = 0; i < parts.length; i++) {
        problems[i].operation = parts[i] as "*" | "+";
      }
      return;
    }

    const numbers = parts.map(Number);

    for (let i = 0; i < numbers.length; i++) {
      if (index === 0) {
        problems.push({ numbers: [], operation: "+" });
      }

      problems[i].numbers.push(numbers[i]);
    }
  });

  for (const problem of problems) {
    total += problem.numbers.reduce((total, number) => {
      if (problem.operation === "*") {
        return total * number;
      }

      return total + number;
    });
  }

  return total;
}

// Solve time: 10 minutes and 23 seconds
