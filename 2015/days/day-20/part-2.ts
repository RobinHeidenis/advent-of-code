export default async function part2(input: string[]) {
  const target = Number(input[0]!);

  let i = 0;
  while (true) {
    const divisors = findDivisors(i);
    const presents = divisors.reduce((total, curr) => total + curr * 11, 0);
    if (presents >= target) {
      return i;
    }

    i++;
  }
}

// Solve time: 6 minutes and 13 seconds
// Total solve time: 10 minutes and 37 seconds

const findDivisors = (num: number): number[] => {
  // Handle edge cases
  if (num === 0) return [];
  if (num < 0) num = Math.abs(num);

  const divisors: number[] = [];
  // Only need to check up to square root of num
  const sqrt = Math.sqrt(num);

  // Find divisor pairs
  for (let i = 1; i <= sqrt; i++) {
    if (num % i === 0) {
      if (num / i <= 50) {
        divisors.push(i);
      }

      // Don't add duplicate if i is the square root
      if (i !== num / i) {
        if (i <= 50) {
          divisors.push(num / i);
        }
      }
    }
  }

  // Sort in ascending order
  return divisors.sort((a, b) => a - b);
};
