import { fillDisk, generateChecksumUntilValid } from "./part-1";

export default async function part2(input: string[]) {
  const diskSize = 35651584;
  return generateChecksumUntilValid(diskSize, fillDisk(diskSize, input[0]));
}

// Solve time: 31 seconds
// Total solve time: 11 minutes and 30 seconds
