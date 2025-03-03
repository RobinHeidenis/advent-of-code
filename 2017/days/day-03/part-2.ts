import { sumArray } from "~/lib/array";
import { Grid, type Coordinate } from "~/lib/grid";

export default async function part2(input: string[]) {
  const target = Number(input[0]);
  const grid = new Grid<number>();

  // Start with value 1 at the center
  grid.set({ x: 0, y: 0 }, 1);

  // Define the spiral movement pattern
  // We'll move in a spiral: right, up, left, left, down, down, right, right, right, up, up, up...
  const directions = [
    { x: 1, y: 0 }, // right
    { x: 0, y: 1 }, // up
    { x: -1, y: 0 }, // left
    { x: 0, y: -1 }, // down
  ];

  let position: Coordinate = { x: 0, y: 0 };
  let directionIndex = 0;
  let stepsInCurrentDirection = 0;
  let stepsBeforeDirectionChange = 1;
  let directionChangesInSameStepCount = 0;

  while (true) {
    // Move to next position
    position = {
      x: position.x + directions[directionIndex].x,
      y: position.y + directions[directionIndex].y,
    };

    // Calculate new value (sum of all surrounding values)
    const surroundingValues = grid.getSurrounding(position).filter(Boolean);
    const nextValue = sumArray(surroundingValues);

    // Set the value in the grid
    grid.set(position, nextValue);

    // Check if we found our answer
    if (nextValue > target) {
      return nextValue;
    }

    // Update direction logic
    stepsInCurrentDirection++;

    // Check if we need to change direction
    if (stepsInCurrentDirection === stepsBeforeDirectionChange) {
      directionIndex = (directionIndex + 1) % 4;
      stepsInCurrentDirection = 0;
      directionChangesInSameStepCount++;

      // Increase steps after we've turned twice in the same step count
      if (directionChangesInSameStepCount === 2) {
        stepsBeforeDirectionChange++;
        directionChangesInSameStepCount = 0;
      }
    }
  }
}

// Solve time: 18 minutes and 49 seconds
// Total solve time: 22 minutes and 25 seconds
