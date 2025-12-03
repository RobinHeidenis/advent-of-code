export default async function part2(input: string[]) {
  let total = 0;

  input.forEach((line) => {
    const numbers = line.split("").map(Number);

    const joltageArray: ReturnType<typeof biggestNumberInArray>[] = [];

    for (let i = 0; i <= 11; i++) {
      const startIndex = i === 0 ? 0 : joltageArray.at(-1)!.index + 1;
      const endIndex = Math.min(-(11 - i), 0);
      const slice = numbers.slice(
        startIndex,
        endIndex === 0 ? undefined : endIndex,
      );
      joltageArray.push(
        biggestNumberInArray(slice, startIndex === 0 ? 0 : startIndex),
      );
    }

    const joltage = Number(joltageArray.map(({ number }) => number).join(""));
    total += joltage;
  });

  return total;
}

// Solve time: 26 minutes and 22 seconds
// Total solve time: 33 minutes and 27 seconds

const biggestNumberInArray = (
  array: number[],
  indexOffset: number,
  exceptions: number[] = [],
) => {
  const biggestNumber = array
    .filter((number) => !exceptions.includes(number))
    .toSorted()
    .at(-1)!;
  const index = array.indexOf(biggestNumber) + indexOffset;

  return {
    number: biggestNumber,
    index,
  };
};
