const ALPHABET = "abcdefghijklmnopqrstuvwxyz";

const rules = [
  (password: string) => {
    for (let i = 0; i < password.length - 2; i++) {
      const [one, two, three] = password
        .slice(i, i + 3)
        .split("")
        .map((char) => char.charCodeAt(0));
      if (two === one + 1 && three === two + 1) return true;
    }

    return false;
  },
  (password: string) => {
    return (
      !password.includes("i") &&
      !password.includes("o") &&
      !password.includes("l")
    );
  },
  (password: string) => {
    const matches = [...password.matchAll(/(\w)\1/g)];
    const uniqueMatches: string[] = [];
    matches.forEach((match) =>
      !uniqueMatches.includes(match[0]) ? uniqueMatches.push(match[0]) : null,
    );
    return uniqueMatches.length > 1;
  },
];

export default async function part1(input: string[]) {
  let possiblePassword = input[0];
  while (true) {
    possiblePassword = getNextPossiblePassword(possiblePassword);
    if (rules.every((rule) => rule(possiblePassword))) {
      return possiblePassword;
    }
  }
}

// Solve time: 16 minutes and 54 seconds

const getNextPossiblePassword = (password: string): string => {
  if (password === "") return "";

  const remaining = password.slice(0, -1);
  const nextIndex = ALPHABET.indexOf(password.slice(-1)) + 1;

  if (nextIndex < ALPHABET.length) {
    return remaining + ALPHABET[nextIndex];
  }

  return getNextPossiblePassword(remaining) + ALPHABET[0];
};
