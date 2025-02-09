export default async function part2(input: string[]) {
  let total = 0;

  const line = input[0].split("");
  const weights = line.map(() => 1);

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char !== "(") {
      total += weights[i];
      continue;
    }

    const marker = line.slice(i, i + 10);
    if (!marker.includes(")")) {
      throw new Error(`IT DON'T EXIST, ${marker}`);
    }

    const [characters, times] = [...marker.join("").matchAll(/(\d+)/g)].map(
      (match) => Number(match[0]),
    );
    for (let x = 0; x < characters; x++) {
      weights[x + i + 3 + String(characters).length + String(times).length] *=
        times;
    }

    const newI = i + 3 + String(characters).length + String(times).length;
    i = newI - 1;
  }
  return total;
}

// Solve time: 6 minutes and 1 second
// Total sovle time: 11 minutes and 31 seconds
