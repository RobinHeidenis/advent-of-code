import { select, confirm } from "@inquirer/prompts";
import { color } from "bun";
import { readdir } from "node:fs/promises";

export const determineDayPartToRun = async () => {
  const currentYear = await confirm({
    message: "Do you want to run the current year?",
    default: true,
  });

  let year = new Date().getFullYear().toString();

  if (!currentYear) {
    year = await select({
      message: "Select a year to run",
      choices: (await readdir("./")).filter(dir => dir.match(/^\d{4}$/)),
    });
  }

  const days = await readdir(`./${year}/days`);
  const day = await select({
    message: "Select a day to run",
    choices: days
      .map((day) => ({
        name: day.split("-").join(" "),
        value: day,
      }))
      .sort((a, b) => (a.name < b.name ? -1 : 1)),
  });

  const part = await select({
    message: "Which part do you want to run?",
    choices: [
      { name: "Part 1", value: "part-1" },
      { name: "Part 2", value: "part-2" },
    ],
  });

  const runWithRealInput = await confirm({
    message: "Do you want to run this part with the real input?",
    default: true,
  });

  return { runWithRealInput, day, year, part };
};

export const determineDayPartToRunFromArgs = (args: {
  year: string | undefined;
  day: string;
  part: string;
  testInput: boolean;
}) => {
  try {
    parseInt(args.day);
  } catch {
    throw new Error("Day must be a number");
  }

  try {
    parseInt(args.part);
  } catch {
    throw new Error("Part must be a number");
  }

  let year = new Date().getFullYear().toString();

  if (args.year) {
    year = args.year;
  }

  return {
    year,
    day: `day-${args.day.padStart(2, "0")}`,
    part: `part-${args.part}`,
    runWithRealInput: !args.testInput,
  };
};

export const getDayFunction = async (year: string, day: string, part: string) => {
  return (await import(`../${year}/days/${day}/${part}.ts`)).default as (
    input: string[] | string,
  ) => Promise<unknown>;
};

const daysThatShouldGetRawInput = {
 '2024': ["day-5", "day-13", "day-15", "day-24", "day-25"],
} as Record<string, string[]>;

export const processInput = async (year: string, day: string, runWithRealInput: boolean) => {
  const rawInput = runWithRealInput
    ? await Bun.file(`${createDayPath(year, day)}/input.txt`).text()
    : await Bun.file(`${createDayPath(year, day)}/test.txt`).text();

  if ((daysThatShouldGetRawInput[year] ?? []).includes(day)) return rawInput;

  return rawInput.split("\n").filter((line) => line !== "");
};

export const applyColor = (string: string, targetColor: string) =>
  `${color(targetColor, "ansi")}${string}${color("reset", "ansi")}`;

export const formatDayPart = (dayOrPart: string, capitalize = false) => {
  const withoutDash = dayOrPart.split("-").join(" ");

  if (!capitalize) return withoutDash;

  return withoutDash.charAt(0).toUpperCase() + withoutDash.slice(1);
};

export const createDayPath = (year: string, day: string) => `./${year}/days/${day}`;
