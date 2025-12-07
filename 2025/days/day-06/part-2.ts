export default async function part2(input: string[]) {
  let total = 0;

  const problems: { numbers: number[]; operation: "*" | "+" }[] = [];
  const turnt: string[] = [];

  input.forEach((line, index) => {
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === " ") {
        continue;
      }

      if (!turnt[i]) {
        turnt[i] = "";
      }

      turnt[i] += char;
    }
  });

  let currentNumbers: number[] = [];
  let currentOp: "*" | "+" | "" = "";
  for (let number of turnt) {
    if (!number) {
      problems.push({
        numbers: currentNumbers,
        operation: currentOp as "*" | "+",
      });
      currentNumbers = [];
      currentOp = "";
      continue;
    }

    if (number.includes("*")) {
      currentOp = "*";
      number = number.replace("*", "");
    }

    if (number.includes("+")) {
      currentOp = "+";
      number = number.replace("+", "");
    }

    currentNumbers.push(Number(number));
  }

  problems.push({ numbers: currentNumbers, operation: currentOp as "*" | "+" });

  for (const problem of problems) {
    total += problem.numbers.reduce((total, number) => {
      if (problem.operation === "*") {
        return total * Number(number);
      }

      return total + Number(number);
    });
  }

  return total;
}

// Solve time: 18 minutes and 7 seconds
// Total solve time: 28 minutes and 30 seconds
