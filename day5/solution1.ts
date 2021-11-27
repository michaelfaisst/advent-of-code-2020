import { readFileSync } from "fs";
import { join } from "path";

const boardingPasses = readFileSync(
  join(__dirname, "input.txt"),
  "utf-8"
).split("\n");
let maxSeatId = 0;

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

for (let boardingPass of boardingPasses) {
  const seatId = calculateSeatId(boardingPass);

  if (seatId > maxSeatId) {
    maxSeatId = seatId;
  }
}

export const result = maxSeatId;
