export default async function part2(input: string[]) {
  const raceTime = 2503;

  let reindeers = input.map((line) => {
    const [speed, time, restTime] = line
      .matchAll(/\d+/g)
      .map((match) => Number(match[0]));

    return {
      speed,
      time,
      restTime,
      state: { score: 0, distance: 0, currentState: "flying", time, restTime },
    } as {
      speed: number;
      time: number;
      restTime: number;
      state: {
        score: number;
        distance: number;
        currentState: "flying" | "resting";
        time: number;
        restTime: number;
      };
    };
  });

  for (let i = 0; i < raceTime; i++) {
    for (let reindeer of reindeers) {
      if (reindeer.state.currentState === "flying") {
        reindeer.state.time--;
        reindeer.state.distance += reindeer.speed;
        if (reindeer.state.time === 0) {
          reindeer.state.currentState = "resting";
          reindeer.state.time = reindeer.time;
        }
      } else {
        reindeer.state.restTime--;
        if (reindeer.state.restTime === 0) {
          reindeer.state.currentState = "flying";
          reindeer.state.restTime = reindeer.restTime;
        }
      }
    }

    reindeers.sort((a, b) => b.state.distance - a.state.distance);
    reindeers = reindeers.map((reindeer) => {
      if (reindeer.state.distance !== reindeers[0].state.distance)
        return reindeer;
      return {
        ...reindeer,
        state: {
          ...reindeer.state,
          score: reindeer.state.score + 1,
        },
      };
    });
  }

  return reindeers.sort((a, b) => b.state.score - a.state.score)[0].state.score;
}

// Solve time: 14 minutes and 33 seconds
// Total solve time: 39 minutes and 12 seconds
