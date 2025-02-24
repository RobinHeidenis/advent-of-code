export default async function part1(input: string[]) {
  const inBits = Number(input[0]).toString(2).split("");
  inBits.push(inBits.shift()!);

  return Number.parseInt(inBits.join(""), 2);
}

// Solve time: 2 minutes and 27 seconds
