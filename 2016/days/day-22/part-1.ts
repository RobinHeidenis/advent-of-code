import type { Coordinate } from "~/lib/grid";

export default async function part1(input: string[]) {
  const nodes: {
    position: Coordinate;
    size: number;
    used: number;
    available: number;
  }[] = [];

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

  let total = 0;

  for (const nodeA of nodes) {
    for (const nodeB of nodes) {
      if (nodeA === nodeB) continue; // We can't compare to ourselves
      if (nodeA.used === 0) continue;
      if (nodeA.used <= nodeB.available) {
        total++;
      }
    }
  }

  return total;
}

// Solve time: 5 minutes and 15 seconds
