export default async function part1(input: string[]) {
  const packages = input.map(Number);

  return getOptimalFirstGroupQE(packages, 3);
}

// Solve time: 21 minutes and 52 seconds

function* combinations<T>(arr: T[], size: number = arr.length): Generator<T[]> {
  const end = arr.length - 1;
  const combination: T[] = [];

  function* recur(start: number, index: number): Generator<T[]> {
    if (index === size) {
      return yield combination;
    }

    for (let i = start; i <= end && end - i + 1 >= size - index; i++) {
      combination[index] = arr[i];
      yield* recur(i + 1, index + 1);
    }
  }

  yield* recur(0, 0);
}

const groupsOfWeight = function* (
  packages: number[],
  weightPerGroup: number,
): Generator<number[]> {
  for (let groupSize = 1; groupSize <= packages.length; groupSize++) {
    for (const group of combinations(packages, groupSize)) {
      if (group.reduce((prev, curr) => (prev += curr), 0) === weightPerGroup) {
        yield group;
      }
    }
  }
};

const sub = <T>(xs: T[], ys: T[]) => xs.filter((x) => !ys.includes(x));

const canGroup = (
  packages: number[],
  numOfGroups: number,
  weightPerGroup: number,
): boolean => {
  if (numOfGroups === 0) return packages.length === 0;

  for (const group of groupsOfWeight(packages, weightPerGroup)) {
    if (canGroup(sub(packages, group), numOfGroups - 1, weightPerGroup)) {
      return true;
    }
  }

  return false;
};

export const getOptimalFirstGroupQE = (
  packages: number[],
  numOfGroups: number,
): number => {
  const weightPerGroup =
    packages.reduce((prev, curr) => (prev += curr), 0) / numOfGroups;

  let minQE = Infinity;
  let prevGroupSize = Infinity;

  for (const group of groupsOfWeight(packages, weightPerGroup)) {
    if (minQE !== Infinity && prevGroupSize < group.length) break;

    const candidateQE = group.reduce((prev, curr) => (prev *= curr), 1);
    if (
      candidateQE < minQE &&
      canGroup(sub(packages, group), numOfGroups - 1, weightPerGroup)
    ) {
      minQE = candidateQE;
    }

    prevGroupSize = group.length;
  }

  return minQE;
};
