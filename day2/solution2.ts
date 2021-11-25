import { readFileSync } from "fs";
import { join } from "path";

const input = readFileSync(join(__dirname, "input.txt"), "utf-8");
const regex = /(\d*)-(\d*) (.): (.*)/;

const isPasswordValid = (input: string) => {
  const match = regex.exec(input);
  if (match == null) return;

  const [_, i, j, char, password] = match;
  const index1 = +i + -1;
  const index2 = +j + -1;

  return (
    (password[index1] === char && password[index2] !== char) ||
    (password[index1] !== char && password[index2] === char)
  );
};

export const result = input
  .split("\n")
  .map(isPasswordValid)
  .filter((x) => x).length;
