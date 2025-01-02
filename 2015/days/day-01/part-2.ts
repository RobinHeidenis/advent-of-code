export default async function part2(input: string[]) {
  let floor = 0;

  const characters = input[0].split("");
  for (let i = 0; i < characters.length; i++) {
    if (characters[i] === "(") {
      floor++;
    } else {
      floor--;
    }

    if (floor < 0) {
      return i + 1;
    }
  }
}

// Solve time: 2 minute and 33 seconds
// Total solve time: 3 minutes and 44 seconds
