import type { Coordinate } from "~/lib/grid";

interface PriorityQueueItem {
  state: State;
  priority: number;
}

interface State {
  emptyPos: Coordinate;
  goalPos: Coordinate;
  steps: number;
}

interface Node {
  position: Coordinate;
  size: number;
  used: number;
  available: number;
}

type StateKey = string;

export default async function part2(input: string[]) {
  const nodes: Node[] = [];

  input.forEach((line, index) => {
    if (index === 0 || index === 1) return;
    const [_, x, y, size, used, available] = line.match(
      /\/dev\/grid\/node-x(\d+)-y(\d+)\s+(\d+)T\s+(\d+)T\s+(\d+)T\s+(\d+)%/,
    )!;

    nodes.push({
      position: { x: Number(x), y: Number(y) },
      size: Number(size),
      used: Number(used),
      available: Number(available),
    });
  });

  const maxX = Math.max(...nodes.map((n) => n.position.x));
  const maxY = Math.max(...nodes.map((n) => n.position.y));
  const emptyNode = nodes.find((n) => n.used === 0)!;
  const goalPos = { x: maxX, y: 0 };
  const targetPos = { x: 0, y: 0 };

  const grid: boolean[][] = Array(maxY + 1)
    .fill(0)
    .map(() => Array(maxX + 1).fill(true)); // true means walkable

  nodes.forEach((node) => {
    const isWall = node.used > 100;
    if (isWall) {
      grid[node.position.y][node.position.x] = false; // false means wall
    }
  });

  const initialState: State = {
    emptyPos: { x: emptyNode.position.x, y: emptyNode.position.y },
    goalPos: goalPos,
    steps: 0,
  };

  const getStateKey = (state: State): StateKey => {
    return `${state.emptyPos.x},${state.emptyPos.y},${state.goalPos.x},${state.goalPos.y}`;
  };

  const queue: PriorityQueueItem[] = [
    { state: initialState, priority: heuristic(initialState, targetPos) },
  ];
  const visited = new Set<StateKey>();
  visited.add(getStateKey(initialState));

  const dequeueLowestPriority = (): PriorityQueueItem => {
    let lowestIndex = 0;
    for (let i = 1; i < queue.length; i++) {
      if (queue[i].priority < queue[lowestIndex].priority) {
        lowestIndex = i;
      }
    }
    return queue.splice(lowestIndex, 1)[0];
  };

  while (queue.length > 0) {
    const { state } = dequeueLowestPriority();
    const { goalPos, steps } = state;

    if (goalPos.x === targetPos.x && goalPos.y === targetPos.y) {
      return steps;
    }

    const nextStates = getNextStates(state, grid, maxX, maxY);

    for (const nextState of nextStates) {
      const stateKey = getStateKey(nextState);
      if (!visited.has(stateKey)) {
        visited.add(stateKey);
        const priority = nextState.steps + heuristic(nextState, targetPos);
        queue.push({ state: nextState, priority });
      }
    }
  }

  return "No solution found";
}

// Solve time: 34 minutes and 5 seconds
// Total solve time: 39 minutes and 20 seconds

const heuristic = (state: State, targetPos: Coordinate): number => {
  const goalToTarget =
    Math.abs(state.goalPos.x - targetPos.x) +
    Math.abs(state.goalPos.y - targetPos.y);

  const isGoalAndEmptyAdjacent =
    Math.abs(state.goalPos.x - state.emptyPos.x) +
      Math.abs(state.goalPos.y - state.emptyPos.y) ===
    1;

  const emptyToGoal = isGoalAndEmptyAdjacent
    ? 0
    : Math.abs(state.emptyPos.x - state.goalPos.x) +
      Math.abs(state.emptyPos.y - state.goalPos.y) -
      1;

  return goalToTarget + emptyToGoal;
};

const getNextStates = (
  state: State,
  grid: boolean[][],
  maxX: number,
  maxY: number,
): State[] => {
  const { emptyPos, goalPos, steps } = state;
  const nextStates: State[] = [];

  const moves = [
    { x: 0, y: -1 },
    { x: 0, y: 1 },
    { x: -1, y: 0 },
    { x: 1, y: 0 },
  ];

  for (const move of moves) {
    const newEmptyX = emptyPos.x + move.x;
    const newEmptyY = emptyPos.y + move.y;

    if (
      newEmptyX >= 0 &&
      newEmptyX <= maxX &&
      newEmptyY >= 0 &&
      newEmptyY <= maxY &&
      grid[newEmptyY][newEmptyX] // Not a wall
    ) {
      if (newEmptyX === goalPos.x && newEmptyY === goalPos.y) {
        nextStates.push({
          emptyPos: { x: goalPos.x, y: goalPos.y },
          goalPos: { x: emptyPos.x, y: emptyPos.y },
          steps: steps + 1,
        });
      } else {
        nextStates.push({
          emptyPos: { x: newEmptyX, y: newEmptyY },
          goalPos: goalPos,
          steps: steps + 1,
        });
      }
    }
  }

  return nextStates;
};
