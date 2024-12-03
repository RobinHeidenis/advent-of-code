export default async function part2(input: string[]) {
  let total = 0;

  const line = input.join("");
  const enabledPartsRegex =
    /^(.*?)don't\(\)|do\(\)(.*?)don't\(\)|do\(\)(.*?)$/g;
  const regex = /mul\((?<num1>\d{1,3}),(?<num2>\d{1,3})\)/g;

  const enabledParts = Array.from(line.matchAll(enabledPartsRegex));

  enabledParts.forEach(([match]) => {
    const matches = Array.from(match.matchAll(regex));

    matches.forEach(([_match, num1, num2]) => {
      total += Number(num1) * Number(num2);
    });
  });
  return total;
}

// Solve time: 7 minutes and 29 seconds
// Total solve time: 15 minutes and 49 seconds
