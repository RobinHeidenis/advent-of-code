export default async function part2(input: string[]) {
  const left: number[] = [];
  const rightCounts = new Map<number, number>();

  input.forEach((line) => {
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

