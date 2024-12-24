// Note: Claude helped me with this graph implementation, as I didn't know a lot yet about graph theory.
export class Graph {
  protected nodes: Set<string>;
  protected adjacencyList: Map<string, Set<string>>;

  constructor() {
    this.nodes = new Set();
    this.adjacencyList = new Map();
  }

  public addNode(node: string): void {
    if (!this.nodes.has(node)) {
      this.nodes.add(node);
      this.adjacencyList.set(node, new Set());
    }
  }

  public addEdge(node1: string, node2: string): void {
    // Add nodes if they don't exist
    this.addNode(node1);
    this.addNode(node2);

    // Add bidirectional connection
    this.adjacencyList.get(node1)!.add(node2);
    this.adjacencyList.get(node2)!.add(node1);
  }

  public getAdjacencyList(): Map<string, Set<string>> {
    return this.adjacencyList;
  }

  getNeighbors(node: string): Set<string> {
    return this.adjacencyList.get(node) || new Set();
  }

  findTriangles(): Set<string> {
    const triangles = new Set<string>();

    for (const nodeA of this.nodes) {
      const neighborsA = this.getNeighbors(nodeA);

      for (const nodeB of neighborsA) {
        if (nodeB < nodeA) continue;

        const neighborsB = this.getNeighbors(nodeB);

        for (const nodeC of neighborsB) {
          if (nodeC < nodeB || nodeC === nodeA) continue;

          if (this.getNeighbors(nodeC).has(nodeA)) {
            const triangle = [nodeA, nodeB, nodeC].sort().join("-");
            triangles.add(triangle);
          }
        }
      }
    }

    return triangles;
  }
}
