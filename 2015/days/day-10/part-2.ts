export default async function part2(input: string[]) {
  let value = input[0];

  for (let i = 0; i < 50; i++) {
    const regex = new RegExp(/(\d)\1*/g);
    value = value
      .match(regex)!
      .reduce((next, digit) => next + digit.length + digit[0], "");
  }

  return value.length;
}

// Solve time: 25 seconds
// Total solve time: 8 minutes and 56 seconds
