import { calculateEndScreen } from "./part-1";

export default async function part2(input: string[]) {
  const screen = calculateEndScreen(input);

  const string = `\n${screen
    .getGrid()
    .map((row) => row.map((cell) => (cell ? "#" : " ")).join(""))
    .join("\n")}`;
  return string;
}

// Solve time: 38 seconds
// Total solve time: 17 minutes and 3 seconds
