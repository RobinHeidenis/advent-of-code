const RETURN_AT_FIRST_POSSIBLE_CHRISTMAS_TREE = true;

export default async function part2(input: string[]) {
  const height = 103;
  const width = 101;

  const robots: { x: number; y: number; deltaX: number; deltaY: number }[] = [];

  input.forEach((line) => {
    const [positionString, velocityString] = line.split(" ");
    const [x, y] = positionString.split("=")[1].split(",").map(Number);
    const [deltaX, deltaY] = velocityString
      .split("=")[1]
      .split(",")
      .map(Number);

    robots.push({ x, y, deltaX, deltaY });
  });

  let i = 1;
  while (true) {
    console.log(i);
    robots.forEach((robot) => {
      if (robot.x + robot.deltaX >= width) {
        robot.x = robot.x + robot.deltaX - width;
      } else if (robot.x + robot.deltaX < 0) {
        robot.x = width - Math.abs(robot.x + robot.deltaX);
      } else {
        robot.x += robot.deltaX;
      }

      if (robot.y + robot.deltaY >= height) {
        robot.y = robot.y + robot.deltaY - height;
      } else if (robot.y + robot.deltaY < 0) {
        robot.y = height - Math.abs(robot.y + robot.deltaY);
      } else {
        robot.y += robot.deltaY;
      }
    });

    const found = !!robots.find((robot) =>
      [1, 2, 3, 4, 5, 6, 7, 8, 9].every((o) =>
        robots.find(
          (otherRobot) =>
            otherRobot.x === robot.x + o && otherRobot.y === robot.y,
        ),
      ),
    );

    if (found) {
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          if (robots.find((robot) => robot.x === x && robot.y === y))
            console.write("#");
          else console.write(".");
        }
        console.write("\n");
      }
      console.log(`AT INDEX ${i}`);

      if (RETURN_AT_FIRST_POSSIBLE_CHRISTMAS_TREE) break;
    }
    i++;
  }

  return i;
}

// Solve time: 40 minutes and 20 seconds
// Total solve time: 1 hour, 24 minutes, and 4 seconds
