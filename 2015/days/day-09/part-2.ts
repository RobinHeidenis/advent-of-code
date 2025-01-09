import { Graph } from "~/lib/graph";

export default async function part2(input: string[]) {
  const graph = new Graph<string>();

  input.forEach((line) => {
    const [to, _, from, __, weight] = line.split(" ");

    graph.addEdge(to, from, Number(weight));
  });

  return graph.findLongestPath().distance;
}

// Solve time: 6 minutes and 58 seconds
// Total solve time: 16 minutes and 49 seconds
