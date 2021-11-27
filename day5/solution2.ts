import { readFileSync } from "fs";
import { join } from "path";

const boardingPasses = readFileSync(
  join(__dirname, "input.txt"),
  "utf-8"
).split("\n");

const getRange = (
  boardingPass: string,
  index: number,
  min: number,
  max: number
): number => {
  if (index >= boardingPass.length || min === max) {
    return min;
  }
  const lower = boardingPass[index] === "F" || boardingPass[index] === "L";
  const middle = (min + max) / 2;

  return getRange(
    boardingPass,
    index + 1,
    lower ? min : Math.ceil(middle),
    lower ? Math.floor(middle) : max
  );
};

const calculateSeatId = (boardingPass: string) => {
  const row = getRange(boardingPass, 0, 0, 127);
  const column = getRange(boardingPass, 7, 0, 7);
  return row * 8 + column;
};

const allSeatIds = [];

for (let boardingPass of boardingPasses) {
  const seatId = calculateSeatId(boardingPass);
  allSeatIds.push(seatId);
}

let mySeat = -1;

for (let i = 9; i < 1023; i++) {
  if (
    !allSeatIds.includes(i) &&
    allSeatIds.includes(i + 1) &&
    allSeatIds.includes(i - 1)
  ) {
    mySeat = i;
    break;
  }
}

export const result = mySeat;
