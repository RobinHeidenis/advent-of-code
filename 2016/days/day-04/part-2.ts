import { isValidRoomId } from "./part-1";

const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

export default async function part2(input: string[]) {
  const validRoomIds = input.filter((line) => {
    return isValidRoomId(line);
  });

  for (const roomId of validRoomIds) {
    const [id] = roomId.split("[");
    const rot = Number(id.split("-").at(-1)) % 26;
    const trueName = id.split("").map((character) => {
      if (character === "-") {
        return " ";
      }

      const baseIndex = character.toLowerCase().charCodeAt(0) - 97;
      if (baseIndex < 0 || baseIndex > 25) return character;
      const newIndex = (baseIndex + rot) % 26;

      return alphabet[newIndex];
    });

    if (trueName.join("").includes("north")) {
      return Number(trueName.join("").split(" ").at(-1));
    }
  }
}

// Solve time: 11 minutes and 57 seconds
// Total solve time: 25 minutes and 29 seconds
