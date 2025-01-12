export default async function part2(input: string[]) {
  return sumNumbers(
    JSON.parse(input[0]),
    (x) =>
      typeof x === "object" &&
      !Array.isArray(x) &&
      Object.values(x).includes("red"),
  );
}

// Solve time: 5 minutes and 21 seconds
// Total solve time: 7 minutes and 7 seconds

const sumNumbers = (x: any, shouldSkip = (_: any) => false): number => {
  if (shouldSkip(x)) {
    return 0;
  }

  if (typeof x === "number") {
    return x;
  }

  if (typeof x === "object") {
    return Object.values(x)
      .map((y) => sumNumbers(y, shouldSkip))
      .reduce((total, curr) => total + curr, 0);
  }

  return 0;
};
