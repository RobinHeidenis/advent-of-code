export default async function part1(input: string[]) {
  const rules = parseRules(input);

  let pattern = [
    [".", "#", "."],
    [".", ".", "#"],
    ["#", "#", "#"],
  ];

  for (let i = 0; i < 5; i++) {
    pattern = enhance(pattern, rules);
  }

  let total = 0;
  for (let y = 0; y < pattern.length; y++) {
    for (let x = 0; x < pattern[y].length; x++) {
      if (pattern[y][x] === "#") {
        total++;
      }
    }
  }
  return total;
}

// Solve time: 21 minutes and 5 seconds

export const parseRules = (input: string[]): Map<string, string[][]> => {
  const rules = new Map<string, string[][]>();

  input.forEach((line) => {
    const [pattern, result] = line.split(" => ");
    const patternGrid = pattern.split("/").map((row) => row.split(""));
    const resultGrid = result.split("/").map((row) => row.split(""));

    const orientations = getAllOrientations(patternGrid);
    orientations.forEach((orientation) => {
      rules.set(orientation.map((row) => row.join("")).join("/"), resultGrid);
    });
  });

  return rules;
};

const getAllOrientations = (pattern: string[][]): string[][][] => {
  const orientations: string[][][] = [];
  let current = pattern;

  for (let i = 0; i < 4; i++) {
    orientations.push(current);
    current = rotate(current);
  }

  current = flip(pattern);
  for (let i = 0; i < 4; i++) {
    orientations.push(current);
    current = rotate(current);
  }

  return orientations;
};

const rotate = (pattern: string[][]): string[][] => {
  const size = pattern.length;
  const rotated: string[][] = Array(size)
    .fill(0)
    .map(() => Array(size).fill(""));

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      rotated[j][size - 1 - i] = pattern[i][j];
    }
  }

  return rotated;
};

const flip = (pattern: string[][]): string[][] => {
  return pattern.map((row) => [...row].reverse());
};

export const enhance = (
  pattern: string[][],
  rules: Map<string, string[][]>,
): string[][] => {
  const size = pattern.length;
  const blockSize = size % 2 === 0 ? 2 : 3;
  const blocksPerSide = size / blockSize;
  const newBlockSize = blockSize === 2 ? 3 : 4;
  const newSize = blocksPerSide * newBlockSize;

  const newPattern: string[][] = Array(newSize)
    .fill(0)
    .map(() => Array(newSize).fill(""));

  for (let blockY = 0; blockY < blocksPerSide; blockY++) {
    for (let blockX = 0; blockX < blocksPerSide; blockX++) {
      const block: string[][] = [];
      for (let y = 0; y < blockSize; y++) {
        const row: string[] = [];
        for (let x = 0; x < blockSize; x++) {
          row.push(pattern[blockY * blockSize + y][blockX * blockSize + x]);
        }
        block.push(row);
      }

      const blockKey = block.map((row) => row.join("")).join("/");
      const enhancedBlock = rules.get(blockKey);

      if (!enhancedBlock) {
        throw new Error(`No rule found for pattern: ${blockKey}`);
      }

      for (let y = 0; y < newBlockSize; y++) {
        for (let x = 0; x < newBlockSize; x++) {
          newPattern[blockY * newBlockSize + y][blockX * newBlockSize + x] =
            enhancedBlock[y][x];
        }
      }
    }
  }

  return newPattern;
};
