export default async function part2(input: string[]) {
  let total = 0;

  input.forEach((line) => {
    // Split into sequences outside and inside brackets
    const segments = line.split(/[\[\]]/);
    const outsideBrackets = segments.filter((_, i) => i % 2 === 0);
    const insideBrackets = segments.filter((_, i) => i % 2 === 1);

    // Find all ABA sequences in a string
    function findABASequences(str: string): string[][] {
      const sequences: string[][] = [];
      for (let i = 0; i < str.length - 2; i++) {
        if (
          str[i] === str[i + 2] && // first and third chars match
          str[i] !== str[i + 1] && // middle char is different
          /[a-z]/.test(str[i]) && // all chars are letters
          /[a-z]/.test(str[i + 1])
        ) {
          sequences.push([str[i], str[i + 1]]);
        }
      }
      return sequences;
    }

    // Convert ABA to BAB
    function getBAB(aba: string[]): string {
      const [a, b] = aba;
      return b + a + b;
    }

    // Get all ABA sequences from outside brackets
    const abaSequences = outsideBrackets.flatMap(findABASequences);

    // For each ABA sequence, check if corresponding BAB exists in any hypernet sequence
    const hasSSL = abaSequences.some((aba) => {
      const bab = getBAB(aba);
      return insideBrackets.some((segment) => segment.includes(bab));
    });

    if (hasSSL) {
      total++;
    }
  });

  return total;
}

// Solve time: 2 minutes and 58 seconds
// Total solve time: 8 minutes and 44 seconds
