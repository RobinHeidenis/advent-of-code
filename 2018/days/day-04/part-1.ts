export default async function part1(input: string[]) {
  const entries = input.map((line) => {
    const [date, action] = [...line.match(/\[(.+)\] (.*)/)!].slice(1);

    return { date, action };
  });

  const sortedEntries = entries.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    return dateA.getTime() - dateB.getTime();
  });

  const guards: Record<string, number[]> = {};

  const state = {
    currentGuard: "",
    sleepStart: 0,
    sleepEnd: 0,
    sleeping: false,
  };

  for (const entry of sortedEntries) {
    const { date, action } = entry;

    if (action.startsWith("Guard")) {
      const guardId = action.match(/#(\d+)/)![1];
      state.currentGuard = guardId;
      if (!guards[guardId]) {
        guards[guardId] = Array(60).fill(0);
      }
    } else if (action === "falls asleep") {
      state.sleepStart = new Date(date).getMinutes();
      state.sleeping = true;
    } else if (action === "wakes up") {
      state.sleepEnd = new Date(date).getMinutes();
      state.sleeping = false;

      for (let i = state.sleepStart; i < state.sleepEnd; i++) {
        guards[state.currentGuard][i]++;
      }
    }
  }

  const guardSleepTimes = Object.entries(guards).map(
    ([guardId, sleepTimes]) => {
      const totalSleepTime = sleepTimes.reduce(
        (total, time) => total + time,
        0,
      );
      const mostFrequentMinute = sleepTimes.indexOf(Math.max(...sleepTimes));

      return { guardId, totalSleepTime, mostFrequentMinute };
    },
  );

  const sleepiestGuard = guardSleepTimes.reduce((prev, curr) => {
    return prev.totalSleepTime > curr.totalSleepTime ? prev : curr;
  });

  const sleepiestMinute = sleepiestGuard.mostFrequentMinute;

  const result = Number(sleepiestGuard.guardId) * sleepiestMinute;

  return result;
}

// Solve time: 9 minutes and 48 seconds
