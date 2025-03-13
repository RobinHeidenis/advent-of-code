export default async function part1(input: string[]) {
  let firewall = parseInput(input);

  let severity = 0;

  for (let i = 0; i < firewall.length; i++) {
    firewall = firewall.map((layer) => {
      if (layer.direction === 0) return layer;

      if (layer.direction === 1 && layer.position === layer.range - 1) {
        layer.direction = -1;
      } else if (layer.direction === -1 && layer.position === 0) {
        layer.direction = 1;
      }

      layer.position += layer.direction;

      return layer;
    });

    const nextLayer = firewall[i + 1];

    if (!nextLayer) continue;

    if (nextLayer.position === 0) {
      severity += (i + 1) * nextLayer.range;
    }
  }

  return severity;
}

// Solve time: 10 minutes and 18 seconds

export const parseInput = (input: string[]) => {
  let maxDepth = 0;
  input.forEach((line) => {
    const depth = Number(line.split(":")[0]);
    maxDepth = Math.max(maxDepth, depth);
  });

  const firewall: { position: number; range: number; direction: number }[] =
    Array(maxDepth + 1)
      .fill(null)
      .map(() => ({
        position: 0,
        range: 0,
        direction: 1,
      }));

  input.forEach((line) => {
    const [depth, range] = line.split(": ").map(Number);
    firewall[depth] = { position: 0, range, direction: 1 };
  });

  return firewall;
};
