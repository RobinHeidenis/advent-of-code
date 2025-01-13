export type FamilyMember = string;
export type Neighbours = string;
export type Happiness = number;
export type Relationships = {
  family: Set<FamilyMember>;
  relationships: Map<Neighbours, Happiness>;
};

export default async function part1(input: string[]) {
  const relationships = input.reduce(
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
    } satisfies Relationships,
  );


  return max(calcSeatingHappiness(relationships));
}

// Solve time: 32 minutes and 23 seconds

export const calcSeatingHappiness = ({
  family,
  relationships,
}: Relationships): Happiness[] =>
  [...permutations([...family])].map((a) =>
    zip(a, [...a.slice(1), a[0]]).reduce(
      (score, [a, b]) =>
        score +
        relationships.get(`${a},${b}`)! +
        relationships.get(`${b},${a}`)!,
      0,
    ),
  );

export const zip = <A, B>(a: A[], b: B[]): [A, B][] => a.map((x, idx) => [x, b[idx]]);

export const max = (xs: number[]) => xs.reduce((m, x) => (x > m ? x : m), -Infinity);

export function* permutations<T>(col: T[]): Generator<T[]> {
  if (col.length < 2) {
    return yield col;
  }

  const [first, ...rest] = col;
  for (const permutation of permutations(rest)) {
    for (let i = 0; i < col.length; i++) {
      yield [...permutation.slice(0, i), first, ...permutation.slice(i)];
    }
  }
}
