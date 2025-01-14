export default async function part1(input: string[]) {
  const raceTime = 2503;

  return input
    .map((line) => {
      const [speed, time, restTime] = line
        .matchAll(/\d+/g)
        .map((match) => Number(match[0]));

      const cycleLength = time + restTime;

      const cycles = parseInt((raceTime / cycleLength).toString());
      const remainder = raceTime % cycleLength;
      const distance = cycles * (speed * time);

      let state: {
        currentState: "flying" | "resting";
        time: number;
        restTime: number;
        distance: number;
      } = {
        currentState: "flying",
        time,
        restTime,
        distance,
      };

      let i = 0;
      console.log(remainder);
      while (true) {
        console.log(state);
        if (i >= remainder) return state.distance;
        if (state.currentState === "flying") {
          state.time--;
          state.distance += speed;
          if (state.time === 0) {
            state.currentState = "resting";
            state.time = time;
          }
        } else {
          state.restTime--;
          if (state.restTime === 0) {
            state.currentState = "flying";
            state.restTime = restTime;
          }
        }

        i++;
      }
    })
    .sort((a, b) => b - a)[0];
}

// Solve time: 24 minutes and 40 seconds
