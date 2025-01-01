const memoize = <Args extends any[], Result>(
  func: (...args: Args) => Result,
) => {
  const cache = new Map<string, Result>();

  return function (...args: Args): Result {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key)!;
    }

    const result = func(...args);
    cache.set(key, result);
    return result;
  };
};

export const NUM_KEY_MAP = {
  "7": [0, 0],
  "8": [0, 1],
  "9": [0, 2],
  "4": [1, 0],
  "5": [1, 1],
  "6": [1, 2],
  "1": [2, 0],
  "2": [2, 1],
  "3": [2, 2],
  " ": [3, 0],
  "0": [3, 1],
  A: [3, 2],
};

// Quick Lookup for Direction Keys for
// [" ", "^", "A"],
// ["<", "v", ">"],
export const DIR_KEY_MAP = {
  " ": [0, 0],
  "^": [0, 1],
  A: [0, 2],
  "<": [1, 0],
  v: [1, 1],
  ">": [1, 2],
};

export const sum = (arr: number[]) => arr.reduce((acc, curr) => acc + curr, 0);

const solve = (keys: string[], robots: number) => {
  let res = 0;
  keys.forEach((key) => {
    const num = parseInt(key.match(/\d+/)![0]);
    const minLength = checkChunk(key, robots);
    res += num * minLength;
  });
  return res;
};

const getDirs = (sequence: string, isNumeric: boolean) => {
  const keyMap = isNumeric ? NUM_KEY_MAP : DIR_KEY_MAP;
  const [start, blank] = [keyMap["A"], keyMap[" "]];
  const q = [{ r: start[0], c: start[1], str: "", i: 0 }];
  const res: string[] = [];

  while (q.length > 0) {
    const { r, c, str, i } = q.shift()!;

    if (i >= sequence.length) {
      res.push(str);
      continue;
    }

    // skip blank key position
    if (r === blank[0] && c === blank[1]) continue;

    const [r1, c1] = keyMap[sequence[i] as keyof typeof keyMap];
    const rDiff = r1 - r;
    const cDiff = c1 - c;

    // arrived at next key in sequence so can just press 'A
    if (rDiff === 0 && cDiff === 0) {
      q.push({ r, c, str: str + "A", i: i + 1 });
      continue;
    }

    // move up, down, left, right
    if (rDiff < 0) q.push({ r: r - 1, c: c, str: str + "^", i });
    else if (rDiff > 0) q.push({ r: r + 1, c: c, str: str + "v", i });
    if (cDiff < 0) q.push({ r: r, c: c - 1, str: str + "<", i });
    else if (cDiff > 0) q.push({ r: r, c: c + 1, str: str + ">", i });
  }
  return res;
};

const checkChunk = memoize((chunk: string, depth: number): number => {
  if (depth === 0) return chunk.length;
  const ways = getDirs(chunk, /[0-9]/.test(chunk));

  let minLength = Infinity;
  for (const way of ways) {
    // split into chunks that end with 'A' e.g. '^^A>vA<A' -> ['^^A', '>vA', '<A'], some sub-chunks might might be the same for all different ways
    // other sub-chunks might be lead to shorter strings
    const chunks = way.match(/[^A]*A/g)!;
    minLength = Math.min(
      minLength,
      sum(chunks.map((c) => checkChunk(c, depth - 1))),
    );
  }
  return minLength;
});

export default function part2(input: string[]) {
  return solve(input, 26);
}

// Solve time: 1 minute
// Total solve time: 1 hour, 50 minutes, and 47 seconds
