export default async function part1(input: string[]) {
  const left: number[] = [];
  const right: number[] = [];

  input.forEach((line) => {
    const [l, r] = line
      .split("   ")
      .filter((line) => line !== undefined && line !== null)
      .map(Number);
    left.push(l);
    right.push(r);
  });

  left.sort(sortNumbers);
  right.sort(sortNumbers);

  let totalDifference = 0;

  left.forEach((leftNumber) => {
    const rightNumber = right.shift();

    totalDifference += Math.abs(leftNumber - rightNumber!);
  });

  return totalDifference;
}

// Solve time: 5 minutes and 12 seconds

const sortNumbers = (a: number, b: number) => {
  return a - b;
};

// trigger ci
