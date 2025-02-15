type Item = {
  element: string;
  isGenerator: boolean;
};

type State = {
  elevator: number;
  floors: Item[][];
};

export default async function part1(input: string[]) {
  const floors: Item[][] = [];

  for (const line of input) {
    const floor: Item[] = [];

    // Use regex to find all elements and their types
    const generatorRegex = /(\w+) generator/g;
    const microchipRegex = /(\w+)-compatible microchip/g;

    // Find all solve
    let match;
    while ((match = generatorRegex.exec(line)) !== null) {
      floor.push({
        element: match[1],
        isGenerator: true,
      });
    }

    // Find all microchips
    while ((match = microchipRegex.exec(line)) !== null) {
      floor.push({
        element: match[1],
        isGenerator: false,
      });
    }

    floors.push(floor);
  }

  const initialState = {
    elevator: 0, // Start at first floor
    floors,
  };

  const queue: [State, number][] = [[initialState, 0]];
  const seen = new Set<string>();

  while (queue.length > 0) {
    const [state, moves] = queue.shift()!;
    const stateKey = getStateKey(state);

    if (seen.has(stateKey)) continue;
    seen.add(stateKey);

    // Check if all items are on top floor
    if (state.floors.slice(0, -1).every((floor) => floor.length === 0)) {
      return moves;
    }

    // Get all possible next states
    const nextStates = getValidMoves(state);
    for (const nextState of nextStates) {
      queue.push([nextState, moves + 1]);
    }
  }
  return -1;
}

// Solve time: 46 minutes and 29 seconds

const getValidMoves = (state: State): State[] => {
  const validMoves: State[] = [];
  const currentFloor = state.floors[state.elevator];

  // Get possible items to move (singles and pairs)
  const itemCombos: Item[][] = [];

  // Single items
  for (let i = 0; i < currentFloor.length; i++) {
    itemCombos.push([currentFloor[i]]);
  }

  // Pairs of items
  for (let i = 0; i < currentFloor.length; i++) {
    for (let j = i + 1; j < currentFloor.length; j++) {
      itemCombos.push([currentFloor[i], currentFloor[j]]);
    }
  }

  // Try moving up and down
  const possibleFloors = [];
  if (state.elevator < 3) possibleFloors.push(state.elevator + 1);
  if (state.elevator > 0) possibleFloors.push(state.elevator - 1);

  for (const newFloor of possibleFloors) {
    for (const items of itemCombos) {
      const newState: State = {
        elevator: newFloor,
        floors: state.floors.map((floor) => [...floor]),
      };

      // Remove items from current floor
      for (const item of items) {
        const index = newState.floors[state.elevator].findIndex(
          (i) =>
            i.element === item.element && i.isGenerator === item.isGenerator,
        );
        newState.floors[state.elevator].splice(index, 1);
      }

      // Add items to new floor
      newState.floors[newFloor].push(...items);

      if (isValidState(newState)) {
        validMoves.push(newState);
      }
    }
  }

  return validMoves;
};

const isValidState = (state: State): boolean => {
  return state.floors.every((floor) => {
    const generators = new Set(
      floor.filter((item) => item.isGenerator).map((item) => item.element),
    );

    // If no generators, floor is safe
    if (generators.size === 0) return true;

    // Check each chip
    return floor
      .filter((item) => !item.isGenerator)
      .every((chip) => generators.has(chip.element));
  });
};

const getStateKey = (state: State): string => {
  // Create a canonical representation of the state
  const floorStates = state.floors.map((floor) => {
    const pairs = new Set<string>();
    const loneGenerators = new Set<string>();
    const loneChips = new Set<string>();

    // Track paired and unpaired items
    floor.forEach((item) => {
      const hasPair = floor.some(
        (other) =>
          other.element === item.element &&
          other.isGenerator !== item.isGenerator,
      );

      if (hasPair) {
        pairs.add(item.element);
      } else if (item.isGenerator) {
        loneGenerators.add(item.element);
      } else {
        loneChips.add(item.element);
      }
    });

    return `P${[...pairs].sort().join("")}G${[...loneGenerators].sort().join("")}M${[...loneChips].sort().join("")}`;
  });

  return `E${state.elevator}:${floorStates.join("|")}`;
};
