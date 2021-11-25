import { readFileSync } from "fs";
import { join } from "path";

const calculateResult = (entries: number[]) => {
  for (let i = 0; i < entries.length - 1; i++) {
    for (let j = i + 1; j < entries.length; j++) {
      if (entries[i] + entries[j] === 2020) {
        return entries[i] * entries[j];
      }
    }
  }
};

const input = readFileSync(join(__dirname, "input.txt"), "utf-8");
const entries = input.split("\n").map(Number);

export const result = calculateResult(entries);
