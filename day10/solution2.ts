import { readFileSync } from "fs";
import { join } from "path";

const numbers = readFileSync(join(__dirname, "input.txt"), "utf-8")
  .split("\r\n")
  .map(Number);

numbers.sort((a, b) => a - b);
numbers.splice(0, 0, 0);
numbers.push(numbers[numbers.length - 1] + 3);

const isValidSequence = (numbers: number[]) => {
  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] - numbers[i - 1] > 3) {
      return false;
    }
  }

  return true;
};

const removableIndizes = numbers.map((_, i, arr) => {
  if (i === 0 || i === arr.length - 1) {
    return false;
  }

  const spliceCopy = [...arr];
  spliceCopy.splice(i, 1);
  return isValidSequence(spliceCopy);
});

const groupLengths = [];
let currentGroupLength = 0;

for (let i = 1; i < removableIndizes.length - 1; i++) {
  if (removableIndizes[i]) {
    currentGroupLength++;
  } else {
    if (currentGroupLength > 0) {
      groupLengths.push(currentGroupLength);
      currentGroupLength = 0;
    }
  }
}

// i have no idea why this works, just found it through trial and error :D
export const result = groupLengths.reduce((acc, value) => {
  return acc * (Math.pow(2, value) - (value > 2 ? 1 : 0));
}, 1);
