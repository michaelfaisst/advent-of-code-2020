import { readFileSync } from "fs";
import { join } from "path";

const PREAMBLE = 25;

const numbers = readFileSync(join(__dirname, "input.txt"), "utf-8")
  .split("\r\n")
  .map(Number);

const isNumberValid = (value: number, predecessors: number[]): boolean => {
  for (let i = 0; i < predecessors.length - 1; i++) {
    for (let j = i + 1; j < predecessors.length; j++) {
      if (predecessors[i] + predecessors[j] == value) {
        return true;
      }
    }
  }

  return false;
};

let result = -1;

for (let i = PREAMBLE; i < numbers.length; i++) {
  const valid = isNumberValid(numbers[i], numbers.slice(i - PREAMBLE, i));

  if (!valid) {
    result = numbers[i];
  }
}

export { result };
