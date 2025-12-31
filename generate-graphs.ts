import type { ChartConfiguration } from "chart.js";
import ChartJsImage from "chartjs-to-image";
import { readdir, readFile } from "fs/promises";

const years = (await readdir("./")).filter((f) => f.match(/^\d{4}$/));
const yearsWithDays = await Promise.all(
  years.map(async (year) => ({
    year,
    days: (await readdir(`${year}/days`))
      .map((day) => Number(day.split("-")[1]))
      .sort((a, b) => a - b),
  })),
);

const findMatchingComments = (text: string) => {
  const regex =
    /^\/\/ Solve time:\s*(?:(?<hours>\d+)\s*hours?)?\s*(?:,?\s*(?<minutes>\d+)\s*minutes?)?(?:(?:,)? and)?(?:,?\s*(?<seconds>\d+)\s*seconds?)?/;

  const line = text
    .split("\n")
    .filter(Boolean)
    .find((line) => line.startsWith("// Solve time:"));

  if (!line) return null;
  const match = line.match(regex);
  if (match) {
    const hours = match[1] ? parseInt(match[1], 10) : 0;
    const minutes = match[2] ? parseInt(match[2], 10) : 0;
    const seconds = match[3] ? parseInt(match[3], 10) : 0;

    return { hours, minutes, seconds };
  }

  return null;
};

const withTimes = await Promise.all(
  yearsWithDays.map(async (year) => ({
    year: year.year,
    days: await Promise.all(
      year.days.map(async (day) => {
        const part1Text = (
          await readFile(
            `${year.year}/days/day-${day.toString().padStart(2, "0")}/part-1.ts`,
          )
        ).toString();

        const part2Text =
          day !== 25 && !(Number(year.year) >= 2025 && day === 12)
            ? (
                await readFile(
                  `${year.year}/days/day-${day.toString().padStart(2, "0")}/part-2.ts`,
                )
              ).toString()
            : "";

        return {
          day,
          part1: findMatchingComments(part1Text),
          part2: findMatchingComments(part2Text),
        };
      }),
    ),
  })),
);

withTimes.forEach((year) => {
  const chart = new ChartJsImage();

  chart.setChartJsVersion("4");

  chart.setConfig({
    type: "bar",
    data: {
      labels: year.days.map((day) => `Day ${day.day}`),
      datasets: [
        {
          label: "Part 1",
          data: year.days.map(
            (day) =>
              (day.part1?.minutes ?? 0) +
              (day.part1?.hours ?? 0) * 60 +
              (day.part1?.seconds ?? 0) / 60,
          ),
          backgroundColor: "#36A2EB",
        },
        {
          label: "Part 2",
          data: year.days.map(
            (day) =>
              (day.part2?.minutes ?? 0) +
              (day.part2?.hours ?? 0) * 60 +
              (day.part2?.seconds ?? 0) / 60,
          ),
          backgroundColor: "#FF6384",
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "Solve time in minutes",
        },
        subtitle: {
          display: true,
          text: "per day per part",
        },
      },
      scales: {
        y: {
          title: {
            display: true,
            text: "time in minutes",
          },
        },
      },
    },
  } satisfies ChartConfiguration);

  chart.setDevicePixelRatio(10);

  chart.toFile(`charts/${year.year}.png`);
});
