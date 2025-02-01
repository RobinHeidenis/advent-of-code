import type { Coordinate } from "~/lib/grid";

const directions = ["N", "E", "S", "W"] as const;

type Direction = (typeof directions)[number];

export default async function part1(input: string[]) {
  const state: Coordinate & { direction: Direction } = {
    x: 0,
    y: 0,
    direction: "N",
  };
  input[0].split(", ").forEach((instruction) => {
    const turn = instruction[0];
    const blocks = Number(instruction.slice(1));

    const currentIndex = directions.indexOf(state.direction);
    if (turn === "R") {
      state.direction = directions[(currentIndex + 1) % 4];
    } else if (turn === "L") {
      state.direction = directions[(currentIndex - 1 + 4) % 4];
    }

    switch (state.direction) {
      case "N":
        state.y -= blocks;
        break;
      case "E":
        state.x += blocks;
        break;
      case "S":
        state.y += blocks;
        break;
      case "W":
        state.x -= blocks;
        break;
    }
  });

  return Math.abs(state.x) + Math.abs(state.y);
}

// Solve time: 17 minutes and 27 seconds
