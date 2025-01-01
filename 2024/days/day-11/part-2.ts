export default async function part2(input: string[]) {
  const line = input[0]!;

  const stonesInitial = line.split(" ").map(Number);
  let stones = new Map<number, number>();
  stonesInitial.forEach((stone) => {
    const storedStone = stones.get(stone);
    if (storedStone !== undefined) {
      stones.set(stone, storedStone + 1);
    } else {
      stones.set(stone, 1);
    }
  });

  for (let i = 0; i < 75; i++) {
    const newStones = new Map<number, number>();
    for (const [number, count] of stones.entries()) {
      if (number === 0) {
        const storedStone = newStones.get(1) ?? 0;
        newStones.set(1, storedStone + count);
      } else if (String(number).length % 2 === 0) {
        const digits = String(number).split("");
        const left = Number(digits.slice(0, digits.length / 2).join(""));
        const right = Number(digits.slice(digits.length / 2).join(""));

        const storedLeft = newStones.get(left) ?? 0;
        newStones.set(left, storedLeft + count);

        const storedRight = newStones.get(right) ?? 0;
        newStones.set(right, storedRight + count);
      } else {
        const storedStone = newStones.get(number * 2024) ?? 0;
        newStones.set(number * 2024, storedStone + count);
      }
    }
    stones = newStones;
  }

  return stones.entries().reduce((prev, [_, count]) => prev + count, 0);
}

// Solve time: 37 minutes and 4 seconds
// Total solve time: 1 hour, 6 minutes, and 56 seconds
