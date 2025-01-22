export type Player = {
  hp: number;
  mana: number;
  shield: number;
  effects: { name: string; turns: number }[];
  manaSpent: number;
};

export type Boss = {
  hp: number;
  damage: number;
};

export const spells = [
  {
    name: "Magic Missile",
    mana: 53,
    effect: (_player: Player, boss: Boss) => {
      boss.hp -= 4;
    },
  },
  {
    name: "Drain",
    mana: 73,
    effect: (player: Player, boss: Boss) => {
      player.hp += 2;
      boss.hp -= 2;
    },
  },
  {
    name: "Shield",
    mana: 113,
    turns: 6,
    effect: (player: Player, _boss: Boss, turn: number) => {
      if (turn === 6) {
        player.shield = 7;
      }
      if (turn === 1) {
        player.shield = 0;
      }
    },
  },
  {
    name: "Poison",
    mana: 173,
    turns: 6,
    effect: (_player: Player, boss: Boss) => {
      boss.hp -= 3;
    },
  },
  {
    name: "Recharge",
    mana: 229,
    turns: 5,
    effect: (player: Player) => {
      player.mana += 101;
    },
  },
] satisfies {
  name: string;
  mana: number;
  turns?: number;
  effect: (player: Player, boss: Boss, turn: number) => void;
}[];

let maxManaSpent = Infinity;

export default async function part1(input: string[]) {
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

// Solve time: 50 minutes and 7 seconds

const doTurn = (player: Player, boss: Boss) => {
  if (player.manaSpent >= maxManaSpent) {
    return;
  }

  const availableSpells = spells.filter(
    (s) =>
      !player.effects.find((e) => e.name === s.name) && s.mana <= player.mana, 
  );

  if (availableSpells.length === 0) {
    return;
  }

  for (const spell of availableSpells) {
    const playerCopy = structuredClone(player);
    const bossCopy = structuredClone(boss);

    playerCopy.mana -= spell.mana;
    playerCopy.manaSpent += spell.mana;

    const turnResult = turn(playerCopy, bossCopy, spell);

    if (turnResult === false) {
      continue;
    }

    if (turnResult) {
      maxManaSpent = Math.min(maxManaSpent, turnResult);
      continue;
    }

    doTurn(playerCopy, bossCopy);
  }
};

const turn = (player: Player, boss: Boss, spell: (typeof spells)[number]) => {
  applyEffects(player, boss);
  if (boss.hp <= 0) return player.manaSpent;

  if ("turns" in spell) {
    player.effects.push({ name: spell.name, turns: spell.turns! });
  } else {
    spell.effect(player, boss);
  }
  if (boss.hp <= 0) return player.manaSpent;

  applyEffects(player, boss);
  if (boss.hp <= 0) return player.manaSpent;

  const damage = Math.max(1, boss.damage - player.shield);
  player.hp -= damage;
  if (player.hp <= 0) return false;

  return null;
};

const applyEffects = (player: Player, boss: Boss) => {
  for (const effect of [...player.effects]) {
    const spell = spells.find((s) => s.name === effect.name)!;
    spell.effect(player, boss, effect.turns);
    effect.turns--;
    if (effect.turns === 0) {
      player.effects = player.effects.filter((e) => e.name !== effect.name);
    }
  }
};
