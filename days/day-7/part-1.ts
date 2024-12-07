export default async function part1(input: string[]) {
  let total = 0;

  input.forEach((line) => {
    const [targetString, numbersString] = line.split(": ");
    const target = Number(targetString);
    const numbers = numbersString.split(" ").map(Number);

    if (numbers.reduce((prev, curr) => prev + curr) === target) {
      total += target;
      return;
    }

    if (numbers.reduce((prev, curr) => prev * curr) === target) {
      total += target;
      return;
    }

    if (numbers.length === 2) return;

    for (let i = 1; i < factorial(numbers.length - 1, 1); i++) {
      const bitPositions = toBinary(i)
        .padStart(numbers.length - 1, "0")
        .split("") as ("0" | "1")[];

      let currentTotal = doMath(numbers[0], numbers[1], bitPositions[0]);
      for (let j = 1; j < numbers.length - 1; j++) {
        if (currentTotal > target) break;
        currentTotal = doMath(currentTotal, numbers[j + 1], bitPositions[j]);
      }

      if (currentTotal === target) {
        total += target;
        break;
      }
    }
  });

  return total;
}

// Solve time: 48 minutes

const toBinary = (decimal: number) => {
  return (decimal >> 0).toString(2);
};

const factorial = (decimal: number, total: number) => {
  if (decimal === 1) return total + 1;

  return factorial(decimal - 1, total * decimal);
};

const doMath = (left: number, right: number, operator: "0" | "1") => {
  if (operator === "0") {
    return left + right;
  }

  return left * right;
};
