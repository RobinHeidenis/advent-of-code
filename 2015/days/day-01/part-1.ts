export default async function part1(input: string[]) {
  let floor = 0;

  input[0].split("").forEach((char) => (char === "(" ? floor++ : floor--));

  return floor;
}

// Solve time: 1 minute and 11 seconds
