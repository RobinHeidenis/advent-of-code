export default async function part1(input: string[]) {
  const { bots, instructions, outputs } = parseInput(input);

  let madeProgress = true;
  while (madeProgress) {
    madeProgress = false;

    for (const instruction of instructions) {
      const bot = bots[instruction.bot] || [];
      if (bot.length !== 2) continue;

      // Initialize target containers if they don't exist
      if (instruction.low.type === "bot" && !bots[instruction.low.number]) {
        bots[instruction.low.number] = [];
      }
      if (instruction.high.type === "bot" && !bots[instruction.high.number]) {
        bots[instruction.high.number] = [];
      }

      // Distribute values
      const [val1, val2] = bot;
      const low = Math.min(val1, val2);
      const high = Math.max(val1, val2);

      if (instruction.low.type === "bot") {
        bots[instruction.low.number].push(low);
      } else {
        outputs[instruction.low.number] = low;
      }

      if (instruction.high.type === "bot") {
        bots[instruction.high.number].push(high);
      } else {
        outputs[instruction.high.number] = high;
      }

      bots[instruction.bot] = [];
      madeProgress = true;

      // Check if we found our target bot
      if (low === 17 && high === 61) {
        return instruction.bot;
      }
    }
  }

  return "No solution found";
}

// Solve time: 29 minutes and 19 seconds

export const parseInput = (input: string[]) => {
  const bots: Record<number, number[]> = {};
  const instructions: {
    bot: number;
    low: { type: "bot" | "output"; number: number };
    high: { type: "bot" | "output"; number: number };
  }[] = [];
  const outputs: Record<number, number> = {};

  // Parse input
  input.forEach((line) => {
    if (line.startsWith("value")) {
      const [value, bot] = [...line.matchAll(/(\d+)/g)].map((m) =>
        Number(m[0]),
      );
      if (!bots[bot]) {
        bots[bot] = [value];
      } else {
        bots[bot].push(value);
      }
    } else {
      // prettier-ignore
      const [, bot,,,, botOrOutputLow, botOrOutputNumberLow,,,, botOrOutputHigh, botOrOutputNumberHigh] = line.split(" ");
      instructions.push({
        bot: Number(bot),
        low: {
          type: botOrOutputLow as "bot" | "output",
          number: Number(botOrOutputNumberLow),
        },
        high: {
          type: botOrOutputHigh as "bot" | "output",
          number: Number(botOrOutputNumberHigh),
        },
      });
    }
  });

  return { bots, instructions, outputs };
};
