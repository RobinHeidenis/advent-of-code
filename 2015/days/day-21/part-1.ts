export const gear = {
  weapon: [
    { name: "Dagger", cost: 8, damage: 4 },
    { name: "Shortsword", cost: 10, damage: 5 },
    { name: "Warhammer", cost: 25, damage: 6 },
    { name: "Longsword", cost: 40, damage: 7 },
    { name: "Greataxe", cost: 74, damage: 8 },
  ],
  armor: [
    { name: "Leather", cost: 13, armor: 1 },
    { name: "Chainmail", cost: 31, armor: 2 },
    { name: "Splintmail", cost: 53, armor: 3 },
    { name: "Bandedmail", cost: 75, armor: 4 },
    { name: "Platemail", cost: 102, armor: 5 },
    { name: "None", cost: 0, armor: 0 },
  ],
  ring: [
    { name: "Damage +1", cost: 25, damage: 1 },
    { name: "Damage +2", cost: 50, damage: 2 },
    { name: "Damage +3", cost: 100, damage: 3 },
    { name: "Defense +1", cost: 20, armor: 1 },
    { name: "Defense +2", cost: 40, armor: 2 },
    { name: "Defense +3", cost: 80, armor: 3 },
    { name: "None 1", cost: 0, damage: 0 },
    { name: "None 2", cost: 0, damage: 0 },
  ],
};

export default async function part1(input: string[]) {
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
          if (winner === "player") {
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
    (a, b) => a.cost - b.cost,
  )[0];
  return leastGoldWinningCombination.cost;
}

// Solve time: 26 minutes and 26 seconds

export const fight = (
  player: { hp: number; damage: number; armor: number },
  boss: { hp: number; damage: number; armor: number },
) => {
  let turn: "player" | "boss" = "player";
  let i = 0;
  while (true) {
    if (turn === "player") {
      boss.hp -= Math.max(player.damage - boss.armor, 1);
    } else {
      player.hp -= Math.max(boss.damage - player.armor, 1);
    }
    i++;
    turn = turn === "player" ? "boss" : "player";
    if (player.hp <= 0 || boss.hp <= 0) break;
  }

  return {
    winner: boss.hp > 1 ? "boss" : "player",
    turns: i,
  };
};
