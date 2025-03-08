interface Program {
  name: string;
  weight: number;
  children: string[];
  parent: string | null;
  totalWeight?: number;
}

export default async function part2(input: string[]) {
  const programs = parseInput(input);
  assignParents(programs);

  programs.forEach((program) => {
    calculateTotalWeight(programs, program.name);
  });

  return findUnbalanced(programs);
}

// Solve time: 22 minutes and 33 seconds
// Total solve time: 26 minutes and 13 seconds

function parseInput(input: string[]): Map<string, Program> {
  const programs = new Map<string, Program>();

  input.forEach((line) => {
    const parts = line.split(" -> ");
    const [nameWeight, ...children] = parts;
    const [name, weightStr] = nameWeight.split(" ");
    const weight = parseInt(weightStr.slice(1, -1));

    programs.set(name, {
      name,
      weight,
      children: children.length > 0 ? children[0].split(", ") : [],
      parent: null,
    });
  });

  return programs;
}

function assignParents(programs: Map<string, Program>): void {
  programs.forEach((program) => {
    program.children.forEach((childName) => {
      const child = programs.get(childName);
      if (child) {
        child.parent = program.name;
      }
    });
  });
}

function calculateTotalWeight(
  programs: Map<string, Program>,
  programName: string,
): number {
  const program = programs.get(programName);
  if (!program) {
    return 0;
  }

  if (program.totalWeight !== undefined) {
    return program.totalWeight;
  }

  let totalWeight = program.weight;
  program.children.forEach((childName) => {
    totalWeight += calculateTotalWeight(programs, childName);
  });

  program.totalWeight = totalWeight;
  return totalWeight;
}

function findUnbalanced(programs: Map<string, Program>): number {
  let unbalancedProgram: Program | null = null;
  let correctWeight = 0;

  programs.forEach((program) => {
    if (program.children.length > 0) {
      const childWeights: { [weight: number]: string[] } = {};
      program.children.forEach((childName) => {
        const childWeight = calculateTotalWeight(programs, childName);
        if (!childWeights[childWeight]) {
          childWeights[childWeight] = [];
        }
        childWeights[childWeight].push(childName);
      });

      const weights = Object.keys(childWeights).map(Number);
      if (weights.length > 1) {
        let unbalancedWeight = 0;
        let balancedWeight = 0;

        if (childWeights[weights[0]].length === 1) {
          unbalancedWeight = weights[0];
          balancedWeight = weights[1];
        } else {
          unbalancedWeight = weights[1];
          balancedWeight = weights[0];
        }

        unbalancedProgram = programs.get(childWeights[unbalancedWeight][0])!;
        correctWeight =
          unbalancedProgram.weight + (balancedWeight - unbalancedWeight);
      }
    }
  });

  if (unbalancedProgram) {
    return correctWeight;
  }

  return 0;
}
