export default async function part2(input: string[]) {
  const sequencesToTotal: Record<string, bigint> = {};

  input.forEach((line) => {
    let number = BigInt(line);
    const buyer = [number % 10n];
    for (let i = 0; i < 2000; i++) {
      number = generateNextSecret(number);
      buyer.push(number % 10n);
    }

    const seen = new Set<string>();

    for (let i = 0; i < buyer.length - 4; i++) {
      const [a, b, c, d, e] = buyer.slice(i, i + 5);
      const sequence = `${b - a}${c - b}${d - c}${e - d}`;
      if (seen.has(sequence)) continue;
      seen.add(sequence);
      if (!Object.hasOwn(sequencesToTotal, sequence))
        sequencesToTotal[sequence] = 0n;
      sequencesToTotal[sequence] += e;
    }
  });

  return Math.max(...Object.values(sequencesToTotal).map(Number));
}

// Solve time: 8 minutes
// Total solve time: 35 minutes and 20 seconds

const generateNextSecret = (secret: bigint) => {
  secret = ((secret * 64n) ^ secret) % 16777216n;
  secret = ((secret / 32n) ^ secret) % 16777216n;
  secret = ((secret * 2048n) ^ secret) % 16777216n;
  return secret;
};
