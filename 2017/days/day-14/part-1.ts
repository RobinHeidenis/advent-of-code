import { Grid } from "~/lib/grid";
import generateHash from "../day-10/part-2";

export default async function part1(input: string[]) {
  const key = input[0];

  const grid = await generateGrid(key);

  return grid.getGrid().flat().filter(Boolean).length;
}

// Solve time: 3 minutes and 20 seconds

export const generateGrid = async (key: string) => {
  const grid = new Grid();

  for (let i = 0; i < 128; i++) {
    const hash = await generateHash([`${key}-${i}`]);

    for (let j = 0; j < hash.length; j++) {
      const binary = parseInt(hash[j], 16).toString(2).padStart(4, "0");

      for (let k = 0; k < binary.length; k++) {
        if (binary[k] === "1") {
          grid.set({ y: i, x: j * 4 + k }, true);
        }
      }
    }
  }

  return grid;
};
