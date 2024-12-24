import { Graph } from "./shared";

export default async function part2(input: string[]) {
  const graph = new Graph2();

  input.forEach((line) => {
    const [node1, node2] = line.split("-");
    graph.addEdge(node1, node2);
  });

  return Array.from(graph.findLargestClique()).sort().join(",");
}

// Solve time: 9 minutes and 1 second
// Total solve time: 24 minutes and 44 seconds

class Graph2 extends Graph {
  private findCliques(
    R: Set<string>,
    P: Set<string>,
    X: Set<string>,
    cliques: Set<Set<string>>,
  ): void {
    if (P.size === 0 && X.size === 0) {
      // Found a maximal clique
      cliques.add(new Set(R));
      return;
    }

    const PArray = Array.from(P);
    for (const v of PArray) {
      const neighbors = this.getNeighbors(v);

      const newR = new Set(R).add(v);
      const newP = new Set([...P].filter((node) => neighbors.has(node)));
      const newX = new Set([...X].filter((node) => neighbors.has(node)));

      this.findCliques(newR, newP, newX, cliques);

      P.delete(v);
      X.add(v);
    }
  }

  public findLargestClique(): Set<string> {
    const cliques = new Set<Set<string>>();
    this.findCliques(new Set(), new Set(this.nodes), new Set(), cliques);

    let largestClique = new Set<string>();
    for (const clique of cliques) {
      if (clique.size > largestClique.size) {
        largestClique = clique;
      }
    }

    return largestClique;
  }
}
