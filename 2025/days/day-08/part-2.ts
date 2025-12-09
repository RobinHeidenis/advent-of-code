import type { Coordinate3D } from "~/lib/grid";
import { calculateEuclideanDistance3D } from "./part-1";

export default async function part2(input: string[]) {
  const junctionBoxes: Coordinate3D[] = [];

  input.forEach((line) => {
    const [x, y, z] = line.split(",").map(Number);

    junctionBoxes.push({
      x: x,
      y: y,
      z: z,
    });
  });

  const boxesAmount = junctionBoxes.length;

  type Edge = [number, number]; // Tuple of indices [i, j]
  const edges: Edge[] = [];

  for (let i = 0; i < boxesAmount; i++) {
    for (let j = i + 1; j < boxesAmount; j++) {
      edges.push([i, j]);
    }
  }

  edges.sort((a, b) => {
    const distA = calculateEuclideanDistance3D(
      junctionBoxes[a[0]],
      junctionBoxes[a[1]],
    );
    const distB = calculateEuclideanDistance3D(
      junctionBoxes[b[0]],
      junctionBoxes[b[1]],
    );
    return distA - distB;
  });

  const parent = Array.from({ length: boxesAmount }, (_, i) => i);

  const root = (index: number): number => {
    if (parent[index] === index) {
      return index;
    }

    parent[index] = root(parent[index]);
    return parent[index];
  };

  const merge = (a: number, b: number): void => {
    const rootA = root(a);
    const rootB = root(b);
    if (rootA !== rootB) {
      parent[rootA] = rootB; // Merge by setting one root's parent to the other root
    }
  };

  let circuits = boxesAmount;

  for (const edge of edges) {
    const [a, b] = edge;

    if (root(a) === root(b)) {
      continue;
    }

    merge(a, b);
    circuits--;

    if (circuits === 1) {
      return junctionBoxes[a].x * junctionBoxes[b].x;
    }
  }
}

// Solve time: 10 minutes and 56 seconds
// Total solve time: 45 minutes and 10 seconds
