import { enhance, parseRules } from "./part-1";

export default async function part2(input: string[]) {
  const rules = parseRules(input);

  let pattern = [
    [".", "#", "."],
    [".", ".", "#"],
    ["#", "#", "#"],
  ];

  for (let i = 0; i < 18; i++) {
    pattern = enhance(pattern, rules);
  }

  let total = 0;
  for (let y = 0; y < pattern.length; y++) {
    for (let x = 0; x < pattern[y].length; x++) {
      if (pattern[y][x] === "#") {
        total++;
      }
    }
  }
  return total;
}

// Solve time: 1 minute and 5 seconds
// Total solve time: 22 minutes and 10 seconds
