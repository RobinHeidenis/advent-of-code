export default async function part1(input: string[]) {
  const line = input[0]!;

  const stones = line.split(" ").map(Number);

  for (let i = 0; i < 25; i++) {
    for (let j = 0; j < stones.length; j++) {
      const number = stones[j];

      if (number === 0) {
        stones[j] = 1;
      } else if (String(number).length % 2 === 0) {
        const digits = String(number).split("");
        const left = Number(digits.slice(0, digits.length / 2).join(""));
        const right = Number(digits.slice(digits.length / 2).join(""));
        stones.splice(j, 1, left, right);
        j++;
      } else {
        stones[j] *= 2024;
      }
    }
  }

  return stones.length;
}

// Solve time: 14 minutes and 56 seconds
