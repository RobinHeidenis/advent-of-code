export default async function part1(input: string[]) {
  let total = 0;

  input.forEach((line, index) => {
    console.log(index);
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

    const positions = generateStringVariants(numbers.length - 1);
    for (let i = 1; i < positions.length; i++) {
      const operators = positions[i].split("") as ("0" | "1")[];
      let currentTotal = doMath(numbers[0], numbers[1], operators[0]);
      for (let j = 1; j < numbers.length - 1; j++) {
        if (currentTotal > target) break;
        currentTotal = doMath(currentTotal, numbers[j + 1], operators[j]);
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

function generateStringVariants(length: number): string[] {
  // Handle edge cases
  if (length === 0) return [];
  if (length === 1) return ["0", "1"];

  // Initialize the result with single-digit strings
  let variants: string[] = ["0", "1"];

  // Iteratively build longer strings
  for (let currentLength = 2; currentLength <= length; currentLength++) {
    // Create a new array to hold the expanded variants
    const newVariants: string[] = [];

    // For each existing variant, append 1 and 2
    for (const variant of variants) {
      newVariants.push(variant + "0");
      newVariants.push(variant + "1");
    }

    // Update variants to the new, longer set of strings
    variants = newVariants;
  }

  return variants;
}
