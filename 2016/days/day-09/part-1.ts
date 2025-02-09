export default async function part1(input: string[]) {
  let total = 0;

  const line = input[0].split("");
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char !== "(") {
      total++;
      continue;
    }

    const marker = line.slice(i, i + 10);
    if (!marker.includes(")")) {
      throw new Error(`IT DON'T EXIST, ${marker}`);
    }

    const [characters, times] = [...marker.join("").matchAll(/(\d+)/g)].map(
      (match) => Number(match[0]),
    );
    total += characters * times;

    const newI =
      i + 3 + String(characters).length + String(times).length + characters;
    i = newI - 1;
  }

  return total;
}

// Solve time: 5 minutes and 29 seconds
