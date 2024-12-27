export default async function part1(input: string) {
  console.log(
    "NOTE: for this implementation it is import that your input has an empty newline at the end of it",
  );

  let total = 0;

  const locks: number[][] = [];
  const keys: number[][] = [];

  const maxLength = 5;

  input.split("\n\n").forEach((block) => {
    const lines = block.split("\n");
    if (lines[0].includes("#")) {
      const turned = turnArray(lines.map((line) => line.split(""))).map(
        (line) => line.findIndex((char) => char === ".") - 1,
      );
      locks.push(turned);
    } else {
      const turned = turnArray(
        invertArray(lines).map((line) => line.split("")),
      ).map((line) => line.findIndex((char) => char === ".") - 1);
      keys.push(turned);
    }
  });

  locks.forEach((lock) => {
    keys.forEach((key) => {
      const result = lock.every((pin, index) => pin + key[index] <= maxLength);
      if (result) total++;
    });
  });

  return total;
}

// Solve time: 22 minutes and 6 seconds

const turnArray = (array: string[][]) => {
  const newArray: string[][] = [];

  array.forEach((line, y) => {
    line.forEach((column, x) => {
      if (!newArray[x]) newArray[x] = [];
      newArray[x][y] = column;
    });
  });

  return newArray;
};

const invertArray = (array: string[]) => {
  const newArray: string[] = [];

  for (let i = array.length - 1; i >= 0; i--) {
    newArray[array.length - 1 - i] = array[i];
  }

  return newArray;
};
