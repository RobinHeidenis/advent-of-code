export default async function part2(input: string[]) {
  const line = input[0];

  const expanded = expandDrive(line);

  let previousId = Infinity;
  for (let i = expanded.length - 1; i >= 0; i--) {
    if (!expanded.includes(null)) break;
    if (expanded[i] === null) continue;
    if (expanded[i]! >= previousId) continue;

    previousId = expanded[i]!;

    const fileStartIndex = expanded.findIndex((value) => value === expanded[i]);

    const emptyBlock = findBigEnoughEmptyBlock(
      0,
      fileStartIndex,
      i - fileStartIndex + 1,
      expanded,
    );

    if (!emptyBlock) {
      i = fileStartIndex;
      continue;
    }

    expanded.splice(
      emptyBlock.startIndex,
      emptyBlock.length,
      ...(Array.from({ length: emptyBlock.length }).fill(
        expanded[i],
      ) as number[]),
    );

    expanded.splice(
      fileStartIndex,
      emptyBlock.length,
      ...(Array.from({ length: emptyBlock.length }).fill(null) as null[]),
    );

    i = fileStartIndex;
  }

  return expanded.reduce((prev, curr, index) => {
    if (curr === null) return prev;
    return (prev! += curr * index);
  }, 0);
}

// Solve time: ~1 hour, 26 minutes, and 6 seconds
// Total solve time: ~1 hour and 45 minutes

const expandDrive = (drive: string) => {
  let blockID = 0;
  const expandedDrive: (number | null)[] = [];

  drive.split("").forEach((char, index) => {
    for (let i = 0; i < Number(char); i++) {
      expandedDrive.push(index % 2 === 0 ? blockID : null);
    }

    if (index % 2 === 0) blockID++;
  });

  return expandedDrive;
};

const findBigEnoughEmptyBlock = (
  startIndex: number,
  maxEnd: number,
  length: number,
  array: (number | null)[],
) => {
  const arraySlice = array.slice(startIndex, maxEnd);

  if (!arraySlice.includes(null) || arraySlice.length < length) {
    return false;
  }

  const emptyBlockStartIndex = arraySlice.findIndex((value) => value === null);

  const bigEnoughCheckSlice = arraySlice.slice(
    emptyBlockStartIndex,
    emptyBlockStartIndex + length,
  );
  const isBigEnough =
    bigEnoughCheckSlice.length === length &&
    bigEnoughCheckSlice.every((v) => v === null);

  if (isBigEnough) {
    return { startIndex: startIndex + emptyBlockStartIndex, length };
  }

  return findBigEnoughEmptyBlock(
    startIndex + emptyBlockStartIndex + 1,
    maxEnd,
    length,
    array,
  );
};
