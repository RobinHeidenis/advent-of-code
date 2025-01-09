import { Graph } from "~/lib/graph";

export default async function part1(input: string[]) {
  const graph = new Graph<string>();

  input.forEach((line) => {
    const [to, _, from, __, weight] = line.split(" ");

    graph.addEdge(to, from, Number(weight));
  });

  return graph.findShortestPath().distance;
}

// Solve time: 9 minutes and 50 seconds
