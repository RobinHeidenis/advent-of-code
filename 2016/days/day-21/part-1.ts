export const operations = {
  swapPosition: (string: string, positionX: number, positionY: number) => {
    const newString = string.split("");
    const x = string[positionX];
    const y = string[positionY];
    newString[positionX] = y;
    newString[positionY] = x;
    return newString.join("");
  },

  swapLetter: (string: string, letterX: string, letterY: string) => {
    return string
      .split("")
      .map((c) => (c === letterX ? letterY : c === letterY ? letterX : c))
      .join("");
  },

  rotateLeftTimes: (string: string, times: number) => {
    let newString = string.split("");
    for (let i = 0; i < times; i++) {
      newString.push(newString.shift()!);
    }
    return newString.join("");
  },

  rotateRightTimes: (string: string, times: number) => {
    let newString = string.split("");
    for (let i = 0; i < times; i++) {
      newString.unshift(newString.pop()!);
    }
    return newString.join("");
  },

  rotateBasedOnPosition: (string: string, letter: string) => {
    const index = string.indexOf(letter);
    if (index === -1) return string;
    const rotations = 1 + index + (index >= 4 ? 1 : 0);
    return operations.rotateRightTimes(string, rotations);
  },

  reversePositions: (string: string, start: number, end: number) => {
    const before = string.slice(0, start);
    const section = string.slice(start, end + 1);
    const after = string.slice(end + 1);
    return `${before}${section.split("").reverse().join("")}${after}`;
  },

  moveToPosition: (string: string, x: number, y: number) => {
    const chars = string.split("");
    const removed = chars.splice(x, 1)[0];
    chars.splice(y, 0, removed);
    return chars.join("");
  },
};

export default async function part1(input: string[]) {
  let string = "abcdefgh";

  input.forEach((line) => {
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
      string = operations.rotateLeftTimes(string, times);
    } else if (line.startsWith("rotate right")) {
      const parts = line.split(" ");
      const times = parseInt(parts[2]);
      string = operations.rotateRightTimes(string, times);
    } else if (line.startsWith("rotate based on position")) {
      const parts = line.split(" ");
      const letter = parts[6];
      string = operations.rotateBasedOnPosition(string, letter);
    } else if (line.startsWith("reverse positions")) {
      const parts = line.split(" ");
      const start = parseInt(parts[2]);
      const end = parseInt(parts[4]);
      string = operations.reversePositions(string, start, end);
    } else if (line.startsWith("move position")) {
      const parts = line.split(" ");
      const x = parseInt(parts[2]);
      const y = parseInt(parts[5]);
      string = operations.moveToPosition(string, x, y);
    }
  });

  return string;
}

// Solve time: 26 minutes and 40 seconds
