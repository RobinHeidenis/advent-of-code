export default async function part1(input: string[]) {
  let i = 0;

  const hasher = new Bun.CryptoHasher("md5");
  while (true) {
    const secretKey = input[0] + i;
    hasher.update(secretKey);
    const hash = hasher.digest("hex");
    if (hash.startsWith("00000")) {
      console.log(input[0] + i);
      break;
    }

    i++;
  }

  return i;
}

// Solve time: 9 minutes and 16 seconds
