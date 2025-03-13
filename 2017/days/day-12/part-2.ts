import { parseInput } from "./part-1";

export default async function part2(input: string[]) {
  const pipeMap = parseInput(input);

  let groups = 0;

  const groupCandidates = new Map(pipeMap.entries());

  while (groupCandidates.size > 0) {
    const visited = new Set<number>();
    const toVisit = [groupCandidates.keys().next().value];

    while (toVisit.length > 0) {
      const current = toVisit.shift()!;
      const connections = pipeMap.get(current)!;

      if (visited.has(current)) {
        continue;
      }

      visited.add(current);

      toVisit.push(...connections);
    }

    groups++;

    visited.forEach((pipe) => {
      groupCandidates.delete(pipe);
    });
  }

  return groups;
}

// Solve time: 2 minutes and 43 seconds
// Total solve time: 5 minutes and 19 seconds
