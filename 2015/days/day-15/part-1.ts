type Ingredient = {
  capacity: number;
  durability: number;
  flavor: number;
  texture: number;
  calories: number;
};

export default async function part1(input: string[]) {
  const ingredients = input.map((line) => {
    const [capacity, durability, flavor, texture, calories] = line
      .matchAll(/\-?\d+/g)
      .map((match) => match[0])
      .map(Number);

    return { capacity, durability, flavor, texture, calories } as Ingredient;
  });

  let highest = 0;
  for (let permutation of mixtures(100, ingredients.length)) {
    const state: Ingredient = {
      capacity: 0,
      durability: 0,
      flavor: 0,
      texture: 0,
      calories: 0,
    };

    for (let i = 0; i < permutation.length; i++) {
      Object.keys(state).forEach((key) => {
        state[key as keyof Ingredient] +=
          permutation[i] * ingredients[i][key as keyof Ingredient];
      });
    }

    if (Object.values(state).some((v) => v < 0)) continue;

    const score =
      state.capacity * state.durability * state.flavor * state.texture;

    if (score > highest) highest = score;
  }

  return highest;
}

// Solve time: 11 minutes and 22 seconds

export function* mixtures(
  teaspoons: number,
  ingredients: number,
): Generator<number[]> {
  if (ingredients < 2) {
    return yield [teaspoons];
  }

  for (let quantity = 0; quantity <= teaspoons; quantity++) {
    for (const mixture of mixtures(teaspoons - quantity, ingredients - 1)) {
      yield [quantity, ...mixture];
    }
  }
}
