export default async function part1(input: string[]) {
  let password = "";
  const hasher = new Bun.CryptoHasher("md5");

  let index = 0;
  while (password.length < 8) {
    hasher.update(`${input[0]}${index}`);
    const hash = hasher.digest("hex");

    if (hash.startsWith("00000")) {
      password += hash[5];
    }
    index++;
  }

  return password;
}

// Solve time: 4 minutes and 8 seconds
