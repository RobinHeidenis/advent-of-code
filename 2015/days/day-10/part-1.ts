export default async function part1(input: string[]) {
  let value = input[0];

  for (let i = 0; i < 40; i++) {
    const regex = new RegExp(/(\d)\1*/g);
    value = value
      .match(regex)!
      .reduce((next, digit) => next + digit.length + digit[0], "");
  }

  return value.length;
}

// Solve time: 8 minutes and 30 seconds
