export default async function part1(input: string[]) {
  let total = 0;

  // 2*l*w + 2*w*h + 2*h*l
  input.forEach((line) => {
    const [length, width, height] = line.split("x").map(Number);

    const sideOne = length * width;
    const sideTwo = width * height;
    const sideThree = height * length;

    const shortest = [sideOne, sideTwo, sideThree].reduce((prev, curr) =>
      curr < prev ? curr : prev,
    );

    total += 2 * sideOne + 2 * sideTwo + 2 * sideThree + shortest;
  });

  return total;
}

// Solve time: 8 minutes and 59 seconds
