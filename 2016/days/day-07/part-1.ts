export default async function part1(input: string[]) {
  let total = 0;

  input.forEach((line) => {
    // Split into sequences outside and inside brackets
    const segments = line.split(/[\[\]]/);

    // Even indices are outside brackets, odd indices are inside brackets
    const outsideBrackets = segments.filter((_, i) => i % 2 === 0);
    const insideBrackets = segments.filter((_, i) => i % 2 === 1);

    // Create new regex instance for each test to avoid stateful behavior
    const hasABBA = (str: string): boolean => {
      return /.*?((\w)(?!\2)(\w))\3\2.*/.test(str);
    };

    // Check if any outside segment has ABBA
    const hasOutsideABBA = outsideBrackets.some(hasABBA);

    // Check if any inside segment has ABBA
    const hasInsideABBA = insideBrackets.some(hasABBA);

    // Increment total if there's ABBA outside but not inside brackets
    if (hasOutsideABBA && !hasInsideABBA) {
      total++;
    }
  });

  return total;
}

// Solve time: 5 minutes and 46 seconds
