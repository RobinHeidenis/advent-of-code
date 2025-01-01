export default async function part1(input: string[]) {
  let totalSafe = 0;

  input.forEach((line) => {
    const levels = line.split(" ").map(Number);

    const mode = levels[0] < levels[1] ? "asc" : "desc";
    let safe = true;

    for (let i = 0; i < levels.length - 1; i++) {
      const current = levels[i];
      const next = levels[i + 1];

      if (
        (mode === "asc" && current > next) ||
        (mode === "desc" && current < next) ||
        Math.abs(current - next) > 3 ||
        current === next
      ) {
        safe = false;
        break;
      }
    }

    if (safe === false) return;
    totalSafe++;
  });

  return totalSafe;
}
