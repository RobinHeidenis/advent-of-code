import { parseInput } from "./part-1";

export default async function part2(input: string[]) {
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
    }
  }

  return outputs[0] * outputs[1] * outputs[2];
}

// Solve time: 1 minute and 6 seconds
// Total solve time: 30 minutes and 26 seconds
