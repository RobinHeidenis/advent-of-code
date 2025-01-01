import type { Coordinate } from "../../lib/types";

export default async function part1(input: string[]) {
  let total = 0;

  const map = input.map((line) => line.split(""));

  let startCoordinate!: Coordinate;

  ySearch: for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map.length; x++) {
      if (map[y][x] === "S") {
        startCoordinate = { y, x };
        break ySearch;
      }
    }
  }

  const distances = map.map((line) => line.map(() => -1));
  distances[startCoordinate.y][startCoordinate.x] = 0;

  const state = { x: startCoordinate.x, y: startCoordinate.y };

  while (map[state.y][state.x] !== "E") {
    for (let [ny, nx] of [
      [state.y + 1, state.x],
      [state.y - 1, state.x],
      [state.y, state.x + 1],
      [state.y, state.x - 1],
    ]) {
      if (ny < 0 || ny >= map.length || nx < 0 || nx >= map[0].length) continue;
      if (map[ny][nx] === "#") continue;
      if (distances[ny][nx] !== -1) continue;
      distances[ny][nx] = distances[state.y][state.x] + 1;
      state.y = ny;
      state.x = nx;
    }
  }

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map.length; x++) {
      if (map[y][x] === "#") continue;
      for (let [ny, nx] of [
        [y + 2, x],
        [y + 1, x + 1],
        [y, x + 2],
        [y - 1, x - 1],
      ]) {
        if (ny < 0 || ny >= map.length || nx < 0 || nx >= map[0].length)
          continue;
        if (map[ny][nx] === "#") continue;
        if (Math.abs(distances[y][x] - distances[ny][nx]) >= 102) total++;
      }
    }
  }

  return total;
}

// Solve time: 35 minutes and 42 seconds
