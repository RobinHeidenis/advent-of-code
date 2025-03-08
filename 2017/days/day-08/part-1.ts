export default async function part1(input: string[]) {
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
  });

  return Math.max(...Object.values(registers));
}

// Solve time: 13 minutes and 15 seconds
