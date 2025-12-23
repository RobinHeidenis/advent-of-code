export default async function part2(input: string[]) {
  const graph = new Map<string, string[]>();

  input.forEach((line) => {
    const [source, destinationsString] = line.split(": ");
    const destinations = destinationsString.split(" ");
    graph.set(source, destinations);
  });

  const pathCache = new Map<string, number>();
  const calculateAmountOfPaths = (
    source: string,
    destination: string,
  ): number => {
    if (source === destination) {
      return 1;
    }

    const cacheKey = `${source}-${destination}`;

    if (pathCache.has(cacheKey)) {
      return pathCache.get(cacheKey)!;
    }

    const destinations = graph.get(source) ?? [];
    const result = destinations.reduce(
      (total, source) => total + calculateAmountOfPaths(source, destination),
      0,
    );

    pathCache.set(cacheKey, result);

    return result;
  };

  const amountOfPathsThroughDACFFT =
    calculateAmountOfPaths("svr", "dac") *
    calculateAmountOfPaths("dac", "fft") *
    calculateAmountOfPaths("fft", "out");

  const amountOfPathsThroughFFTDAC =
    calculateAmountOfPaths("svr", "fft") *
    calculateAmountOfPaths("fft", "dac") *
    calculateAmountOfPaths("dac", "out");

  return amountOfPathsThroughDACFFT + amountOfPathsThroughFFTDAC;
}

// Solve time: 8 minutes and 22 seconds
// Total solve time: 15 minutes and 5 seconds
