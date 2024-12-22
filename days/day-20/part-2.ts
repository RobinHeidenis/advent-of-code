export default async function part2(input: string[]) {
  console.log(input.length);
  const grid = input.map((line) => line.split(""));

  const rows = grid.length;
  const cols = grid[0].length;

  let startRow = 0;
  let startCol = 0;

  // Find the starting point 'S'
  outer: for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === "S") {
        startRow = r;
        startCol = c;
        break outer;
      }
    }
  }

  const dists: number[][] = Array.from({ length: rows }, () =>
    Array(cols).fill(-1),
  );
  dists[startRow][startCol] = 0;

  let r = startRow;
  let c = startCol;

  // BFS to calculate distances
  while (grid[r][c] !== "E") {
    for (const [nr, nc] of [
      [r + 1, c],
      [r - 1, c],
      [r, c + 1],
      [r, c - 1],
    ]) {
      if (nr < 0 || nc < 0 || nr >= rows || nc >= cols) continue;
      if (grid[nr][nc] === "#") continue;
      if (dists[nr][nc] !== -1) continue;
      dists[nr][nc] = dists[r][c] + 1;
      r = nr;
      c = nc;
    }
  }

  let count = 0;

  // Count based on the given conditions
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === "#") continue;
      for (let radius = 2; radius <= 20; radius++) {
        for (let dr = 0; dr <= radius; dr++) {
          const dc = radius - dr;
          for (const [nr, nc] of [
            [r + dr, c + dc],
            [r + dr, c - dc],
            [r - dr, c + dc],
            [r - dr, c - dc],
          ]) {
            if (nr < 0 || nc < 0 || nr >= rows || nc >= cols) continue;
            if (grid[nr][nc] === "#") continue;
            if (dists[r][c] - dists[nr][nc] >= 100 + radius) count++;
          }
        }
      }
    }
  }

  return count;
}
