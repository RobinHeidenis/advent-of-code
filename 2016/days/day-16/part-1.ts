export default async function part1(input: string[]) {
  const diskSize = 272;
  return generateChecksumUntilValid(diskSize, fillDisk(diskSize, input[0]));
}

// Solve time: 10 minutes and 59 seconds

export const generateChecksumUntilValid = (maxLength: number, data: string) => {
  let checksum = generateChecksum(maxLength, data);
  while (checksum.length % 2 === 0) {
    checksum = generateChecksum(maxLength, checksum);
  }

  return checksum;
};

const generateChecksum = (maxLength: number, data: string) => {
  const string = data.slice(0, maxLength);

  let checksum = "";
  for (let i = 0; i < string.length; i += 2) {
    const current = string[i];
    const next = string[i + 1];

    if (current === next) {
      checksum += "1";
    } else {
      checksum += "0";
    }
  }

  return checksum;
};

export const fillDisk = (length: number, initialData: string) => {
  let string = initialData;
  while (string.length < length) {
    string = generateNextData(string);
  }

  return string;
};

const generateNextData = (previous: string) => {
  const a = previous;
  const b = a
    .slice()
    .split("")
    .reverse()
    .map((c) => (c === "0" ? "1" : "0"))
    .join("");

  return `${a}0${b}`;
};
