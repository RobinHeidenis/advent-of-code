export default async function part1(input: string[]) {
  let total = 0n;

  input.forEach((line) => {
    let result = BigInt(line);
    for (let i = 0; i < 2000; i++) {
      result = generateNextSecret(result);
    }

    total += result;
  });

  return total;
}

// Solve time: 24 minutes and 51 seconds

const generateNextSecret = (secret: bigint) => {
  secret = ((secret * 64n) ^ secret) % 16777216n;
  secret = ((secret / 32n) ^ secret) % 16777216n;
  secret = ((secret * 2048n) ^ secret) % 16777216n;
  return secret;
};
