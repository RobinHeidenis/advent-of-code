export default async function part1(input: string[]) {
  const programs: Set<string> = new Set();
  const referenced: Set<string> = new Set();
  input.forEach((line) => {
    const [program, , , ...references] = line.split(" ");

    programs.add(program);
    references.forEach((reference) => {
      referenced.add(reference.replace(",", ""));
    });
  });

  return programs.difference(referenced).values().next().value;
}

// Solve time: 3 minutes and 39 seconds
