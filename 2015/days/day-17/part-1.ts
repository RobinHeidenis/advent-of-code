export default async function part1(input: string[]) {
  return subsetSum(input.map(Number), 150).length;
}

// Solve time: 7 minutes and 3 seconds

export const subsetSum = (numbers: number[], target: number): number[][] => {
  const recur = (remaining: number[], subset: number[]): number[][] => {
    const total = subset.reduce((total, current) => total + current, 0);
    if (total === target) return [subset];
    if (total >= target) return [];

    return remaining.flatMap((n, i) =>
      recur(remaining.slice(i + 1), [...subset, n]),
    );
  };

  return recur(numbers, []);
};
