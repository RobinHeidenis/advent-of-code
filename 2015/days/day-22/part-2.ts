import { spells, type Boss, type Player } from "./part-1";

let maxManaSpent = Infinity;

export default async function part2(input: string[]) {
  const bossStats = [...input.join(" ").matchAll(/(\d+)/g)];
  const boss: Boss = {
    hp: Number(bossStats[0][0]),
    damage: Number(bossStats[1][0]),
  };
  const player: Player = {
    hp: 50,
    manaSpent: 0,
    mana: 500,
    effects: [],
    shield: 0,
  };

  doTurn(player, boss);
  return maxManaSpent;
}

// Solve time: 23 minutes and 12 seconds
// Total solve time: 1 hour, 13 minutes and 19 seconds

const doTurn = (player: Player, boss: Boss) => {
  if (player.manaSpent >= maxManaSpent) {
    return;
  }

  player.hp--;
  if (player.hp <= 0) return;

  applyEffects(player, boss);
  if (boss.hp <= 0) {
    maxManaSpent = Math.min(maxManaSpent, player.manaSpent);
    return;
  }

  const availableSpells = spells.filter((spell) => {
    if (spell.mana > player.mana) return false;
    const active = player.effects.find((e) => e.name === spell.name);
    return !active || active.turns === 1;
  });

  if (availableSpells.length === 0) return;

  for (const spell of availableSpells) {
    const playerCopy = structuredClone(player);
    const bossCopy = structuredClone(boss);

    playerCopy.mana -= spell.mana;
    playerCopy.manaSpent += spell.mana;

    if (!("turns" in spell)) {
      spell.effect(playerCopy, bossCopy);
      if (bossCopy.hp <= 0) {
        maxManaSpent = Math.min(maxManaSpent, playerCopy.manaSpent);
        continue;
      }
    } else {
      playerCopy.effects.push({ name: spell.name, turns: spell.turns! });
    }

    applyEffects(playerCopy, bossCopy);
    if (bossCopy.hp <= 0) {
      maxManaSpent = Math.min(maxManaSpent, playerCopy.manaSpent);
      continue;
    }

    const damage = Math.max(1, bossCopy.damage - playerCopy.shield);
    playerCopy.hp -= damage;
    if (playerCopy.hp <= 0) continue;

    doTurn(playerCopy, bossCopy);
  }
};

const applyEffects = (player: Player, boss: Boss) => {
  const newEffects: typeof player.effects = [];

  for (const effect of player.effects) {
    const spell = spells.find((s) => s.name === effect.name)!;
    spell.effect(player, boss, effect.turns);

    effect.turns--;
    if (effect.turns > 0) {
      newEffects.push(effect);
    }
  }

  player.effects = newEffects;
};
