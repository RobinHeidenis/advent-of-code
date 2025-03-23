import { BooleanGrid, Grid, type Coordinate } from "~/lib/grid";

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

const states = {
  clean: ".",
  weakened: "W",
  infected: "#",
  flagged: "F",
};

const nextState = {
  [states.clean]: states.weakened,
  [states.weakened]: states.infected,
  [states.infected]: states.flagged,
  [states.flagged]: states.clean,
};

export default async function part2(input: string[]) {
  let total = 0;
  const grid = new Grid<(typeof states)[keyof typeof states]>();
  grid.setGrid(
    input.map((row) => row.split("") as (typeof states)[keyof typeof states][]),
  );

  const state = {
    x: Math.floor(grid.getXLength() / 2),
    y: Math.floor(grid.getYLength() / 2),
    direction: "up" as Direction,
  };

  const bursts = 10000000;
  for (let i = 0; i < bursts; i++) {
    const currentTile = grid.get({ x: state.x, y: state.y }) || states.clean;

    switch (currentTile) {
      case states.clean:
        state.direction = nextDirectionCounterClockwise[state.direction];
        break;
      case states.weakened:
        total++;
        break;
      case states.infected:
        state.direction = nextDirectionClockwise[state.direction];
        break;
      case states.flagged:
        state.direction =
          nextDirectionClockwise[nextDirectionClockwise[state.direction]];
        break;
    }

    grid.set({ x: state.x, y: state.y }, nextState[currentTile]);

    state.x += directions[state.direction].x;
    state.y += directions[state.direction].y;
  }

  return total;
}

// Solve time: 5 minutes and 17 seconds
// Total solve time: 12 minutes and 18 seconds
