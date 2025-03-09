export default async function part2(input: string[]) {
  let total = 0;

  const stream = input[0].split("");

  let depth = 0;
  let inGarbage = false;
  for (let i = 0; i < stream.length; i++) {
    const character = stream[i];

    if (character === "!") {
      i++;
      continue;
    }

    if (inGarbage) {
      if (character === ">") {
        inGarbage = false;
        continue;
      }

      total++;
      continue;
    }

    if (character === "<") {
      inGarbage = true;
      continue;
    }

    if (character === "{") {
      depth++;
      continue;
    }

    if (character === "}") {
      depth--;
    }
  }

  return total;
}

// Solve time: 50 seconds
// Total solve time: 3 minutes and 55 seconds
