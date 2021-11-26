import { readFileSync } from "fs";
import { join } from "path";

const input = readFileSync(join(__dirname, "input.txt"), "utf-8");
const rows = input.split("\n");

const calculateTreeCount = (deltaX: number, deltaY: number) => {
  let x = 0;
  let treeCount = 0;

  for (let y = 0; y < rows.length; y += deltaY) {
    const row = rows[y];

    if (row[x % row.length] === "#") {
      ++treeCount;
    }

    x += deltaX;
  }

  return treeCount;
};

export const result = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
].reduce((acc, value) => acc * calculateTreeCount(value[0], value[1]), 1);
