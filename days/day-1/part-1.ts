export default async function part1() {
  const input = Bun.file("./days/day-1/inputs/part-1.txt");
  const lines = (await input.text()).split("\n").filter((line) => !!line);

  const left: number[] = [];
  const right: number[] = [];

  lines.forEach((line) => {
    const [l, r] = line
      .split("   ")
      .filter((line) => line !== undefined && line !== null)
      .map(Number);
    left.push(l);
    right.push(r);
  });

  left.sort(sortNumbers);
  right.sort(sortNumbers);

  let totalDifference = 0;

  left.forEach((leftNumber) => {
    const rightNumber = right.shift();

    totalDifference += Math.abs(leftNumber - rightNumber!);
  });

  return totalDifference;
}

const sortNumbers = (a: number, b: number) => {
  return a - b;
};

console.log(await part1());
