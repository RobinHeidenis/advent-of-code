import {
  calcSeatingHappiness,
  max,
  type FamilyMember,
  type Happiness,
  type Neighbours,
} from "./part-1";

export default async function part2(input: string[]) {
  const { family, relationships } = input.reduce(
    ({ family, relationships }, line) => {
      const [, member, feeling, score, nextTo] = line.match(
        /(\w+) .+ (.+) (\d+) .+ (\w+)/,
      )!;
      return {
        family: family.add(member),
        relationships: relationships.set(
          `${member},${nextTo}`,
          feeling === "gain" ? +score : -score,
        ),
      };
    },
    {
      family: new Set<FamilyMember>(),
      relationships: new Map<Neighbours, Happiness>(),
    },
  );

  const scores = calcSeatingHappiness({
    relationships: [...family].reduce(
      (relationships, member) =>
        relationships.set(`Me,${member}`, 0).set(`${member},Me`, 0),
      relationships,
    ),
    family: family.add("Me"),
  });

  return max(scores);
}

// Solve time: 2 minutes and 58 seconds
// Total solve time: 35 minutes and 21 seconds
