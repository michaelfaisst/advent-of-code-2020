import { readFileSync } from "fs";
import { join } from "path";

const input = readFileSync(join(__dirname, "input.txt"), "utf-8");

const groups = input.split("\r\n\r\n").map((group) => group.split("\r\n"));

let result = 0;

for (let group of groups) {
  const consolidated = group
    .map((group) => group.split(""))
    .reduce((acc, value) => {
      return acc.filter((x) => value.includes(x));
    });

  result += consolidated.length;
}

export { result };
