const containsThreeVowels = (string: string) => {
  const targetCharacters = ["a", "e", "i", "o", "u"];

  const amountMatching = string
    .split("")
    .reduce(
      (prev, curr) => (targetCharacters.includes(curr) ? prev + 1 : prev),
      0,
    );

  if (amountMatching >= 3) return true;

  return false;
};

const containsDoubleCharacters = (string: string) => {
  for (let i = 0; i < string.length - 1; i++) {
    const [current, next] = string.slice(i, i + 2);

    if (current === next) return true;
  }

  return false;
};

const doesNotContainForbiddenStrings = (string: string) => {
  const forbiddenStrings = ["ab", "cd", "pq", "xy"];

  for (let forbiddenString of forbiddenStrings) {
    if (string.includes(forbiddenString)) return false;
  }

  return true;
};

export default async function part1(input: string[]) {
  const rules = [
    doesNotContainForbiddenStrings,
    containsDoubleCharacters,
    containsThreeVowels,
  ];

  return input.reduce(
    (total, curr) => (rules.every((rule) => rule(curr)) ? total + 1 : total),
    0,
  );
}

// Solve time: 13 minutes and 29 seconds
// ... off by one error on the containsDoubleCharacters loop
