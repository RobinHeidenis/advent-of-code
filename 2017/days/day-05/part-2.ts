export default async function part2(input: string[]) {
  const instructions = input.map(Number);

  let steps = 0;
  let pointer = 0;
  while (pointer >= 0 && pointer < instructions.length) {
    steps++;

    const jumpAmount = instructions[pointer];

    if (jumpAmount >= 3) {
      instructions[pointer]--;
    } else {
      instructions[pointer]++;
    }

    pointer += jumpAmount;
  }

  return steps;
}

// Solve time: 25 seconds
// Total solve time: 2 minutes and 11 seconds
