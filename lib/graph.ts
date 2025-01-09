export class Graph<T> {
  private adjacencyList: Map<T, Map<T, number>>;

  constructor() {
    this.adjacencyList = new Map();
  }

  addNode(node: T): void {
    if (!this.adjacencyList.has(node)) {
      this.adjacencyList.set(node, new Map());
    }
  }

  addEdge(from: T, to: T, weight: number): void {
    // Add nodes if they don't exist
    this.addNode(from);
    this.addNode(to);

    // Add edges
    this.adjacencyList.get(from)!.set(to, weight);
    this.adjacencyList.get(to)!.set(from, weight);
  }

  getWeight(from: T, to: T): number {
    return this.adjacencyList.get(from)?.get(to) ?? Infinity;
  }

  getNodes(): T[] {
    return Array.from(this.adjacencyList.keys());
  }

  findShortestPath(): { path: T[]; distance: number } {
    const nodes = this.getNodes();
    let shortestDistance = Infinity;
    let shortestPath: T[] = [];

    for (const path of this.permutations(nodes)) {
      const distance = this.calculateDistance(path);
      if (distance < shortestDistance) {
        shortestDistance = distance;
        shortestPath = [...path];
      }
    }

    return {
      path: shortestPath,
      distance: shortestDistance,
    };
  }

  findLongestPath(): { path: T[]; distance: number } {
    const nodes = this.getNodes();
    let longestDistance = 0;
    let longestPath: T[] = [];

    for (const path of this.permutations(nodes)) {
      const distance = this.calculateDistance(path);
      if (distance > longestDistance) {
        longestDistance = distance;
        longestPath = [...path];
      }
    }

    return {
      path: longestPath,
      distance: longestDistance,
    };
  }

  private calculateDistance = (path: T[]): number => {
    let distance = 0;
    for (let i = 0; i < path.length - 1; i++) {
      const current = path[i];
      const next = path[i + 1];
      const edgeWeight = this.getWeight(current, next);
      if (edgeWeight === Infinity) return Infinity;
      distance += edgeWeight;
    }

    return distance;
  };

  private *permutations(array: T[]): Generator<T[]> {
    if (array.length <= 1) {
      yield array;
      return;
    }

    for (let i = 0; i < array.length; i++) {
      const rest = [...array.slice(0, i), ...array.slice(i + 1)];
      for (const permutation of this.permutations(rest)) {
        yield [array[i], ...permutation];
      }
    }
  }
}
