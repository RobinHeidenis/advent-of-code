export default async function part1(input: string[]) {
  let total = 0;

  input.forEach((line) => {
    const numbers = line.split("").map(Number);

    let biggestNumber = biggestNumberInArray(numbers, []);

    if (biggestNumber.index === numbers.length - 1) {
      biggestNumber = biggestNumberInArray(numbers, [biggestNumber.number]);
    }

    let secondBiggestNumber = biggestNumberInArray(
      numbers.slice(biggestNumber.index + 1),
      [],
    );

    const joltage = Number(
      `${biggestNumber.number}${secondBiggestNumber.number}`,
    );
    total += joltage;
  });

  return total;
}

// Solve time: 7 minutes and 5 seconds

const biggestNumberInArray = (array: number[], exceptions: number[]) => {
  const biggestNumber = array
    .filter((number) => !exceptions.includes(number))
    .toSorted()
    .at(-1)!;
  const index = array.indexOf(biggestNumber);

  return {
    number: biggestNumber,
    index,
  };
};
