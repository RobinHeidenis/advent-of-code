export default async function part1(input: string[]) {
  let string = input[0];
  let previous = string;

  do {
    for (let i = 0; i < string.length - 1; i++) {
      const current = string[i];
      const next = string[i + 1];

      if (current.toLowerCase() === next.toLowerCase() && current !== next) {
        string = string.slice(0, i) + string.slice(i + 2);
        i = -1;

        previous = string;
      }
    }
  } while (string !== previous);

  return string.length;
}

// Solve time: 2 minutes and 23 seconds
