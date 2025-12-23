interface Machine {
  indicatorLights: boolean[];
  buttonWiring: number[][];
  joltageRequirements: number[];
}

export default async function part2(input: string[]) {
  const machines = input.map((line) => {
    const lightsMatch = line.match(/\[([.#]+)\]/);
    const indicatorLights = lightsMatch
      ? lightsMatch[1].split("").map((item) => item === "#")
      : [];

    const buttonWiring = Array.from(line.matchAll(/\(([0-9,]+)\)/g))
      .map((match) => match[1] ?? "")
      .map((segment) => segment.split(",").map((value) => parseInt(value, 10)));

    const joltageMatch = line.match(/\{([0-9,]+)\}/);
    const joltageRequirements = joltageMatch
      ? joltageMatch[1].split(",").map((value) => parseInt(value, 10))
      : [];

    return {
      indicatorLights,
      buttonWiring,
      joltageRequirements,
    } as Machine;
  });

  let totalPresses = 0;

  for (const machine of machines) {
    totalPresses += findMinimumJoltagePresses(machine);
  }

  return totalPresses;
}

// Solve time: 2 hours, 21 minutes, and 45 seconds
// Total solve time: 2 hours, 48 minutes, and 33 seconds

const findMinimumJoltagePresses = (machine: Machine): number => {
  const requirementsCount = machine.joltageRequirements.length;
  const buttonsCount = machine.buttonWiring.length;

  const coefficientMatrix: number[][] = Array.from(
    { length: requirementsCount },
    () => Array(buttonsCount).fill(0),
  );
  const buttonPressLimits = new Array(buttonsCount).fill(Infinity);

  for (let buttonIndex = 0; buttonIndex < buttonsCount; buttonIndex++) {
    const wireRequirements = machine.buttonWiring[buttonIndex];

    if (wireRequirements && wireRequirements.length > 0) {
      for (const requirementIndex of wireRequirements) {
        if (requirementIndex < requirementsCount) {
          coefficientMatrix[requirementIndex][buttonIndex] = 1;
          buttonPressLimits[buttonIndex] = Math.min(
            buttonPressLimits[buttonIndex],
            machine.joltageRequirements[requirementIndex],
          );
        }
      }
    } else {
      buttonPressLimits[buttonIndex] = 0;
    }
  }

  for (let buttonIndex = 0; buttonIndex < buttonsCount; buttonIndex++) {
    if (buttonPressLimits[buttonIndex] === Infinity) {
      buttonPressLimits[buttonIndex] = 0;
    }
  }

  return solveRestrictedSystem(
    coefficientMatrix,
    [...machine.joltageRequirements],
    buttonPressLimits,
    buttonsCount,
    requirementsCount,
  );
};

const solveRestrictedSystem = (
  initialGrid: number[][],
  targetValues: number[],
  pressBounds: number[],
  numberOfColumns: number,
  numberOfRows: number,
): number => {
  const workingGrid = initialGrid.map((row) => [...row]);
  const rightHandSide = [...targetValues];

  const pivotColumnIndices: number[] = [];
  const columnToPivotRowMap = new Map<number, number>();
  let currentPivotRow = 0;

  for (
    let column = 0;
    column < numberOfColumns && currentPivotRow < numberOfRows;
    column++
  ) {
    let selectedRow = currentPivotRow;
    while (
      selectedRow < numberOfRows &&
      Math.abs(workingGrid[selectedRow][column]) < 1e-9
    ) {
      selectedRow++;
    }

    if (selectedRow === numberOfRows) continue;

    [workingGrid[currentPivotRow], workingGrid[selectedRow]] = [
      workingGrid[selectedRow],
      workingGrid[currentPivotRow],
    ];
    [rightHandSide[currentPivotRow], rightHandSide[selectedRow]] = [
      rightHandSide[selectedRow],
      rightHandSide[currentPivotRow],
    ];

    const pivotValue = workingGrid[currentPivotRow][column];
    for (let colIndex = column; colIndex < numberOfColumns; colIndex++) {
      workingGrid[currentPivotRow][colIndex] /= pivotValue;
    }
    rightHandSide[currentPivotRow] /= pivotValue;

    for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
      if (rowIndex === currentPivotRow) continue;

      const eliminationFactor = workingGrid[rowIndex][column];
      if (Math.abs(eliminationFactor) > 1e-9) {
        for (let colIndex = column; colIndex < numberOfColumns; colIndex++) {
          workingGrid[rowIndex][colIndex] -=
            eliminationFactor * workingGrid[currentPivotRow][colIndex];
        }
        rightHandSide[rowIndex] -=
          eliminationFactor * rightHandSide[currentPivotRow];
      }
    }

    pivotColumnIndices.push(column);
    columnToPivotRowMap.set(column, currentPivotRow);
    currentPivotRow++;
  }

  const pivotSet = new Set(pivotColumnIndices);
  const freeVariableIndices: number[] = [];
  for (let colIndex = 0; colIndex < numberOfColumns; colIndex++) {
    if (!pivotSet.has(colIndex)) {
      freeVariableIndices.push(colIndex);
    }
  }

  for (let rowIndex = currentPivotRow; rowIndex < numberOfRows; rowIndex++) {
    if (Math.abs(rightHandSide[rowIndex]) > 1e-4) return 0;
  }

  let bestSolutionCost = Infinity;
  const currentSolution = new Array(numberOfColumns).fill(0);

  const performBacktrackingSearch = (
    freeVarIdx: number,
    currentCost: number,
  ) => {
    if (currentCost >= bestSolutionCost) return;

    if (freeVarIdx === freeVariableIndices.length) {
      let totalPresses = currentCost;
      let isValidSolution = true;

      for (let i = pivotColumnIndices.length - 1; i >= 0; i--) {
        const column = pivotColumnIndices[i];
        const row = columnToPivotRowMap.get(column)!;

        let calculatedValue = rightHandSide[row];
        for (
          let colIndex = column + 1;
          colIndex < numberOfColumns;
          colIndex++
        ) {
          if (Math.abs(workingGrid[row][colIndex]) > 1e-9) {
            calculatedValue -=
              workingGrid[row][colIndex] * currentSolution[colIndex];
          }
        }

        if (Math.abs(calculatedValue - Math.round(calculatedValue)) > 1e-4) {
          isValidSolution = false;
          break;
        }

        const roundedValue = Math.round(calculatedValue);
        if (roundedValue < 0 || roundedValue > pressBounds[column]) {
          isValidSolution = false;
          break;
        }

        currentSolution[column] = roundedValue;
        totalPresses += roundedValue;

        if (totalPresses >= bestSolutionCost) {
          isValidSolution = false;
          break;
        }
      }

      if (isValidSolution) {
        bestSolutionCost = totalPresses;
      }
      return;
    }

    const variableIndex = freeVariableIndices[freeVarIdx];
    const maxLimit = pressBounds[variableIndex];

    for (let pressCount = 0; pressCount <= maxLimit; pressCount++) {
      currentSolution[variableIndex] = pressCount;
      performBacktrackingSearch(freeVarIdx + 1, currentCost + pressCount);
    }
  };

  performBacktrackingSearch(0, 0);
  return bestSolutionCost === Infinity ? 0 : bestSolutionCost;
};
