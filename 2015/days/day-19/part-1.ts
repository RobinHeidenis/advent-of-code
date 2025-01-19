export type Replacement = {
  from: string;
  to: string;
};

export default async function part1(input: string[]) {
  const uniqueMolecules = new Set<string>();
  const molecule = input.at(-1);
  for (const line of input) {
    if (!line.includes("=>")) break;
    const [from, to] = line.split(" => ");
    for (const replacement of makeMolecules(molecule!, { from, to })) {
      uniqueMolecules.add(replacement);
    }
  }

  return uniqueMolecules.size;
}

// Solve time: 10 minutes and 34 seconds

function* makeMolecules(
  molecule: string,
  replacement: Replacement,
): Generator<string> {
  const regex = new RegExp(replacement.from, "g");
  const matches = molecule.matchAll(regex);

  for (const match of matches) {
    const copy = molecule.slice();
    yield `${copy.slice(0, match.index)}${replacement.to}${copy.slice(match.index + replacement.from.length)}`;
  }
}
