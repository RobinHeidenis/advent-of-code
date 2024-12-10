export default async function part1(input: string[]) {
  const line = input[0];

  const expanded = expandDrive(line);

  for (let i = expanded.length - 1; i >= 0; i--) {
    if (!expanded.includes(null)) break;

    const index = expanded.findIndex((value) => value === null);
    expanded.splice(index, 1, expanded[i]);
    expanded[i] = null;
  }

  return expanded
    .filter((value) => value !== null)
    .reduce((prev, curr, index) => {
      if (curr === null) return prev;
      return (prev! += curr * index);
    }, 0);
}

// Solve time: 18 minutes and 54 seconds

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
