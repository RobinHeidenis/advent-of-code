export default async function part1(input: string[]) {
  const graph = new Map<string, string[]>();

  input.forEach((line) => {
    const [source, destinationsString] = line.split(": ");
    const destinations = destinationsString.split(" ");
    graph.set(source, destinations);
  });

  const calculateAmountOfPaths = (
    source: string,
    destination: string,
  ): number => {
    if (source === destination) {
      return 1;
    }

    const destinations = graph.get(source) ?? [];
    return destinations.reduce(
      (total, source) => total + calculateAmountOfPaths(source, destination),
      0,
    );
  };

  return calculateAmountOfPaths("you", "out");
}

// Solve time: 6 minutes and 43 seconds
