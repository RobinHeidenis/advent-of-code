import { exists, mkdir, readdir, rmdir } from "node:fs/promises";
import { parseArgs, styleText } from "node:util";
import { confirm } from "@inquirer/prompts";
import { createDayPath } from "./lib/meta";

const args = parseArgs({
  args: Bun.argv,
  options: {
    year: { type: "string" },
    day: { type: "string" },
  },
  strict: false,
  allowPositionals: true,
});

let day = args.values.day as string;
let year = args.values.year as string;

if (typeof year !== "string" || !year) {
  console.log("You did not specify a year. Using the current year");
  year = new Date().getFullYear().toString();
}

if (typeof day !== "string" || !day) {
  const createNextDay = await confirm({
    message: "You did not specify a day. Do you want to create the next day?",
    default: true,
  });

  if (!createNextDay) {
    console.log("Okidoki, see you next time!");
    process.exit(1);
  }

  day = "1";
  if (await exists(`./${year}/days`)) {
    const days = await readdir(`./${year}/days`);
    day = (days.length + 1).toString();
  }
}

try {
  await mkdir(`${createDayPath(year, day)}`, { recursive: true });
} catch (error) {
  if (
    typeof error === "object" &&
    error &&
    "code" in error &&
    error.code !== "EEXIST"
  ) {
    throw error;
  }

  throw new Error(`Day ${day} already exists`);
}

const createDayPartString = (part: string) => {
  return `export default async function part${part}(input: string[]) {
  let total = 0;

  input.forEach((line) => {
    
  });

  return total;
}\n`;
};

const puzzleInputRequest = await fetch(
  `https://adventofcode.com/${year}/day/${day}/input`,
  {
    headers: {
      cookie: `session=${process.env.AOC_COOKIE}`,
      "User-Agent": `${process.env.REPOSITORY_URL} by ${process.env.USER}`,
    },
  },
);

let continueWithoutInput = false;
if (!puzzleInputRequest.ok) {
  console.error(styleText("red", "Failed to fetch input from Advent of Code"));

  continueWithoutInput = await confirm({
    message:
      "Do you want to continue without the input and create an empty input file?",
    default: true,
  });
}

if (!continueWithoutInput && !puzzleInputRequest.ok) {
  await rmdir(`${createDayPath(year, day)}`, { recursive: true });
  process.exit(1);
}

await Bun.write(
  `${createDayPath(year, day)}/input.txt`,
  puzzleInputRequest.ok ? await puzzleInputRequest.text() : "",
);
await Bun.write(`${createDayPath(year, day)}/test.txt`, "");
await Bun.write(
  `${createDayPath(year, day)}/part-1.ts`,
  createDayPartString("1"),
);

// Day 25 always only has one part, the other part is pressing a button on the website
if (day !== "25") {
  await Bun.write(
    `${createDayPath(year, day)}/part-2.ts`,
    createDayPartString("2"),
  );
}

console.log(styleText("green", `Day ${day} created`));
