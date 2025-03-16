export default async function part1(input: string[]) {
  const instructions = input[0].split(",");

  const programs = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
  ];

  instructions.forEach((instruction) => {
    if (instruction.startsWith("s")) {
      const count = Number(instruction.slice(1));
      programs.unshift(...programs.splice(-count));
    } else if (instruction.startsWith("x")) {
      const [a, b] = instruction.slice(1).split("/").map(Number);
      const aValue = programs[a];
      const bValue = programs[b];

      programs[a] = bValue;
      programs[b] = aValue;
    } else if (instruction.startsWith("p")) {
      const [a, b] = instruction.slice(1).split("/");
      const aIndex = programs.indexOf(a);
      const bIndex = programs.indexOf(b);

      programs[aIndex] = b;
      programs[bIndex] = a;
    }
  });

  return programs.join("");
}

// Solve time: 7 minutes and 26 seconds
