export default async function part1(input: string) {
  let total = 0;

  const [rules, updates] = input.split("\n\n").map((part) => part.split("\n"));

  const rulesMap = new Map<number, number[]>();
  rules.forEach((rule) => {
    const [number, before] = rule.split("|").map(Number);

    const existingBefores = rulesMap.get(number);
    if (existingBefores?.length) {
      rulesMap.set(number, [...existingBefores, before]);
    } else {
      rulesMap.set(number, [before]);
    }
  });

  updates.forEach((update) => {
    const pages = update.split(",").map(Number);

    let invalid = false;
    for (let i = 0; i < pages.length; i++) {
      const currentNumber = pages[i];
      const numbersBeforeCurrent = pages.slice(0, i);
      const rule = rulesMap.get(currentNumber);

      if (!rule) continue;

      for (let j = 0; j < rule.length; j++) {
        const beforeNumber = rule[j];
        if (numbersBeforeCurrent.includes(beforeNumber)) {
          invalid = true;
          break;
        }
      }

      if (invalid) {
        break;
      }
    }

    if (!invalid) {
      total += pages.at(Math.floor(pages.length / 2))!;
    }
  });

  return total;
}

// Solve time: 19 minutes and 12 seconds
