export default async function part2(input: string[]) {
  const instructions = input[0].split(",");

  let programs = [
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

  const seen = new Map<string, string>();

  while (true) {
    const programsKey = programs.join("");
    if (seen.has(programsKey)) {
      break;
    }

    dance(programs, instructions);

    seen.set(programsKey, programs.join(""));
  }

  const cycleLength = seen.size;

  for (let i = 0; i < 1000000000 % cycleLength; i++) {
    dance(programs, instructions);
  }

  return programs.join("");
}

// Solve time: 9 minutes and 44 seconds
// Total solve time: 17 minutes and 10 seconds

const dance = (programs: string[], instructions: string[]) => {
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
};
