export default async function part2(input: string) {
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

  const invalidUpdates: { update: number[]; failingIndex: number }[] = [];
  updates.forEach((update) => {
    const pages = update.split(",").map(Number);

    const validUpdate = determineIfUpdateIsValid(rulesMap, pages);
    if (!validUpdate.isValid) {
      invalidUpdates.push({
        update: pages,
        failingIndex: validUpdate.invalidIndex!,
      });
    }
  });

  invalidUpdates.forEach((update) => {
    total += makeUpdate(update.update, update.failingIndex, rulesMap);
  });

  return total;
}

// Solve time: 30 minutes and 48 seconds
// Total solve time: 50 minutes

const determineIfUpdateIsValid = (
  rulesMap: Map<number, number[]>,
  update: number[],
) => {
  let invalid = false;
  let invalidIndex: number | undefined = undefined;
  for (let i = 0; i < update.length; i++) {
    const currentNumber = update[i];
    const numbersBeforeCurrent = update.slice(0, i);
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
      invalidIndex = i;
      break;
    }
  }

  return { isValid: !invalid, invalidIndex };
};

const makeUpdate = (
  update: number[],
  failingIndex: number,
  rulesMap: Map<number, number[]>,
) => {
  const failingNumber = update[failingIndex];
  const failingRule = rulesMap.get(failingNumber)!;

  const lowestRuleNumberIndex = failingRule
    .map((ruleNumber) => update.findIndex((i) => i === ruleNumber))
    .sort((a, b) => a - b)
    .filter((i) => i >= 0)[0];

  const updateCopy = [...update];
  updateCopy.splice(failingIndex, 1);

  const updatedUpdate = [
    ...updateCopy.slice(0, lowestRuleNumberIndex),
    failingNumber,
    ...updateCopy.slice(lowestRuleNumberIndex),
  ];

  const isValidNow = determineIfUpdateIsValid(rulesMap, updatedUpdate);
  if (isValidNow.isValid) {
    return updatedUpdate[Math.floor(updatedUpdate.length / 2)];
  }

  return makeUpdate(updatedUpdate, isValidNow.invalidIndex!, rulesMap);
};
