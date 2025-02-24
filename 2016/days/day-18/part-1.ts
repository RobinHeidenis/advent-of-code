export default async function part1(input: string[]) {
  const numRows = 40;

  return calculateRows(numRows, input[0]);
}

// Solve time: 12 minutes and 11 seconds

export const calculateRows = (numRows: number, firstRow: string) => {
  const width = firstRow.length;
  const grid: string[][] = [[...firstRow]];

  for (let row = 1; row < numRows; row++) {
    const newRow: string[] = [];
    const prevRow = grid[row - 1];

    for (let col = 0; col < width; col++) {
      const left = col === 0 ? "." : prevRow[col - 1];
      const center = prevRow[col];
      const right = col === width - 1 ? "." : prevRow[col + 1];

      const isTrap =
        (left === "^" && center === "^" && right === ".") ||
        (left === "." && center === "^" && right === "^") ||
        (left === "^" && center === "." && right === ".") ||
        (left === "." && center === "." && right === "^");

      newRow.push(isTrap ? "^" : ".");
    }

    grid.push(newRow);
  }

  return grid.reduce(
    (total, line) =>
      total + line.reduce((total, c) => (c === "." ? total + 1 : total), 0),
    0,
  );
};
