import { BooleanGrid, type Coordinate } from "~/lib/grid";

type Direction = "up" | "right" | "down" | "left";

const directions: Record<Direction, Coordinate> = {
  up: { x: 0, y: -1 },
  right: { x: 1, y: 0 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
};

const nextDirectionClockwise: Record<Direction, Direction> = {
  up: "right",
  right: "down",
  down: "left",
  left: "up",
};

const nextDirectionCounterClockwise: Record<Direction, Direction> = {
  up: "left",
  left: "down",
  down: "right",
  right: "up",
};

export default async function part1(input: string[]) {
  let total = 0;
  const grid = new BooleanGrid();
  grid.import(input);

  const state = {
    x: Math.floor(grid.getXLength() / 2),
    y: Math.floor(grid.getYLength() / 2),
    direction: "up" as Direction,
  };

  const bursts = 10000;
  for (let i = 0; i < bursts; i++) {
    const currentTile = grid.get({ x: state.x, y: state.y }) || false;

    if (currentTile) {
      state.direction = nextDirectionClockwise[state.direction];
      grid.set({ x: state.x, y: state.y }, false);
    } else {
      state.direction = nextDirectionCounterClockwise[state.direction];
      grid.set({ x: state.x, y: state.y }, true);
      total++;
    }

    state.x += directions[state.direction].x;
    state.y += directions[state.direction].y;
  }

  return total;
}

// Solve time: 7 minutes
