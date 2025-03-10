import { reverseSlice } from "./part-1";

export default async function part2(input: string[]) {
  const lengths = input[0]
    .split("")
    .map((char) => char.charCodeAt(0))
    .concat([17, 31, 73, 47, 23]);

  let currentPosition = 0;
  let skipSize = 0;
  let array = Array.from({ length: 256 }, (_, i) => i);

  for (let i = 0; i < 64; i++) {
    lengths.forEach((length) => {
      array = reverseSlice(array, currentPosition, length);
      currentPosition = (currentPosition + length + skipSize) % array.length;
      skipSize++;
    });
  }

  const denseHash = [];

  for (let i = 0; i < array.length; i += 16) {
    const slice = array.slice(i, i + 16);
    denseHash.push(slice.reduce((acc, number) => acc ^ number));
  }

  return denseHash.map((number) => number.toString(16).padStart(2, "0")).join("");
}

// Solve time: 5 minutes and 41 seconds
// Total solve time: 10 minutes and 14 seconds
