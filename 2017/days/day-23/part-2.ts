export default async function part2(_input: string[]) {
  // We could run the assembly code, but it's extremely inefficient
  // Instead, we'll implement what the code is doing directly

  // Initial values based on the assembly code
  const b = 105700; // 57 * 100 + 100000
  const c = 122700; // b + 17000
  const step = 17; // The increment in the outer loop

  let h = 0;

  // Check each number in the range [b, c] with steps of 17
  for (let num = b; num <= c; num += step) {
    if (!isPrime(num)) {
      h++;
    }
  }

  return h;
}

// Solve time: 7 minutes and 56 seconds
// Total solve time: 12 minutes and 5 seconds

const isPrime = (num: number): boolean => {
  if (num <= 1) return false;
  if (num === 2 || num === 3) return true;
  if (num % 2 === 0) return false;

  const limit = Math.sqrt(num);
  for (let divisor = 3; divisor <= limit; divisor += 2) {
    if (num % divisor === 0) {
      return false;
    }
  }

  return true;
};
