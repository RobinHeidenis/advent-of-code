export default async function part1(input: string[]) {
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
      }
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
      total += depth;
      depth--;
    }
  }

  return total;
}

// Solve time: 3 minutes and 5 seconds
