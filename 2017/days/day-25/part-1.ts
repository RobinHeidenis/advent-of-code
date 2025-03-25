interface State {
  writeValue: (currentValue: number) => number;
  moveDirection: (currentValue: number) => number;
  nextState: (currentValue: number) => string;
}

const simulateTuringMachine = (
  steps: number,
  initialState: string,
  states: Record<string, State>,
): number => {
  const tape: Map<number, number> = new Map();
  let currentPosition = 0;
  let currentState = initialState;

  const getCurrentValue = () => tape.get(currentPosition) ?? 0;
  const writeValue = (value: number) => tape.set(currentPosition, value);

  for (let i = 0; i < steps; i++) {
    const currentValue = getCurrentValue();
    const state = states[currentState];

    writeValue(state.writeValue(currentValue));

    currentPosition += state.moveDirection(currentValue);

    currentState = state.nextState(currentValue);
  }

  return Array.from(tape.values()).filter((value) => value === 1).length;
};

export default function part1(_input: string) {
  const states: Record<string, State> = {
    A: {
      writeValue: (currentValue) => (currentValue === 0 ? 1 : 0),
      moveDirection: (currentValue) => (currentValue === 0 ? 1 : -1),
      nextState: (currentValue) => (currentValue === 0 ? "B" : "C"),
    },
    B: {
      writeValue: (currentValue) => (currentValue === 0 ? 1 : 1),
      moveDirection: (currentValue) => (currentValue === 0 ? -1 : -1),
      nextState: (currentValue) => (currentValue === 0 ? "A" : "D"),
    },
    C: {
      writeValue: (currentValue) => (currentValue === 0 ? 1 : 0),
      moveDirection: (currentValue) => (currentValue === 0 ? 1 : 1),
      nextState: (currentValue) => (currentValue === 0 ? "D" : "C"),
    },
    D: {
      writeValue: (currentValue) => (currentValue === 0 ? 0 : 0),
      moveDirection: (currentValue) => (currentValue === 0 ? -1 : 1),
      nextState: (currentValue) => (currentValue === 0 ? "B" : "E"),
    },
    E: {
      writeValue: (currentValue) => (currentValue === 0 ? 1 : 1),
      moveDirection: (currentValue) => (currentValue === 0 ? 1 : -1),
      nextState: (currentValue) => (currentValue === 0 ? "C" : "F"),
    },
    F: {
      writeValue: (currentValue) => (currentValue === 0 ? 1 : 1),
      moveDirection: (currentValue) => (currentValue === 0 ? -1 : 1),
      nextState: (currentValue) => (currentValue === 0 ? "E" : "A"),
    },
  };

  return simulateTuringMachine(12656374, "A", states);
}

// Solve time: 22 minutes and 41 seconds
