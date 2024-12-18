const registers = {
  A: 0n,
  B: 0n,
  C: 0n,
};

export default async function part2(input: string[]) {
  const unparsedProgram = input[3].split(": ")[1];
  const program = unparsedProgram.split(",").map(BigInt);

  return find(program, 0n);
}

const find = (program: bigint[], answer: bigint): bigint | undefined => {
  if (program.length === 0) return answer;

  for (let i = 0n; i < 8n; i++) {
    registers.A = (answer << 3n) | i;
    registers.B = registers.A % 8n;
    registers.B = registers.B ^ 2n;
    registers.C = registers.A >> registers.B;
    registers.B = registers.B ^ registers.C;
    registers.B = registers.B ^ 3n;

    if (registers.B % 8n === program.at(-1)) {
      const sub = find(program.slice(0, program.length - 1), registers.A);
      if (sub === undefined) continue;
      return sub;
    }
  }
};

// Solve time: 37 minutes and 35 seconds
// Total solve time: 1 hour, 17 minutes, and 49 seconds
