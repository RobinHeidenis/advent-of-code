export default async function part1(input: string[]) {
  const startingNumber = 20151125;

  const [y, x] = input[0].matchAll(/(\d+)/g).map((match) => Number(match[0]));

  const totalIterations = ((x + y - 2) * (x + y - 1)) / 2 + x;

  let number = startingNumber;
  for (let i = 1; i < totalIterations; i++) {
    number = calculateNextNumber(number);
  }

  return number;
}

// Solve time: 8 minutes and 49 seconds

const calculateNextNumber = (previousNumber: number) => {
  return (previousNumber * 252533) % 33554393;
};
