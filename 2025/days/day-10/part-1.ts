function areSetsEqual(setA: Set<number>, setB: Set<number>): boolean {
  if (setA.size !== setB.size) return false;
  for (const item of setA) {
    if (!setB.has(item)) return false;
  }
  return true;
}

/**
 * Helper function to generate combinations of an array.
 * This is the equivalent of Python's itertools.combinations(arr, r).
 */
function* combinations<T>(arr: T[], r: number): Generator<T[]> {
  const n = arr.length;
  if (r < 0 || r > n) {
    return;
  }
  const indices = Array.from({ length: r }, (_, i) => i);

  while (true) {
    yield indices.map((i) => arr[i]);

    let i = r - 1;
    while (i >= 0 && indices[i] === n - r + i) {
      i--;
    }

    if (i < 0) {
      break;
    }

    indices[i]++;
    for (let j = i + 1; j < r; j++) {
      indices[j] = indices[j - 1] + 1;
    }
  }
}

export default async function part1(input: string[]) {
  let total = 0;

  const lineRegex = /^\[([.#]+)\] ([()\d, ]+) \{([\d,]+)\}$/;

  input.forEach((line) => {
    const trimmedLine = line.trim();
    if (!trimmedLine) return;

    const match = trimmedLine.match(lineRegex);

    const [_, targetString, buttonsString] = match!;

    const target: Set<number> = new Set();
    for (let index = 0; index < targetString.length; index++) {
      if (targetString[index] === "#") {
        target.add(index);
      }
    }

    const buttonStrings = buttonsString
      .split(/\s+/)
      .filter((string) => string.length > 0);
    const buttons: Set<number>[] = buttonStrings.map((string) => {
      const indices = string
        .slice(1, -1)
        .split(",")
        .map((string) => parseInt(string.trim(), 10));
      return new Set(indices);
    });

    for (let count = 1; count <= buttons.length; count++) {
      let found = false;

      for (const attempt of combinations(buttons, count)) {
        let lights: Set<number> = new Set();

        for (const button of attempt) {
          const nextLights = lights.symmetricDifference(button);
          lights = nextLights;
        }

        if (areSetsEqual(lights, target)) {
          total += count;
          found = true;
          break;
        }
      }

      if (found) {
        break;
      }
    }
  });

  return total;
}

// Solve time: 26 minutes and 48 seconds
