import type { Replacement } from "./part-1";

export default async function part2(input: string[]) {
  let total = 0;

  let molecule = input.at(-1);
  const replacements: Replacement[] = [];
  input.forEach((line) => {
    if (line.includes("=>")) {
      const [to, from] = line.split(" => ");
      replacements.push({ from, to });
    }
  });
  replacements.sort((a, b) => b.from.length - a.from.length);

  while (molecule !== "e") {
    for (const replacement of replacements) {
      if (molecule?.includes(replacement.from)) {
        const match = molecule.match(new RegExp(replacement.from))!;
        molecule = `${molecule.slice(0, match.index)}${replacement.to}${molecule.slice(match.index! + replacement.from.length)}`;
        total++;
        break;
      }
    }
  }

  return total;
}

// Solve time: 6 minutes and 17 seconds
// Total solve time: 16 minutes and 51 seconds
