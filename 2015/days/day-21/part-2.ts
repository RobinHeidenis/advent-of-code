import { fight, gear } from "./part-1";

export default async function part2(input: string[]) {
  const winningCombinations: {
    gear: { weapon: string; armor: string; ring: string; ring2: string };
    cost: number;
    damage: number;
    armor: number;
    turns: number;
  }[] = [];

  const bossStats = [...input.join(" ").matchAll(/(\d+)/g)];
  const boss = {
    hp: Number(bossStats[0][0]),
    damage: Number(bossStats[1][0]),
    armor: Number(bossStats[2][0]),
  };

  for (const weapon of gear.weapon) {
    for (const armor of gear.armor) {
      for (const ring of gear.ring) {
        for (const ring2 of gear.ring.filter((r) => r.name !== ring.name)) {
          const damage =
            weapon.damage + (ring.damage ?? 0) + (ring2.damage ?? 0);
          const armorPoints =
            armor.armor + (ring.armor ?? 0) + (ring2.armor ?? 0);
          const player = { hp: 100, damage, armor: armorPoints };

          const { turns, winner } = fight(player, { ...boss });
          if (winner === "boss") {
            winningCombinations.push({
              gear: {
                weapon: weapon.name,
                armor: armor.name,
                ring: ring.name,
                ring2: ring.name,
              },
              cost: weapon.cost + armor.cost + ring.cost + ring2.cost,
              damage,
              armor: armorPoints,
              turns,
            });
          }
        }
      }
    }
  }

  const leastGoldWinningCombination = winningCombinations.sort(
    (a, b) => b.cost - a.cost,
  )[0];
  return leastGoldWinningCombination.cost;
}

// Solve time: 1 minute and 5 seconds
// Total solve time: 27 minutes and 31 seconds
