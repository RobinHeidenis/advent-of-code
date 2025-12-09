import { type Coordinate3D } from "~/lib/grid";

export default async function part1(input: string[]) {
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

  // check min for test case
  for (let k = 0; k < Math.min(1000, edges.length); k++) {
    const [a, b] = edges[k];
    merge(a, b);
  }

  const sizes: number[] = new Array(boxesAmount).fill(0);

  for (let boxIndex = 0; boxIndex < boxesAmount; boxIndex++) {
    const groupRoot = root(boxIndex);
    sizes[groupRoot]++;
  }

  const groupSizes = sizes.filter((size) => size > 0).toSorted((a, b) => b - a);

  return groupSizes[0] * groupSizes[1] * groupSizes[2];
}

// Solve time: 34 minutes and 14 seconds

export const calculateEuclideanDistance3D = (
  p1: Coordinate3D,
  p2: Coordinate3D,
): number => {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const dz = p2.z - p1.z;

  const result = Math.sqrt(dx * dx + dy * dy + dz * dz);

  return result;
};
