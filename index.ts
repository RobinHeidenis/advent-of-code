import { readdir } from "node:fs/promises";
import {
  determineDayPartToRun,
  determineDayPartToRunFromArgs,
  formatDayPart,
  getDayFunction,
  processInput,
} from "./lib/meta";
import { parseArgs, styleText } from "node:util";

const days = await readdir("./days");

const args = parseArgs({
  args: Bun.argv,
  options: {
    day: { type: "string" },
    part: { type: "string" },
    testInput: { type: "boolean" },
  },
  strict: true,
  allowPositionals: true,
});

let settings: { day: string; part: string; runWithRealInput: boolean };

if (args.values.day && args.values.part) {
  settings = determineDayPartToRunFromArgs(
    args.values as Required<typeof args.values>,
  );
} else {
  settings = await determineDayPartToRun(days);
}

const input = await processInput(settings.day, settings.runWithRealInput);

const dayFunction = await getDayFunction(settings.day, settings.part);

console.log(
  styleText(
    "cyan",
    `Running ${formatDayPart(settings.day)} ${formatDayPart(settings.part)}`,
  ),
);

const timeBefore = performance.now();
const result = await dayFunction(input);
const timeAfter = performance.now();

console.log();
console.log(styleText("green", "Answer:"), result);
console.log(
  styleText(
    "magenta",
    `Execution time: ${(timeAfter - timeBefore).toFixed(2)} milliseconds`,
  ),
);
