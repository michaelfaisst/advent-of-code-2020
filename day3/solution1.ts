import { readFileSync } from "fs";
import { join } from "path";

const input = readFileSync(join(__dirname, "input.txt"), "utf-8");
const rows = input.split("\n");

let x = 0;
let treeCount = 0;

for (const row of rows) {
  if (row[x % row.length] === "#") {
    ++treeCount;
  }

  x += 3;
}

export { treeCount as result };
