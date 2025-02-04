export default async function part1(input: string[]) {
  const sectorIds = input
    .map((line) => {
      const [id] = line.split("[");

      if (isValidRoomId(line)) {
        return Number(id.split("-").at(-1));
      }

      return null;
    })
    .filter(Boolean);

  return sectorIds.reduce((total, current) => total + current);
}

// Solve time: 13 minutes and 32 seconds

export const isValidRoomId = (roomId: string) => {
  const [id, checksum] = roomId.split("[");

  const letterOccurrances = id.split("").reduce(
    (map, letter) => {
      if (map[letter]) {
        map[letter]++;
      } else {
        map[letter] = 1;
      }

      return map;
    },
    {} as { [key: string]: number },
  );

  const topFiveOccurrances = Object.entries(letterOccurrances)
    .toSorted(([aKey, aValue], [bKey, bValue]) =>
      aValue === bValue ? aKey.localeCompare(bKey) : bValue - aValue,
    )
    .filter(
      ([character]) => Number.isNaN(Number(character)) && character !== "-",
    )
    .slice(0, 5)
    .map(([key]) => key);

  return checksum.slice(0, -1) === topFiveOccurrances.join("");
};
