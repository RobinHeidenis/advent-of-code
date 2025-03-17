export default async function part2(input: string[]) {
  const stepCount = Number(input[0]);
  let position = 0;
  let valueAfterZero = null;

  // We only need to track the current position and the value after zero
  for (let i = 1; i <= 50_000_000; i++) {
    // Calculate the new position
    position = ((position + stepCount) % i) + 1;

    // If we're inserting at position 1 (right after 0), update valueAfterZero
    if (position === 1) {
      valueAfterZero = i;
    }
  }

  return valueAfterZero;
}

// Solve time: 1 minute and 21 seconds
// Total solve time: 3 minutes and 18 seconds
