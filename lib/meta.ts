import { select, confirm } from "@inquirer/prompts";
import { color } from "bun";

export const determineDayPartToRun = async (days: string[]) => {
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

  return { runWithRealInput, day, part };
};

export const determineDayPartToRunFromArgs = (args: {
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

  return {
    day: `day-${args.day.padStart(2, "0")}`,
    part: `part-${args.part}`,
    runWithRealInput: !args.testInput,
  };
};

export const getDayFunction = async (day: string, part: string) => {
  return (await import(`../days/${day}/${part}.ts`)).default as (
    input: string[] | string,
  ) => Promise<unknown>;
};

export const processInput = async (day: string, runWithRealInput: boolean) => {
  const rawInput = runWithRealInput
    ? await Bun.file(`./days/${day}/input.txt`).text()
    : await Bun.file(`./days/${day}/test.txt`).text();

  if (day === "day-5") return rawInput;

  return rawInput.split("\n").filter((line) => line !== "");
};

export const applyColor = (string: string, targetColor: string) =>
  `${color(targetColor, "ansi")}${string}${color("reset", "ansi")}`;

export const formatDayPart = (dayOrPart: string, capitalize = false) => {
  const withoutDash = dayOrPart.split("-").join(" ");

  if (!capitalize) return withoutDash;

  return withoutDash.charAt(0).toUpperCase() + withoutDash.slice(1);
};
