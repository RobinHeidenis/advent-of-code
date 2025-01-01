import { Graph } from "./shared";

export default async function part1(input: string[]) {
  const graph = new Graph();

  input.forEach((line) => {
    const [node1, node2] = line.split("-");
    graph.addEdge(node1, node2);
  });

  return Array.from(graph.findTriangles()).filter((triangle) =>
    triangle.split("-").some((node) => node.startsWith("t")),
  ).length;
}

// Solve time: 15 minutes and 42 seconds
// Note: Claude helped me with the graph implementation, as I didn't know a lot yet about graph theory.

