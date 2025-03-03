export const sumArray = (array: number[]) => {
  return array.reduce(sum, 0);
};

export const sum = (total: number, current: number) => total + current;
