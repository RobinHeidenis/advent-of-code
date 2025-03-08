export default async function part2(input: string[]) {
  const registers: Record<string, number> = {};

  const getRegister = (name: string) => {
    if (!registers[name]) {
      registers[name] = 0;
    }

    return registers[name];
  };

  const increaseRegister = (register: string, amount: number) => {
    registers[register] = getRegister(register) + amount;
  };

  const decreaseRegister = (register: string, amount: number) => {
    registers[register] = getRegister(register) - amount;
  };

  let highestValue = 0;

  input.forEach((line) => {
    const [
      targetRegister,
      instruction,
      amount,
      _if,
      conditionRegister,
      condition,
      conditionNumber,
    ] = line.split(" ");

    const comparable = getRegister(conditionRegister);
    const comparableAmount = Number(conditionNumber);

    if (
      (condition === "<" && comparable < comparableAmount) ||
      (condition === "<=" && comparable <= comparableAmount) ||
      (condition === "==" && comparable === comparableAmount) ||
      (condition === "!=" && comparable !== comparableAmount) ||
      (condition === ">=" && comparable >= comparableAmount) ||
      (condition === ">" && comparable > comparableAmount)
    ) {
      if (instruction === "dec")
        decreaseRegister(targetRegister, Number(amount));
      else increaseRegister(targetRegister, Number(amount));
    }

    const targetRegisterValue = getRegister(targetRegister);
    if (targetRegisterValue > highestValue) {
      highestValue = targetRegisterValue;
    }
  });

  return highestValue;
}

// Solve time: 1 minutes and 37 seconds
// Total solve time: 14 minutes and 52 seconds
