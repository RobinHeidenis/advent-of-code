import { CryptoHasher } from "bun";

export default async function part1(input: string[]) {
  return getTargetHashIndex(input[0], 0);
}

// Solve time: 16 minutes and 36 seconds

const generateHash = (
  salt: string,
  index: number,
  rehashes: number,
  hasher: CryptoHasher,
) => {
  const hash = hasher.update(`${salt}${index}`).digest("hex").toLowerCase();

  let rehash = hash;
  for (let i = 0; i < rehashes; i++) {
    rehash = hasher.update(rehash).digest("hex").toLowerCase();
  }

  return rehash;
};

export const getTargetHashIndex = (salt: string, rehashes: number) => {
  const hashes: string[] = [];

  const hasher = new CryptoHasher("md5");

  for (let i = 0; i < 1000; i++) {
    hashes.push(generateHash(salt, i, rehashes, hasher));
  }

  let i = 0;
  const keys: string[] = [];
  while (keys.length < 64) {
    const hash = hashes.shift();
    const newHash = generateHash(salt, 1000 + i, rehashes, hasher);
    hashes.push(newHash);

    const regex = /(.)\1\1/g;
    const character = hash!.match(regex)?.[0];

    if (character === undefined) {
      i++;
      continue;
    }

    for (const hash of hashes) {
      if (hash.includes(`${character[0].repeat(5)}`)) {
        keys.push(hash);
        console.log(i, hash);
        break;
      }
    }

    i++;
  }

  return i - 1;
};
