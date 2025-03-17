export default async function part1(input: string[]) {
  const stepCount = Number(input[0]);
  const steps = [0];

  let position = 0;

  for (let i = 1; i <= 2017; i++) {
    position = ((position + stepCount) % steps.length) + 1;

    steps.splice(position, 0, i);
  }

  return steps[position + 1];
}

// Solve time: 1 minute and 56 seconds
