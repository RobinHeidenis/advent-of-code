export default async function part2(input: string[]) {
  for (let i = 0; i < input.length; i++) {
    for (let j = i + 1; j < input.length; j++) {
      const id1 = input[i];
      const id2 = input[j];

      if (id1.length !== id2.length) continue;

      let diffCount = 0;
      let commonCharacters = "";

      for (let k = 0; k < id1.length; k++) {
        if (id1[k] !== id2[k]) {
          diffCount++;
          if (diffCount > 1) break;
        } else {
          commonCharacters += id1[k];
        }
      }

      if (diffCount === 1) {
        return commonCharacters;
      }
    }
  }
}

// Solve time: 2 minutes and 8 seconds
// Total solve time: 3 minutes and 53 seconds
