const reactPolymer = (polymer: string): string => {
  const stack: string[] = [];

  for (let i = 0; i < polymer.length; i++) {
    const current = polymer[i];
    const last = stack[stack.length - 1];

    if (
      stack.length > 0 &&
      last.toLowerCase() === current.toLowerCase() &&
      last !== current
    ) {
      stack.pop();
    } else {
      stack.push(current);
    }
  }

  return stack.join("");
};

export default async function part2(input: string[]) {
  const originalPolymer = input[0];
  const reactedOriginal = reactPolymer(originalPolymer);
  let shortest = reactedOriginal.length;

  const uniqueUnits = new Set<string>(reactedOriginal.toLowerCase());

  for (const unit of uniqueUnits) {
    const filteredPolymer = originalPolymer.replace(new RegExp(unit, "gi"), "");
    const reacted = reactPolymer(filteredPolymer);
    shortest = Math.min(shortest, reacted.length);
  }

  return shortest;
}

// Solve time: 2 minutes and 54 seconds
// Total solve time: 5 minutes and 18 seconds
