import { readFileSync } from "fs";
import { join } from "path";

const calculateResult = (entries: number[]) => {
  for (let i = 0; i < entries.length - 2; i++) {
    for (let j = i + 1; j < entries.length - 1; j++) {
      for (let k = j + 1; k < entries.length; k++) {
        if (entries[i] + entries[j] + entries[k] === 2020) {
          return entries[i] * entries[j] * entries[k];
        }
      }
    }
  }
};

const input = readFileSync(join(__dirname, "input.txt"), "utf-8");
const entries = input.split("\n").map(Number);

export const result = calculateResult(entries);
