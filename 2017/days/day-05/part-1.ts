export default async function part1(input: string[]) {
  const instructions = input.map(Number);

  let steps = 0;
  let pointer = 0;
  while (pointer >= 0 && pointer < instructions.length) {
    steps++;

    const jumpAmount = instructions[pointer];
    instructions[pointer]++;
    pointer += jumpAmount;
  }

  return steps;
}

// Solve time: 1 minute and 45 seconds
