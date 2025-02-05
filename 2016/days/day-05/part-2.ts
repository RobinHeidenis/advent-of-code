export default async function part2(input: string[]) {
  let password: string[] = [];
  const hasher = new Bun.CryptoHasher("md5");

  let index = 0;
  while (
    password.length !== 8 ||
    (password as (string | undefined)[]).includes(undefined)
  ) {
    hasher.update(`${input[0]}${index}`);
    const hash = hasher.digest("hex");

    if (hash.startsWith("00000")) {
      const position = Number(hash[5]);

      if (Number.isNaN(position)) {
        index++;
        continue;
      }

      if (position < 8 && password[position] === undefined) {
        password[position] = hash[6];
      }
    }
    index++;
  }

  return password.join("");
}

// Solve time: 6 minutes
// Total solve time: 10 minutes and 9 seconds
