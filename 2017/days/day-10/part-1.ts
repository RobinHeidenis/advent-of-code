export default async function part1(input: string[]) {
  const lengths = input[0].split(",").map(Number);

  let array = Array.from({ length: 256 }, (_, i) => i);

  let currentPosition = 0;
  lengths.forEach((length, skipSize) => {
    array = reverseSlice(array, currentPosition, length);
    currentPosition = (currentPosition + length + skipSize) % array.length;
  });

  return array[0] * array[1];
}

// Solve time: 4 minutes and 32 seconds

export const reverseSlice = (list: number[], start: number, length: number) => {
  const newList = [...list];
  const size = list.length;

  for (let i = 0; i < length; i++) {
    const index = (start + i) % size;
    const reverseIndex = (start + length - i - 1) % size;

    newList[index] = list[reverseIndex];
  }

  return newList;
};
