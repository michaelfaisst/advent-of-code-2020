import { readFileSync } from "fs";
import { join } from "path";

const input = readFileSync(join(__dirname, "input.txt"), "utf-8");

const groups = input
  .split("\r\n\r\n")
  .map((group) => group.split("\r\n"))
  .map((group) => group.join(""));

const counts = groups
  .map((answers) =>
    answers.split("").reduce((acc, value) => {
      return acc.includes(value) ? acc : acc + value;
    })
  )
  .map((condensedAnswers) => condensedAnswers.length);

const result = counts.reduce((acc, value) => acc + value);

export { result };
