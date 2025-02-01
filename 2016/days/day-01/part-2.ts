import type { Coordinate } from "~/lib/grid";

const directions = ["N", "E", "S", "W"] as const;

type Direction = (typeof directions)[number];

export default async function part2(input: string[]) {
  const state: Coordinate & { direction: Direction } = {
    x: 0,
    y: 0,
    direction: "N",
  };

  const visited = new Set<string>();
  for (const instruction of input[0].split(", ")) {
    const turn = instruction[0];
    const blocks = Number(instruction.slice(1));

    const currentIndex = directions.indexOf(state.direction);
    if (turn === "R") {
      state.direction = directions[(currentIndex + 1) % 4];
    } else if (turn === "L") {
      state.direction = directions[(currentIndex - 1 + 4) % 4];
    }

    for (let i = 0; i < blocks; i++) {
      switch (state.direction) {
        case "N":
          state.y -= 1;
          break;
        case "E":
          state.x += 1;
          break;
        case "S":
          state.y += 1;
          break;
        case "W":
          state.x -= 1;
          break;
      }

      const key = `${state.x},${state.y}`;

      if (visited.has(key)) return Math.abs(state.x) + Math.abs(state.y);
      visited.add(`${state.x},${state.y}`);
    }
  }
}

// Solve time: 3 minutes and 35 seconds
// Total solve time: 21 minutes and 3 seconds
