const containsTwoLettersThatExistTwiceInStringWithoutOverlapping = (
  string: string,
) => {
  for (let i = 0; i < string.length - 2; i++) {
    const target = string.slice(i, i + 2);
    const searchString = string.slice().split("");
    searchString[i] = "_";
    searchString[i + 1] = "_";

    if (searchString.join("").includes(target)) {
      return true;
    }
  }

  return false;
};

const containsRepeatingLetterWithOneCharacterInBetween = (string: string) => {
  for (let i = 0; i < string.length - 2; i++) {
    const [left, _, right] = string.slice(i, i + 3);

    if (left === right) return true;
  }

  return false;
};

export default async function part2(input: string[]) {
  const rules = [
    containsRepeatingLetterWithOneCharacterInBetween,
    containsTwoLettersThatExistTwiceInStringWithoutOverlapping,
  ];

  return input.reduce((total, curr) => {
    if (rules.every((rule) => rule(curr))) {
      console.log(curr);
      return total + 1;
    }

    return total;
  }, 0);
}

// Solve time: 18 minutes and 35 seconds
// Total solve time: 32 minutes and 5 seconds
