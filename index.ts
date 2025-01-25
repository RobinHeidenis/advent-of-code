import { readdir } from "node:fs/promises";
import {
  determineDayPartToRun,
  determineDayPartToRunFromArgs,
  formatDayPart,
  getDayFunction,
  processInput,
} from "./lib/meta";
import { parseArgs, styleText } from "node:util";
import { confirm } from "@inquirer/prompts";

const args = parseArgs({
  args: Bun.argv,
  options: {
    year: { type: "string" },
    day: { type: "string" },
    part: { type: "string" },
    testInput: { type: "boolean" },
  },
  strict: true,
  allowPositionals: true,
});

let settings: {
  year: string;
  day: string;
  part: string;
  runWithRealInput: boolean;
};

if (args.values.day && args.values.part) {
  settings = determineDayPartToRunFromArgs(
    args.values as Required<typeof args.values>,
  );
} else {
  settings = await determineDayPartToRun();
}

const input = await processInput(
  settings.year,
  settings.day,
  settings.runWithRealInput,
);

const dayFunction = await getDayFunction(
  settings.year,
  settings.day,
  settings.part,
);

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

if (settings.day === "25" && settings.part === "part-1") {
  const result = await confirm({ message: "Did you get the correct answer?" });
  if (result) {
    console.log(styleText("yellow", "You saved Christmas!!!"));
    console.log(styleText("yellow", "Merry Christmas!"));
  } else {
    console.log(styleText("red", "Keep on trying!"));
  }
}
