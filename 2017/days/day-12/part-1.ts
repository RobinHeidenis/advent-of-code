export default async function part1(input: string[]) {
  const pipeMap = parseInput(input);

  const visited = new Set<number>();
  const toVisit = [0];

  while (toVisit.length > 0) {
    const current = toVisit.shift()!;
    const connections = pipeMap.get(current)!;

    if (visited.has(current)) {
      continue;
    }

    visited.add(current);

    toVisit.push(...connections);
  }

  return visited.size;
}

// Solve time: 2 minutes and 36 seconds

export const parseInput = (input: string[]) => {
  const pipeMap = new Map<number, number[]>();

  input.forEach((line) => {
    const [pipe, connections] = line.split(" <-> ");

    const connectionsArray = connections.split(", ").map(Number);

    pipeMap.set(Number(pipe), connectionsArray);
  });

  return pipeMap;
};
