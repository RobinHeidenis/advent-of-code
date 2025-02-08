import { Grid } from "~/lib/grid";

export default async function part1(input: string[]) {
  const screen = calculateEndScreen(input);
  return screen.getGrid().flat().filter(Boolean).length;
}

// Solve time: 16 minutes and 25 seconds

export const calculateEndScreen = (input: string[]) => {
  const screen = new Grid();

  for (let x = 0; x < 50; x++) {
    for (let y = 0; y < 6; y++) {
      screen.set({ x, y }, false);
    }
  }

  input.forEach((line) => {
    if (line.startsWith("rect")) {
      const [targetX, targetY] = line.split(" ")[1].split("x").map(Number);
      for (let x = 0; x < targetX; x++) {
        for (let y = 0; y < targetY; y++) {
          screen.set({ x, y }, true);
        }
      }
    } else if (line.startsWith("rotate column")) {
      const [x, shift] = line.match(/\d+/g)!.map(Number);
      const column = screen.getGrid().map((row) => row[x]);
      for (let i = 0; i < column.length; i++) {
        const y = (i + shift) % column.length;
        screen.set({ x, y }, column[i]);
      }
    } else if (line.startsWith("rotate row")) {
      const [y, shift] = line.match(/\d+/g)!.map(Number);
      const row = screen.getGrid()[y].slice();
      for (let i = 0; i < row.length; i++) {
        const x = (i + shift) % row.length;
        screen.set({ x, y }, row[i]);
      }
    }
  });

  return screen;
};
