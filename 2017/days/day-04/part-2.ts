export default async function part2(input: string[]) {
  let total = 0;

  input.forEach((line) => {
    const words = line.split(" ");

    const counts = words.map(countLetters);

    for (let i = 0; i < counts.length; i++) {
      for (let x = 0; x < counts.length; x++) {
        if (x === i) continue;

        if (isAnagram(counts[i], counts[x])) {
          return;
        }
      }
    }

    total++;
  });

  return total;
}

// Solve time: 3 minutes and 15 seconds
// Total solve time: 3 minutes and 35 seconds

const countLetters = (word: string) => {
  const letters = word.split("");
  const counts: Record<string, number> = {};

  letters.forEach((letter) => {
    if (counts[letter]) {
      counts[letter]++;
    } else {
      counts[letter] = 1;
    }
  });

  return counts;
};

const isAnagram = (a: Record<string, number>, b: Record<string, number>) => {
  const keys = Object.keys(a);

  if (keys.length !== Object.keys(b).length) {
    return false;
  }

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];

    if (a[key] !== b[key]) {
      return false;
    }
  }

  return true;
};
