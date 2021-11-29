import { readFileSync } from "fs";
import { join } from "path";

interface IDifferences {
  [key: number]: number;
}

const differences: IDifferences = {};

const numbers = readFileSync(join(__dirname, "input.txt"), "utf-8")
  .split("\r\n")
  .map(Number);

numbers.sort((a, b) => a - b);
numbers.splice(0, 0, 0);
numbers.push(numbers[numbers.length - 1] + 3);

for (let i = 1; i < numbers.length; i++) {
  const difference = numbers[i] - numbers[i - 1];
  differences[difference] = (differences[difference] || 0) + 1;
}

export const result = differences[1] * differences[3];
