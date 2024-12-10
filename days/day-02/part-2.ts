export default async function part2(input: string[]) {
  let totalSafe = 0;

  input.forEach((line) => {
    const levels = line.split(" ").map(Number);

    const mode = levels[0] < levels[1] ? "asc" : "desc";
    const failures = determineReportSafe(mode, levels);

    if (failures === 0) {
      totalSafe++;
      return;
    }

    for (let i = 0; i < levels.length; i++) {
      const levelsCopy = [...levels];
      const slicedLevels = [
        ...levelsCopy.slice(0, i),
        ...levelsCopy.slice(i + 1),
      ];
      const mode = slicedLevels[0] < slicedLevels[1] ? "asc" : "desc";

      const failures = determineReportSafe(mode, slicedLevels);

      if (failures === 0) {
        totalSafe++;
        return;
      }
    }
  });

  return totalSafe;
}

const determineUnsafe = (mode: "asc" | "desc", current: number, next: number) =>
  (mode === "asc" && current > next) ||
  (mode === "desc" && current < next) ||
  Math.abs(current - next) > 3 ||
  current === next;

const determineReportSafe = (mode: "asc" | "desc", levels: number[]) => {
  let failures = 0;
  for (let i = 0; i < levels.length - 1; i++) {
    const current = levels[i];
    const next = levels[i + 1];

    if (determineUnsafe(mode, current, next)) {
      failures++;
      break;
    }
  }

  return failures;
};
