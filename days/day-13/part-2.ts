export default async function part2(input: string) {
  let total = 0;

  input
    .split("\n\n")
    .map((block) => block.split("\n"))
    .forEach((block) => {
      const [_0, _1, offsetAXString, offsetAYString] = block[0].split(" ");
      const [_2, _3, offsetBXString, offsetBYString] = block[1].split(" ");
      const [_4, prizeXString, prizeYString] = block[2].split(" ");
      const offsetAX = Number(offsetAXString.split("+")[1].replace(",", ""));
      const offsetAY = Number(offsetAYString.split("+")[1]);
      const offsetBX = Number(offsetBXString.split("+")[1].replace(",", ""));
      const offsetBY = Number(offsetBYString.split("+")[1]);
      const prizeX =
        Number(prizeXString.split("=")[1].replace(",", "")) + 10000000000000;
      const prizeY = Number(prizeYString.split("=")[1]) + 10000000000000;

      const aTimes =
        (prizeX * offsetBY - prizeY * offsetBX) /
        (offsetAX * offsetBY - offsetAY * offsetBX);
      const bTimes =
        (offsetAX * prizeY - offsetAY * prizeX) /
        (offsetAX * offsetBY - offsetAY * offsetBX);

      if (Number.isInteger(aTimes) && Number.isInteger(bTimes))
        total += bTimes + aTimes * 3;
    });

  return total;
}

// Solve time: 28 seconds
// Total solve time: 17 minutes and 51 seconds
