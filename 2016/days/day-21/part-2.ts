import { operations } from "./part-1";

export default async function part2(input: string[]) {
  let string = "fbgdceah";

  for (let i = input.length - 1; i >= 0; i--) {
    const line = input[i];

    if (line.startsWith("swap position")) {
      const parts = line.split(" ");
      const positionX = parseInt(parts[2]);
      const positionY = parseInt(parts[5]);

      string = operations.swapPosition(string, positionX, positionY);
    } else if (line.startsWith("swap letter")) {
      const parts = line.split(" ");
      const letterX = parts[2];
      const letterY = parts[5];

      string = operations.swapLetter(string, letterX, letterY);
    } else if (line.startsWith("rotate left")) {
      const parts = line.split(" ");
      const times = parseInt(parts[2]);

      string = operations.rotateRightTimes(string, times);
    } else if (line.startsWith("rotate right")) {
      const parts = line.split(" ");
      const times = parseInt(parts[2]);

      string = operations.rotateLeftTimes(string, times);
    } else if (line.startsWith("rotate based on position")) {
      const parts = line.split(" ");
      const letter = parts[6];

      string = inverseRotateBasedOnPosition(string, letter);
    } else if (line.startsWith("reverse positions")) {
      const parts = line.split(" ");
      const start = parseInt(parts[2]);
      const end = parseInt(parts[4]);

      string = operations.reversePositions(string, start, end);
    } else if (line.startsWith("move position")) {
      const parts = line.split(" ");
      const x = parseInt(parts[2]);
      const y = parseInt(parts[5]);

      string = operations.moveToPosition(string, y, x);
    }
  }

  return string;
}

// Solve time: 4 minutes and 13 seconds
// Total solve time: 30 minutes and 53 seconds

const inverseRotateBasedOnPosition = (string: string, letter: string) => {
  for (let i = 0; i < string.length; i++) {
    let testString = string.split("");
    while (testString.indexOf(letter) !== i) {
      testString.unshift(testString.pop()!);
    }
    const newString = testString.join("");

    const rotated = operations.rotateBasedOnPosition(newString, letter);

    if (rotated === string) {
      return newString;
    }
  }

  return string;
};
