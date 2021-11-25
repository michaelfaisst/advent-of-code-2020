import { readFileSync } from "fs";
import { join } from "path";

const input = readFileSync(join(__dirname, "input.txt"), "utf-8");
const regex = /(\d*)-(\d*) (.): (.*)/;

const isPasswordValid = (input: string) => {
  const match = regex.exec(input);
  if (match == null) return;

  const [_, min, max, char, password] = match;
  const countChars = password.split("").filter((x) => x === char).length;

  return countChars >= +min && countChars <= +max;
};

export const result = input
  .split("\n")
  .map(isPasswordValid)
  .filter((x) => x).length;
