import { parseInput } from "./part-1";

export default async function part2(input: string[]) {
  const firewall = parseInput(input);
  let delay = 0;

  while (true) {
    let caught = false;

    for (let depth = 0; depth < firewall.length; depth++) {
      const layer = firewall[depth];

      if (layer.range === 0) continue;

      // Time = delay + depth
      const time = delay + depth;
      const cycleLength = 2 * (layer.range - 1);
      const position = time % cycleLength;

      if (position === 0) {
        caught = true;
        break;
      }
    }

    if (!caught) {
      return delay;
    }

    delay++;
  }
}

// Solve time: 4 minutes and 32 seconds
// Total solve time: 14 minutes and 51 seconds
