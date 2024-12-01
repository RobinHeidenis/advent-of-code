export default async function part2() {
  const input = Bun.file("./days/day-1/input.txt");
  const lines = (await input.text()).split("\n").filter((line) => !!line);

  const left: number[] = [];
  const rightCounts = new Map<number, number>();

  lines.forEach((line) => {
    const [l, r] = line
      .split("   ")
      .filter((line) => line !== undefined && line !== null)
      .map(Number);
    left.push(l);

    if (rightCounts.has(r)) {
      const rightCount = rightCounts.get(r)!;
      rightCounts.set(r, rightCount + 1);
    } else {
      rightCounts.set(r, 1);
    }
  });

  let similarityScore = 0;

  left.forEach((leftNumber) => {
    const rightCount = rightCounts.get(leftNumber);

    if (!rightCount) return;

    similarityScore += leftNumber * rightCount;
  });

  return similarityScore;
}

console.log(await part2());
