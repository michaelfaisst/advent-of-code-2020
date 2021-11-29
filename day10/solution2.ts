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

let result = 1;

/*let i = 1;

while (i < numbers.length - 1) {
  let groupLength = 0;

  while (true) {
    const spliceCopy = [...numbers];
    spliceCopy.splice(i, groupLength + 1);
    const validSequence = isValidSequence(spliceCopy);

    if (validSequence) {
      groupLength++;
    } else {
      result *= Math.pow(2, groupLength);
      i += groupLength || 1;
      break;
    }
  }
} */

let groups = {
  1: 0,
  2: 0,
};

for (let groupLength of [1, 2]) {
  for (let i = 1; i < numbers.length - groupLength; i++) {
    const sliceCopy = [...numbers];
    sliceCopy.splice(i, groupLength);
    const validSequence = isValidSequence(sliceCopy);

    if (validSequence) {
      groups[groupLength]++;
    }
  }
}

console.log(groups);

export { result };
