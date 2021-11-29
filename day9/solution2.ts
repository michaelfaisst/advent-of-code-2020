import { readFileSync } from "fs";
import { join } from "path";

const INVALID_NUMBER = 731031916;

const numbers = readFileSync(join(__dirname, "input.txt"), "utf-8")
  .split("\r\n")
  .map(Number);

const sumValues = (numbers: number[]): number => {
  return numbers.reduce((acc, value) => acc + value);
};

const calculateResult = () => {
  for (let i = 0; i < numbers.length - 1; i++) {
    for (let j = i; j < numbers.length; j++) {
      const slice = numbers.slice(i, j + 1);
      const sum = sumValues(slice);

      if (sum > INVALID_NUMBER) {
        continue;
      }

      if (sum === INVALID_NUMBER) {
        return Math.min(...slice) + Math.max(...slice);
      }
    }
  }
};

export const result = calculateResult();
